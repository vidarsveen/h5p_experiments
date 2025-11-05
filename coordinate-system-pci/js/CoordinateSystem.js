/**
 * Interactive Coordinate System - Core Component
 * Built with p5.js
 *
 * Provides a configurable coordinate system with:
 * - Axes and grid rendering
 * - Function plotting
 * - Interactive points
 * - Polygons and shapes
 * - Validation and feedback
 */

class CoordinateSystem {
    constructor() {
        // Configuration
        this.config = null;

        // Viewport bounds (world coordinates)
        this.xMin = -10;
        this.xMax = 10;
        this.yMin = -10;
        this.yMax = 10;

        // Canvas dimensions (screen coordinates)
        this.canvasWidth = 800;
        this.canvasHeight = 600;

        // Elements
        this.elements = [];
        this.points = [];
        this.functions = [];
        this.polygons = [];

        // Interaction state
        this.draggedPoint = null;
        this.hoveredPoint = null;

        // Pan/Zoom state
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
        this.viewportStartXMin = 0;
        this.viewportStartXMax = 0;
        this.viewportStartYMin = 0;
        this.viewportStartYMax = 0;
        this.initialViewport = null; // Store original viewport for reset
        this.zoomMin = 0.1;  // Minimum zoom (10%)
        this.zoomMax = 10;   // Maximum zoom (1000%)

        // History for undo/redo
        this.history = [];
        this.historyIndex = -1;

        // Grid display
        this.showGrid = true;
        this.showAxes = true;

        // Measurement tools
        this.measurementMode = null; // 'distance', 'angle', or null
        this.measurementPoints = []; // Points selected for measurement
        this.measurements = []; // Stored measurements

        // Response data
        this.responseData = {};

        // p5.js sketch
        this.sketch = null;
        this.p5Instance = null;
    }

    /**
     * Initialize the p5.js sketch
     */
    init(containerId = 'canvasContainer') {
        const self = this;

        this.sketch = function(p) {
            self.p5Instance = p;

            p.setup = () => {
                const canvas = p.createCanvas(self.canvasWidth, self.canvasHeight);
                canvas.parent(containerId);
                p.pixelDensity(2); // Retina support
                p.frameRate(60);

                console.log('✅ Coordinate System initialized');
            };

            p.draw = () => {
                p.background(255);

                // Draw grid
                if (self.showGrid) {
                    self.drawGrid(p);
                }

                // Draw axes
                if (self.showAxes) {
                    self.drawAxes(p);
                }

                // Draw elements
                self.drawElements(p);

                // Draw measurements overlay
                self.drawMeasurements(p);

                // Update mouse coordinates display
                self.updateMouseDisplay(p);

                // Update cursor based on interaction state
                self.updateCursor(p);
            };

            p.mousePressed = () => {
                self.handleMousePressed(p);
            };

            p.mouseDragged = () => {
                self.handleMouseDragged(p);
            };

            p.mouseReleased = () => {
                self.handleMouseReleased(p);
            };

            p.mouseMoved = () => {
                self.handleMouseMoved(p);
            };

            p.mouseWheel = (event) => {
                return self.handleMouseWheel(p, event);
            };
        };

        // Create p5 instance
        new p5(this.sketch);
    }

    /**
     * Load configuration from JSON
     */
    loadConfig(config) {
        this.config = config;

        // Set viewport
        if (config.viewport) {
            this.xMin = config.viewport.xMin || -10;
            this.xMax = config.viewport.xMax || 10;
            this.yMin = config.viewport.yMin || -10;
            this.yMax = config.viewport.yMax || 10;
        }

        // Store initial viewport for reset
        this.initialViewport = {
            xMin: this.xMin,
            xMax: this.xMax,
            yMin: this.yMin,
            yMax: this.yMax
        };

        // Set grid/axes visibility
        if (config.grid) {
            this.showGrid = config.grid.show !== false;
        }
        if (config.axes) {
            this.showAxes = config.axes.show !== false;
        }

        // Parse elements
        this.parseElements(config.elements || []);

        // Initialize response data
        this.initResponseData();

        // Save initial state to history
        this.saveState();

        console.log('✅ Configuration loaded:', config);
    }

    /**
     * Parse elements from configuration
     */
    parseElements(elements) {
        this.elements = [];
        this.points = [];
        this.functions = [];
        this.polygons = [];

        elements.forEach(element => {
            switch (element.type) {
                case 'point':
                    this.addPoint(element);
                    break;
                case 'function':
                    this.addFunction(element);
                    break;
                case 'polygon':
                    this.addPolygon(element);
                    break;
                case 'circle':
                    this.addCircle(element);
                    break;
                case 'line':
                    this.addLine(element);
                    break;
            }
        });
    }

    /**
     * Add a point element
     */
    addPoint(config) {
        const point = {
            type: 'point',
            id: config.id || `point_${this.points.length}`,
            x: config.position ? config.position[0] : (config.coordinates ? config.coordinates[0] : 0),
            y: config.position ? config.position[1] : (config.coordinates ? config.coordinates[1] : 0),
            label: config.label || '',
            color: config.color || config.style?.color || '#4CAF50',
            radius: config.radius || config.style?.radius || 8,
            draggable: config.draggable !== false,
            constraints: config.draggable?.constraints || null,
            snap: config.draggable?.snap || null
        };

        this.points.push(point);
        this.elements.push(point);
    }

    /**
     * Add a function element
     */
    addFunction(config) {
        const func = {
            type: 'function',
            id: config.id || `function_${this.functions.length}`,
            expression: config.expression,
            color: config.color || config.style?.color || '#2196F3',
            thickness: config.thickness || config.style?.thickness || 2,
            domain: config.domain || [this.xMin, this.xMax],
            samples: config.samples || 200
        };

        // Pre-calculate points for the function
        func.points = this.calculateFunctionPoints(func);

        this.functions.push(func);
        this.elements.push(func);
    }

    /**
     * Calculate points for a function
     */
    calculateFunctionPoints(func) {
        const points = [];
        const [xStart, xEnd] = func.domain;
        const step = (xEnd - xStart) / func.samples;

        try {
            // Use math.js for safe evaluation
            const expr = math.compile(func.expression);

            for (let x = xStart; x <= xEnd; x += step) {
                try {
                    const y = expr.evaluate({ x: x });
                    if (typeof y === 'number' && isFinite(y)) {
                        points.push({ x, y });
                    }
                } catch (e) {
                    // Skip invalid points
                }
            }
        } catch (e) {
            console.error('Error parsing function:', func.expression, e);
        }

        return points;
    }

    /**
     * Add a polygon element
     */
    addPolygon(config) {
        const polygon = {
            type: 'polygon',
            id: config.id || `polygon_${this.polygons.length}`,
            vertices: config.points || config.vertices || [],
            fillColor: config.fill ? (config.color || '#FF5722') : null,
            strokeColor: config.stroke?.color || config.color || '#D32F2F',
            strokeWeight: config.stroke?.thickness || config.thickness || 2,
            fillOpacity: config.opacity || config.fill?.opacity || 0.3,
            closed: config.closed !== false
        };

        this.polygons.push(polygon);
        this.elements.push(polygon);
    }

    /**
     * Add a circle element
     */
    addCircle(config) {
        const circle = {
            type: 'circle',
            id: config.id || `circle_${this.elements.length}`,
            center: config.center || [0, 0],
            radius: config.radius || 1,
            fillColor: config.fill ? (config.fill.color || '#9C27B0') : null,
            strokeColor: config.stroke?.color || '#7B1FA2',
            strokeWeight: config.stroke?.thickness || 2,
            fillOpacity: config.fill?.opacity || 0.3
        };

        this.elements.push(circle);
    }

    /**
     * Add a line element
     */
    addLine(config) {
        const line = {
            type: 'line',
            id: config.id || `line_${this.elements.length}`,
            start: config.start || [0, 0],
            end: config.end || [1, 1],
            color: config.color || config.style?.color || '#FF9800',
            thickness: config.thickness || config.style?.thickness || 2
        };

        this.elements.push(line);
    }

    /**
     * Draw grid
     */
    drawGrid(p) {
        p.push();
        p.stroke(220);
        p.strokeWeight(1);

        const gridSpacing = 1; // World units

        // Vertical lines
        for (let x = Math.ceil(this.xMin); x <= this.xMax; x += gridSpacing) {
            const sx = this.worldToScreenX(x);
            const sy1 = this.worldToScreenY(this.yMin);
            const sy2 = this.worldToScreenY(this.yMax);
            p.line(sx, sy1, sx, sy2);
        }

        // Horizontal lines
        for (let y = Math.ceil(this.yMin); y <= this.yMax; y += gridSpacing) {
            const sy = this.worldToScreenY(y);
            const sx1 = this.worldToScreenX(this.xMin);
            const sx2 = this.worldToScreenX(this.xMax);
            p.line(sx1, sy, sx2, sy);
        }

        p.pop();
    }

    /**
     * Draw axes
     */
    drawAxes(p) {
        p.push();
        p.stroke(100);
        p.strokeWeight(2);

        // X-axis
        const yZero = this.worldToScreenY(0);
        const xStart = this.worldToScreenX(this.xMin);
        const xEnd = this.worldToScreenX(this.xMax);
        p.line(xStart, yZero, xEnd, yZero);

        // Y-axis
        const xZero = this.worldToScreenX(0);
        const yStart = this.worldToScreenY(this.yMin);
        const yEnd = this.worldToScreenY(this.yMax);
        p.line(xZero, yStart, xZero, yEnd);

        // Draw tick marks and labels
        p.fill(100);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);

        // X-axis ticks
        for (let x = Math.ceil(this.xMin); x <= this.xMax; x++) {
            if (x === 0) continue;
            const sx = this.worldToScreenX(x);
            p.line(sx, yZero - 5, sx, yZero + 5);
            p.text(x, sx, yZero + 8);
        }

        // Y-axis ticks
        p.textAlign(p.RIGHT, p.CENTER);
        for (let y = Math.ceil(this.yMin); y <= this.yMax; y++) {
            if (y === 0) continue;
            const sy = this.worldToScreenY(y);
            p.line(xZero - 5, sy, xZero + 5, sy);
            p.text(y, xZero - 8, sy);
        }

        // Origin label
        p.textAlign(p.RIGHT, p.TOP);
        p.text('0', xZero - 8, yZero + 8);

        p.pop();
    }

    /**
     * Draw all elements
     */
    drawElements(p) {
        this.elements.forEach(element => {
            switch (element.type) {
                case 'function':
                    this.drawFunction(p, element);
                    break;
                case 'polygon':
                    this.drawPolygon(p, element);
                    break;
                case 'circle':
                    this.drawCircle(p, element);
                    break;
                case 'line':
                    this.drawLine(p, element);
                    break;
                case 'point':
                    this.drawPoint(p, element);
                    break;
            }
        });
    }

    /**
     * Draw a function
     */
    drawFunction(p, func) {
        if (!func.points || func.points.length === 0) return;

        p.push();
        p.stroke(func.color);
        p.strokeWeight(func.thickness);
        p.noFill();

        p.beginShape();
        func.points.forEach(point => {
            const sx = this.worldToScreenX(point.x);
            const sy = this.worldToScreenY(point.y);
            p.vertex(sx, sy);
        });
        p.endShape();

        p.pop();
    }

    /**
     * Draw a polygon
     */
    drawPolygon(p, polygon) {
        if (polygon.vertices.length === 0) return;

        p.push();

        // Fill
        if (polygon.fillColor) {
            const c = p.color(polygon.fillColor);
            c.setAlpha(polygon.fillOpacity * 255);
            p.fill(c);
        } else {
            p.noFill();
        }

        // Stroke
        p.stroke(polygon.strokeColor);
        p.strokeWeight(polygon.strokeWeight);

        p.beginShape();
        polygon.vertices.forEach(vertex => {
            const sx = this.worldToScreenX(vertex[0]);
            const sy = this.worldToScreenY(vertex[1]);
            p.vertex(sx, sy);
        });
        if (polygon.closed) {
            p.endShape(p.CLOSE);
        } else {
            p.endShape();
        }

        p.pop();
    }

    /**
     * Draw a circle
     */
    drawCircle(p, circle) {
        p.push();

        const cx = this.worldToScreenX(circle.center[0]);
        const cy = this.worldToScreenY(circle.center[1]);

        // Calculate radius in screen coordinates
        const r = this.worldToScreenDistance(circle.radius);

        // Fill
        if (circle.fillColor) {
            const c = p.color(circle.fillColor);
            c.setAlpha(circle.fillOpacity * 255);
            p.fill(c);
        } else {
            p.noFill();
        }

        // Stroke
        p.stroke(circle.strokeColor);
        p.strokeWeight(circle.strokeWeight);

        p.ellipse(cx, cy, r * 2, r * 2);

        p.pop();
    }

    /**
     * Draw a line
     */
    drawLine(p, line) {
        p.push();

        const sx1 = this.worldToScreenX(line.start[0]);
        const sy1 = this.worldToScreenY(line.start[1]);
        const sx2 = this.worldToScreenX(line.end[0]);
        const sy2 = this.worldToScreenY(line.end[1]);

        p.stroke(line.color);
        p.strokeWeight(line.thickness);
        p.line(sx1, sy1, sx2, sy2);

        p.pop();
    }

    /**
     * Draw a point
     */
    drawPoint(p, point) {
        const sx = this.worldToScreenX(point.x);
        const sy = this.worldToScreenY(point.y);

        p.push();

        // Point circle
        const isHovered = this.hoveredPoint === point;
        const isDragged = this.draggedPoint === point;
        const radius = isHovered || isDragged ? point.radius * 1.3 : point.radius;

        // Draw shadow if dragging
        if (isDragged) {
            p.noStroke();
            p.fill(0, 0, 0, 80);
            p.ellipse(sx + 3, sy + 3, radius * 2, radius * 2);
        }

        // Draw point
        p.fill(point.color);
        p.stroke(0);
        p.strokeWeight(isDragged ? 3 : (isHovered ? 2.5 : 2));
        p.ellipse(sx, sy, radius * 2, radius * 2);

        // Show coordinates while dragging
        if (isDragged) {
            p.fill(0);
            p.noStroke();
            p.textAlign(p.CENTER, p.TOP);
            p.textSize(12);
            p.textStyle(p.NORMAL);
            // Background for text
            const coordText = `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
            const textW = p.textWidth(coordText);
            p.fill(255, 255, 255, 200);
            p.rect(sx - textW/2 - 4, sy + radius + 5, textW + 8, 18, 4);
            // Text
            p.fill(0);
            p.text(coordText, sx, sy + radius + 8);
        }

        // Label
        if (point.label) {
            p.fill(0);
            p.noStroke();
            p.textAlign(p.CENTER, p.BOTTOM);
            p.textSize(14);
            p.textStyle(p.BOLD);
            p.text(point.label, sx, sy - radius - 5);
        }

        // Highlight if hovered and draggable
        if (isHovered && point.draggable) {
            p.noFill();
            p.stroke(point.color);
            p.strokeWeight(2);
            p.ellipse(sx, sy, (radius + 4) * 2, (radius + 4) * 2);
        }

        p.pop();
    }

    /**
     * Handle mouse pressed
     */
    handleMousePressed(p) {
        const worldX = this.screenToWorldX(p.mouseX);
        const worldY = this.screenToWorldY(p.mouseY);

        // Check for pan mode (Shift+click or Space+click or middle mouse)
        if (p.keyIsDown(p.SHIFT) || p.keyIsDown(32) || p.mouseButton === p.CENTER) {
            this.isPanning = true;
            this.panStartX = p.mouseX;
            this.panStartY = p.mouseY;
            this.viewportStartXMin = this.xMin;
            this.viewportStartXMax = this.xMax;
            this.viewportStartYMin = this.yMin;
            this.viewportStartYMax = this.yMax;
            console.log('🖐️ Pan mode started');
            return;
        }

        // Check if clicking on a point
        for (let point of this.points) {
            const dist = Math.sqrt((worldX - point.x) ** 2 + (worldY - point.y) ** 2);
            const threshold = this.screenToWorldDistance(point.radius * 1.5);

            if (dist < threshold) {
                // If in measurement mode, handle measurement click
                if (this.measurementMode) {
                    this.handleMeasurementClick(point);
                    return;
                }

                // Otherwise, if draggable, start dragging
                if (point.draggable) {
                    this.draggedPoint = point;
                    return;
                }
            }
        }
    }

    /**
     * Handle mouse dragged
     */
    handleMouseDragged(p) {
        // Handle panning
        if (this.isPanning) {
            const dx = p.mouseX - this.panStartX;
            const dy = p.mouseY - this.panStartY;

            // Convert screen delta to world delta
            const worldDx = (dx / this.canvasWidth) * (this.viewportStartXMax - this.viewportStartXMin);
            const worldDy = (dy / this.canvasHeight) * (this.viewportStartYMax - this.viewportStartYMin);

            // Update viewport (note: y is inverted in screen coordinates)
            this.xMin = this.viewportStartXMin - worldDx;
            this.xMax = this.viewportStartXMax - worldDx;
            this.yMin = this.viewportStartYMin + worldDy;
            this.yMax = this.viewportStartYMax + worldDy;

            return;
        }

        if (!this.draggedPoint) return;

        let worldX = this.screenToWorldX(p.mouseX);
        let worldY = this.screenToWorldY(p.mouseY);

        // Apply snapping
        if (this.draggedPoint.snap?.enabled) {
            if (this.draggedPoint.snap.type === 'grid') {
                const tolerance = this.draggedPoint.snap.tolerance || 0.3;
                worldX = Math.round(worldX / tolerance) * tolerance;
                worldY = Math.round(worldY / tolerance) * tolerance;
            } else if (this.draggedPoint.snap.type === 'points') {
                // Snap to other points
                const tolerance = this.draggedPoint.snap.tolerance || 0.5;
                const targets = this.draggedPoint.snap.targets || []; // Array of point IDs

                let closestPoint = null;
                let closestDist = tolerance;

                // Find closest target point within tolerance
                this.points.forEach(point => {
                    if (point === this.draggedPoint) return; // Skip self

                    // Check if this point is in targets list (or snap to all if no targets specified)
                    if (targets.length === 0 || targets.includes(point.id)) {
                        const dist = Math.sqrt(
                            (worldX - point.x) ** 2 +
                            (worldY - point.y) ** 2
                        );

                        if (dist < closestDist) {
                            closestDist = dist;
                            closestPoint = point;
                        }
                    }
                });

                // Snap to closest point if found
                if (closestPoint) {
                    worldX = closestPoint.x;
                    worldY = closestPoint.y;
                }
            }
        }

        // Apply constraints
        if (this.draggedPoint.constraints) {
            const constraints = this.draggedPoint.constraints;

            if (constraints.type === 'bounds') {
                const bounds = constraints.bounds || {};
                worldX = Math.max(bounds.xMin || this.xMin, Math.min(bounds.xMax || this.xMax, worldX));
                worldY = Math.max(bounds.yMin || this.yMin, Math.min(bounds.yMax || this.yMax, worldY));
            }

            else if (constraints.type === 'line') {
                // Constrain point to move along a line y = f(x)
                try {
                    const expr = math.compile(constraints.expression);
                    worldY = expr.evaluate({ x: worldX });

                    // Ensure y is within viewport
                    if (worldY < this.yMin) {
                        worldY = this.yMin;
                        // Solve for x if possible (for now just clamp)
                    } else if (worldY > this.yMax) {
                        worldY = this.yMax;
                    }
                } catch (e) {
                    console.error('Error evaluating line constraint:', e);
                }
            }

            else if (constraints.type === 'circle') {
                // Constrain point to move along a circle
                const center = constraints.center || [0, 0];
                const radius = constraints.radius || 1;

                // Calculate angle from center to mouse position
                const dx = worldX - center[0];
                const dy = worldY - center[1];
                const angle = Math.atan2(dy, dx);

                // Place point on circle at that angle
                worldX = center[0] + radius * Math.cos(angle);
                worldY = center[1] + radius * Math.sin(angle);
            }
        }

        this.draggedPoint.x = worldX;
        this.draggedPoint.y = worldY;

        // Update response data
        this.updateResponseData();
    }

    /**
     * Handle mouse released
     */
    handleMouseReleased(p) {
        if (this.isPanning) {
            this.isPanning = false;
            console.log('🖐️ Pan mode ended');
            return;
        }

        if (this.draggedPoint) {
            // Save state to history
            this.saveState();
            this.draggedPoint = null;
        }
    }

    /**
     * Handle mouse moved
     */
    handleMouseMoved(p) {
        const worldX = this.screenToWorldX(p.mouseX);
        const worldY = this.screenToWorldY(p.mouseY);

        this.hoveredPoint = null;

        for (let point of this.points) {
            const dist = Math.sqrt((worldX - point.x) ** 2 + (worldY - point.y) ** 2);
            const threshold = this.screenToWorldDistance(point.radius * 1.5);

            if (dist < threshold) {
                this.hoveredPoint = point;
                break;
            }
        }
    }

    /**
     * Handle mouse wheel for zoom
     */
    handleMouseWheel(p, event) {
        // Prevent page scroll
        event.preventDefault();

        // Zoom factor
        const zoomFactor = event.delta > 0 ? 1.1 : 0.9;

        // Get mouse position in world coordinates (zoom towards mouse)
        const mouseWorldX = this.screenToWorldX(p.mouseX);
        const mouseWorldY = this.screenToWorldY(p.mouseY);

        // Calculate new viewport size
        const width = (this.xMax - this.xMin) * zoomFactor;
        const height = (this.yMax - this.yMin) * zoomFactor;

        // Check zoom limits
        const currentZoom = 20 / (this.xMax - this.xMin); // Assuming initial range is 20
        const newZoom = 20 / width;

        if (newZoom < this.zoomMin || newZoom > this.zoomMax) {
            return false; // Don't allow zoom beyond limits
        }

        // Calculate mouse position as ratio in current viewport
        const mouseRatioX = (mouseWorldX - this.xMin) / (this.xMax - this.xMin);
        const mouseRatioY = (mouseWorldY - this.yMin) / (this.yMax - this.yMin);

        // Set new viewport centered on mouse position
        this.xMin = mouseWorldX - width * mouseRatioX;
        this.xMax = mouseWorldX + width * (1 - mouseRatioX);
        this.yMin = mouseWorldY - height * mouseRatioY;
        this.yMax = mouseWorldY + height * (1 - mouseRatioY);

        console.log(`🔍 Zoom: ${(newZoom * 100).toFixed(0)}%`);

        // Return false to prevent default browser behavior
        return false;
    }

    /**
     * Coordinate transformation: world to screen X
     */
    worldToScreenX(worldX) {
        return ((worldX - this.xMin) / (this.xMax - this.xMin)) * this.canvasWidth;
    }

    /**
     * Coordinate transformation: world to screen Y
     */
    worldToScreenY(worldY) {
        return this.canvasHeight - ((worldY - this.yMin) / (this.yMax - this.yMin)) * this.canvasHeight;
    }

    /**
     * Coordinate transformation: screen to world X
     */
    screenToWorldX(screenX) {
        return this.xMin + (screenX / this.canvasWidth) * (this.xMax - this.xMin);
    }

    /**
     * Coordinate transformation: screen to world Y
     */
    screenToWorldY(screenY) {
        return this.yMin + ((this.canvasHeight - screenY) / this.canvasHeight) * (this.yMax - this.yMin);
    }

    /**
     * Convert world distance to screen distance
     */
    worldToScreenDistance(worldDist) {
        return worldDist * (this.canvasWidth / (this.xMax - this.xMin));
    }

    /**
     * Convert screen distance to world distance
     */
    screenToWorldDistance(screenDist) {
        return screenDist * ((this.xMax - this.xMin) / this.canvasWidth);
    }

    /**
     * Update mouse coordinate display
     */
    updateMouseDisplay(p) {
        if (p.mouseX < 0 || p.mouseX > this.canvasWidth || p.mouseY < 0 || p.mouseY > this.canvasHeight) {
            return;
        }

        const worldX = this.screenToWorldX(p.mouseX);
        const worldY = this.screenToWorldY(p.mouseY);

        const coordsElement = document.getElementById('mouseCoords');
        if (coordsElement) {
            coordsElement.textContent = `Mouse: (${worldX.toFixed(2)}, ${worldY.toFixed(2)})`;
        }
    }

    /**
     * Update cursor based on interaction state
     */
    updateCursor(p) {
        if (p.mouseX < 0 || p.mouseX > this.canvasWidth || p.mouseY < 0 || p.mouseY > this.canvasHeight) {
            return;
        }

        if (this.isPanning) {
            p.cursor('move');
        } else if (this.draggedPoint) {
            p.cursor('grabbing');
        } else if (p.keyIsDown(p.SHIFT) || p.keyIsDown(32)) {
            // Show move cursor when shift/space is held (pan mode ready)
            p.cursor('move');
        } else if (this.hoveredPoint && this.hoveredPoint.draggable) {
            p.cursor('grab');
        } else {
            p.cursor('crosshair');
        }
    }

    /**
     * Initialize response data
     */
    initResponseData() {
        this.responseData = {
            points: {}
        };

        this.points.forEach(point => {
            this.responseData.points[point.id] = {
                x: point.x,
                y: point.y
            };
        });

        this.updateResponseDataDisplay();
    }

    /**
     * Update response data
     */
    updateResponseData() {
        this.points.forEach(point => {
            this.responseData.points[point.id] = {
                x: parseFloat(point.x.toFixed(3)),
                y: parseFloat(point.y.toFixed(3))
            };
        });

        this.updateResponseDataDisplay();
    }

    /**
     * Update response data display
     */
    updateResponseDataDisplay() {
        const element = document.getElementById('responseData');
        if (element) {
            element.textContent = JSON.stringify(this.responseData, null, 2);
        }
    }

    /**
     * Validate response
     */
    validate() {
        if (!this.config || !this.config.validation) {
            return { valid: false, message: 'No validation rules defined' };
        }

        const rules = this.config.validation.rules || [];
        const results = [];
        let totalScore = 0;
        let maxScore = 0;

        rules.forEach(rule => {
            const result = this.validateRule(rule);
            results.push(result);
            totalScore += result.score;
            maxScore += result.maxScore;
        });

        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        return {
            valid: totalScore === maxScore,
            score: totalScore,
            maxScore: maxScore,
            percentage: percentage.toFixed(1),
            results: results
        };
    }

    /**
     * Validate a single rule
     */
    validateRule(rule) {
        // Point Position Validation
        if (rule.type === 'pointPosition') {
            const point = this.points.find(p => p.id === rule.pointId);
            if (!point) {
                return { score: 0, maxScore: 1, feedback: 'Point not found' };
            }

            const target = rule.target;
            const tolerance = rule.tolerance || 0.1;
            const distance = Math.sqrt((point.x - target[0]) ** 2 + (point.y - target[1]) ** 2);

            if (distance <= tolerance) {
                return {
                    score: rule.scoring?.correct || 1,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.correct || 'Correct!'
                };
            } else {
                return {
                    score: 0,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.incorrect || 'Incorrect position'
                };
            }
        }

        // Point on Line Validation
        if (rule.type === 'pointOnLine') {
            const point = this.points.find(p => p.id === rule.pointId);
            if (!point) {
                return { score: 0, maxScore: 1, feedback: 'Point not found' };
            }

            try {
                // Evaluate line expression at point's x coordinate
                const expr = math.compile(rule.lineExpression);
                const expectedY = expr.evaluate({ x: point.x });

                const tolerance = rule.tolerance || 0.1;
                const distance = Math.abs(point.y - expectedY);

                if (distance <= tolerance) {
                    return {
                        score: rule.scoring?.correct || 1,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.correct || `Point is on the line y = ${rule.lineExpression}`
                    };
                } else {
                    return {
                        score: 0,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.incorrect || `Point should be on the line y = ${rule.lineExpression}`
                    };
                }
            } catch (e) {
                return { score: 0, maxScore: 1, feedback: 'Invalid line expression' };
            }
        }

        // Distance Between Points Validation
        if (rule.type === 'distance') {
            const point1 = this.points.find(p => p.id === rule.point1Id);
            const point2 = this.points.find(p => p.id === rule.point2Id);

            if (!point1 || !point2) {
                return { score: 0, maxScore: 1, feedback: 'One or both points not found' };
            }

            const actualDistance = Math.sqrt(
                (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2
            );
            const targetDistance = rule.target;
            const tolerance = rule.tolerance || 0.2;

            if (Math.abs(actualDistance - targetDistance) <= tolerance) {
                return {
                    score: rule.scoring?.correct || 1,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.correct || `Distance is ${actualDistance.toFixed(2)}, correct!`
                };
            } else {
                return {
                    score: 0,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.incorrect || `Distance is ${actualDistance.toFixed(2)}, should be ${targetDistance.toFixed(2)}`
                };
            }
        }

        // Slope Between Points Validation
        if (rule.type === 'slope') {
            const point1 = this.points.find(p => p.id === rule.point1Id);
            const point2 = this.points.find(p => p.id === rule.point2Id);

            if (!point1 || !point2) {
                return { score: 0, maxScore: 1, feedback: 'One or both points not found' };
            }

            const dx = point2.x - point1.x;
            const dy = point2.y - point1.y;

            // Handle vertical line
            if (Math.abs(dx) < 0.001) {
                if (rule.target === Infinity || rule.target === 'undefined') {
                    return {
                        score: rule.scoring?.correct || 1,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.correct || 'Slope is undefined (vertical line), correct!'
                    };
                } else {
                    return {
                        score: 0,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.incorrect || 'Slope is undefined (vertical line)'
                    };
                }
            }

            const actualSlope = dy / dx;
            const targetSlope = rule.target;
            const tolerance = rule.tolerance || 0.1;

            if (Math.abs(actualSlope - targetSlope) <= tolerance) {
                return {
                    score: rule.scoring?.correct || 1,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.correct || `Slope is ${actualSlope.toFixed(2)}, correct!`
                };
            } else {
                return {
                    score: 0,
                    maxScore: rule.scoring?.correct || 1,
                    feedback: rule.feedback?.incorrect || `Slope is ${actualSlope.toFixed(2)}, should be ${targetSlope.toFixed(2)}`
                };
            }
        }

        // Point on Function Validation
        if (rule.type === 'pointOnFunction') {
            const point = this.points.find(p => p.id === rule.pointId);
            if (!point) {
                return { score: 0, maxScore: 1, feedback: 'Point not found' };
            }

            const func = this.functions.find(f => f.id === rule.functionId);
            if (!func) {
                return { score: 0, maxScore: 1, feedback: 'Function not found' };
            }

            try {
                const expr = math.compile(func.expression);
                const expectedY = expr.evaluate({ x: point.x });

                const tolerance = rule.tolerance || 0.1;
                const distance = Math.abs(point.y - expectedY);

                if (distance <= tolerance) {
                    return {
                        score: rule.scoring?.correct || 1,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.correct || `Point is on the function`
                    };
                } else {
                    return {
                        score: 0,
                        maxScore: rule.scoring?.correct || 1,
                        feedback: rule.feedback?.incorrect || `Point should be on the function`
                    };
                }
            } catch (e) {
                return { score: 0, maxScore: 1, feedback: 'Error evaluating function' };
            }
        }

        return { score: 0, maxScore: 1, feedback: 'Unknown rule type' };
    }

    /**
     * Save state to history
     */
    saveState() {
        // Deep copy points to avoid reference issues
        const state = {
            points: this.points.map(p => ({
                type: p.type,
                id: p.id,
                x: p.x,
                y: p.y,
                label: p.label,
                color: p.color,
                radius: p.radius,
                draggable: p.draggable,
                constraints: p.constraints ? JSON.parse(JSON.stringify(p.constraints)) : null,
                snap: p.snap ? JSON.parse(JSON.stringify(p.snap)) : null
            }))
        };

        // Remove future states if we're not at the end
        this.history = this.history.slice(0, this.historyIndex + 1);

        this.history.push(state);
        this.historyIndex = this.history.length - 1;

        // Limit history size
        if (this.history.length > 20) {
            this.history.shift();
            this.historyIndex--;
        }

        console.log(`💾 State saved. History: ${this.historyIndex + 1}/${this.history.length}`);
    }

    /**
     * Undo
     */
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
            console.log(`↶ Undo - History: ${this.historyIndex + 1}/${this.history.length}`);
            return true;
        } else {
            console.log('↶ Undo - Already at oldest state');
            return false;
        }
    }

    /**
     * Redo
     */
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
            console.log(`↷ Redo - History: ${this.historyIndex + 1}/${this.history.length}`);
            return true;
        } else {
            console.log('↷ Redo - Already at newest state');
            return false;
        }
    }

    /**
     * Restore state from history
     */
    restoreState(state) {
        state.points.forEach((savedPoint, index) => {
            if (this.points[index]) {
                this.points[index].x = savedPoint.x;
                this.points[index].y = savedPoint.y;
            }
        });
        this.updateResponseData();
    }

    /**
     * Reset view
     */
    resetView() {
        if (this.config) {
            this.loadConfig(this.config);
        } else if (this.initialViewport) {
            // Reset viewport to initial values
            this.xMin = this.initialViewport.xMin;
            this.xMax = this.initialViewport.xMax;
            this.yMin = this.initialViewport.yMin;
            this.yMax = this.initialViewport.yMax;
            console.log('🔄 Viewport reset to initial state');
        }
    }

    /**
     * Toggle grid
     */
    toggleGrid() {
        this.showGrid = !this.showGrid;
        console.log(`⊞ Grid ${this.showGrid ? 'ON' : 'OFF'}`);
        return this.showGrid;
    }

    /**
     * Zoom in (towards center)
     */
    zoomIn() {
        const centerX = (this.xMin + this.xMax) / 2;
        const centerY = (this.yMin + this.yMax) / 2;

        const zoomFactor = 0.8; // Zoom in by 20%
        const width = (this.xMax - this.xMin) * zoomFactor;
        const height = (this.yMax - this.yMin) * zoomFactor;

        // Check zoom limits
        const newZoom = 20 / width;
        if (newZoom > this.zoomMax) {
            console.log('🔍 Max zoom reached');
            return false;
        }

        this.xMin = centerX - width / 2;
        this.xMax = centerX + width / 2;
        this.yMin = centerY - height / 2;
        this.yMax = centerY + height / 2;

        console.log(`🔍+ Zoom in: ${(newZoom * 100).toFixed(0)}%`);
        return true;
    }

    /**
     * Zoom out (from center)
     */
    zoomOut() {
        const centerX = (this.xMin + this.xMax) / 2;
        const centerY = (this.yMin + this.yMax) / 2;

        const zoomFactor = 1.25; // Zoom out by 25%
        const width = (this.xMax - this.xMin) * zoomFactor;
        const height = (this.yMax - this.yMin) * zoomFactor;

        // Check zoom limits
        const newZoom = 20 / width;
        if (newZoom < this.zoomMin) {
            console.log('🔍 Min zoom reached');
            return false;
        }

        this.xMin = centerX - width / 2;
        this.xMax = centerX + width / 2;
        this.yMin = centerY - height / 2;
        this.yMax = centerY + height / 2;

        console.log(`🔍− Zoom out: ${(newZoom * 100).toFixed(0)}%`);
        return true;
    }

    /**
     * Enable measurement mode
     */
    enableMeasurementMode(type) {
        if (type !== 'distance' && type !== 'angle') {
            console.error('Invalid measurement type. Use "distance" or "angle".');
            return false;
        }

        this.measurementMode = type;
        this.measurementPoints = [];
        console.log(`📏 Measurement mode: ${type}`);
        return true;
    }

    /**
     * Disable measurement mode
     */
    disableMeasurementMode() {
        this.measurementMode = null;
        this.measurementPoints = [];
        console.log('📏 Measurement mode disabled');
    }

    /**
     * Handle measurement click on a point
     */
    handleMeasurementClick(point) {
        if (!this.measurementMode) return;

        const maxPoints = this.measurementMode === 'distance' ? 2 : 3;

        // Add point to measurement
        this.measurementPoints.push(point);

        console.log(`📏 Point ${this.measurementPoints.length}/${maxPoints} selected: ${point.id}`);

        // Calculate and store measurement when we have enough points
        if (this.measurementPoints.length === maxPoints) {
            let measurement = {
                type: this.measurementMode,
                points: [...this.measurementPoints],
                timestamp: Date.now()
            };

            if (this.measurementMode === 'distance') {
                measurement.value = this.calculateDistance(
                    this.measurementPoints[0],
                    this.measurementPoints[1]
                );
                measurement.label = `d = ${measurement.value.toFixed(2)}`;
                console.log(`📏 Distance: ${measurement.value.toFixed(2)} units`);
            } else if (this.measurementMode === 'angle') {
                measurement.value = this.calculateAngle(
                    this.measurementPoints[0],
                    this.measurementPoints[1],
                    this.measurementPoints[2]
                );
                measurement.label = `∠ = ${measurement.value.toFixed(1)}°`;
                console.log(`📐 Angle: ${measurement.value.toFixed(1)}°`);
            }

            this.measurements.push(measurement);
            this.measurementPoints = []; // Reset for next measurement
        }
    }

    /**
     * Clear all measurements
     */
    clearMeasurements() {
        this.measurements = [];
        this.measurementPoints = [];
        console.log('✕ All measurements cleared');
    }

    /**
     * Calculate distance between two points
     */
    calculateDistance(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculate angle formed by three points (angle at p2)
     */
    calculateAngle(p1, p2, p3) {
        const dx1 = p1.x - p2.x;
        const dy1 = p1.y - p2.y;
        const dx2 = p3.x - p2.x;
        const dy2 = p3.y - p2.y;

        const angle1 = Math.atan2(dy1, dx1);
        const angle2 = Math.atan2(dy2, dx2);

        let angle = angle2 - angle1;

        // Convert to degrees and normalize to 0-360
        angle = angle * (180 / Math.PI);
        if (angle < 0) angle += 360;

        // Return the smaller angle (0-180)
        if (angle > 180) angle = 360 - angle;

        return angle;
    }

    /**
     * Draw measurements overlay
     */
    drawMeasurements(p) {
        // Draw completed measurements
        this.measurements.forEach(m => {
            if (m.type === 'distance') {
                this.drawDistanceMeasurement(p, m);
            } else if (m.type === 'angle') {
                this.drawAngleMeasurement(p, m);
            }
        });

        // Draw in-progress measurement
        if (this.measurementPoints.length > 0) {
            p.stroke(0, 150, 255, 150);
            p.strokeWeight(2);
            p.fill(0, 150, 255, 50);

            // Highlight selected points
            this.measurementPoints.forEach(point => {
                const sx = this.worldToScreenX(point.x);
                const sy = this.worldToScreenY(point.y);
                p.ellipse(sx, sy, 20, 20);
            });

            // Draw line between points
            if (this.measurementPoints.length === 2 && this.measurementMode === 'distance') {
                const sx1 = this.worldToScreenX(this.measurementPoints[0].x);
                const sy1 = this.worldToScreenY(this.measurementPoints[0].y);
                const sx2 = this.worldToScreenX(this.measurementPoints[1].x);
                const sy2 = this.worldToScreenY(this.measurementPoints[1].y);
                p.line(sx1, sy1, sx2, sy2);
            } else if (this.measurementPoints.length >= 2 && this.measurementMode === 'angle') {
                const sx1 = this.worldToScreenX(this.measurementPoints[0].x);
                const sy1 = this.worldToScreenY(this.measurementPoints[0].y);
                const sx2 = this.worldToScreenX(this.measurementPoints[1].x);
                const sy2 = this.worldToScreenY(this.measurementPoints[1].y);
                p.line(sx1, sy1, sx2, sy2);

                if (this.measurementPoints.length === 3) {
                    const sx3 = this.worldToScreenX(this.measurementPoints[2].x);
                    const sy3 = this.worldToScreenY(this.measurementPoints[2].y);
                    p.line(sx2, sy2, sx3, sy3);
                }
            }
        }
    }

    /**
     * Draw distance measurement
     */
    drawDistanceMeasurement(p, measurement) {
        const p1 = measurement.points[0];
        const p2 = measurement.points[1];

        const sx1 = this.worldToScreenX(p1.x);
        const sy1 = this.worldToScreenY(p1.y);
        const sx2 = this.worldToScreenX(p2.x);
        const sy2 = this.worldToScreenY(p2.y);

        // Draw line
        p.stroke(255, 100, 0);
        p.strokeWeight(2);
        p.line(sx1, sy1, sx2, sy2);

        // Draw label at midpoint
        const midX = (sx1 + sx2) / 2;
        const midY = (sy1 + sy2) / 2;

        p.fill(255, 255, 255, 230);
        p.noStroke();
        const textW = p.textWidth(measurement.label);
        p.rect(midX - textW/2 - 4, midY - 10, textW + 8, 20, 4);

        p.fill(255, 100, 0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(12);
        p.text(measurement.label, midX, midY);
    }

    /**
     * Draw angle measurement
     */
    drawAngleMeasurement(p, measurement) {
        const p1 = measurement.points[0];
        const p2 = measurement.points[1];
        const p3 = measurement.points[2];

        const sx1 = this.worldToScreenX(p1.x);
        const sy1 = this.worldToScreenY(p1.y);
        const sx2 = this.worldToScreenX(p2.x);
        const sy2 = this.worldToScreenY(p2.y);
        const sx3 = this.worldToScreenX(p3.x);
        const sy3 = this.worldToScreenY(p3.y);

        // Draw lines
        p.stroke(100, 200, 0);
        p.strokeWeight(2);
        p.line(sx1, sy1, sx2, sy2);
        p.line(sx2, sy2, sx3, sy3);

        // Draw arc at vertex
        const angle1 = Math.atan2(sy1 - sy2, sx1 - sx2);
        const angle2 = Math.atan2(sy3 - sy2, sx3 - sx2);

        p.noFill();
        p.arc(sx2, sy2, 40, 40, Math.min(angle1, angle2), Math.max(angle1, angle2));

        // Draw label near vertex
        const labelX = sx2 + 25;
        const labelY = sy2 - 15;

        p.fill(255, 255, 255, 230);
        p.noStroke();
        const textW = p.textWidth(measurement.label);
        p.rect(labelX - textW/2 - 4, labelY - 10, textW + 8, 20, 4);

        p.fill(100, 200, 0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(12);
        p.text(measurement.label, labelX, labelY);
    }

    /**
     * Get response data
     */
    getResponse() {
        return this.responseData;
    }
}

// Create global instance
let coordinateSystem = new CoordinateSystem();

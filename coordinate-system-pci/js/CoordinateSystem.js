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

        // History for undo/redo
        this.history = [];
        this.historyIndex = -1;

        // Grid display
        this.showGrid = true;
        this.showAxes = true;

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

                // Update mouse coordinates display
                self.updateMouseDisplay(p);
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

        p.fill(point.color);
        p.stroke(0);
        p.strokeWeight(isDragged ? 3 : 2);
        p.ellipse(sx, sy, radius * 2, radius * 2);

        // Label
        if (point.label) {
            p.fill(0);
            p.noStroke();
            p.textAlign(p.CENTER, p.BOTTOM);
            p.textSize(14);
            p.textStyle(p.BOLD);
            p.text(point.label, sx, sy - radius - 5);
        }

        p.pop();
    }

    /**
     * Handle mouse pressed
     */
    handleMousePressed(p) {
        const worldX = this.screenToWorldX(p.mouseX);
        const worldY = this.screenToWorldY(p.mouseY);

        // Check if clicking on a point
        for (let point of this.points) {
            if (!point.draggable) continue;

            const dist = Math.sqrt((worldX - point.x) ** 2 + (worldY - point.y) ** 2);
            const threshold = this.screenToWorldDistance(point.radius * 1.5);

            if (dist < threshold) {
                this.draggedPoint = point;
                return;
            }
        }
    }

    /**
     * Handle mouse dragged
     */
    handleMouseDragged(p) {
        if (!this.draggedPoint) return;

        let worldX = this.screenToWorldX(p.mouseX);
        let worldY = this.screenToWorldY(p.mouseY);

        // Apply snapping
        if (this.draggedPoint.snap?.enabled) {
            if (this.draggedPoint.snap.type === 'grid') {
                const tolerance = this.draggedPoint.snap.tolerance || 0.3;
                worldX = Math.round(worldX / tolerance) * tolerance;
                worldY = Math.round(worldY / tolerance) * tolerance;
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

        return { score: 0, maxScore: 1, feedback: 'Unknown rule type' };
    }

    /**
     * Save state to history
     */
    saveState() {
        const state = {
            points: this.points.map(p => ({ ...p }))
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
    }

    /**
     * Undo
     */
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
        }
    }

    /**
     * Redo
     */
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
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
        }
    }

    /**
     * Toggle grid
     */
    toggleGrid() {
        this.showGrid = !this.showGrid;
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

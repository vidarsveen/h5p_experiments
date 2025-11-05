# Interactive Coordinate System PCI
## Version 1.0 - Production Release

A fully-featured, accessible, and production-ready Portable Custom Interaction (PCI) component for interactive coordinate system visualization and assessment.

Built with p5.js, math.js, and modern web standards.

---

## Features

###  Core Functionality
- Interactive draggable points with constraints
- Function plotting with discontinuity handling
- Piecewise function support
- Geometric shapes (polygons, circles, lines)
- Comprehensive validation engine

### Advanced Features
- **Animation System**: Animate points along paths with trails
- **Measurement Tools**: Interactive distance and angle measurement
- **Keyboard Navigation**: Full WCAG 2.1 AA compliance
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Zoom & Pan**: Mouse wheel zoom, shift-drag panning
- **Performance**: Expression caching, 60 FPS rendering

---

## Quick Start

```javascript
coordinateSystem.init('canvasContainer');
coordinateSystem.loadConfig({
    viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    elements: [
        {
            type: "point",
            id: "A",
            position: [2, 3],
            draggable: { enabled: true }
        }
    ]
});
```

---

## Keyboard Shortcuts

- **Tab/Shift+Tab**: Cycle through points
- **Arrow Keys**: Move selected point
- **Ctrl+Z / Ctrl+Shift+Z**: Undo / Redo
- **Shift+Drag**: Pan viewport
- **Mouse Wheel**: Zoom

---

## Animation API

```javascript
coordinateSystem.animationEnabled = true;
coordinateSystem.animatePoint({
    pointId: "A",
    type: "circle",
    center: [0, 0],
    radius: 3,
    duration: 5000,
    loop: true,
    trail: true
});
```

---

## Version 1.0 - Production Release

Full documentation available in the project repository.

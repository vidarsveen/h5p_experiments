# Interactive Coordinate System - PCI Prototype

**A reusable, JSON-configurable coordinate system component built with p5.js for creating interactive math assessments.**

---

## 🎯 Overview

This is a working prototype of a Portable Custom Interaction (PCI) component that provides an interactive coordinate system for math education and assessment. It allows instructors to create diverse visual math tasks through simple JSON configuration, without writing any code.

## ✨ Features

### Core Functionality
- ✅ **Interactive Coordinate System** with customizable viewport
- ✅ **Draggable Points** with snap-to-grid and constraints
- ✅ **Function Plotting** using safe math expression evaluation (math.js)
- ✅ **Geometric Shapes** (polygons, circles, lines)
- ✅ **Grid and Axes** with tick marks and labels
- ✅ **Validation Engine** with tolerance and custom feedback
- ✅ **Undo/Redo** functionality
- ✅ **Response Tracking** in JSON format

### Interaction Features
- 🖱️ Drag points with mouse/touch
- 📍 Snap to grid with configurable tolerance
- 🔒 Constrained dragging (bounds, along curves)
- ↩️ Undo/redo support
- ⌨️ Keyboard shortcuts

### Configuration
- 📝 JSON-based configuration
- 🎨 Customizable colors, sizes, and styles
- 📊 Multiple element types in one canvas
- ✔️ Flexible validation rules

---

## 🚀 Quick Start

### Open the Prototype

```bash
# Simply open in a browser:
open coordinate-system-pci/index.html

# Or serve with a local server:
cd coordinate-system-pci
python -m http.server 8000
# Visit: http://localhost:8000
```

### Try the Examples

Click the example buttons to load predefined configurations:
- **Basic Point**: Simple draggable point with validation
- **Function Plot**: Plot sin(x) and parabolas
- **Polygon**: Geometric shapes with interactive points
- **Complete Example**: All element types combined

---

## 📐 Element Types

### 1. Points
Interactive draggable points with labels

```json
{
  "type": "point",
  "id": "pointA",
  "position": [3, 2],
  "label": "A",
  "color": "#4CAF50",
  "draggable": {
    "enabled": true,
    "snap": {
      "enabled": true,
      "type": "grid",
      "tolerance": 0.5
    },
    "constraints": {
      "type": "bounds",
      "bounds": {
        "xMin": -5,
        "xMax": 5,
        "yMin": -5,
        "yMax": 5
      }
    }
  }
}
```

### 2. Functions
Plot mathematical functions

```json
{
  "type": "function",
  "id": "parabola",
  "expression": "x^2 - 4",
  "color": "#2196F3",
  "thickness": 2,
  "domain": [-10, 10],
  "samples": 200
}
```

**Supported Functions** (via math.js):
- Basic: `+`, `-`, `*`, `/`, `^`
- Functions: `sin`, `cos`, `tan`, `sqrt`, `abs`, `log`, `exp`
- Constants: `pi`, `e`
- Examples: `x^2`, `sin(x)`, `sqrt(x)`, `2*x + 3`, `log(x)`

### 3. Polygons
Draw filled or outlined polygons

```json
{
  "type": "polygon",
  "id": "triangle",
  "vertices": [[0, 3], [-3, -2], [3, -2]],
  "fill": {
    "color": "#FF5722",
    "opacity": 0.3
  },
  "stroke": {
    "color": "#D32F2F",
    "thickness": 2
  }
}
```

### 4. Circles
Draw circles or ellipses

```json
{
  "type": "circle",
  "id": "myCircle",
  "center": [0, 0],
  "radius": 2,
  "fill": {
    "color": "#9C27B0",
    "opacity": 0.2
  },
  "stroke": {
    "color": "#7B1FA2",
    "thickness": 2
  }
}
```

### 5. Lines
Draw line segments

```json
{
  "type": "line",
  "id": "diagonal",
  "start": [-5, -5],
  "end": [5, 5],
  "color": "#FF9800",
  "thickness": 2
}
```

---

## ✔️ Validation

Define validation rules to check student responses:

```json
{
  "validation": {
    "rules": [
      {
        "id": "rule1",
        "type": "pointPosition",
        "pointId": "pointA",
        "target": [3, 4],
        "tolerance": 0.2,
        "scoring": {
          "correct": 1.0
        },
        "feedback": {
          "correct": "Perfect! Point A is correctly placed.",
          "incorrect": "Try moving point A to (3, 4)."
        }
      }
    ]
  }
}
```

### Validation Rule Types

#### Point Position
Check if a point is at a specific location (within tolerance)

```json
{
  "type": "pointPosition",
  "pointId": "pointA",
  "target": [x, y],
  "tolerance": 0.2
}
```

---

## 🎨 Complete Configuration Schema

```json
{
  "viewport": {
    "xMin": -10,
    "xMax": 10,
    "yMin": -10,
    "yMax": 10
  },
  "grid": {
    "show": true
  },
  "axes": {
    "show": true
  },
  "elements": [
    {
      "type": "point | function | polygon | circle | line",
      // ... element-specific properties
    }
  ],
  "validation": {
    "rules": [
      {
        "id": "uniqueId",
        "type": "pointPosition",
        "pointId": "pointA",
        "target": [x, y],
        "tolerance": 0.2,
        "scoring": {
          "correct": 1.0
        },
        "feedback": {
          "correct": "Correct message",
          "incorrect": "Incorrect message"
        }
      }
    ]
  }
}
```

---

## 🎮 Interactions

### Mouse/Touch
- **Click and drag** points to move them
- **Hover** over points to see highlight
- **Release** to save position

### Keyboard Shortcuts
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + R` - Reset
- `Ctrl/Cmd + Enter` - Apply config (when in textarea)

### UI Controls
- 🔄 **Reset View** - Reload original configuration
- ⊞ **Toggle Grid** - Show/hide grid
- ↶ **Undo** - Undo last action
- ↷ **Redo** - Redo last undone action

---

## 📊 Response Data Format

The system tracks user interactions and outputs response data:

```json
{
  "points": {
    "pointA": { "x": 3.142, "y": 2.718 },
    "pointB": { "x": 0.000, "y": -1.000 }
  }
}
```

This can be:
- Validated against expected answers
- Exported as JSON
- Sent to a server/LMS
- Used for analytics

---

## 🔧 Technical Architecture

### Files Structure

```
coordinate-system-pci/
├── index.html              # Main HTML interface
├── css/
│   └── style.css           # Styling
├── js/
│   ├── CoordinateSystem.js # Core p5.js component
│   ├── examples.js         # Example configurations
│   └── app.js              # Application logic
└── README.md               # This file
```

### Dependencies

- **p5.js** (v1.9.0) - Canvas rendering and interaction
- **math.js** (v12.4.1) - Safe mathematical expression evaluation

Both loaded from CDN, no build process required.

---

## 🚦 Implementation Status

### ✅ Completed (Phase 1 Prototype)
- [x] Coordinate transformation (world ↔ screen)
- [x] Grid and axes rendering
- [x] Draggable points with labels
- [x] Function plotting (via math.js)
- [x] Polygons, circles, and lines
- [x] Snap to grid
- [x] Drag constraints (bounds)
- [x] Undo/redo functionality
- [x] Validation engine (point position)
- [x] JSON configuration parser
- [x] Response data tracking
- [x] Example configurations
- [x] Interactive UI with controls

### 🔄 To Be Implemented (Future Phases)
- [ ] Zoom and pan controls
- [ ] Point-on-line validation
- [ ] Point-on-curve validation
- [ ] Drag along line constraint
- [ ] Drag along curve constraint
- [ ] Piecewise functions
- [ ] Discontinuity handling
- [ ] Parametric functions
- [ ] Implicit functions
- [ ] Text annotations
- [ ] Angle measurements
- [ ] Distance measurements
- [ ] Animation support
- [ ] Multiple selection
- [ ] Touch gesture support (pinch zoom)
- [ ] Accessibility (keyboard navigation, screen reader)
- [ ] Export to PNG/SVG
- [ ] QTI/PCI packaging
- [ ] LMS integration

---

## 💡 Use Cases

### 1. Function Graphing
Student plots a function or identifies key features

### 2. Coordinate Geometry
Student places points to form specific shapes

### 3. Transformations
Student drags points to demonstrate translations, rotations, etc.

### 4. Intersection Points
Student finds intersection of two curves

### 5. Optimization Problems
Student identifies maximum/minimum points

### 6. Geometric Constructions
Student constructs triangles, circles, etc.

---

## 🧪 Testing the Prototype

### Test Basic Point
1. Load "Basic Point" example
2. Drag point A to (3, 4)
3. Click "Validate Response"
4. Should show "Perfect!" message

### Test Function Plotting
1. Load "Function Plot" example
2. Observe parabola and sine wave
3. Drag "Vertex" point to (0, -4)
4. Validate to check correctness

### Test Custom Config
1. Edit JSON in the textarea
2. Click "Apply Configuration"
3. Interact with the canvas
4. Validate responses

---

## 📝 Example Configurations

### Simple Draggable Point
```json
{
  "viewport": { "xMin": -5, "xMax": 5, "yMin": -5, "yMax": 5 },
  "grid": { "show": true },
  "axes": { "show": true },
  "elements": [
    {
      "type": "point",
      "id": "P",
      "position": [2, 3],
      "label": "P",
      "color": "#4CAF50",
      "draggable": { "enabled": true }
    }
  ]
}
```

### Plot Multiple Functions
```json
{
  "viewport": { "xMin": -6, "xMax": 6, "yMin": -4, "yMax": 4 },
  "elements": [
    {
      "type": "function",
      "expression": "sin(x)",
      "color": "#2196F3"
    },
    {
      "type": "function",
      "expression": "cos(x)",
      "color": "#FF5722"
    }
  ]
}
```

---

## 🐛 Known Limitations (Prototype)

1. **Function parsing**: Limited to expressions supported by math.js
2. **No zoom/pan**: Viewport is fixed (coming in next version)
3. **Basic validation**: Only point position checking currently
4. **No asymptote handling**: Functions may look incorrect near discontinuities
5. **Performance**: Many elements (>50) may slow down rendering
6. **Mobile**: Touch interactions work but not optimized
7. **Accessibility**: Keyboard navigation limited

---

## 🔮 Roadmap

### Version 0.2 (Next)
- Zoom and pan controls
- More validation rule types
- Better function plotting (adaptive sampling)
- Touch optimizations

### Version 0.3
- Full PCI packaging
- QTI integration
- LMS compatibility
- Accessibility improvements

### Version 1.0
- Production-ready
- Full documentation
- Comprehensive test suite
- NPM package

---

## 🤝 Contributing

This is a prototype for demonstration and testing. Feedback welcome!

### To Test:
1. Open `index.html` in a browser
2. Try all example configurations
3. Create custom configurations
4. Test validation
5. Report any issues

---

## 📚 Resources

### Libraries Used:
- [p5.js Documentation](https://p5js.org/reference/)
- [math.js Documentation](https://mathjs.org/docs/)

### Related Projects:
- [GeoGebra](https://www.geogebra.org/) - Inspiration for math visualization
- [Desmos](https://www.desmos.com/) - Interactive graphing calculator
- [PhET Simulations](https://phet.colorado.edu/) - Interactive science/math simulations

### PCI Specifications:
- [IMS QTI PCI Specification](https://www.imsglobal.org/question/index.html)
- [TAO PCI Documentation](https://help.taotesting.com/)

---

## 📄 License

This prototype is part of the H5P STEM Learning Activities demonstration project.

---

## 📧 Contact

For questions or feedback about this prototype, please open an issue in the repository.

---

**Version**: 0.1 (Prototype)
**Status**: ✅ Working Demo
**Last Updated**: 2025-11-05

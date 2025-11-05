# Interactive Coordinate System - Natural Improvements

**After testing prototype v0.1 - What to build next**

---

## ✅ **Bugs Fixed** (v0.1.1)

1. ✓ Toggle grid now works with visual feedback
2. ✓ Undo/redo now works with deep copy and proper state management
3. ✓ All controls provide visual feedback messages
4. ✓ Console logging for debugging

---

## 🎯 **Natural Improvements - Priority Order**

### **Tier 1: High Impact, Easy to Implement** ⭐⭐⭐

#### 1. **Zoom and Pan Controls**
**Impact**: Massive - transforms usability
**Effort**: Medium (2-3 hours)

**Why**: Currently viewport is fixed. Users need to zoom in/out to see details or pan to different regions.

**Implementation**:
```javascript
// Add to CoordinateSystem class:
- Mouse wheel for zoom
- Click+drag canvas background to pan
- Zoom buttons (+/-) in UI
- Reset zoom button
- Min/max zoom limits (0.5x to 5x)
```

**Example**:
```javascript
p.mouseWheel = (event) => {
    const zoomFactor = event.delta > 0 ? 0.9 : 1.1;
    // Zoom towards mouse position
    const worldX = this.screenToWorldX(p.mouseX);
    const worldY = this.screenToWorldY(p.mouseY);

    const width = (this.xMax - this.xMin) * zoomFactor;
    const height = (this.yMax - this.yMin) * zoomFactor;

    this.xMin = worldX - width/2;
    this.xMax = worldX + width/2;
    this.yMin = worldY - height/2;
    this.yMax = worldY + height/2;
};
```

---

#### 2. **Visual Drag Feedback**
**Impact**: High - improves UX
**Effort**: Low (30 minutes)

**Why**: Users can't see that dragging is happening clearly.

**What to Add**:
- Change cursor to `grab` when hovering, `grabbing` when dragging
- Show shadow/trail behind dragged point
- Highlight grid cell when snapping
- Show coordinates while dragging

**Implementation**:
```javascript
// In drawPoint():
if (isDragged) {
    // Draw shadow
    p.fill(0, 0, 0, 50);
    p.ellipse(sx + 2, sy + 2, radius * 2, radius * 2);

    // Show coordinates
    p.text(`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`, sx, sy - 20);
}

// In p.draw():
if (this.hoveredPoint) {
    p.cursor('grab');
} else if (this.draggedPoint) {
    p.cursor('grabbing');
} else {
    p.cursor('crosshair');
}
```

---

#### 3. **Snap-to-Point** (in addition to snap-to-grid)
**Impact**: High - enables geometric constructions
**Effort**: Medium (1 hour)

**Why**: Students often need to place points exactly on vertices or intersections.

**Implementation**:
```javascript
{
  "draggable": {
    "snap": {
      "enabled": true,
      "type": "points",  // NEW: snap to other points
      "tolerance": 0.5,
      "targets": ["vertex1", "vertex2"]  // IDs of points to snap to
    }
  }
}
```

---

#### 4. **Point Labels Customization**
**Impact**: Medium - better visuals
**Effort**: Low (30 minutes)

**Why**: Currently labels are always above. Need more control.

**What to Add**:
```json
{
  "label": {
    "text": "A",
    "position": "above" | "below" | "left" | "right" | "center",
    "offset": 10,
    "fontSize": 14,
    "color": "#000000",
    "background": true,
    "backgroundOpacity": 0.7
  }
}
```

---

### **Tier 2: High Impact, Medium Effort** ⭐⭐

#### 5. **More Validation Types**
**Impact**: High - enables more assessment types
**Effort**: Medium (2-3 hours)

**New Rule Types**:

**a) Point on Line**
```json
{
  "type": "pointOnLine",
  "pointId": "P",
  "lineExpression": "2*x + 3",
  "tolerance": 0.1
}
```

**b) Distance Between Points**
```json
{
  "type": "distance",
  "point1Id": "A",
  "point2Id": "B",
  "target": 5.0,
  "tolerance": 0.2
}
```

**c) Point on Function**
```json
{
  "type": "pointOnFunction",
  "pointId": "P",
  "functionId": "parabola",
  "tolerance": 0.1
}
```

**d) Slope Between Points**
```json
{
  "type": "slope",
  "point1Id": "A",
  "point2Id": "B",
  "target": 2.0,
  "tolerance": 0.1
}
```

---

#### 6. **Drag Along Line Constraint**
**Impact**: High - enables linear motion tasks
**Effort**: Medium (2 hours)

**Why**: Useful for "move point along the line y=2x" type tasks.

**Implementation**:
```json
{
  "draggable": {
    "constraints": {
      "type": "line",
      "expression": "2*x + 1"  // Point must stay on this line
    }
  }
}
```

**Code**:
```javascript
if (constraints.type === 'line') {
    // Project mouse position onto line
    // y = mx + b form
    const m = evaluateExpression(constraints.expression, { x: 1 }) -
              evaluateExpression(constraints.expression, { x: 0 });
    const b = evaluateExpression(constraints.expression, { x: 0 });

    // Project (worldX, worldY) onto line
    worldY = m * worldX + b;
}
```

---

#### 7. **Function Discontinuity Handling**
**Impact**: Medium - improves accuracy
**Effort**: Medium (2 hours)

**Why**: Functions like `1/x`, `tan(x)`, `sqrt(x)` look wrong at discontinuities.

**What to Add**:
- Detect large jumps in y-values
- Split function into segments
- Don't draw lines across discontinuities

**Implementation**:
```javascript
calculateFunctionPoints(func) {
    const points = [];
    const segments = [];
    let currentSegment = [];

    for (let i = 0; i < samples.length - 1; i++) {
        const y1 = samples[i].y;
        const y2 = samples[i+1].y;

        // If jump is too large, start new segment
        if (Math.abs(y2 - y1) > threshold) {
            segments.push(currentSegment);
            currentSegment = [];
        } else {
            currentSegment.push(samples[i]);
        }
    }

    return segments;  // Array of arrays
}
```

---

#### 8. **Measurement Tools**
**Impact**: High - enables construction verification
**Effort**: Medium (2-3 hours)

**Tools to Add**:
- **Distance ruler**: Click two points to measure distance
- **Angle protractor**: Click three points to measure angle
- **Area calculator**: Calculate polygon area

**UI**:
```html
<div class="toolbar">
    <button onclick="enableMeasureTool('distance')">📏 Distance</button>
    <button onclick="enableMeasureTool('angle')">📐 Angle</button>
    <button onclick="enableMeasureTool('area')">▭ Area</button>
</div>
```

---

### **Tier 3: Medium Impact, Easy** ⭐

#### 9. **Export Canvas as Image**
**Impact**: Medium - useful for reports
**Effort**: Easy (30 minutes)

**Implementation**:
```javascript
function exportCanvasImage() {
    const canvas = document.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'coordinate-system.png';
    a.click();
}
```

---

#### 10. **Dark Mode**
**Impact**: Low - nice to have
**Effort**: Easy (1 hour)

**What to Add**:
- Dark mode toggle button
- Invert colors (white background → dark gray)
- Adjust grid/axes colors
- Save preference to localStorage

---

#### 11. **Keyboard Navigation for Points**
**Impact**: Medium - accessibility
**Effort**: Medium (2 hours)

**What to Add**:
- Tab to select points
- Arrow keys to nudge selected point
- Shift+arrows for fine movement
- Space to toggle point selection

---

### **Tier 4: Advanced Features** 🚀

#### 12. **Animation Support**
**Impact**: High - enables dynamic demonstrations
**Effort**: High (3-4 hours)

**Example**:
```json
{
  "type": "point",
  "id": "moving",
  "animation": {
    "enabled": true,
    "type": "parametric",
    "x": "5*cos(t)",
    "y": "5*sin(t)",
    "duration": 5000,  // milliseconds
    "repeat": true
  }
}
```

---

#### 13. **Piecewise Functions**
**Impact**: Medium - enables more complex math
**Effort**: Medium (2 hours)

**Example**:
```json
{
  "type": "piecewise",
  "id": "abs",
  "pieces": [
    { "expression": "-x", "domain": [-10, 0], "color": "red" },
    { "expression": "x", "domain": [0, 10], "color": "blue" }
  ]
}
```

---

#### 14. **Parametric Functions**
**Impact**: Medium - enables curves
**Effort**: Medium (2 hours)

**Example**:
```json
{
  "type": "parametric",
  "id": "circle",
  "x": "3*cos(t)",
  "y": "3*sin(t)",
  "tMin": 0,
  "tMax": 6.28318,  // 2π
  "samples": 100
}
```

---

#### 15. **Inequalities / Shaded Regions**
**Impact**: Medium - enables inequality problems
**Effort**: High (3-4 hours)

**Example**:
```json
{
  "type": "inequality",
  "expression": "y > x^2",
  "color": "#FF5722",
  "opacity": 0.2
}
```

---

#### 16. **Vector Support**
**Impact**: Medium - enables physics problems
**Effort**: Medium (2-3 hours)

**Example**:
```json
{
  "type": "vector",
  "id": "velocity",
  "start": [0, 0],
  "end": [3, 4],
  "color": "#2196F3",
  "arrow": true,
  "label": "v"
}
```

---

#### 17. **Touch Gesture Support**
**Impact**: High for mobile - currently basic
**Effort**: Medium (2-3 hours)

**What to Add**:
- Pinch to zoom
- Two-finger pan
- Long press for context menu
- Touch-friendly point size

**Library**: Use hammer.js for gesture recognition

---

#### 18. **Accessibility (WCAG 2.1)**
**Impact**: High - required for production
**Effort**: High (4-5 hours)

**What to Add**:
- Full keyboard navigation
- Screen reader announcements
- High contrast mode
- Focus indicators
- ARIA labels
- Auditory feedback

---

#### 19. **Full PCI Packaging**
**Impact**: High for deployment
**Effort**: High (3-4 hours)

**What to Add**:
- QTI manifest.xml
- PCI interface implementation
- Response encoding/decoding
- State save/restore
- LMS communication

---

#### 20. **Collaborative Mode**
**Impact**: Low - advanced feature
**Effort**: Very High (6+ hours)

**What to Add**:
- Multiple users on same canvas
- Real-time sync via WebSocket
- User avatars/cursors
- Chat

---

## 🏆 **Recommended Next Steps** (Priority Order)

Based on impact vs. effort, here's what to build next:

### **Phase 1: Core UX Improvements** (4-5 hours)
1. ✅ **Zoom and Pan** - Essential for usability
2. ✅ **Visual Drag Feedback** - Improves feel
3. ✅ **Snap-to-Point** - Enables constructions
4. ✅ **Point Label Customization** - Better visuals

### **Phase 2: Assessment Features** (4-5 hours)
5. ✅ **More Validation Types** - Point-on-line, distance, slope
6. ✅ **Drag Along Line** - Linear constraints
7. ✅ **Measurement Tools** - Distance, angle, area

### **Phase 3: Polish** (2-3 hours)
8. ✅ **Function Discontinuities** - Fix plotting
9. ✅ **Export Image** - Quick win
10. ✅ **Keyboard Navigation** - Accessibility

### **Phase 4: Advanced** (8-10 hours)
11. ✅ **Animation Support** - Dynamic demos
12. ✅ **Piecewise/Parametric** - Complex math
13. ✅ **Full PCI Packaging** - Production ready

---

## 💡 **Immediate Quick Wins** (Do These First!)

### **1. Zoom/Pan** (2-3 hours) ⭐⭐⭐
Most requested, transforms usability.

### **2. Visual Drag Feedback** (30 min) ⭐⭐⭐
Huge UX improvement, trivial to implement.

### **3. Export Image** (30 min) ⭐⭐
Easy and useful.

**Total**: ~3-4 hours for massive improvements!

---

## 📊 **Impact vs. Effort Matrix**

```
High Impact, Low Effort:          High Impact, High Effort:
- Visual Drag Feedback ⭐⭐⭐       - Animation Support
- Export Image                    - Full PCI Packaging
- Point Labels                    - Touch Gestures
                                  - Accessibility

Low Impact, Low Effort:           Low Impact, High Effort:
- Dark Mode                       - Collaborative Mode
                                  - (avoid these for now)

Medium Impact, Medium Effort:
- Zoom/Pan ⭐⭐⭐
- More Validation Types ⭐⭐
- Measurement Tools ⭐⭐
- Drag Constraints ⭐⭐
```

---

## 🎯 **Decision: What Should We Build Next?**

**Recommendation**: Start with **Phase 1** (Core UX Improvements)

1. **Zoom and Pan** (2-3 hours) - Transforms usability
2. **Visual Drag Feedback** (30 minutes) - Easy win
3. **Snap-to-Point** (1 hour) - Enables geometric constructions
4. **Export Image** (30 minutes) - Bonus easy win

**Total**: ~4-5 hours for v0.2 with massive improvement!

---

**Which would you like to implement first?**

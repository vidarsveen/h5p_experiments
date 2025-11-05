# Cell Division: Mitosis & Meiosis - Interactive Presentation

**Subject**: Biology - Cell Division
**Topic**: Mitosis and Meiosis
**Activity Type**: Interactive Slides with Embedded Quizzes
**Target Audience**: Ages 16-18, Undergraduate Biology Students

---

## Overview

An interactive slideshow presentation teaching the fundamentals of cell division through mitosis and meiosis. This standalone web application combines educational content with embedded knowledge checks and interactive diagrams.

## Quick Start

**Just open `index.html` in any modern web browser!**

```bash
# Option 1: Direct file opening
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Option 2: Local web server (optional)
python -m http.server 8000
# Then visit: http://localhost:8000
```

No installation, platform, or internet connection required!

---

## Features

### 📊 Interactive Presentation
- **12 comprehensive slides** covering cell division concepts
- Smooth slide transitions with keyboard navigation
- Visual progress indicator and slide markers
- Clean, professional design optimized for learning

### 🧬 Educational Content
1. **Introduction** - Overview of cell division importance
2. **Cell Cycle** - Interphase and M phase explanation
3. **Mitosis** - Detailed PMAT phases (Prophase, Metaphase, Anaphase, Telophase)
4. **Interactive Diagrams** - Click to reveal mitosis phases
5. **Meiosis** - Two rounds of division explained
6. **Comparison** - Side-by-side mitosis vs. meiosis

### ✅ Embedded Quizzes
- **4 knowledge check questions** throughout the presentation
- Immediate feedback on answers
- Explanatory messages for learning
- Score tracking (displayed on final slide)
- Questions cover key concepts from each section

### 🎯 Interactive Elements
- **Clickable cell diagrams** - Reveal phase names
- **Hover effects** on cards and buttons
- **Animated content** entry for visual engagement
- **Keyboard shortcuts** for efficient navigation

### 💾 Progress Persistence
- Automatically saves progress to browser localStorage
- Resume from where you left off
- Quiz answers remembered across sessions
- Reset option available

### ♿ Accessibility
- Full keyboard navigation support
- ARIA labels for screen readers
- High contrast design
- Focus indicators
- Responsive layout (mobile, tablet, desktop)

---

## Navigation

### Mouse/Touch
- Click **"Next →"** / **"← Previous"** buttons
- Click on **slide indicator dots** to jump to specific slides
- Click **answer buttons** in quizzes

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `→` or `↓` | Next slide |
| `←` or `↑` | Previous slide |
| `Home` | Go to first slide |
| `End` | Go to last slide |
| `Esc` | Show keyboard shortcuts help |
| `Ctrl+P` / `Cmd+P` | Print all slides |

---

## Learning Objectives

By completing this presentation, students will be able to:

1. ✓ Describe the cell cycle and its phases
2. ✓ Identify the four phases of mitosis (PMAT)
3. ✓ Explain the purpose and process of mitosis
4. ✓ Understand meiosis and its two divisions
5. ✓ Compare and contrast mitosis vs. meiosis
6. ✓ Recognize the importance of cell division in growth, repair, and reproduction

---

## Content Structure

### Slide Breakdown

| Slide | Topic | Type |
|-------|-------|------|
| 1 | Introduction to Cell Division | Content |
| 2 | The Cell Cycle Overview | Content + Diagram |
| 3 | **Quiz 1**: Cell Cycle | Knowledge Check |
| 4 | Introduction to Mitosis | Content |
| 5 | Phases of Mitosis (PMAT) | Content + Visuals |
| 6 | Interactive: Identify the Phase | Interactive Diagrams |
| 7 | **Quiz 2**: Mitosis | Knowledge Check |
| 8 | Introduction to Meiosis | Content |
| 9 | Meiosis I vs. Meiosis II | Comparison |
| 10 | **Quiz 3**: Meiosis | Knowledge Check |
| 11 | Mitosis vs. Meiosis Comparison | Comparison Table |
| 12 | **Quiz 4** + Summary | Final Assessment |

---

## Technology Stack

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Modern layouts (Grid, Flexbox), animations, gradients
- **JavaScript (ES6)**: Vanilla JS - no frameworks or dependencies
- **LocalStorage API**: Progress persistence
- **Print API**: Print-friendly layout

**Zero Dependencies** - Everything runs in the browser!

---

## Advanced Features

### Developer Console API

Open browser console and type `CellDivisionPresentation` to access:

```javascript
// Jump to specific slide (0-11)
CellDivisionPresentation.goToSlide(5);

// Navigate programmatically
CellDivisionPresentation.nextSlide();
CellDivisionPresentation.prevSlide();

// Get current state
CellDivisionPresentation.getState();

// Get quiz score
CellDivisionPresentation.getScore();  // Returns "3/4"

// Export results as JSON
CellDivisionPresentation.exportResults();

// Reset progress
CellDivisionPresentation.resetProgress();
```

### Data Export

Students can export their results as JSON:
- Click the export button (if implemented in UI)
- Or use `CellDivisionPresentation.exportResults()` in console
- Downloads file with score, completion date, and answers

---

## Customization

### Changing Content

1. **Edit HTML** (`index.html`):
   - Modify slide content in `<section class="slide">` elements
   - Add/remove slides (update `state.totalSlides` in JS)
   - Change quiz questions and answers

2. **Edit CSS** (`css/style.css`):
   - Change colors, fonts, spacing
   - Adjust responsive breakpoints
   - Modify animations

3. **Edit JavaScript** (`js/activity.js`):
   - Adjust timing, transitions
   - Add new interactive features
   - Modify quiz logic

### Adding New Slides

```html
<!-- Add to index.html inside .slides container -->
<section class="slide" data-slide="13">
    <div class="slide-content">
        <h2>Your New Slide Title</h2>
        <p>Your content here...</p>
    </div>
</section>
```

Then update `state.totalSlides` in `js/activity.js`:
```javascript
const state = {
    currentSlide: 0,
    totalSlides: 13,  // Was 12, now 13
    // ...
};
```

---

## Educational Alignment

### Standards
- **NGSS**: HS-LS1-4 (Use a model to illustrate cell division)
- **AP Biology**: Big Idea 3 (Genetic information transfer)

### Assessment Type
- **Formative Assessment**: Embedded quizzes with immediate feedback
- **Self-paced Learning**: Students control navigation
- **Mastery Learning**: Can review and retry

---

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

Works on desktop, tablet, and mobile devices.

---

## File Structure

```
03_cell_division_slides/
├── index.html              # Main presentation file
├── css/
│   └── style.css           # All styles and animations
├── js/
│   └── activity.js         # Slide controller and quiz logic
├── assets/
│   └── images/             # (Currently using CSS for visuals)
└── README.md               # This file
```

---

## Tips for Educators

1. **Introduce the Activity**: Explain navigation before students start
2. **Set Expectations**: Mention the 4 embedded quizzes
3. **Encourage Exploration**: Students can click "Reveal" buttons and navigate freely
4. **Review Together**: Use in class with projector for group discussion
5. **Independent Practice**: Assign as homework with progress tracking
6. **Assessment**: Use final quiz score for formative assessment

---

## Known Limitations

- Cell diagrams are simplified CSS representations (can be replaced with actual images)
- No video animations (could be added as embedded videos)
- Progress saved per browser (not synced across devices)
- No server-side tracking (purely client-side)

---

## Future Enhancements

Potential improvements:
- [ ] Real cell division animation videos
- [ ] Detailed SVG cell diagrams
- [ ] More interactive drag-and-drop exercises
- [ ] Audio narration option
- [ ] Multiple language support
- [ ] xAPI/LRS integration for tracking

---

## License

This activity is part of the H5P STEM Learning Activities demonstration project. Feel free to use, modify, and distribute for educational purposes.

---

## Support

For issues or questions about this activity:
- Review the main project README
- Check browser console for errors
- Ensure JavaScript is enabled
- Try in a different browser

---

**Activity Version**: 1.0
**Last Updated**: 2025-11-05
**Status**: Complete and Ready to Use ✅
**Estimated Completion Time**: 15-20 minutes

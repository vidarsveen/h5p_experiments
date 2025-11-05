# H5P Standalone Learning Activities Plan (REVISED)
## Formative Assessment for STEM Education (Ages 16-18 / Undergraduate)

---

## Executive Summary

This **REVISED** plan outlines building interactive STEM learning activities using the H5P JavaScript libraries as **standalone HTML/CSS/JS applications**. All activities will run directly in a web browser without requiring H5P.org, Lumi, WordPress, or any H5P platform. Each activity will be a self-contained web application demonstrating formative assessment capabilities.

---

## Key Changes from Original Plan

### Original Approach ❌
- Required H5P platform (WordPress, Moodle, Lumi, or H5P.org)
- Created .h5p package files
- Needed content editors and plugins

### New Approach ✓
- **Standalone HTML/CSS/JS files**
- **Use H5P core JavaScript libraries directly**
- **No platform or editor required**
- **Run by opening HTML file in browser or hosting on any web server**
- **Can be deployed to GitHub Pages, simple HTTP server, or any static hosting**

---

## Technical Architecture

### H5P Libraries Usage

We'll use the open-source H5P JavaScript libraries in two ways:

1. **Include H5P Core via CDN/Local**
   - H5P core JavaScript library
   - H5P content type libraries (drag-drop, video player, quiz, etc.)
   - H5P CSS styles

2. **Or Build Custom Interactive Components**
   - Inspired by H5P patterns and UX
   - Custom JavaScript for drag-drop, quizzes, interactive diagrams
   - Following H5P's educational design principles
   - No external dependencies (pure vanilla JS)

### Project Structure

```
activity_name/
├── index.html          # Main HTML file (can run standalone)
├── css/
│   └── style.css       # Activity-specific styles
├── js/
│   └── activity.js     # Activity logic and interactivity
├── assets/
│   └── images/         # Images, diagrams, media
└── README.md           # Documentation
```

### Deployment Options

- **Local**: Open `index.html` directly in browser
- **GitHub Pages**: Push to repo, enable Pages
- **Any Web Server**: Upload to Apache, Nginx, etc.
- **Simple HTTP Server**: `python -m http.server`
- **File Sharing**: Share HTML file via email/USB

---

## Revised Content Plan: 10 Standalone Learning Activities

### 1. **Drag and Drop - Chemistry: Electron Configuration**

**Implementation**: Pure JavaScript drag-and-drop
- Custom drag-drop with HTML5 Drag and Drop API
- SVG orbital diagrams
- Vanilla JS for validation and feedback
- CSS animations for visual feedback

**Features**:
- 8 draggable electron elements
- Drop zones for orbitals (1s, 2s, 2p)
- Real-time validation
- Score calculation
- Retry functionality
- Show solution button

**Files**:
- `index.html` (single page application)
- `css/electron-config.css`
- `js/electron-config.js`
- `assets/images/orbital-backgrounds.svg`

**Tech Stack**: HTML5, CSS3, Vanilla JavaScript
**Estimated Time**: 3-4 hours

---

### 2. **Interactive Video Player - Physics: Projectile Motion**

**Implementation**: Custom HTML5 video player with overlays
- HTML5 `<video>` element
- Custom controls with JavaScript
- Overlay questions at specific timestamps
- Canvas for drawing trajectories

**Features**:
- Video playback with custom controls
- Pause at key moments for questions
- Multiple-choice overlays
- Annotation layer for highlighting
- Progress tracking

**Files**:
- `index.html`
- `css/video-player.css`
- `js/video-controller.js`
- `js/question-overlay.js`
- `assets/videos/projectile-motion.mp4`

**Tech Stack**: HTML5 Video API, Canvas, Vanilla JS
**Estimated Time**: 4-5 hours

---

### 3. **Interactive Slides - Biology: Cell Division**

**Implementation**: Custom slideshow with embedded interactions
- Carousel/slider component
- Embedded quizzes within slides
- Interactive diagrams (clickable hotspots)
- Progress indicator

**Features**:
- Navigate through presentation
- Embedded knowledge checks
- Interactive cell diagrams
- Summary quiz at end
- Print-friendly notes view

**Files**:
- `index.html`
- `css/presentation.css`
- `js/slide-controller.js`
- `js/embedded-quiz.js`
- `assets/images/cell-division-phases/`

**Tech Stack**: CSS Grid/Flexbox, Vanilla JS
**Estimated Time**: 4-5 hours

---

### 4. **Quiz Builder - Mathematics: Calculus Fundamentals**

**Implementation**: Custom quiz engine
- Multiple question types (MCQ, fill-in-blank, numeric)
- Immediate feedback system
- Score tracking
- Explanation modals

**Features**:
- 15 progressive questions
- Mix of question types
- Detailed explanations for each answer
- Retry with different questions
- Performance summary

**Files**:
- `index.html`
- `css/quiz.css`
- `js/quiz-engine.js`
- `js/question-bank.js` (JSON data)
- `js/math-renderer.js` (for LaTeX-style equations)

**Tech Stack**: Vanilla JS, CSS animations, MathJax (for equations)
**Estimated Time**: 4-5 hours

---

### 5. **Branching Scenario - Computer Science: Algorithm Efficiency**

**Implementation**: Decision tree with JavaScript
- State machine for branching logic
- Dynamic content rendering
- Path tracking and comparison

**Features**:
- Decision points with consequences
- Visual performance graphs (Chart.js or Canvas)
- Multiple paths to explore
- End summary comparing choices

**Files**:
- `index.html`
- `css/scenario.css`
- `js/branching-logic.js`
- `js/scenario-data.js` (decision tree JSON)
- `js/performance-viz.js`

**Tech Stack**: Vanilla JS, Canvas for graphs
**Estimated Time**: 5-6 hours

---

### 6. **Flashcards - Chemistry: Functional Groups**

**Implementation**: Card flip interface
- CSS 3D transforms for flip effect
- Shuffle and repeat functionality
- Progress tracking

**Features**:
- Flip cards (molecule image → name/properties)
- Shuffle deck
- Mark as "known" or "review"
- Spaced repetition logic
- Audio pronunciation (Web Speech API)

**Files**:
- `index.html`
- `css/flashcards.css`
- `js/card-deck.js`
- `js/spaced-repetition.js`
- `assets/images/molecules/`

**Tech Stack**: CSS 3D Transforms, Vanilla JS, Web Speech API
**Estimated Time**: 3-4 hours

---

### 7. **Interactive Diagram - Biology: Cardiovascular System**

**Implementation**: SVG with interactive hotspots
- SVG anatomical diagram
- JavaScript click handlers
- Modal popups for information
- Quiz mode

**Features**:
- Clickable regions on heart diagram
- Information panels
- Optional quiz mode (click the correct part)
- Zoom and pan functionality
- Labeled and unlabeled views

**Files**:
- `index.html`
- `css/diagram.css`
- `js/interactive-svg.js`
- `js/modal-controller.js`
- `assets/images/heart-diagram.svg`

**Tech Stack**: SVG, Vanilla JS, CSS Grid
**Estimated Time**: 3-4 hours

---

### 8. **Fill in the Blanks - Physics: Thermodynamics**

**Implementation**: Cloze-style exercise
- Text with input fields
- Real-time validation
- Hint system
- Solution reveal

**Features**:
- Multiple passages with blanks
- Dropdown or text input
- Contextual hints
- Immediate feedback
- Partial credit scoring

**Files**:
- `index.html`
- `css/cloze.css`
- `js/cloze-engine.js`
- `js/passages.js` (content data)

**Tech Stack**: Vanilla JS, CSS
**Estimated Time**: 2-3 hours

---

### 9. **Accordion Reference - Mathematics: Trigonometry Identities**

**Implementation**: Collapsible sections with LaTeX
- Accordion UI pattern
- MathJax for rendering equations
- Searchable/filterable
- Practice problems

**Features**:
- Organized by category
- Expand/collapse sections
- Copy equations to clipboard
- Interactive examples
- Practice problem generator

**Files**:
- `index.html`
- `css/accordion.css`
- `js/accordion-controller.js`
- `js/trig-identities-data.js`
- `js/problem-generator.js`

**Tech Stack**: Vanilla JS, MathJax for LaTeX
**Estimated Time**: 3-4 hours

---

### 10. **Timeline - Computer Science: Programming Languages History**

**Implementation**: Interactive horizontal timeline
- CSS for layout
- JavaScript for navigation and filtering
- Modal detail views

**Features**:
- Chronological interactive timeline
- Filter by decade or paradigm
- Click events for detailed info
- Images and code samples
- Responsive design

**Files**:
- `index.html`
- `css/timeline.css`
- `js/timeline.js`
- `js/events-data.js` (timeline data)
- `assets/images/languages/`

**Tech Stack**: CSS Grid/Flexbox, Vanilla JS
**Estimated Time**: 3-4 hours

---

## Simplified Alternatives (Without Heavy Libraries)

For activities where H5P libraries are too complex, we'll build lightweight alternatives:

### Custom Components Library

Create reusable modules:
- `lib/drag-drop.js` - Generic drag-and-drop handler
- `lib/quiz-component.js` - Quiz question renderer
- `lib/feedback-modal.js` - Feedback display system
- `lib/scoring.js` - Score calculation utilities
- `lib/storage.js` - LocalStorage wrapper for progress saving

---

## Implementation Strategy

### Phase 1: Setup (Week 1)

**H5P Libraries Research**:
- Identify which H5P libraries can be used standalone
- Download or CDN link H5P core
- Test basic integration

**OR**

**Custom Library Approach**:
- Build core reusable components
- Create common CSS framework
- Establish coding standards

### Phase 2: Development (Weeks 2-4)

**Week 2**: Activities 1-3
- Electron Configuration (drag-drop)
- Interactive Video (video player)
- Cell Division (slideshow)

**Week 3**: Activities 4-6
- Calculus Quiz (quiz engine)
- Algorithm Scenario (branching)
- Functional Groups (flashcards)

**Week 4**: Activities 7-10
- Cardiovascular Diagram (interactive SVG)
- Thermodynamics Blanks (cloze)
- Trig Identities (accordion)
- Programming Timeline (timeline)

### Phase 3: Testing & Refinement (Week 5)
- Browser compatibility testing
- Mobile responsiveness
- Accessibility checks
- Performance optimization

### Phase 4: Documentation & Deployment (Week 6)
- README files for each activity
- GitHub Pages deployment
- Educator guides
- Demo videos

---

## Technical Requirements

### Core Technologies
- **HTML5**: Semantic markup, forms, video, canvas
- **CSS3**: Flexbox, Grid, animations, transforms
- **JavaScript (ES6+)**: Vanilla JS, no frameworks required
- **Optional Libraries**:
  - MathJax (for math equations)
  - Chart.js (for data visualization, or use Canvas)
  - Web Speech API (for audio pronunciation)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Development Tools
- Text editor (VS Code, Sublime, etc.)
- Web browser with DevTools
- Optional: Live Server extension for development
- Git for version control

### No Build Process Required
- All activities work without compilation
- No npm, webpack, or build tools needed
- Just HTML/CSS/JS files that run directly

---

## File Structure

```
h5p_experiments/
├── README.md
├── REVISED_PLAN.md                        # This file
├── lib/                                   # Shared utilities
│   ├── drag-drop.js
│   ├── quiz-component.js
│   ├── feedback-modal.js
│   ├── scoring.js
│   └── common.css
├── activities/
│   ├── 01_electron_configuration/
│   │   ├── index.html                    # Open this in browser!
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── activity.js
│   │   ├── assets/
│   │   │   └── images/
│   │   └── README.md
│   ├── 02_projectile_motion_video/
│   │   ├── index.html
│   │   └── ...
│   └── [03-10 other activities]/
└── docs/
    ├── SETUP.md                          # How to run activities
    ├── DEVELOPER_GUIDE.md                # How to create new activities
    └── DEPLOYMENT.md                     # Hosting options
```

---

## Running the Activities

### Method 1: Direct File Opening
```bash
# Simply double-click index.html in any activity folder
# Or from command line:
open activities/01_electron_configuration/index.html  # Mac
xdg-open activities/01_electron_configuration/index.html  # Linux
start activities/01_electron_configuration/index.html  # Windows
```

### Method 2: Local Web Server
```bash
# Python 3
cd activities/01_electron_configuration
python -m http.server 8000
# Open browser to http://localhost:8000

# Or Node.js (with http-server)
npx http-server activities/01_electron_configuration -p 8000
```

### Method 3: GitHub Pages
```bash
# Push to GitHub, enable Pages
# Activities available at: https://username.github.io/h5p_experiments/activities/01_electron_configuration/
```

### Method 4: Any Web Hosting
- Upload entire activity folder to web server
- Access via URL

---

## Formative Assessment Features

All activities will include:

### 1. Immediate Feedback
- Real-time validation
- Explanatory messages
- Visual indicators (green/red, checkmarks/X)

### 2. Self-Assessment
- Check answer buttons
- Show solution options
- Retry functionality
- Progress indicators

### 3. Data Tracking (Optional)
- LocalStorage for saving progress
- JSON export for teacher review
- Optional xAPI statements generation
- CSV data export

### 4. Accessibility
- Keyboard navigation (Tab, Enter, Arrow keys)
- ARIA labels for screen readers
- High contrast mode
- Resizable text
- Focus indicators

### 5. Responsive Design
- Mobile-friendly layouts
- Touch-friendly interactions
- Adaptive content sizing
- Works on tablets and phones

---

## Advantages of Standalone Approach

### For Educators
✓ No platform installation required
✓ Share via email, USB, or web link
✓ Works offline (after initial load)
✓ Easy to customize content
✓ No login or account needed
✓ Free to use and modify

### For Students
✓ Open and use immediately
✓ Works on any device with browser
✓ No app installation
✓ Progress saved locally
✓ Works without internet (after load)

### For Developers
✓ Standard web technologies
✓ Easy to debug (browser DevTools)
✓ No build process overhead
✓ Version control friendly
✓ Easy to extend and modify
✓ Clear separation of concerns

---

## Learning Objectives

Same as original plan - covering:
- **Mathematics**: Calculus, Trigonometry
- **Physics**: Mechanics, Thermodynamics
- **Chemistry**: Atomic structure, Organic chemistry
- **Biology**: Cell biology, Anatomy
- **Computer Science**: Algorithms, Programming history

---

## Standards Alignment

Same as original:
- Next Generation Science Standards (NGSS)
- Common Core State Standards (CCSS)
- Computer Science Teachers Association (CSTA) standards

---

## Success Metrics

### Technical Metrics
- Page load time < 2 seconds
- Works in all modern browsers
- No console errors
- Passes accessibility audit
- Mobile responsive (viewport)

### Educational Metrics
- Completion rates > 85%
- Average scores > 75%
- Student engagement (time on task)
- Retry patterns (indicates learning)

---

## Next Steps

1. **Approve revised approach**
2. **Choose first activity to implement**
   - Recommend: Electron Configuration (drag-drop is fundamental)
3. **Set up project structure**
4. **Build and test first activity**
5. **Iterate based on feedback**

---

## Key Differences Summary

| Aspect | Original Plan | Revised Plan |
|--------|---------------|--------------|
| **Delivery** | .h5p packages | Standalone HTML files |
| **Platform** | Required (WordPress/Moodle/Lumi) | None - just web browser |
| **Dependencies** | H5P platform ecosystem | Minimal (maybe MathJax) |
| **Deployment** | Upload to LMS | Any web hosting or local |
| **Customization** | Through H5P editors | Direct code editing |
| **Offline Use** | Platform-dependent | Yes, fully functional |
| **Setup Time** | Hours (install plugins) | Seconds (open file) |
| **Cost** | Platform costs may apply | Free |

---

## Resources

### Tutorials & Documentation
- MDN Web Docs (HTML/CSS/JS)
- W3C Accessibility Guidelines
- HTML5 Drag and Drop API
- Canvas API documentation
- Web Speech API

### Inspiration
- H5P.org (for UX patterns)
- PhET Interactive Simulations
- Khan Academy exercises
- GeoGebra interactive math

---

**Plan Version**: 2.0 (REVISED for Standalone)
**Date**: 2025-11-05
**Total Estimated Development Time**: 35-45 hours
**Target Audience**: Ages 16-18, Undergraduate STEM
**Primary Use Case**: Standalone formative assessment activities
**Technology**: Pure HTML5/CSS3/JavaScript (ES6+)

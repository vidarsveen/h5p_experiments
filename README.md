# H5P STEM Learning Activities - Standalone Edition

Interactive STEM learning activities built as **standalone HTML/CSS/JavaScript applications**. No platform, plugins, or editors required - just open in a web browser!

## Overview

This project demonstrates formative assessment capabilities using web technologies inspired by H5P patterns. All 10 activities are **self-contained web applications** that run directly in any modern browser, perfect for ages 16-18 and undergraduate STEM students.

**Key Feature**: Each activity is a standalone HTML file that works without any H5P platform, CMS, or special software.

## Target Audience

- Secondary education students (ages 16-18)
- Undergraduate students
- STEM educators and instructional designers
- Educational technology developers

## Subjects Covered

- **Mathematics**: Calculus, Trigonometry
- **Physics**: Classical Mechanics, Thermodynamics
- **Chemistry**: Electron Configuration, Organic Chemistry
- **Biology**: Cell Division, Human Anatomy
- **Computer Science**: Algorithms, Programming History

## Interactive Patterns Demonstrated

1. **Interactive Video Player** - Custom HTML5 video with embedded questions
2. **Drag and Drop** - HTML5 Drag/Drop API with validation
3. **Interactive Slides** - Custom slideshow with embedded activities
4. **Quiz Engine** - Multi-format questions with immediate feedback
5. **Branching Scenario** - Decision tree navigation
6. **Flashcards** - CSS flip cards with spaced repetition
7. **Interactive Diagrams** - SVG with clickable hotspots
8. **Fill in the Blanks** - Cloze-style exercises
9. **Accordion Reference** - Collapsible content sections
10. **Timeline** - Interactive chronological display

## Key Features

### Formative Assessment Capabilities
- Immediate feedback mechanisms
- Self-assessment opportunities
- Progress tracking and analytics
- Adaptive learning paths
- Misconception identification

### Interactive Elements
- Multimedia integration (video, audio, images)
- Drag-and-drop interactions
- Branching scenarios with decision points
- Gamified learning experiences
- Self-paced exploration

### Learning Analytics
- xAPI (Experience API) integration
- Learning Record Store (LRS) compatibility
- Student interaction tracking
- Performance metrics and reporting

## Project Structure

```
h5p_experiments/
├── README.md                                  # This file
├── H5P_STANDALONE_PLAN.md                     # ✓ Revised standalone plan
├── lib/                                       # Shared utilities
│   ├── drag-drop.js
│   ├── quiz-component.js
│   └── common.css
├── activities/                                # Standalone web activities
│   ├── 01_electron_configuration/
│   │   ├── index.html                        # Open this file in browser!
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── activity.js
│   │   ├── assets/
│   │   │   └── images/
│   │   └── README.md
│   ├── 02_projectile_motion_video/            # Planned
│   ├── 03_cell_division_slides/               # Planned
│   ├── 04_calculus_quiz/                      # Planned
│   ├── 05_algorithm_scenario/                 # Planned
│   ├── 06_functional_groups_flashcards/       # Planned
│   ├── 07_cardiovascular_diagram/             # Planned
│   ├── 08_thermodynamics_blanks/              # Planned
│   ├── 09_trig_identities_accordion/          # Planned
│   └── 10_programming_timeline/               # Planned
└── docs/                                      # Documentation
    ├── SETUP.md                               # How to run activities
    ├── DEVELOPER_GUIDE.md                     # Creating new activities
    └── DEPLOYMENT.md                          # Hosting options
```

## Getting Started

### For Educators - Quick Start

**Option 1: Run Locally**
```bash
# 1. Download or clone this repository
# 2. Navigate to any activity folder
# 3. Open index.html in your web browser
open activities/01_electron_configuration/index.html
```

**Option 2: Host Online**
```bash
# Upload activity folder to any web server
# Or enable GitHub Pages
# Students access via URL
```

No installation, no platform, no login required!

### For Developers

**Requirements**: Text editor + web browser (that's it!)

```bash
# 1. Clone repository
git clone [repo-url]

# 2. Create new activity
mkdir activities/my_activity
cd activities/my_activity

# 3. Create files
touch index.html style.css script.js

# 4. Open in browser and develop
python -m http.server 8000  # Optional: local server
```

All activities use pure HTML/CSS/JavaScript - no build tools needed.

## Completed Activities

### 1. Electron Configuration Builder ✅

**Path**: `activities/01_electron_configuration/index.html`
**Subject**: Chemistry - Atomic Structure
**Element**: Oxygen (O) - 8 electrons

**Quick Start**: Just open `index.html` in any browser!

**Features**:
- Interactive HTML5 drag-and-drop
- 8 electrons to place in correct orbitals (1s, 2s, 2p)
- Real-time validation and feedback
- Show hints and show solution functionality
- Responsive design (desktop, tablet, mobile)
- Fully accessible (keyboard navigation, ARIA labels)
- Works offline - no internet required

**Educational Focus**:
- Aufbau Principle (fill lowest energy first)
- Hund's Rule (one electron per orbital before pairing)
- Pauli Exclusion Principle (max 2 per orbital, opposite spins)

**Technology**: Pure HTML5/CSS3/JavaScript (ES6) - No frameworks or dependencies

**Try it**: Open `activities/01_electron_configuration/index.html` in your browser!

---

### 2. Interactive Video Player - Projectile Motion ✅

**Path**: `activities/02_projectile_motion_video/index.html`
**Subject**: Physics - Classical Mechanics
**Topic**: Projectile Motion

**Quick Start**: Just open `index.html` in any browser!

**Features**:
- Custom HTML5 video player with full controls
- 4 embedded questions that pause video at key moments
- Multiple choice questions with immediate feedback
- Progress tracking and score calculation
- Visual checkpoint markers on progress bar
- Keyboard shortcuts (Space=play/pause, F=fullscreen, etc.)
- Responsive design for all devices
- Progress persistence via localStorage

**Educational Focus**:
- Two-dimensional motion (horizontal + vertical)
- Constant horizontal velocity (no air resistance)
- Vertical motion affected by gravity
- Parabolic trajectory analysis
- Optimal launch angle for maximum range (45°)

**Interactive Questions**:
1. Components of projectile motion (5s)
2. Horizontal velocity behavior (15s)
3. Minimum velocity point (25s)
4. Optimal launch angle (35s)

**Technology**: Pure HTML5/CSS3/JavaScript (ES6) + HTML5 Video API

**Note**: Uses a sample/fallback video. Replace with your own physics video in `assets/videos/` folder.

**Try it**: Open `activities/02_projectile_motion_video/index.html` in your browser!

---

## Development Roadmap

- **Phase 1**: Setup and planning (Week 1) ✓ - **REVISED for standalone approach**
- **Phase 2**: Content development (Weeks 2-4) - **IN PROGRESS** (2/10 activities complete - 20%)
- **Phase 3**: Testing and refinement (Week 5)
- **Phase 4**: Documentation and deployment (Week 6)

## Learning Objectives Alignment

Each activity is designed with clear learning objectives aligned to:
- Next Generation Science Standards (NGSS) for science topics
- Common Core State Standards (CCSS) for mathematics
- Computer Science Teachers Association (CSTA) standards for CS

## Accessibility

All activities are designed with accessibility in mind:
- Keyboard navigation support
- Screen reader compatibility
- Alternative text for images
- Captions for video/audio content
- Adjustable timing for timed activities

## Technology Stack

- **HTML5**: Semantic markup, video, canvas, drag-and-drop API
- **CSS3**: Flexbox, Grid, animations, transforms, responsive design
- **JavaScript (ES6+)**: Vanilla JS, no frameworks required
- **Optional Libraries**:
  - MathJax (for mathematical equations)
  - Chart.js or Canvas (for data visualization)
  - Web Speech API (for audio pronunciation)
- **No Build Tools**: Direct browser execution, no compilation needed
- **Deployment**: Any web server, GitHub Pages, or local files

## License

This project demonstrates H5P capabilities. H5P is open-source software licensed under the MIT License. Individual content licenses may vary based on assets used.

## Contributing

Contributions are welcome! Please:
1. Review the demonstration plan
2. Submit issues for suggestions or bugs
3. Create pull requests with improvements
4. Share feedback on educational effectiveness

## Resources

### Web Technologies
- [MDN Web Docs](https://developer.mozilla.org) - HTML, CSS, JavaScript documentation
- [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

### Inspiration (H5P and others)
- [H5P.org](https://h5p.org) - For UX patterns and interaction design
- [PhET Interactive Simulations](https://phet.colorado.edu) - Science and math simulations
- [GeoGebra](https://www.geogebra.org) - Interactive mathematics
- [Khan Academy](https://www.khanacademy.org) - Educational exercises

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Contact & Support

For questions about this demonstration project, please open an issue in the repository.

---

**Project Status**: Phase 2 - Building Activities (2/10 complete ✅✅) 20% Done
**Last Updated**: 2025-11-05
**Version**: 2.2 (Standalone Edition - Chemistry + Physics Complete!)
**Approach**: Pure HTML/CSS/JavaScript - No H5P platform required

# Interactive Video Player - Projectile Motion

A standalone HTML5 video player with interactive question overlays for learning physics concepts through video.

## Quick Start

**Just open `index.html` in any modern web browser!**

```bash
# Option 1: Double-click the file
# Option 2: From command line
open index.html  # Mac
xdg-open index.html  # Linux
start index.html  # Windows

# Option 3: Use a local server
python -m http.server 8000
# Then open http://localhost:8000
```

No installation, no platform, no dependencies required!

---

## Overview

**Subject**: Physics - Classical Mechanics
**Topic**: Projectile Motion
**Type**: Interactive Video with Embedded Questions
**Duration**: Variable (depends on video length)
**Target Audience**: Ages 16-18, Undergraduate Physics Students

### Learning Objectives

Students will be able to:
1. **Understand Projectile Components** - Horizontal and vertical motion
2. **Analyze Horizontal Motion** - Constant velocity (no air resistance)
3. **Analyze Vertical Motion** - Constant acceleration due to gravity
4. **Apply Kinematic Equations** - Calculate trajectory, range, and time of flight
5. **Optimize Launch Angle** - Determine maximum range conditions

---

## Features

### Custom HTML5 Video Player
- **Full custom controls** - Play/pause, seek, volume, fullscreen
- **Progress bar** with clickable timeline
- **Question checkpoints** - Visual markers showing where questions appear
- **Keyboard shortcuts** for easy control
- **Responsive design** - Works on all screen sizes

### Interactive Question Overlays
- **Timed questions** - Video pauses at key moments
- **Multiple choice format** - 4 options per question
- **Immediate feedback** - Explanations for correct/incorrect answers
- **Visual feedback** - Green for correct, red for incorrect
- **Smooth animations** - Fade in/out, slide effects

### 4 Embedded Questions
1. **Components of Motion** (5 seconds) - Horizontal vs vertical
2. **Horizontal Velocity** (15 seconds) - Constant velocity concept
3. **Minimum Velocity Point** (25 seconds) - At highest point
4. **Optimal Launch Angle** (35 seconds) - 45° for maximum range

### Progress Tracking
- **Completion percentage** - Track video progress
- **Questions answered** - Count of answered vs total questions
- **Score display** - Percentage of correct answers
- **Progress persistence** - Saves to localStorage (24 hours)

### Accessibility
- Keyboard navigation support
- ARIA labels for controls
- High contrast feedback
- Semantic HTML structure
- Screen reader friendly

---

## How It Works

### Student Experience

1. **Watch Video** - Video plays normally
2. **Question Appears** - Video pauses at specific timestamp
3. **Answer Question** - Select from multiple choice options
4. **Get Feedback** - Immediate explanation of answer
5. **Continue** - Click button to resume video
6. **Complete** - Finish video and see final score

### Educator Experience

**Easy Customization** - All questions in one array:

```javascript
const QUESTIONS = [
    {
        time: 5,  // When to pause (seconds)
        title: "Question 1",
        question: "Your question text here?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctIndex: 0,  // Index of correct answer
        feedback: {
            correct: "Explanation for correct answer",
            incorrect: "Hint for wrong answer"
        }
    },
    // Add more questions...
];
```

---

## Technical Specifications

### Technology Stack

- **HTML5**: Video element, semantic markup
- **CSS3**: Flexbox/Grid, animations, gradients
- **JavaScript (ES6)**: Video API, event handling, state management
- **Storage**: localStorage for progress saving

### File Structure

```
02_projectile_motion_video/
├── index.html          # Main page with video player
├── css/
│   └── style.css       # All styles for player and overlays
├── js/
│   └── activity.js     # Video controls, questions, tracking
├── assets/
│   └── videos/
│       └── projectile_motion.mp4  # Your video goes here
└── README.md           # This file
```

### Browser Compatibility

**Tested and working on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Requirements:**
- JavaScript enabled
- HTML5 video support
- Modern browser

### Performance

- **Load time**: Depends on video size
- **Code size**: ~12KB (HTML+CSS+JS)
- **Video**: Hosted locally or via URL
- **No external API calls**

---

## Customization Guide

### 1. Replace the Video

**Option A: Local video file**
```html
<!-- In index.html, update the source -->
<source src="assets/videos/your_video.mp4" type="video/mp4">
```

Place your video in `assets/videos/` folder.

**Option B: External URL**
```html
<source src="https://example.com/your_video.mp4" type="video/mp4">
```

**Supported formats**: MP4, WebM, Ogg

### 2. Modify Questions

Edit `js/activity.js` around line 8:

```javascript
const QUESTIONS = [
    {
        time: 10,  // Change timestamp
        title: "Your Question Title",
        question: "Your question text?",
        options: [
            "First option",
            "Second option",
            "Third option",
            "Fourth option"
        ],
        correctIndex: 1,  // 0-based index (this would be "Second option")
        feedback: {
            correct: "Great! Explanation of why this is correct.",
            incorrect: "Not quite. Hint about what to consider."
        }
    }
];
```

**Tips:**
- Use `time` values that align with your video content
- Keep questions focused on one concept
- Provide helpful feedback for wrong answers
- Aim for 3-5 questions per 5-minute video

### 3. Change Colors/Styling

Edit `css/style.css`:

```css
/* Main gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### 4. Adjust Difficulty

**Easier**:
- Fewer options (3 instead of 4)
- More obvious distractors
- Longer feedback explanations

**Harder**:
- More similar options
- Questions requiring calculations
- No feedback until end

---

## Keyboard Shortcuts

For better user experience, these shortcuts work:

| Key | Action |
|-----|--------|
| Space / K | Play/Pause |
| F | Fullscreen |
| M | Mute/Unmute |
| ← | Rewind 5 seconds |
| → | Forward 5 seconds |
| ↑ | Volume up |
| ↓ | Volume down |

---

## Educational Standards

### Alignment

**Next Generation Science Standards (NGSS)**:
- HS-PS2-1: Analyze data to support the claim that Newton's second law of motion describes the mathematical relationship among the net force on a macroscopic object, its mass, and its acceleration.

**Common Core Mathematics**:
- HSF-IF.C.7: Graph functions expressed symbolically and show key features of the graph

### Assessment Rubric

| Score | Level | Description |
|-------|-------|-------------|
| 100% | Mastery | Perfect understanding of all concepts |
| 75-99% | Proficient | Strong grasp with minor gaps |
| 50-74% | Developing | Basic understanding, needs review |
| 0-49% | Beginning | Requires substantial review |

### Key Physics Concepts Covered

1. **Two-dimensional motion** - Independent horizontal and vertical components
2. **Constant horizontal velocity** - No horizontal forces (ideal conditions)
3. **Constant vertical acceleration** - Gravity affects vertical motion only
4. **Parabolic trajectory** - Shape of projectile path
5. **Optimal angle** - 45° for maximum range (vacuum)

---

## Common Student Misconceptions

This activity addresses:

1. **Horizontal velocity changes** - Students often think it decreases
2. **Forces on projectile** - Only gravity acts (no forward force after launch)
3. **Velocity at peak** - Not zero! Horizontal component remains
4. **Time up vs down** - Equal if launched and landed at same height
5. **Launch angle** - Many think steeper is always better

---

## Extending the Activity

### Ideas for Enhancement

**Add More Questions**:
- Questions about specific calculations
- Visual identification (pause and identify vectors)
- Comparison questions (which trajectory goes farther?)

**Multiple Videos**:
- Different launch angles
- Different scenarios (cliff, ground level)
- Real-world applications (sports, projectiles)

**Interactive Annotations**:
- Draw vectors on video using Canvas
- Highlight trajectory path
- Show velocity components

**Gamification**:
- Timer for answering questions
- Bonus points for speed
- Leaderboard (requires backend)

---

## Video Content Suggestions

Since this is a standalone player, you'll need to provide your own video. Here are suggestions:

### Option 1: Create Your Own
- Screen record a PhET simulation
- Film demonstrations (ball toss, water fountain)
- Use animation software (PowerPoint, After Effects)

### Option 2: Public Domain Videos
- Archive.org physics demonstrations
- Creative Commons licensed content
- Educational institution open resources

### Option 3: Link to Existing
- NASA footage (public domain)
- Physics classroom demonstrations
- Sports footage showing parabolic motion

**Recommended length**: 3-5 minutes (optimal for attention span)
**Recommended format**: MP4 H.264, 720p or 1080p

---

## Troubleshooting

### Video Won't Play

**Issue**: Black screen or error message
**Solutions**:
- Check video file format (MP4 recommended)
- Ensure video path is correct
- Try the fallback URL in the HTML
- Check browser console for errors

### Questions Don't Appear

**Issue**: Video plays but no questions show
**Solutions**:
- Check question timestamps in `activity.js`
- Ensure video duration > question times
- Open browser console to check for errors
- Try `window.debugVideoState()` in console

### Controls Not Working

**Issue**: Buttons don't respond
**Solutions**:
- Ensure JavaScript is enabled
- Check browser console for errors
- Try different browser
- Clear browser cache

### Progress Not Saving

**Issue**: Scores reset on refresh
**Solutions**:
- Check if localStorage is enabled
- Try window without privacy/incognito mode
- Progress expires after 24 hours (by design)

---

## Advanced Features

### Adding Canvas Annotations

You can add drawing capabilities:

```javascript
// Add canvas overlay
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// Draw trajectory, vectors, etc.
```

### Implementing Speed Control

Add playback speed:

```javascript
video.playbackRate = 0.5;  // Half speed
video.playbackRate = 1.5;  // 1.5x speed
video.playbackRate = 2.0;  // Double speed
```

### Adding Captions/Subtitles

```html
<track kind="captions" src="captions.vtt" srclang="en" label="English">
```

---

## Development Notes

### Code Structure

**HTML** (`index.html`):
- Video player wrapper
- Control button structure
- Overlay for questions
- Educational content sections

**CSS** (`css/style.css`):
- Custom video controls styling
- Overlay animations
- Responsive breakpoints
- Print-friendly styles

**JavaScript** (`js/activity.js`):
- Video event handling
- Question timing logic
- Answer validation
- Progress tracking
- Keyboard shortcuts

### State Management

All state tracked in object:
```javascript
let state = {
    currentQuestionIndex: null,
    askedQuestions: new Set(),
    correctAnswers: 0,
    totalQuestions: QUESTIONS.length,
    score: 0,
    videoCompleted: false
};
```

### Event Flow

1. Video loads → Setup controls
2. Video plays → Monitor time
3. Time matches question → Pause & show overlay
4. User answers → Validate & give feedback
5. Continue clicked → Hide overlay & resume
6. Video ends → Show completion summary

---

## License

**Content**: Educational content freely available
**Code**: MIT License - modify and redistribute freely
**Video**: Depends on your source (provide appropriate licenses)

---

## Credits

**Concept**: Interactive video learning pattern
**Physics**: Standard projectile motion principles
**Design**: Educational best practices for video learning

---

## Support

**Questions?** Check the main repository README
**Bugs?** Open an issue on GitHub
**Video issues?** Verify format compatibility

---

## Version History

- **v1.0** (2025-11-05): Initial standalone release
  - Custom HTML5 video player
  - 4 embedded questions
  - Progress tracking
  - Keyboard shortcuts
  - Full documentation

---

**Status**: ✅ Production Ready
**Type**: Standalone HTML5 Video Activity
**Dependencies**: None (video file user-provided)
**Size**: ~12KB (excluding video)
**Last Updated**: 2025-11-05

# Electron Configuration - Drag and Drop Activity

## Overview

An interactive H5P drag-and-drop activity that teaches students how to build electron configurations using orbital diagrams. Students drag electrons into the correct orbitals while following the Aufbau principle, Hund's rule, and Pauli exclusion principle.

**Subject**: Chemistry
**Topic**: Atomic Structure & Electron Configuration
**Content Type**: H5P Drag Question
**Difficulty Level**: Intermediate
**Estimated Completion Time**: 5-10 minutes
**Target Audience**: Ages 16-18, Undergraduate Chemistry

---

## Learning Objectives

By completing this activity, students will be able to:

1. **Apply the Aufbau Principle**: Fill orbitals from lowest to highest energy (1s → 2s → 2p)
2. **Apply Hund's Rule**: Place one electron in each orbital of a subshell before pairing
3. **Apply Pauli Exclusion Principle**: Recognize that orbitals hold maximum 2 electrons with opposite spins
4. **Build Electron Configurations**: Correctly construct the electron configuration for Oxygen (O)
5. **Use Orbital Notation**: Represent electrons using spin notation (↑↓)

---

## Formative Assessment Features

### Immediate Feedback
- Students receive instant feedback when they check their answers
- Each drop zone includes helpful hints accessible on demand
- Wrong answers are highlighted, allowing students to identify errors

### Scaffolding & Support
- Hints available for each orbital explaining the correct approach
- "Show Solution" button allows self-checking
- Clear visual organization with color-coded energy levels

### Retry Mechanism
- Students can retry the activity unlimited times
- Encourages mastery learning through practice
- Progress tracking shows completion status

### Differentiated Feedback
The activity provides feedback based on performance:
- **0-49%**: Needs more practice - review fundamental principles
- **50-74%**: Good effort - check orbital filling order and spin pairing
- **75-99%**: Very good - minor errors remain
- **100%**: Perfect understanding demonstrated

---

## Activity Structure

### Element Featured
**Oxygen (O)** - Atomic Number 8
- 8 total electrons to place
- Configuration: 1s² 2s² 2p⁴
- Demonstrates all three key principles

### Draggable Elements
Students have 8 electrons to drag:
- 4 spin-up electrons (↑)
- 4 spin-down electrons (↓)

### Drop Zones
8 orbital positions organized by energy level:
1. **1s orbital** (2 positions): Lowest energy, fills first
2. **2s orbital** (2 positions): Second energy level
3. **2p orbitals** (4 positions): Three orbitals (2px, 2py, 2pz), one pair

---

## Key Chemistry Concepts

### Aufbau Principle
Electrons fill orbitals starting from the lowest energy level and moving to higher levels:
```
1s → 2s → 2p → 3s → 3p → 4s → 3d → ...
```

### Hund's Rule
When filling orbitals of equal energy (like the three 2p orbitals), place one electron in each orbital before pairing them up. This minimizes electron-electron repulsion.

**Example**: For oxygen's 4 electrons in 2p:
- ✓ Correct: 2px(↑) 2py(↑) 2pz(↑) 2px(↓)
- ✗ Incorrect: 2px(↑↓) 2py(↑) 2pz(↑)

### Pauli Exclusion Principle
Each orbital can hold a maximum of 2 electrons, and they must have opposite spins (one ↑, one ↓).

---

## Expected Student Performance

### Success Criteria
- All 8 electrons placed in correct orbitals
- Spin directions follow Pauli exclusion principle
- 2p electrons demonstrate Hund's rule (parallel spins before pairing)
- Completion score of 100%

### Common Misconceptions to Address
1. **Pairing too early**: Students may pair electrons in 2p orbitals before filling each orbital once (violates Hund's rule)
2. **Wrong energy order**: Placing electrons in 2p before filling 2s completely (violates Aufbau)
3. **Incorrect spin pairing**: Putting two spin-up or two spin-down in the same orbital (violates Pauli)

---

## How to Use This Activity

### For Educators

#### Installation Options

**Option 1: Using H5P.org Cloud**
1. Go to H5P.org and create a free account
2. Click "Create New Content"
3. Choose "Upload" and select the `.h5p` file (see packaging instructions below)
4. Preview and publish
5. Embed in your website or LMS

**Option 2: Using Lumi Desktop Editor**
1. Download and install [Lumi](https://lumi.education/download)
2. Open Lumi and click "New H5P"
3. Choose "Import" and select the content folder
4. Edit as needed
5. Export as `.h5p` file
6. Upload to your LMS (Moodle, Canvas, Blackboard, etc.)

**Option 3: WordPress/Moodle/Drupal Plugin**
1. Install the H5P plugin on your platform
2. Go to H5P Content → Add New
3. Choose "Upload" and select the `.h5p` file
4. Publish in your course

#### Packaging the Activity
To create an `.h5p` file from this folder:

```bash
cd activities/01_chemistry_electron_config
zip -r electron-configuration.h5p h5p.json content/
```

Then upload `electron-configuration.h5p` to your H5P platform.

### For Students

#### Instructions
1. **Read the task description** at the top explaining the three principles
2. **Drag electrons** from the "Electron Bank" on the left
3. **Drop them** into the appropriate orbital boxes
4. **Use hints** (click the lightbulb icon on drop zones) if you need help
5. **Click "Check"** to see if your configuration is correct
6. **Review feedback** - incorrect placements will be highlighted
7. **Click "Retry"** to try again, or "Show Solution" to see the correct answer
8. **Aim for 100%** by correctly placing all 8 electrons

#### Tips for Success
- Start with the lowest energy level (1s)
- Fill each orbital completely before moving to the next
- For 2p orbitals, place one electron in each before pairing
- Pay attention to spin directions (↑↓)

---

## Extending the Activity

### Variations for Different Elements

This activity can be adapted for other elements:

**Easier** (fewer electrons):
- Hydrogen (H): 1 electron - 1s¹
- Helium (He): 2 electrons - 1s²
- Lithium (Li): 3 electrons - 1s² 2s¹
- Carbon (C): 6 electrons - 1s² 2s² 2p²
- Nitrogen (N): 7 electrons - 1s² 2s² 2p³

**More Challenging** (more orbitals):
- Neon (Ne): 10 electrons - 1s² 2s² 2p⁶
- Sodium (Na): 11 electrons - add 3s orbital
- Argon (Ar): 18 electrons - add 3s and 3p orbitals
- Transition metals: add 3d orbitals

### Additional Practice Ideas
1. **Series of elements**: Create multiple activities for the first 20 elements
2. **Ion configurations**: Show how losing/gaining electrons affects configuration
3. **Excited states**: Compare ground state vs. excited state configurations
4. **Shorthand notation**: Convert orbital diagrams to electron configuration notation (1s²2s²2p⁴)

---

## Assessment Rubrics

### Scoring Guide

| Score | Performance Level | Description |
|-------|------------------|-------------|
| 100% | Mastery | Perfect application of all three principles |
| 75-99% | Proficient | Minor errors; understands concepts with small mistakes |
| 50-74% | Developing | Understands some principles but has significant gaps |
| 0-49% | Beginning | Needs substantial review of fundamental concepts |

### What Teachers Can Track

Using H5P analytics (when integrated with an LMS or LRS):
- Completion rate
- Score distribution across students
- Time spent on activity
- Number of attempts before success
- Common drop zones with errors (identifies misconceptions)
- Retry patterns

---

## Technical Specifications

- **H5P Content Type**: DragQuestion v1.14
- **Compatible With**: H5P plugin for WordPress, Moodle, Drupal; H5P.org; Lumi Editor
- **File Size**: ~15KB (including SVG image)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Friendly**: Yes (responsive design)
- **Accessibility**: Keyboard navigation supported, screen reader compatible
- **xAPI Tracking**: Enabled (reports scores and interactions to LRS)

---

## Standards Alignment

### Next Generation Science Standards (NGSS)
- **HS-PS1-1**: Use the periodic table as a model to predict the relative properties of elements

### Common Core (for mathematical patterns)
- **CCSS.MATH.PRACTICE.MP7**: Look for and make use of structure

---

## License

**Content License**: CC BY-SA 4.0
**H5P Framework**: MIT License

Feel free to modify, remix, and redistribute this activity under the Creative Commons Attribution-ShareAlike 4.0 license.

---

## Troubleshooting

### Common Issues

**Problem**: Draggable items won't move
- **Solution**: Ensure JavaScript is enabled in browser

**Problem**: Activity doesn't load
- **Solution**: Check that all files are in correct folders (content/content.json, content/images/orbital-diagram.svg)

**Problem**: Wrong feedback appearing
- **Solution**: Verify drop zone IDs match element dropZones arrays in content.json

**Problem**: Can't create .h5p file
- **Solution**: Ensure you're zipping from within the activity folder, including h5p.json and content/ folder

---

## Version History

- **v1.0** (2025-11-05): Initial release
  - Oxygen electron configuration
  - 8 draggable electrons
  - 8 drop zones (1s, 2s, 2p orbitals)
  - Comprehensive feedback system

---

## Contact & Feedback

For questions, suggestions, or to report issues with this activity, please open an issue in the repository.

**Activity Type**: Drag and Drop
**Estimated Development Time**: 2-3 hours
**Last Updated**: 2025-11-05

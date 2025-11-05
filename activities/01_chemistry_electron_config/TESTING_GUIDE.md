# Testing Guide: Electron Configuration Activity

## Quick Start Testing

This guide will help you test the Electron Configuration drag-and-drop activity to ensure it works correctly.

---

## Pre-Testing Checklist

Before uploading to any platform, verify these files exist:

```
01_chemistry_electron_config/
├── h5p.json ✓
├── README.md ✓
├── TESTING_GUIDE.md ✓ (this file)
└── content/
    ├── content.json ✓
    └── images/
        └── orbital-diagram.svg ✓
```

Also verify the packaged file exists:
```
/home/user/h5p_experiments/electron-configuration.h5p ✓
```

---

## Testing Method 1: Lumi Desktop Editor (Recommended)

### Setup
1. Download and install [Lumi](https://lumi.education/download) if not already installed
2. Launch Lumi

### Test Steps

1. **Open the Activity**
   ```
   File → Open → Select electron-configuration.h5p
   ```

2. **Visual Inspection**
   - ✓ Title displays: "Electron Configuration - Drag and Drop"
   - ✓ Task description is visible and readable
   - ✓ Background orbital diagram loads correctly
   - ✓ 8 draggable electrons visible in "Electron Bank"
   - ✓ 8 drop zones visible with labels (1s↑, 1s↓, 2s↑, 2s↓, 2p zones)

3. **Interaction Test: Correct Solution**

   Drag electrons in this order (correct configuration):
   - Drag ↑ electron to "1s ↑" → should accept
   - Drag ↓ electron to "1s ↓" → should accept
   - Drag ↑ electron to "2s ↑" → should accept
   - Drag ↓ electron to "2s ↓" → should accept
   - Drag ↑ electron to first "2p ↑" → should accept
   - Drag ↑ electron to second "2p ↑" → should accept
   - Drag ↑ electron to third "2p ↑" → should accept
   - Drag ↓ electron to "2p ↓" (pairs with first 2p) → should accept

4. **Click "Check" Button**
   - ✓ Score shows 8/8 (100%)
   - ✓ Feedback displays: "Perfect! You correctly applied the Aufbau principle..."
   - ✓ All drop zones show green/correct indicators

5. **Test Retry Button**
   - Click "Retry"
   - ✓ All electrons return to starting positions
   - ✓ Drop zones reset
   - ✓ Can drag again

6. **Interaction Test: Incorrect Solution**

   Create an intentionally wrong configuration:
   - Place electrons in 2p before filling 2s (violates Aufbau)
   - Click "Check"
   - ✓ Score shows < 100%
   - ✓ Incorrect drop zones highlighted in red
   - ✓ Appropriate feedback message displays

7. **Test Show Solution Button**
   - Click "Show Solution"
   - ✓ Correct electron placements shown
   - ✓ Can compare with student's attempt

8. **Test Hints**
   - Hover over or click drop zones
   - ✓ Hint tooltips appear with guidance
   - ✓ Hints are contextually relevant

---

## Testing Method 2: H5P.org Cloud

### Setup
1. Go to [H5P.org](https://h5p.org) and log in
2. Navigate to "My Account" → "Content"

### Test Steps

1. **Upload Activity**
   - Click "New Content"
   - Select "Upload"
   - Choose `electron-configuration.h5p`
   - Wait for upload to complete

2. **Preview**
   - Click "Edit" then "Preview"
   - Perform all interaction tests from Method 1
   - Test on different browsers (Chrome, Firefox, Safari)

3. **Mobile Testing**
   - Access preview link on mobile device
   - ✓ Activity scales appropriately
   - ✓ Drag and drop works with touch
   - ✓ Text is readable on small screens

---

## Testing Method 3: WordPress (if available)

### Setup
1. WordPress site with H5P plugin installed
2. Upload the .h5p file via H5P → Add New

### Test Steps

1. **Upload and Embed**
   - H5P → Add New
   - Upload `electron-configuration.h5p`
   - Create test page/post
   - Add H5P shortcode: `[h5p id="X"]`
   - Preview page

2. **Test Embedding**
   - ✓ Activity loads within page
   - ✓ No layout issues with theme
   - ✓ All functionality works as expected

---

## Expected Behavior

### Correct Solution
For Oxygen (O) with 8 electrons, the correct configuration is:

```
1s: ↑↓  (2 electrons)
2s: ↑↓  (2 electrons)
2p: ↑ ↑ ↑ ↓  (4 electrons - note parallel spins before pairing)
```

**Expected Score**: 8/8 (100%)

**Expected Feedback**:
> "Perfect! You correctly applied the Aufbau principle, Hund's rule, and Pauli exclusion principle. Oxygen's electron configuration is 1s² 2s² 2p⁴."

### Common Incorrect Solutions to Test

#### Test Case 1: Violating Hund's Rule
**Configuration**:
```
1s: ↑↓
2s: ↑↓
2p: ↑↓ ↑ ↑  (pairing before filling all orbitals)
```
**Expected Score**: 6/8 (75%)
**Expected Feedback**: "Very good! You've mostly mastered electron configuration. Double-check any remaining errors."

#### Test Case 2: Violating Aufbau Principle
**Configuration**:
```
1s: ↑↓
2s: ↑
2p: ↑↓ ↑ ↑ ↑  (filling 2p before 2s is complete)
```
**Expected Score**: < 7/8
**Expected Feedback**: "Good effort! You understand some principles, but check the order of orbital filling..."

#### Test Case 3: Wrong Spin Pairing
**Configuration**:
```
1s: ↑↑  (both spin up - violates Pauli)
...
```
**Expected Score**: < 7/8
**Should not**: Accept two same-spin electrons in one orbital

---

## Accessibility Testing

### Keyboard Navigation
Test using keyboard only (no mouse):

1. **Tab Navigation**
   - Press Tab repeatedly
   - ✓ Focus moves logically through elements
   - ✓ Draggable items and drop zones are reachable

2. **Keyboard Dragging**
   - Tab to draggable electron
   - Press Enter/Space to pick up
   - Tab to drop zone
   - Press Enter/Space to drop
   - ✓ This should work for all elements

3. **Button Access**
   - ✓ "Check" button accessible via Tab
   - ✓ "Retry" button accessible via Tab
   - ✓ "Show Solution" accessible via Tab

### Screen Reader Testing

**Windows (NVDA)**:
1. Open activity with NVDA running
2. Navigate through content
3. ✓ All text is announced
4. ✓ Drop zone labels are read
5. ✓ Feedback is announced

**Mac (VoiceOver)**:
1. Open activity with VoiceOver (Cmd+F5)
2. Navigate with VO keys
3. ✓ Same checks as NVDA

### Visual Checks
- ✓ Text contrast meets WCAG AA standards
- ✓ Color is not the only indicator (shapes/text also used)
- ✓ Text is resizable without breaking layout

---

## Performance Testing

### Load Time
- ✓ Activity loads in < 3 seconds on average connection
- ✓ SVG image renders immediately
- ✓ No visible lag when dragging

### Browser Compatibility

Test in all supported browsers:

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 90+ | ☐ Pass / ☐ Fail | |
| Firefox | 88+ | ☐ Pass / ☐ Fail | |
| Safari | 14+ | ☐ Pass / ☐ Fail | |
| Edge | 90+ | ☐ Pass / ☐ Fail | |

### Device Testing

| Device Type | Status | Notes |
|-------------|--------|-------|
| Desktop (1920x1080) | ☐ Pass / ☐ Fail | |
| Laptop (1366x768) | ☐ Pass / ☐ Fail | |
| Tablet (iPad) | ☐ Pass / ☐ Fail | |
| Phone (iPhone) | ☐ Pass / ☐ Fail | |
| Phone (Android) | ☐ Pass / ☐ Fail | |

---

## Data Validation

### JSON Structure
Validate the content files:

```bash
# Check h5p.json is valid JSON
cat h5p.json | python -m json.tool

# Check content.json is valid JSON
cat content/content.json | python -m json.tool
```

Both should parse without errors.

### File Integrity
Verify .h5p package:

```bash
# Unzip and inspect
unzip -l electron-configuration.h5p

# Should show:
# h5p.json
# content/content.json
# content/images/orbital-diagram.svg
```

---

## Troubleshooting Common Issues

### Issue: Electrons won't drag
**Possible causes**:
- JavaScript disabled
- Browser incompatibility
- Touch events not working (mobile)

**Solutions**:
- Enable JavaScript
- Try different browser
- Test with mouse instead of touch

### Issue: Background image doesn't appear
**Possible causes**:
- SVG file missing
- Path incorrect in content.json
- Browser SVG support issue

**Solutions**:
- Verify file exists: `content/images/orbital-diagram.svg`
- Check path in content.json matches file location
- Try different browser

### Issue: Feedback doesn't show
**Possible causes**:
- JSON syntax error in overallFeedback
- Button click not registered

**Solutions**:
- Validate JSON syntax
- Clear browser cache
- Check browser console for errors

### Issue: Wrong score calculated
**Possible causes**:
- Drop zone correctElements doesn't match
- Element dropZones array incorrect

**Solutions**:
- Review content.json element/dropZone mappings
- Ensure IDs are consistent

---

## Automated Testing (Advanced)

### Using Playwright/Puppeteer

Example test script:

```javascript
// test-electron-config.js
const { test, expect } = require('@playwright/test');

test('Electron Configuration Activity', async ({ page }) => {
  await page.goto('http://your-test-url.com');

  // Wait for H5P to load
  await page.waitForSelector('.h5p-drag-question');

  // Test dragging
  await page.dragAndDrop('.draggable-1', '.dropzone-1');

  // Click check
  await page.click('.h5p-question-check-answer');

  // Verify score
  const score = await page.textContent('.h5p-question-score');
  expect(score).toContain('8/8');
});
```

---

## Test Completion Checklist

Before declaring activity ready for production:

### Functional Tests
- [ ] All 8 electrons can be dragged
- [ ] All 8 drop zones accept correct electrons
- [ ] "Check" button works and shows accurate score
- [ ] "Retry" button resets the activity
- [ ] "Show Solution" displays correct configuration
- [ ] Hints appear when requested
- [ ] Feedback messages display correctly based on score

### Content Tests
- [ ] Task description is clear and accurate
- [ ] All chemistry principles are correctly represented
- [ ] Feedback text is educational and helpful
- [ ] Orbital labels are correct (1s, 2s, 2p)
- [ ] SVG diagram is professional and clear

### Technical Tests
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive design works
- [ ] Keyboard navigation functional
- [ ] Screen reader compatible
- [ ] No console errors
- [ ] Loads in < 3 seconds

### Accessibility Tests
- [ ] WCAG AA compliant color contrast
- [ ] All images have appropriate alt text (if applicable)
- [ ] Keyboard-only navigation works
- [ ] Screen reader announces all content
- [ ] Focus indicators visible

### Cross-Platform Tests
- [ ] H5P.org upload successful
- [ ] Lumi preview works
- [ ] WordPress embed works (if applicable)
- [ ] Moodle integration works (if applicable)

---

## Reporting Issues

If you encounter any issues during testing:

1. **Document the issue**:
   - What happened?
   - What was expected?
   - Steps to reproduce
   - Browser/device details

2. **Check known issues** in repository

3. **Report** via GitHub issues with:
   - Title: "[Testing] Brief description"
   - Label: "bug" or "enhancement"
   - Full details from step 1

---

## Success Criteria

The activity is ready for production when:

✓ All functional tests pass
✓ All content is accurate and educational
✓ Works on all target platforms
✓ Meets accessibility standards
✓ No critical bugs reported
✓ Student testing shows high engagement and learning

---

## Next Steps After Testing

1. ✓ Fix any identified issues
2. ✓ Retest after fixes
3. ✓ Deploy to production environment
4. ✓ Monitor student usage and feedback
5. ✓ Iterate based on real-world performance

---

**Testing Version**: 1.0
**Last Updated**: 2025-11-05
**Activity**: Electron Configuration Drag and Drop

# Technical Setup Guide for H5P Activities

## Overview

This guide will help you set up and use the H5P learning activities in this repository. Choose the method that best fits your needs.

---

## Method 1: Using H5P.org Cloud Platform (Easiest)

### Requirements
- Free H5P.org account
- Modern web browser

### Steps

1. **Create an Account**
   - Go to [H5P.org](https://h5p.org)
   - Click "Get Started" and create a free account

2. **Upload Activity**
   - Navigate to "My Account" → "Content"
   - Click "New Content"
   - Choose "Upload"
   - Select the `.h5p` file from the `activities/` folder

3. **Preview & Publish**
   - Preview the activity
   - Click "Publish"
   - Copy the embed code or share link

4. **Embed in Your Site**
   - Use the iframe embed code
   - Or share the direct link with students

### Pros
- No installation required
- Cloud-based, accessible anywhere
- Automatic updates

### Cons
- Requires internet connection
- Limited to H5P.org platform features
- Data stored on H5P.org servers

---

## Method 2: Lumi Desktop Editor (Recommended for Developers)

### Requirements
- Lumi H5P Editor (free desktop application)
- Windows, macOS, or Linux

### Installation

1. **Download Lumi**
   - Go to [lumi.education/download](https://lumi.education/download)
   - Download for your operating system
   - Install following the installer prompts

2. **Import Activity**
   ```bash
   # Option A: Import existing .h5p file
   # Open Lumi → File → Open → Select .h5p file

   # Option B: Create from source
   # Open Lumi → File → Import → Select activity folder
   ```

3. **Edit and Customize**
   - Modify content as needed
   - Preview changes in real-time
   - Test all interactions

4. **Export**
   - File → Export → Save as `.h5p`
   - Or File → Export → Save as HTML (standalone)

### Pros
- Full control over content
- Works offline
- Can create standalone HTML files
- Free and open-source

### Cons
- Requires software installation
- Learning curve for advanced features

---

## Method 3: WordPress with H5P Plugin

### Requirements
- WordPress site (self-hosted or WordPress.com Business plan)
- Admin access

### Installation

1. **Install H5P Plugin**
   - In WordPress admin: Plugins → Add New
   - Search for "H5P"
   - Install and activate "H5P" plugin by H5P Group

2. **Install Content Types**
   - H5P → Content Types
   - Search for and install:
     - Drag and Drop
     - Interactive Video
     - Course Presentation
     - Question Set
     - (Any other content types you need)

3. **Upload Activity**
   - H5P → Add New
   - Click "Upload" tab
   - Select `.h5p` file
   - Click "Upload"

4. **Embed in Pages/Posts**
   - Edit any page or post
   - Add H5P block or use shortcode: `[h5p id="X"]`
   - Publish

### Pros
- Full integration with WordPress
- Works with existing WordPress content
- Can track student data with additional plugins

### Cons
- Requires WordPress site
- Plugin updates needed
- More complex setup

---

## Method 4: Moodle with H5P Plugin

### Requirements
- Moodle installation (version 3.9+)
- Teacher or admin access

### Installation

1. **Install H5P Plugin** (if not already installed)
   - Site administration → Plugins → Install plugins
   - Upload H5P plugin or install from Moodle plugins directory

2. **Enable H5P Activity Module**
   - Site administration → Plugins → Activity modules → H5P

3. **Add H5P Activity to Course**
   - Turn editing on in your course
   - Add an activity → H5P
   - Upload `.h5p` file or create new content
   - Configure settings (grading, completion tracking)
   - Save

4. **Configure Grading** (Optional)
   - Set maximum grade
   - Enable completion tracking
   - Set attempts allowed

### Pros
- Native LMS integration
- Gradebook integration
- Student tracking and analytics
- Conditional activities based on completion

### Cons
- Requires Moodle installation
- Need appropriate permissions

---

## Method 5: Canvas LMS

### Requirements
- Canvas course
- Instructor access

### Installation

1. **Install H5P from Canvas App Center** (if available)
   - Settings → Apps → View App Center
   - Search for "H5P"
   - Add to course

2. **Or Use External Tool**
   - Settings → Apps → Add New App
   - Configuration Type: By URL
   - Enter H5P configuration URL
   - Submit

3. **Add H5P Content**
   - Create assignment or page
   - Add External Tool
   - Select H5P
   - Upload `.h5p` file
   - Publish

### Pros
- LMS integration
- Gradebook sync
- Student analytics

### Cons
- May require LTI configuration
- Institution-specific setup

---

## Creating .h5p Package Files

If you have the source files (like in this repository), you need to package them into `.h5p` files.

### Using Command Line (Linux/Mac)

```bash
# Navigate to activity folder
cd activities/01_chemistry_electron_config

# Create .h5p file (it's just a renamed ZIP file)
zip -r ../../electron-configuration.h5p h5p.json content/

# The file electron-configuration.h5p is now ready to upload
```

### Using Command Line (Windows PowerShell)

```powershell
# Navigate to activity folder
cd activities\01_chemistry_electron_config

# Create .h5p file
Compress-Archive -Path h5p.json, content -DestinationPath ..\..\electron-configuration.h5p

# The file electron-configuration.h5p is now ready to upload
```

### Using Lumi

1. Open Lumi
2. File → New
3. File → Import → Select the activity folder
4. File → Export → Save as `.h5p`

### Manual Method (Any OS)

1. Navigate to the activity folder
2. Select `h5p.json` and `content/` folder
3. Create a ZIP archive containing these items
4. Rename the `.zip` file to `.h5p`

**Important**: The `.h5p` file structure should be:
```
electron-configuration.h5p (ZIP file)
├── h5p.json
└── content/
    ├── content.json
    └── images/
        └── orbital-diagram.svg
```

---

## Testing Your Activity

### Pre-Upload Checklist

Before uploading to any platform, verify:

- [ ] `h5p.json` exists and is valid JSON
- [ ] `content/content.json` exists and is valid JSON
- [ ] All referenced images/assets exist in `content/` folder
- [ ] Asset paths in content.json match actual file locations
- [ ] File is packaged as `.h5p` (renamed ZIP)

### Testing in Lumi

1. Open `.h5p` file in Lumi
2. Click "Preview"
3. Test all interactions:
   - Drag items to drop zones
   - Click "Check" button
   - Verify feedback appears
   - Try "Retry" button
   - Test "Show Solution" button

### Testing in H5P.org

1. Upload to H5P.org
2. Use preview mode
3. Test on different devices:
   - Desktop browser
   - Tablet
   - Mobile phone

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Invalid H5P file" | Wrong file structure | Verify h5p.json is at root level |
| Images don't load | Wrong path in content.json | Check paths match folder structure |
| Content doesn't display | Missing library dependency | Install required H5P content type |
| Drag and drop doesn't work | JavaScript errors | Check browser console, update browser |
| Mobile display issues | Not responsive | Test with mobile-friendly content types |

---

## Browser Compatibility

### Recommended Browsers

- **Chrome** 90+ ✓
- **Firefox** 88+ ✓
- **Safari** 14+ ✓
- **Edge** 90+ ✓

### Not Recommended

- Internet Explorer (any version) ✗
- Older browsers without HTML5 support ✗

---

## Accessibility Considerations

### Testing for Accessibility

1. **Keyboard Navigation**
   - Test all interactions using Tab, Enter, Space keys
   - Ensure logical tab order

2. **Screen Reader**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify all content is announced
   - Check image alt text

3. **Color Contrast**
   - Verify text has sufficient contrast (WCAG AA minimum)
   - Don't rely on color alone to convey information

4. **Captions**
   - Add captions to all videos
   - Provide transcripts for audio

---

## Learning Analytics (xAPI)

### Setting Up xAPI Tracking

H5P activities can report detailed interaction data using the Experience API (xAPI).

1. **Set up Learning Record Store (LRS)**
   - Options: Learning Locker, Watershed, SCORM Cloud
   - Get endpoint URL and credentials

2. **Configure H5P to Report**
   - In WordPress: H5P → Settings → xAPI
   - Enter LRS endpoint and credentials
   - Enable tracking

3. **Data Collected**
   - Activity started/completed
   - Scores achieved
   - Answers selected
   - Time spent
   - Retry attempts

### Sample xAPI Statements

```json
{
  "actor": {
    "name": "Student Name",
    "mbox": "mailto:student@example.com"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/answered"
  },
  "object": {
    "id": "http://example.com/activities/electron-config",
    "definition": {
      "name": "Electron Configuration Drag and Drop"
    }
  },
  "result": {
    "score": {
      "scaled": 0.875
    },
    "success": true,
    "completion": true
  }
}
```

---

## Troubleshooting

### Activity Won't Upload

1. Check file size (most platforms have limits)
2. Verify .h5p file structure is correct
3. Try uploading to H5P.org first to validate
4. Check server upload limits (php.ini for WordPress)

### Content Displays Incorrectly

1. Clear browser cache
2. Update H5P plugin to latest version
3. Install/update required content type libraries
4. Check browser console for JavaScript errors

### Students Can't Submit

1. Verify activity is published (not draft)
2. Check date/time restrictions
3. Verify student permissions
4. Test in incognito/private browsing mode

---

## Resources

### Official Documentation
- [H5P.org Documentation](https://h5p.org/documentation)
- [H5P Content Types](https://h5p.org/content-types-and-applications)
- [Lumi Documentation](https://lumi.education/docs)

### Community Support
- [H5P Forum](https://h5p.org/forum)
- [H5P Facebook Group](https://www.facebook.com/groups/h5p)

### Tutorials
- [H5P Video Tutorials](https://h5p.org/documentation/for-authors/tutorials)
- [Lumi Beginner Guide](https://lumi.education/guides)

---

## Next Steps

1. Choose your platform (H5P.org, Lumi, WordPress, Moodle, Canvas)
2. Follow the installation steps above
3. Package and upload the first activity
4. Test thoroughly
5. Share with students
6. Collect feedback and iterate

For specific activity documentation, see the README.md file in each activity folder.

---

**Last Updated**: 2025-11-05
**Version**: 1.0

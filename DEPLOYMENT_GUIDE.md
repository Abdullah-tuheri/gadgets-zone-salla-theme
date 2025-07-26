# Salla Theme Deployment Guide

This guide provides step-by-step instructions for deploying your Gadgets Zone theme to the Salla platform using the Salla Partners Portal and GitHub integration.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Salla Partner Account** - [Register here](https://partners.salla.sa/)
- ✅ **GitHub Account** - [Sign up here](https://github.com/)
- ✅ **Theme Files** - Complete Gadgets Zone theme package
- ✅ **Git Knowledge** - Basic understanding of Git commands

## 🚀 Step-by-Step Deployment Process

### Step 1: Prepare Your GitHub Repository

#### 1.1 Create a New Repository

1. **Login** to your GitHub account
2. **Click** the "+" icon in the top right corner
3. **Select** "New repository"
4. **Configure** your repository:
   - **Repository name**: `gadgets-zone-salla-theme` (or your preferred name)
   - **Description**: "Custom Salla theme for electronics and gadgets store"
   - **Visibility**: Public (recommended) or Private
   - **Initialize**: Don't initialize with README, .gitignore, or license
5. **Click** "Create repository"

#### 1.2 Upload Theme Files

**Option A: Using Git Command Line**

```bash
# Navigate to your theme directory
cd /path/to/gadgets-zone-theme

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Gadgets Zone Salla Theme"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/gadgets-zone-salla-theme.git

# Push to GitHub
git push -u origin main
```

**Option B: Using GitHub Web Interface**

1. **Navigate** to your empty repository on GitHub
2. **Click** "uploading an existing file"
3. **Drag and drop** all theme files or click "choose your files"
4. **Add** commit message: "Initial commit: Gadgets Zone Salla Theme"
5. **Click** "Commit changes"

### Step 2: Access Salla Partners Portal

#### 2.1 Login to Partners Portal

1. **Visit** [Salla Partners Portal](https://partners.salla.sa/)
2. **Login** with your Salla Partner credentials
3. **Navigate** to the dashboard

#### 2.2 Navigate to Themes Section

1. **Click** on "Themes" in the main navigation
2. **Select** "My Themes" or "Create New Theme"

### Step 3: Create New Theme in Salla

#### 3.1 Theme Basic Information

1. **Click** "Create New Theme" or "Add Theme"
2. **Fill** in the theme details:
   - **Theme Name**: "Gadgets Zone"
   - **Theme Description**: "Modern e-commerce theme for electronics and gadgets stores"
   - **Version**: "1.0.0"
   - **Author**: Your name or company
   - **Category**: "Electronics" or "General"
   - **Tags**: "electronics, gadgets, modern, responsive"

#### 3.2 Connect GitHub Repository

1. **Select** "GitHub" as the source
2. **Authorize** Salla to access your GitHub account (if first time)
3. **Choose** your repository: `gadgets-zone-salla-theme`
4. **Select** branch: `main` (or `master`)
5. **Verify** repository connection

### Step 4: Configure Theme Settings

#### 4.1 Theme Configuration

1. **Review** the `twilight.json` configuration file
2. **Verify** all required fields are present:
   - Theme name and description
   - Version information
   - Author details
   - Supported features
   - Required Salla version

#### 4.2 Theme Assets

1. **Ensure** all assets are properly organized:
   - Images in `src/assets/images/`
   - CSS files in `src/assets/styles/`
   - JavaScript files in `src/assets/js/`
   - Templates in `src/views/`

#### 4.3 Localization Files

1. **Verify** translation files exist:
   - `src/locales/en.json` (English)
   - `src/locales/ar.json` (Arabic)
2. **Check** all required translation keys are present

### Step 5: Deploy and Test

#### 5.1 Initial Deployment

1. **Click** "Deploy" or "Publish" in the Partners Portal
2. **Wait** for the deployment process to complete
3. **Check** for any deployment errors or warnings
4. **Review** deployment logs if available

#### 5.2 Preview Theme

1. **Access** the theme preview URL provided by Salla
2. **Test** all major functionality:
   - Homepage loading
   - Product pages
   - Cart functionality
   - Checkout process
   - User authentication
   - Mobile responsiveness

#### 5.3 Fix Issues (if any)

If you encounter issues:

1. **Review** error messages in the Partners Portal
2. **Fix** issues in your local files
3. **Commit** and push changes to GitHub:
   ```bash
   git add .
   git commit -m "Fix: [description of fix]"
   git push origin main
   ```
4. **Redeploy** through the Partners Portal

### Step 6: Submit for Review (if required)

#### 6.1 Review Process

Some themes may require Salla review before publication:

1. **Submit** theme for review in Partners Portal
2. **Wait** for Salla team review (typically 3-5 business days)
3. **Address** any feedback or required changes
4. **Resubmit** if necessary

#### 6.2 Review Checklist

Ensure your theme meets Salla requirements:

- [ ] All templates render correctly
- [ ] No broken links or missing assets
- [ ] Responsive design works on all devices
- [ ] All e-commerce functionality works
- [ ] Proper error handling implemented
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Security best practices followed

### Step 7: Publish Theme

#### 7.1 Final Publication

Once approved (if review was required):

1. **Click** "Publish" in the Partners Portal
2. **Set** theme visibility (Public/Private)
3. **Configure** pricing (if selling the theme)
4. **Add** theme screenshots and descriptions
5. **Publish** to Salla marketplace

#### 7.2 Theme Installation

Your theme is now available for installation:

1. **Store owners** can find it in Salla's theme marketplace
2. **They can preview** the theme before installation
3. **Installation** is handled automatically by Salla
4. **Customization** options are available through Salla's admin panel

## 🔄 Updating Your Theme

### Making Updates

When you need to update your theme:

1. **Make changes** to your local files
2. **Test changes** using the local test server
3. **Commit changes** to GitHub:
   ```bash
   git add .
   git commit -m "Update: [description of changes]"
   git push origin main
   ```
4. **Update version** in `twilight.json`
5. **Deploy update** through Partners Portal

### Version Management

Follow semantic versioning:
- **Major version** (1.0.0 → 2.0.0): Breaking changes
- **Minor version** (1.0.0 → 1.1.0): New features
- **Patch version** (1.0.0 → 1.0.1): Bug fixes

## 🛠️ Troubleshooting Common Issues

### Deployment Failures

**Issue**: Theme fails to deploy
**Solutions**:
- Check `twilight.json` syntax
- Verify all required files are present
- Ensure proper file structure
- Check for template syntax errors

**Issue**: Assets not loading
**Solutions**:
- Verify asset paths in templates
- Check file permissions
- Ensure assets are in correct directories
- Test asset URLs

### Template Errors

**Issue**: Templates not rendering
**Solutions**:
- Check Twig syntax
- Verify variable names match Salla's data structure
- Test with Salla's template validator
- Review Salla documentation for required variables

### Responsive Issues

**Issue**: Theme not responsive
**Solutions**:
- Test on multiple devices
- Check CSS media queries
- Verify viewport meta tag
- Use browser developer tools

## 📞 Getting Help

### Salla Support Channels

1. **Documentation**: [Salla Developer Docs](https://docs.salla.dev/)
2. **Support Portal**: [Salla Support](https://support.salla.sa/)
3. **Community Forum**: [Salla Community](https://community.salla.sa/)
4. **Discord**: Salla Developer Discord server
5. **Email**: partners@salla.sa

### Before Contacting Support

1. **Check** this deployment guide
2. **Review** Salla documentation
3. **Test** locally using the included test server
4. **Check** browser console for errors
5. **Verify** all files are properly uploaded to GitHub

## 📋 Deployment Checklist

Use this checklist to ensure successful deployment:

### Pre-Deployment
- [ ] All theme files are complete
- [ ] GitHub repository is set up correctly
- [ ] `twilight.json` is properly configured
- [ ] All assets are optimized
- [ ] Templates are tested locally
- [ ] Translations are complete
- [ ] Documentation is updated

### During Deployment
- [ ] Salla Partners Portal account is active
- [ ] GitHub repository is connected
- [ ] Theme information is filled correctly
- [ ] Deployment completes without errors
- [ ] Preview URL is accessible

### Post-Deployment
- [ ] All pages load correctly
- [ ] Functionality works as expected
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested
- [ ] Performance is acceptable
- [ ] SEO elements are working
- [ ] Theme is published successfully

## 🎉 Congratulations!

Once you've completed all steps, your Gadgets Zone theme will be live on the Salla platform and available for store owners to install and use. You've successfully created and deployed a professional e-commerce theme!

### Next Steps

1. **Monitor** theme performance and user feedback
2. **Provide** support to theme users
3. **Plan** future updates and improvements
4. **Consider** creating additional themes
5. **Engage** with the Salla developer community

---

**Need additional help?** Don't hesitate to reach out to the Salla support team or community for assistance with your theme deployment.


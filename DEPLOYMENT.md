# GitHub Pages Deployment Guide

## Quick Setup Steps

### 1. Update Repository Name
Replace `repository-name` in these files with your actual GitHub repository name:

**File: `.github/workflows/deploy.yml` (Line 29)**
```yaml
NODE_ENV=production vite build --base=/your-repo-name/
```

**File: `client/src/App.tsx` (Line 10)**
```javascript
const basePath = import.meta.env.VITE_BASE_PATH || (import.meta.env.PROD ? '/your-repo-name/' : '/');
```

### 2. Enable GitHub Pages
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Save settings

### 3. Deploy
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## Files Configured for GitHub Pages

✅ **GitHub Actions Workflow**: `.github/workflows/deploy.yml`
- Builds the static site with correct base path
- Deploys to GitHub Pages automatically

✅ **SPA Routing Support**: `client/public/404.html`
- Handles client-side routing for single-page apps
- Redirects all routes back to index.html

✅ **Index HTML**: `client/index.html`
- Includes SPA routing script
- Handles GitHub Pages redirects properly

✅ **Router Configuration**: `client/src/App.tsx`
- Wouter router configured with base path
- Supports both development and production environments

## Verification Checklist

- [ ] Replace `repository-name` with your actual repo name
- [ ] GitHub Pages is enabled in repository settings
- [ ] Source is set to "GitHub Actions"
- [ ] Files are committed and pushed to main branch
- [ ] GitHub Actions workflow runs successfully

## Expected URL Structure

- **Repository**: `https://github.com/username/your-repo-name`
- **Deployed App**: `https://username.github.io/your-repo-name/`

## Troubleshooting

**Build fails**: Check that all `repository-name` instances are replaced
**404 errors**: Verify the base path matches your repository name exactly
**Routing issues**: Ensure both bundler and router use the same base path
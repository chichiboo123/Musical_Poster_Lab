# 뮤지컬 포스터 실험실 (Musical Poster Studio)

A creative musical poster design studio inspired by The Little Prince, offering an intuitive workflow with drag-and-drop editing capabilities.

## Features

- **Bilingual Interface**: Korean and English support
- **Drag & Drop Editing**: Intuitive poster creation with moveable elements
- **Creative Tools**: Add text, emojis, and images
- **Export Options**: Download as PNG or PDF, or copy to clipboard
- **Responsive Design**: Works on desktop and mobile devices
- **Performance Info**: Add show details and cast information

## GitHub Pages Deployment

This application is configured for GitHub Pages deployment as a static single-page application.

### Quick Setup

1. **Fork or clone this repository**

2. **Update the repository name in configuration files:**
   - In `.github/workflows/deploy.yml`: Replace `repository-name` with your actual GitHub repository name
   - In `client/src/App.tsx`: Replace `repository-name` with your actual GitHub repository name

3. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

### Configuration Files

The following files are configured for GitHub Pages deployment:

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automated deployment
- **`client/public/404.html`**: Handles client-side routing for SPA
- **`client/index.html`**: Includes SPA routing script for GitHub Pages
- **`client/src/App.tsx`**: Router configured with base path support

### Important Notes

- Replace `repository-name` with your actual repository name in all configuration files
- The application will be available at `https://username.github.io/repository-name/`
- Both the build process and router use the same base path for consistency
- The base path must start and end with `/` (e.g., `/my-repo/`)

### Local Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
npm run build
```

This creates a production build in the `dist/public` directory.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Routing**: Wouter
- **State Management**: React Hooks
- **Export**: html2canvas, jsPDF
- **Fonts**: Google Fonts (Korean fonts included)

## License

MIT License - see LICENSE file for details.

---

© 2025 [교육뮤지컬 꿈꾸는 치수쌤](https://litt.ly/chichiboo). All rights reserved.
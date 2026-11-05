# Sachin Jayathilaka — Portfolio

A responsive personal portfolio for Sachin Jayathilaka, built with React, TypeScript, Vite, Tailwind CSS, Motion, and Lucide icons. The site is static and needs no backend or paid service.

## Requirements

- Node.js 22 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify the production build:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

`dist/` contains the deployable site.

## Edit the portfolio

- Update name, role, location, contact links, summary, skills, projects, education, achievement, languages, and public site URL in [`src/profile.json`](src/profile.json). Page metadata, structured data, robots.txt, and sitemap.xml are generated from this file.
- Edit page layout and section copy in [`src/App.tsx`](src/App.tsx), and visual styling in [`src/styles.css`](src/styles.css).
- After changing the name, initials, role, or location, regenerate the social image and favicon with `python scripts/generate-og.py` (requires Pillow), then commit the new assets in `public/`.
- The project illustrations are lightweight CSS and SVG visuals, not screenshots of the applications.

### Add a CV

Place an actual `resume.pdf` in `public/`, then set `resumeUrl` in `src/profile.json` to `"/resume.pdf"`. The Download CV button appears only when this value is set. Replace the PDF whenever your CV changes. No CV is included in this repository.

## GitHub Pages deployment

The site is configured for the root URL `https://IT25101969.github.io/` with Vite `base: '/'`. This URL requires a repository named exactly `IT25101969.github.io` under the `IT25101969` GitHub account.

1. Create the public repository `IT25101969.github.io` in that account. Avoid initializing it with unrelated files if you want to push this workspace directly.
2. Initialize Git in this folder, commit the files, add the repository as `origin`, and push to `main`:

   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Build portfolio site"
   git remote add origin https://github.com/IT25101969/IT25101969.github.io.git
   git push -u origin main
   ```

3. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
4. The workflow at `.github/workflows/deploy.yml` installs dependencies, type checks, lints, builds, and deploys `dist/`. Its status is visible in **Actions**. After successful deployment, verify `https://IT25101969.github.io/`.

If deploying from a different repository name, update `base` in `vite.config.ts` to `'/repository-name/'` and set `siteUrl` in `src/profile.json` to the final public URL. For that case, update root asset paths such as the favicon and resume link to use the repository base path.

## Content accuracy

The Fashion-MNIST project has no public repository link. The fitness and help desk links point to their public GitHub repositories. Project descriptions make no claims about performance metrics or deployment.

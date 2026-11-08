# getrigly.com

Rigly's website and documentation: a static site built from Markdown and published to GitHub Pages.

```
npm install
npm run build      # → dist/
npm run dev        # build, then serve dist/ at http://localhost:8080
```

- `content/docs/*.md`: the documentation. Each page starts with `title:` (and optionally `nav:`, a shorter
  sidebar label, and `description:`) in a front matter block. `{{download}}` becomes the download link.
- `build.mjs`: the `NAV` list at the top sets the sidebar groups and page order. Add new pages there.
- `src/index.html`: the home page. `src/layout.html`: the header and footer around every page.
- `public/`: copied as is (styles, brand images, `CNAME`).

Pushing to `main` deploys (`.github/workflows/deploy.yml`). The download link is
`https://github.com/Rigly-Dev/rigly-mac/releases/latest/download/Rigly.dmg`, which the Rigly-Apps
release workflow publishes with every release.

Keep the docs in step with the app: they describe commands, options, labels and defaults exactly.

# Future Systems Atlas

Edited static site files for the Future Systems Atlas portfolio project.

## What changed
- Strengthened the hero, thesis, and project framing around process architecture rather than a generic technology directory.
- Added a “How we realistically get there” pathways section.
- Preserved the full PFD library while making the default view compact and easier to scan.
- Added critical process parameters to technology cards, featured cases, and modals.
- Added stronger PFD visual language: material stream, QA gate, and recycle/data-feedback labels.
- Added a portfolio-style author note connecting the project to process engineering and deployment.
- Improved the compact index into a table-like scan view: technology, hidden process, key bottleneck, chemical spine, and action.

## Files
- `index.html` — page structure and project narrative
- `styles.css` — visual design, responsive layout, atlas cards, master stack, compact library, and interaction states
- `data.js` — preserved technology library, chemical spine, unit operations, bottlenecks, readiness data, and inferred critical parameters
- `app.js` — rendering, search, filters, cards, modals, pathways, and atlas interactions

## Run locally
Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

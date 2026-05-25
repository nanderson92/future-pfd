# Future Systems Atlas

Edited static site files for the Future Systems Atlas / futuristic PFD atlas project.

## Major implementation changes
- Reworked the typography stack around cross-platform open fonts: Space Grotesk for display, Inter for body, and JetBrains Mono for technical labels.
- Added a reusable PFD plate system with graph-paper texture, process-color top rails, step badges, connector arrows, and a process legend.
- Promoted the hero plate language into featured case teasers and modal detail views.
- Added stronger hover, focus-visible, active, and clickable-card states across buttons, chips, case links, atlas rows, and navigation controls.
- Added a floating section progress rail and a scroll-activated “Top” pill for the long one-page atlas.
- Reframed section labels as FSA sheet numbers to make the page feel like an engineering binder rather than repeated caption labels.
- Restyled the atlas navigation card as a dark directory with system, lens, and chemical entry points.
- Rebuilt the thesis transition block, guide cards, civilization stack rail, sector color system, chemical formula badges, foundational chemical ribbons, and unit-operation family taxonomy.
- Added zero-count visual states for unmapped unit operations and atlas filter chips.
- Rebuilt the readiness/bottleneck section with a 2D MRL/IRL readiness map, weighted bottleneck chip cloud, and top-bottleneck bar list.
- Grouped scale-up pathways into Foundational, Operational, and Systemic tiers.
- Simplified featured case cards into teasers and moved heavier details into the modal.
- Improved the modal: body scroll lock, focus trapping, overlay close, Escape close, PFD plate reuse, non-duplicative “why it feels futuristic” copy, and readable TRL/MRL/IRL bars with 9-tick scales.
- Improved the atlas controls with search icon, clear button, reset filters button, live result count, segmented view toggle, zero-count filter muting, row hover states, and sector-colored left rails.
- Rebuilt the author note and footer into a stronger signed binder-style close.

## Files
- `index.html` — page structure and static narrative content
- `styles.css` — full visual system, responsive layout, interaction states, atlas cards, PFD plates, modal, and footer
- `data.js` — technology library, sectors, chemicals, unit operations, bottlenecks, readiness data, and featured case IDs
- `app.js` — rendering, filtering/search, modal behavior, readiness map, PFD components, and interactions

## Run locally
Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

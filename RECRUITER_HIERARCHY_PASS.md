# Recruiter hierarchy pass

This pass implements the live-site feedback that the atlas had become strong but too dense and source-database-like for recruiters/startup founders.

## Implemented changes

- Rewrote the hero around the concrete artifact: 115 technology cards, 201 source records, 37 unit operations, 32 chemical/material nodes, 24 bottleneck classes, and 3 evidence postures.
- Replaced abstract CTAs with recruiter-facing CTAs: flagship case studies, atlas browsing, and evidence system.
- Moved featured case studies directly under the hero and reduced the initial experience to three flagship cards: Atmospheric Water Harvesting, Micromodular Printed Electronics, and Fusion Power Plants.
- Added a “What this demonstrates about me” section to translate the project into candidate signals: process thinking, techno-economic skepticism, manufacturability focus, and source discipline.
- Renamed “Complete PFD Library” to “Process Architecture Index.”
- Renamed the master “civilization stack” heading to “Deployment stack for future technologies.”
- Added a flying-car hidden-process example to make the thesis concrete.
- Renamed the reader protocol section to “How to read each technology card” and added an annotated reading system.
- Added a chemical dependency map connecting recurring materials to systems they constrain.
- Grouped unit operations into four failure-mode buckets: matter movement, energy movement, surface/interface control, and manufacturing proof.
- Added a plain-English TRL/MRL/IRL/economics explainer.
- Added example technologies to each scale-up pathway.
- Collapsed the heavy Sources section into an evidence appendix for technical reviewers.
- Reduced source-chip density on cards and mobile while keeping evidence accessible in modals.

## Validation

- `node --check data.js` passed.
- `node --check app.js` passed.
- HTML parser check passed.
- CSS brace balance check passed.
- Local HTTP serving check returned 200 OK.

## Rendering note

The container blocks Chromium/Playwright navigation to local HTTP and file URLs with `ERR_BLOCKED_BY_ADMINISTRATOR`, so visual screenshot QA could not be completed in this pass. Static validation and local server response checks passed.

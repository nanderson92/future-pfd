# Recruiter hierarchy edit pass

Implemented the feedback pass to make Future Systems Atlas more portfolio/recruiter-friendly while preserving the source discipline.

## Main changes

- Reordered the top navigation to lead with Cases and Atlas.
- Tightened hero copy and reduced slogan density.
- Removed the third hero CTA and moved evidence access into a quieter technical-review link.
- Rewrote the portfolio proof section into concrete deliverables: classification system, process-flow decomposition, scale-up judgment, and auditable research habits.
- Moved section evidence panels below the primary content and converted them into collapsed evidence-basis details.
- Reordered detail modals so process architecture/PFD, inputs, outputs, readiness, bottlenecks, and scale questions come before evidence/source notes.
- Collapsed detailed source lists inside technology cards, chemical cards, unit-operation cards, and modals.
- Simplified slogan-heavy section headings into plainer engineering claims.
- Added a short deployment-stack explanatory line and a readiness-map interpretation caption.
- Moved advanced chemical/unit-operation filters into a collapsed Advanced Filters panel.
- Sorted unit operations so mapped entries appear before expansion candidates.
- Reduced decorative noise by disabling the left-side vertical microtext and softening blueprint/grid intensity.

## Validation

- Ran JavaScript syntax checks for `data.js` and `app.js` with Node.
- Parsed `index.html` to confirm key edited element IDs are present.
- Attempted Chromium/Playwright visual rendering, but the container's browser environment blocked or timed out headless navigation/screenshot capture. Files were still edited directly and syntax-checked.

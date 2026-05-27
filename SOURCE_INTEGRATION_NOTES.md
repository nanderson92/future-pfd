# Source Integration Pass Notes

## Goal
This pass makes the source layer feel like part of the site rather than a separate appendix.

## Implemented
- Added section-level evidence panels under the main thesis, reader protocol, chemical spine, unit operations, readiness, scale-up pathways, and case-study sections.
- Added an Evidence status filter to the full atlas index.
- Improved card-level citation chips so they show compact source labels instead of generic source groups.
- Added source chips to compact atlas rows, not just full cards and modals.
- Expanded modal evidence sections with a second panel: “What the sources support / do not support.”
- Added a searchable source bank in the Sources section.
- Preserved source caution language: sources do not prove every claim; speculative cards remain marked as analogue-sourced.
- Fixed duplicated author-note text.

## Validation
- `node --check data.js` passed.
- `node --check app.js` passed.
- HTML parser check passed.
- `EVIDENCE_MATRIX.csv` parsed: 559 rows, 15 columns.
- `CARD_SOURCE_AUDIT.csv` parsed: 115 rows, 11 columns.
- Missing source references: 0.
- Local HTTP check returned 200 OK.

## Remaining caution
This is still a source scaffold, not a publication-grade claim audit. The highest-risk cards remain speculative or analogue-sourced by design. Before publishing strong claims, verify each claim against the source's exact scope.

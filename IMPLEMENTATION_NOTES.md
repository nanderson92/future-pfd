# Future Systems Atlas — Fourth-Pass Source QA Implementation Notes

Generated 2026-05-27.

## What changed in this pass

- Reclassified card evidence posture instead of showing every technology card as equally sourced.
- Reordered card citations so direct card-specific sources appear before broad framework sources.
- Increased per-card displayed source-key capacity from 9 to 12, reducing hidden direct citations.
- Added an on-page **Evidence QA** panel for cards that need cautious wording.
- Fixed a duplicated label bug in the filter chips.
- Renamed the source statistics from "verified source records" to "source records in bank" to avoid overstating the audit status.
- Added `CARD_SOURCE_AUDIT.csv` as a card-level QA table.
- Regenerated `SOURCES.md` and `EVIDENCE_MATRIX.csv` after the evidence-posture reclassification.

## Current coverage status

| Item | Count |
|---|---:|
| Technology cards | 115 |
| Direct starter set cards | 83 |
| Roadmap / early-stage sourced cards | 19 |
| Speculative / analogue-sourced cards | 13 |
| Source records | 201 |
| Tier 1 / authoritative source records in site metadata | 195 |
| Tier 2 source records | 6 |
| Evidence matrix rows | 559 |
| Card audit rows | 115 |

## Cards intentionally downgraded to speculative / analogue-sourced

- Self-replicating manufacturing systems
- Molecular assemblers
- Programmable matter
- Carbon nanotube elevators / cables
- Cloaking materials
- Shape-shifting materials
- Room-temperature superconductors
- Medical nanobots
- Digital immortality / mind archives
- Space elevators
- Terraforming concepts
- Replicator-like food machines
- Universal fabrication appliances

## Remaining limitations

This pass improves honesty and source ordering, but it is still not a final citation audit. The site now makes the distinction between direct starter sourcing, roadmap/early-stage evidence, and analogue/speculative evidence, but each displayed claim still needs claim-level checking before a polished public release.

## Recommended fifth-pass priorities

1. Do a sentence-by-sentence audit of card modals and replace generic mini-PFD steps with source-specific process routes.
2. Add direct regulatory, cost, lifecycle, safety, and reliability sources for the 19 roadmap / early-stage cards.
3. Keep speculative cards in the atlas only if they are clearly labeled as process-architecture thought experiments.
4. Add a small public download link for `SOURCES.md`, `EVIDENCE_MATRIX.csv`, and `CARD_SOURCE_AUDIT.csv` if you want technical reviewers to inspect the evidence layer.
5. Remove or soften any performance, cost, deployment, or timeline claim not directly supported by a source in the matrix.

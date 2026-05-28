/* ────────────────────────────────────────────────────────────
   Sections: Hero, Nav, CaseStudies, SystemMap, ChemicalSpine,
   UnitOps, Readiness, Pathways, Evidence, AuthorNote, Footer
   ──────────────────────────────────────────────────────────── */
const { useState, useEffect, useRef, useMemo } = React;
/* ── Definitions used in tooltips + field guide ───────────── */
const DEFS = {
    pfd: ["Process Flow Diagram", "A schematic of how matter and energy move through a process — inputs in, transformations across, outputs out."],
    trl: ["Technology Readiness Level", "NASA scale 1–9. 1 = idea on paper. 9 = full system, operating in its real environment. Asks: does it work?"],
    mrl: ["Manufacturing Readiness Level", "Scale 1–9. Asks: can we make it repeatedly at the right yield, quality, cost, and throughput?"],
    irl: ["Infrastructure Readiness Level", "Scale 1–9. Asks: can it integrate? Do utilities, logistics, standards, maintenance, and users support it?"],
    "unit-op": ["Unit operation", "A single discrete physical step in a process — distillation, electrolysis, filtration, deposition, heat exchange, etc."],
    bottleneck: ["Bottleneck", "The constraint most likely to block scale-up — energy intensity, dilute separations, supply chain, reliability, cost."],
    spine: ["Chemical spine", "The handful of molecules (H₂, CO₂, NH₃, Si, Li, H₂O…) that recur across many futures. Master them and many sectors come along."],
    evidence: ["Evidence posture", "Direct = peer-reviewed pilots or operating systems. Roadmap = program targets or lab demos. Analogue = sourced from adjacent industries."],
    "scale-trigger": ["Scale trigger", "The specific change (cost target, catalyst, secured supply, standard) that flips a technology from 'pilot' to 'deployable'."],
    foak: ["First-of-a-Kind", "The first full-scale plant. Often where promising technologies die: pilot worked, but capital risk and integration kill it."],
    sector: ["Sector", "One of seven domains in the atlas: Energy, Carbon, Water, Materials, Manufacturing, Cities, Space."],
};
function DefineTerm({ term, children }) {
    const d = DEFS[term];
    return (React.createElement("span", { className: "define", tabIndex: 0 },
        React.createElement("span", { className: "define-text" }, children),
        React.createElement("span", { className: "define-marker", "aria-hidden": true }, "\u24D8"),
        d && (React.createElement("span", { className: "define-tip", role: "tooltip" },
            React.createElement("span", { className: "dt-head" }, d[0]),
            React.createElement("span", { className: "dt-body" }, d[1])))));
}
/* ── Field Guide — strip of definitions for non-specialists ─ */
function FieldGuide() {
    const items = [
        { term: "pfd", glyph: "▦", lead: "PFD", body: "Process flow diagram — a map of how matter and energy move through a process. Inputs come in, operations transform them, outputs come out. An engineer's recipe." },
        { term: "unit-op", glyph: "◍", lead: "Unit op", body: "One discrete physical step — distilling, electrolyzing, filtering, coating. Every process is a chain of unit ops, like Lego bricks of chemical engineering." },
        { term: "spine", glyph: "⬡", lead: "Spine", body: "The handful of molecules every future depends on: H₂, CO₂, NH₃, Si, Li, H₂O. Master these and many seemingly distant fields unlock at once." },
        { term: "trl", glyph: "T", lead: "TRL · 1–9", body: "Technology Readiness Level. NASA's 1–9 scale: 1 = sketch on paper, 9 = working in the real world. Asks: does the underlying mechanism work yet?" },
        { term: "mrl", glyph: "M", lead: "MRL · 1–9", body: "Manufacturing Readiness Level. Asks whether we can make the thing not once in a lab but a million times — at the right yield, quality, cost, and pace." },
        { term: "irl", glyph: "I", lead: "IRL · 1–9", body: "Infrastructure Readiness Level. Asks whether the world around the tech is ready: supply chains, utilities, standards, regulators, technicians, and users." },
        { term: "bottleneck", glyph: "◐", lead: "Bottleneck", body: "What actually blocks scale-up. Usually not the core invention but adjacent constraints — energy supply, separations, raw materials, capital, permitting." },
        { term: "evidence", glyph: "✓", lead: "Evidence", body: "How we know what we claim. Direct = demonstrated already. Roadmap = a credible plan exists. Analogue = inferred from a related working system." },
    ];
    return (React.createElement("section", { id: "guide", className: "section section-guide" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA \u00B7 field guide", kicker: "Read this first", title: "How to read the atlas.", lede: "A small glossary. Every card in the galaxy gets decomposed using these terms; hover any term elsewhere on the page for a definition." }),
            React.createElement("div", { className: "guide" },
                React.createElement("div", { className: "guide-grid" }, items.map(it => (React.createElement("div", { key: it.term, className: "guide-card" },
                    React.createElement("div", { className: "guide-glyph" }, it.glyph),
                    React.createElement("div", { className: "guide-lead" }, it.lead),
                    React.createElement("div", { className: "guide-body" }, it.body))))),
                React.createElement("div", { className: "guide-foot" },
                    React.createElement("span", { className: "meta" }, "\u25BC Reader protocol"),
                    React.createElement("ol", { className: "guide-protocol" },
                        React.createElement("li", null, "Start with the imagined capability."),
                        React.createElement("li", null, "Identify the material and energy inputs."),
                        React.createElement("li", null, "Map the unit operations that turn inputs into outputs."),
                        React.createElement("li", null, "Locate the bottleneck: energy, separations, yield, reliability, or infrastructure."),
                        React.createElement("li", null, "Ask what must become repeatable, measurable, and economical.")))))));
}
/* ── Nav ──────────────────────────────────────────────────── */
function Nav() {
    const [coord, setCoord] = useState("47.6N 122.3W");
    useEffect(() => {
        let i = 0;
        const tick = () => {
            i++;
            const lat = (47 + Math.sin(i / 30) * 0.4).toFixed(2);
            const lon = (122 + Math.cos(i / 25) * 0.3).toFixed(2);
            setCoord(`${lat}°N  ${lon}°W`);
        };
        const id = setInterval(tick, 1800);
        return () => clearInterval(id);
    }, []);
    return (React.createElement("nav", { className: "nav" },
        React.createElement("div", { className: "nav-inner" },
            React.createElement("a", { className: "nav-brand", href: "#home" },
                React.createElement("span", { className: "mark" }, "FS"),
                React.createElement("span", { className: "nav-brand-label" },
                    React.createElement("span", { className: "l1" }, "Future Systems Atlas"),
                    React.createElement("span", { className: "l2" }, "FSA-001 \u00B7 interactive process map"))),
            React.createElement("div", { className: "nav-links command-links" }, [
                ["#home", "Home"],
                ["#map", "Map"],
                ["#cases", "Cases"],
                ["#guide", "Guide"],
                ["#atlas", "Index"],
                ["#sources", "Sources"],
                ["#about", "About"],
            ].map(([href, label], i) => (React.createElement(React.Fragment, { key: href },
                i > 0 && React.createElement("span", { className: "nav-sep", "aria-hidden": "true" }, "\u00B7"),
                React.createElement("a", { href: href },
                    React.createElement("span", { className: "nav-num" }, String(i + 1).padStart(2, "0")),
                    React.createElement("span", { className: "nav-label" }, label)))))))));
}
/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
    return (React.createElement("header", { id: "top", className: "hero" },
        React.createElement("div", { className: "frame" },
            React.createElement("div", { className: "hero-meta" },
                React.createElement("span", null, "FSA \u00B7 001"),
                React.createElement("span", { className: "sep" }, "\u25A3"),
                React.createElement("span", null, "Rev 2026.05"),
                React.createElement("span", { className: "sep" }, "\u25A3"),
                React.createElement("span", null, "Sheet 01 / 12"),
                React.createElement("span", { className: "sep" }, "\u25A3"),
                React.createElement("span", null, "Scale 1 : 1"),
                React.createElement("span", { className: "sep" }, "\u25A3"),
                React.createElement("span", null, "N. Anderson \u00B7 ChBE")),
            React.createElement("div", { className: "hero-kicker" }, "Future Systems Atlas"),
            React.createElement("h1", null,
                "A process-flow map of the technologies",
                React.createElement("br", null),
                "people call ",
                React.createElement("span", { className: "glyph" }, "\u201Cthe future.\u201D")),
            React.createElement("p", { className: "lede" }, "Flying cars, fusion plants, smart buildings, vertical farms, artificial organs, and space habitats only become real when materials, energy, manufacturing, quality control, infrastructure, and supply chains can support them."),
            React.createElement("p", { className: "hero-byline" }, "I built this atlas to translate futuristic technologies into the processes and systems that would have to exist underneath them."),
            React.createElement("div", { className: "hero-actions" },
                React.createElement("a", { className: "btn primary", href: "#atlas" },
                    "Browse the atlas ",
                    React.createElement("span", { className: "arrow" }, "\u2192")),
                React.createElement("a", { className: "btn", href: "#cases" },
                    "View cases ",
                    React.createElement("span", { className: "arrow" }, "\u2192")),
                React.createElement("a", { className: "btn", href: "#sources" },
                    "Evidence layer ",
                    React.createElement("span", { className: "arrow" }, "\u2192"))))));
}
/* ── Section header (left rail) ───────────────────────────── */
function SectionHead({ code, kicker, title, lede }) {
    return (React.createElement("aside", { className: "section-stamp" },
        React.createElement("div", { className: "code" }, code),
        kicker && React.createElement("div", { className: "kicker" }, kicker),
        React.createElement("h2", null, title),
        lede && React.createElement("p", { className: "lede" }, lede)));
}
/* ── Featured case studies (PFD cards) ────────────────────── */
function CaseStudies() {
    const cases = window.FSA.FEATURED;
    const [active, setActive] = useState(0);
    const cur = cases[active];
    return (React.createElement("section", { id: "cases", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-002 \u00B7 Start here", kicker: "Featured PFDs", title: "Six case studies in process architecture.", lede: "Six representative systems are rendered as process-flow diagrams: feedstocks in, unit operations across, bottleneck called out, readiness gap named, and engineering judgment made explicit." }),
            React.createElement("div", { className: "cases-stage" },
                React.createElement("div", { className: "cases-tabs" }, cases.map((c, i) => (React.createElement("button", { key: c.pid, className: `cases-tab ${i === active ? "active" : ""}`, onClick: () => setActive(i), "data-sector": c.sector },
                    React.createElement("span", { className: "t-pid" }, c.pid),
                    React.createElement("span", { className: "t-name" }, c.name),
                    React.createElement("span", { className: "t-sector" }, c.sector))))),
                React.createElement(CasePFD, { cse: cur })))));
}
function CasePFD({ cse }) {
    return (React.createElement("div", { className: "pfd case-pfd", "data-sector": cse.sector },
        React.createElement("div", { className: "pfd-head" },
            React.createElement("div", null,
                React.createElement("div", { className: "pid" }, cse.pid),
                React.createElement("div", { className: "pfd-title" }, cse.name)),
            React.createElement("div", { className: "row", style: { gap: 8 } },
                React.createElement("span", { className: "chip", "data-sector": cse.sector },
                    React.createElement("span", { className: "dot" }),
                    cse.sector),
                React.createElement("span", { className: "chip" }, "Process \u00B7 sheet 01"))),
        React.createElement("div", { className: "pfd-flow" },
            React.createElement("div", { className: "pfd-rail in" },
                React.createElement("div", { className: "rail-label" }, "Inputs"),
                cse.inputs.map((inp, i) => (React.createElement("div", { key: i, className: "rail-node" },
                    React.createElement("span", { className: "rn-tag" }, inp.split("  ")[0]),
                    React.createElement("span", { className: "rn-name" }, inp.split("  ")[1]))))),
            React.createElement("div", { className: "pfd-blocks" }, cse.steps.map(([code, name], i) => (React.createElement("div", { key: code, className: "pfd-block", style: { animationDelay: `${i * 0.08}s` } },
                React.createElement("span", { className: "pfd-block-code" }, code),
                React.createElement("span", { className: "pfd-block-name" }, name),
                i < cse.steps.length - 1 && React.createElement("span", { className: "pfd-arrow" }))))),
            React.createElement("div", { className: "pfd-rail out" },
                React.createElement("div", { className: "rail-label" }, "Output"),
                React.createElement("div", { className: "rail-node" },
                    React.createElement("span", { className: "rn-tag" }, cse.output.split("  ")[0]),
                    React.createElement("span", { className: "rn-name" }, cse.output.split("  ")[1])))),
        React.createElement("div", { className: "pfd-foot" },
            React.createElement("div", { className: "pfd-foot-cell" },
                React.createElement("div", { className: "meta" }, "Bottleneck"),
                React.createElement("div", { className: "pfd-foot-val", style: { color: `var(--c-${cse.sector})` } }, cse.bottleneck)),
            React.createElement("div", { className: "pfd-foot-cell" },
                React.createElement("div", { className: "meta" }, "Scale trigger"),
                React.createElement("div", { className: "pfd-foot-val" }, cse.trigger)),
            React.createElement("div", { className: "pfd-foot-cell" },
                React.createElement("div", { className: "meta" }, "Readiness gap"),
                React.createElement("div", { className: "pfd-foot-val" }, cse.readiness))),
        cse.reasoning && (React.createElement("div", { className: "case-reasoning" },
            React.createElement("div", { className: "meta" }, "Engineering judgment"),
            React.createElement("p", null, cse.reasoning)))));
}
/* ── System Map (deployment stack) ────────────────────────── */
function SystemMap() {
    const stack = window.FSA.STACK;
    const [layer, setLayer] = useState(2); // default Unit ops
    const cur = stack[layer];
    return (React.createElement("section", { id: "system", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-005 \u00B7 Master system diagram", kicker: "Deployment stack", title: "Six layers separate the visible product from what must be built.", lede: "Click a layer to see the feedstocks, transformations, and infrastructure that must compose at each tier before the deployable system can leave the slide deck." }),
            React.createElement("div", { className: "stack" },
                React.createElement("div", { className: "stack-rows" },
                    stack.map((s, i) => (React.createElement("button", { key: s.id, className: `stack-row ${i === layer ? "active" : ""}`, onClick: () => setLayer(i) },
                        React.createElement("div", { className: "stack-row-num" }, String(i + 1).padStart(2, "0")),
                        React.createElement("div", { className: "stack-row-body" },
                            React.createElement("div", { className: "stack-row-title" }, s.label),
                            React.createElement("div", { className: "stack-row-sub" }, s.sub)),
                        React.createElement("div", { className: "stack-row-tick" }, i === layer ? "◉" : "○")))),
                    React.createElement("div", { className: "stack-flow-arrow", "aria-hidden": true },
                        React.createElement("div", { className: "stack-flow-line" }),
                        React.createElement("div", { className: "stack-flow-tip" }, "\u25BC"))),
                React.createElement("div", { className: "stack-detail" },
                    React.createElement("div", { className: "stack-detail-head" },
                        React.createElement("div", { className: "meta" },
                            "Layer ",
                            String(layer + 1).padStart(2, "0"),
                            " / 06"),
                        React.createElement("div", { className: "stack-detail-title" }, cur.label),
                        React.createElement("div", { className: "stack-detail-sub" }, cur.sub)),
                    React.createElement("div", { className: "stack-detail-grid" }, cur.nodes.map((n, i) => (React.createElement("div", { key: n, className: "stack-node", style: { animationDelay: `${i * 0.05}s` } },
                        React.createElement("span", { className: "node-bullet" }),
                        React.createElement("span", null, n))))),
                    React.createElement("div", { className: "stack-detail-foot" },
                        React.createElement("div", { className: "meta" }, "Every card in the atlas crosses all six layers."),
                        React.createElement("div", { className: "stack-rules" },
                            React.createElement("span", null, "VISIBLE PRODUCT"),
                            React.createElement("span", { className: "arrow-glyph" }, "\u2192"),
                            React.createElement("span", { className: "strong" }, "HIDDEN PROCESS SYSTEM"))))))));
}
/* ── Chemical Spine (periodic-grade tiles) ────────────────── */
function ChemicalSpine() {
    const chems = window.FSA.CHEMICALS;
    const [hover, setHover] = useState(null);
    const cur = hover != null ? chems[hover] : null;
    const goToGalaxy = (sym) => {
        window.dispatchEvent(new CustomEvent("fsa:focus-chemical", { detail: sym }));
    };
    return (React.createElement("section", { id: "chemicals", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-006 \u00B7 Chemical spine", kicker: "Recurring molecules", title: "The atoms and molecules every future depends on.", lede: React.createElement(React.Fragment, null,
                    "Most technologies reduce to recurring chemical-engineering constraints \u2014 hydrogen handling, CO\u2082 conversion, lithium supply, water purification. ",
                    React.createElement("strong", null, "Click a tile to trace it across the galaxy.")) }),
            React.createElement("div", { className: "spine-stage" },
                React.createElement("div", { className: "spine-grid" }, chems.map((c, i) => (React.createElement("button", { key: c.sym, className: "spine-tile", "data-color": c.color, onMouseEnter: () => setHover(i), onMouseLeave: () => setHover(null), onClick: () => goToGalaxy(c.sym) },
                    React.createElement("div", { className: "spine-num" }, c.num),
                    React.createElement("div", { className: "spine-sym" }, c.sym),
                    React.createElement("div", { className: "spine-name" }, c.name),
                    React.createElement("div", { className: "spine-group" }, c.group),
                    React.createElement("span", { className: "spine-action" }, "trace in map \u2192"))))),
                React.createElement("div", { className: "spine-readout" },
                    React.createElement("div", { className: "meta" }, "Hover to read \u00B7 click to highlight on the galaxy map."),
                    cur ? (React.createElement("div", { className: "spine-card", "data-color": cur.color },
                        React.createElement("div", { className: "spine-card-num" }, cur.num),
                        React.createElement("div", { className: "spine-card-sym" }, cur.sym),
                        React.createElement("div", { className: "spine-card-name" }, cur.name),
                        React.createElement("div", { className: "spine-card-group" }, cur.group),
                        React.createElement("ul", { className: "spine-card-uses" }, cur.uses.map(u => React.createElement("li", { key: u }, u))),
                        React.createElement("button", { className: "spine-card-action", onClick: () => goToGalaxy(cur.sym) },
                            "Trace ",
                            cur.sym,
                            " across sectors \u2192"))) : (React.createElement("div", { className: "spine-default" },
                        React.createElement("div", { className: "meta", style: { marginBottom: 12 } }, "Spine summary"),
                        React.createElement("p", null, "Hydrogen, CO\u2082, ammonia, silicon, lithium, copper, water, membranes, catalysts, polymers. The same constraints reappear across sectors \u2014 corrosion, purity, separations, energy."))))))));
}
/* ── Unit Ops · Cross-sector matrix ───────────────────────── */
function UnitOps() {
    const ops = window.FSA.UNIT_OPS;
    const sectors = window.FSA.SECTORS;
    const entries = window.FSA.ENTRIES;
    const [hoverCell, setHoverCell] = useState(null);
    const [hoverRow, setHoverRow] = useState(null);
    // Compute matrix
    const matrix = ops.map(op => {
        const cells = sectors.map(s => {
            const ents = entries.filter(e => e.unitOp === op.id && e.sector === s.id);
            return { sector: s, count: ents.length, entries: ents };
        });
        const total = cells.reduce((a, c) => a + c.count, 0);
        return { ...op, cells, total };
    });
    const maxCell = Math.max(...matrix.flatMap(r => r.cells.map(c => c.count)));
    const openSector = (sid) => {
        window.dispatchEvent(new CustomEvent("fsa:focus-sector", { detail: sid }));
    };
    const openCard = (pid) => {
        window.dispatchEvent(new CustomEvent("fsa:open-tech", { detail: pid }));
    };
    return (React.createElement("section", { id: "unitops", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-007 \u00B7 Unit operation library", kicker: "Cross-sector lookup", title: "Six unit operations recur across all seven sectors.", lede: React.createElement(React.Fragment, null,
                    "Every card in the atlas decomposes into a primary ",
                    React.createElement(DefineTerm, { term: "unit-op" }, "unit operation"),
                    ". The matrix shows where they overlap \u2014 and why fixing one operation once pays dividends across many futures. Hover a cell to see which cards live at that intersection.") }),
            React.createElement("div", { className: "matrix-wrap" },
                React.createElement("div", { className: "matrix", style: { "--cols": sectors.length } },
                    React.createElement("div", { className: "m-corner" },
                        React.createElement("span", { className: "meta" }, "unit op"),
                        React.createElement("span", { className: "m-corner-glyph" }, "\u00D7"),
                        React.createElement("span", { className: "meta" }, "sector")),
                    sectors.map(s => (React.createElement("button", { key: s.id, className: "m-col-head", "data-sector": s.id, onClick: () => openSector(s.id), title: `Focus ${s.label} in the galaxy` },
                        React.createElement("span", { className: "m-col-dot" }),
                        React.createElement("span", { className: "m-col-name" }, s.label),
                        React.createElement("span", { className: "m-col-count" }, s.count)))),
                    React.createElement("div", { className: "m-row-total m-head" }, "\u03A3"),
                    matrix.map(row => {
                        const isHoverRow = hoverRow === row.id;
                        return (React.createElement(React.Fragment, { key: row.id },
                            React.createElement("div", { className: `m-row-head ${isHoverRow ? "on" : ""}`, onMouseEnter: () => setHoverRow(row.id), onMouseLeave: () => setHoverRow(null) },
                                React.createElement("div", { className: "m-row-title" }, row.label),
                                React.createElement("div", { className: "m-row-fam meta" }, row.family),
                                React.createElement("div", { className: "m-row-ex" }, row.examples)),
                            row.cells.map(c => {
                                const isHover = hoverCell && hoverCell.op === row.id && hoverCell.sector === c.sector.id;
                                const intensity = maxCell ? c.count / maxCell : 0;
                                const size = c.count > 0 ? 22 + intensity * 26 : 4;
                                return (React.createElement("button", { key: c.sector.id, className: `m-cell ${isHover ? "on" : ""} ${c.count === 0 ? "zero" : ""}`, "data-sector": c.sector.id, onMouseEnter: () => setHoverCell({ op: row.id, sector: c.sector.id }), onMouseLeave: () => setHoverCell(null), onClick: () => c.count > 0 && openSector(c.sector.id), disabled: c.count === 0 },
                                    React.createElement("span", { className: "m-cell-dot", style: {
                                            width: `${size}px`, height: `${size}px`,
                                            background: `var(--c-${c.sector.id})`,
                                            opacity: c.count > 0 ? 0.18 + intensity * 0.55 : 0.18,
                                        } }),
                                    c.count > 0 && React.createElement("span", { className: "m-cell-n" }, c.count)));
                            }),
                            React.createElement("div", { className: "m-row-total" }, row.total)));
                    })),
                React.createElement("div", { className: "matrix-readout" },
                    React.createElement(MatrixReadout, { hoverCell: hoverCell, hoverRow: hoverRow, matrix: matrix, sectors: sectors, entries: entries, ops: ops, onOpenCard: openCard, onOpenSector: openSector }))))));
}
function MatrixReadout({ hoverCell, hoverRow, matrix, sectors, entries, ops, onOpenCard, onOpenSector }) {
    // Cell-level readout
    if (hoverCell) {
        const row = matrix.find(r => r.id === hoverCell.op);
        const cell = row.cells.find(c => c.sector.id === hoverCell.sector);
        return (React.createElement("div", { className: "mr" },
            React.createElement("div", { className: "meta" }, "\u25BC intersection"),
            React.createElement("div", { className: "mr-title" },
                React.createElement("span", { style: { color: "var(--fg)" } }, row.label),
                React.createElement("span", { className: "mr-x" }, "\u00D7"),
                React.createElement("span", { style: { color: `var(--c-${cell.sector.id})` } }, cell.sector.label)),
            React.createElement("div", { className: "meta" },
                cell.count,
                " cards \u00B7 ",
                ((cell.count / row.total) * 100 || 0).toFixed(0),
                "% of ",
                row.label.toLowerCase(),
                " cards live in ",
                cell.sector.label.toLowerCase()),
            cell.count > 0 ? (React.createElement("ul", { className: "mr-list" }, cell.entries.map(e => (React.createElement("li", { key: e.pid },
                React.createElement("button", { onClick: () => onOpenCard(e.pid), className: "mr-item" },
                    React.createElement("span", { className: "mr-pid" }, e.pid),
                    React.createElement("span", { className: "mr-name" }, e.name))))))) : (React.createElement("p", { className: "mr-empty" }, "No atlas cards live at this intersection \u2014 the unit op is rarely primary in this sector."))));
    }
    // Row-level readout
    if (hoverRow) {
        const row = matrix.find(r => r.id === hoverRow);
        const topSector = [...row.cells].sort((a, b) => b.count - a.count)[0];
        return (React.createElement("div", { className: "mr" },
            React.createElement("div", { className: "meta" }, "\u25BC unit operation"),
            React.createElement("div", { className: "mr-title", style: { color: "var(--fg)" } }, row.label),
            React.createElement("div", { className: "meta" },
                row.family,
                " \u00B7 ",
                row.total,
                " cards across ",
                row.cells.filter(c => c.count > 0).length,
                " sectors"),
            React.createElement("p", { className: "mr-desc" }, row.examples),
            React.createElement("div", { className: "mr-section" },
                React.createElement("div", { className: "meta" }, "Most concentrated in"),
                React.createElement("button", { className: "mr-top-sector", style: { borderColor: `var(--c-${topSector.sector.id})`, color: `var(--c-${topSector.sector.id})` }, onClick: () => onOpenSector(topSector.sector.id) },
                    React.createElement("span", null, topSector.sector.label),
                    React.createElement("span", { className: "mr-top-n" },
                        topSector.count,
                        " cards")))));
    }
    // Default — overview
    const topOp = [...matrix].sort((a, b) => b.total - a.total)[0];
    return (React.createElement("div", { className: "mr" },
        React.createElement("div", { className: "meta" }, "\u25BC field overview"),
        React.createElement("div", { className: "mr-title", style: { color: "var(--fg)" } }, "Why this matters."),
        React.createElement("p", { className: "mr-desc" }, "A solid-oxide fuel cell and a perovskite solar cell aren't obviously similar \u2014 but both run on deposition. Solving deposition tolerances pays out across both. The matrix names those shared steps. Bigger dot = more atlas cards at that intersection."),
        React.createElement("div", { className: "mr-section" },
            React.createElement("div", { className: "meta" }, "Most common unit op"),
            React.createElement("div", { className: "mr-top-row" },
                React.createElement("span", { className: "mr-top-name" }, topOp.label),
                React.createElement("span", { className: "mr-top-n" },
                    topOp.total,
                    " cards"))),
        React.createElement("div", { className: "mr-section" },
            React.createElement("div", { className: "meta" }, "Tip"),
            React.createElement("p", { className: "mr-tip" }, "Hover a row label for the unit op definition \u00B7 hover a cell for the cards \u00B7 click a sector or cell to focus that planet on the galaxy map."))));
}
/* ── Readiness (TRL / MRL / IRL / $) ──────────────────────── */
function Readiness() {
    const levels = [
        { code: "TRL", label: "Does it work?", desc: "Technology readiness asks whether the core mechanism or device has been demonstrated.", tone: "energy" },
        { code: "MRL", label: "Can we make it?", desc: "Manufacturing readiness asks whether the process can meet yield, quality, cost, and throughput.", tone: "manufacturing" },
        { code: "IRL", label: "Can it integrate?", desc: "Infrastructure readiness asks whether utilities, logistics, standards, maintenance, and users align.", tone: "cities" },
        { code: "$", label: "Do the economics hold?", desc: "Economics asks whether the full system competes when capital, energy, labor, reliability, and utilization are counted.", tone: "materials" },
    ];
    // Compute average TRL/MRL/IRL across atlas entries
    const stats = useMemo(() => {
        const e = window.FSA.ENTRIES;
        const avg = (k) => (e.reduce((a, x) => a + x[k], 0) / e.length).toFixed(1);
        return { trl: avg("trl"), mrl: avg("mrl"), irl: avg("irl") };
    }, []);
    return (React.createElement("section", { id: "readiness", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-008 \u00B7 Readiness gates", kicker: "Bottleneck taxonomy", title: "Most future systems are blocked by MRL, IRL, and process economics \u2014 not TRL.", lede: "The atlas separates 'does it work' from 'can we make it repeatedly' and 'can it integrate' \u2014 three distinct mountains, almost always climbed in that order." }),
            React.createElement("div", { className: "ready" },
                React.createElement("div", { className: "ready-grid" }, levels.map((l, i) => (React.createElement("div", { key: l.code, className: "ready-card", "data-tone": l.tone },
                    React.createElement("div", { className: "ready-code" }, l.code),
                    React.createElement("div", { className: "ready-q" }, l.label),
                    React.createElement("div", { className: "ready-desc" }, l.desc),
                    React.createElement("div", { className: "ready-bar" },
                        React.createElement("div", { className: "ready-bar-track" }, [...Array(10)].map((_, k) => (React.createElement("span", { key: k, className: `tick ${k < (i === 0 ? 7 : i === 1 ? 4 : i === 2 ? 3 : 2) ? "on" : ""}` })))),
                        React.createElement("div", { className: "ready-bar-label" },
                            i === 0 && `Atlas avg ${stats.trl} / 9`,
                            i === 1 && `Atlas avg ${stats.mrl} / 9`,
                            i === 2 && `Atlas avg ${stats.irl} / 9`,
                            i === 3 && `Pilot → commercial`)))))),
                React.createElement("div", { className: "ready-bottlenecks" },
                    React.createElement("div", { className: "meta", style: { marginBottom: 14 } }, "Bottleneck taxonomy"),
                    React.createElement("div", { className: "bn-grid" }, window.FSA.BOTTLENECKS.map(b => (React.createElement("div", { key: b.id, className: "bn-tile" },
                        React.createElement("span", { className: "bn-fam" }, b.family),
                        React.createElement("span", { className: "bn-label" }, b.label))))))))));
}
/* ── Scale-up Corridor (replaces the 11-bars list) ────────── */
function Pathways() {
    const STAGES = [
        {
            id: "concept", label: "Concept",
            gates: ["TRL 1–3"], dip: 0.15,
            ask: "Does the physics work?",
            desc: "Mechanism on paper, simulated, or shown in a lab notebook.",
            kills: "Hand-wavy thermodynamics. Wrong physics.",
            moves: ["Increase yield per pass", "Tighten process windows"],
        },
        {
            id: "lab", label: "Lab demo",
            gates: ["TRL 4–5"], dip: 0.30,
            ask: "Does the device work?",
            desc: "Bench unit produces the intended output, controlled environment.",
            kills: "Selectivity, yield, side-reactions.",
            moves: ["Improve reliability cycling", "Substitute supply-constrained inputs"],
        },
        {
            id: "pilot", label: "Pilot",
            gates: ["TRL 6", "MRL 3–4"], dip: 0.45,
            ask: "Can it run for hours?",
            desc: "Continuous operation at a meaningful fraction of full scale.",
            kills: "Fouling. Heat integration. Operator hours.",
            moves: ["Close recycle loops", "Standardize interfaces"],
        },
        {
            id: "foak", label: "First-of-a-Kind",
            gates: ["TRL 7–8", "MRL 5–6", "IRL 4–5"], dip: 0.85, valley: true,
            ask: "Can it be built once at full scale?",
            desc: "One commercial-scale plant. Capital risk peaks. Permitting starts.",
            kills: "FOAK capex. Permits. Construction overruns. Customer terms.",
            moves: ["Cut capital intensity", "Modularize for replication"],
        },
        {
            id: "commercial", label: "Commercial",
            gates: ["TRL 9", "MRL 7–8", "IRL 6–7"], dip: 0.55,
            ask: "Is unit cost competitive?",
            desc: "Replicated builds, learning rates kicking in, financeable.",
            kills: "Energy cost. Reliability across the fleet.",
            moves: ["Reduce energy intensity", "Drive cost-of-quality down"],
        },
        {
            id: "atscale", label: "At scale",
            gates: ["MRL 9", "IRL 8–9"], dip: 0.25,
            ask: "Can the world support thousands?",
            desc: "Industry standard. Supply chains, codes, workforce all aligned.",
            kills: "Inputs become the new bottleneck.",
            moves: ["Co-locate utilities & feedstocks"],
        },
    ];
    const [active, setActive] = useState("foak");
    const cur = STAGES.find(s => s.id === active);
    // SVG layout for the curve
    const W = 1200, H = 220;
    const PAD = 40;
    const innerW = W - PAD * 2;
    const xAt = (i) => PAD + (i / (STAGES.length - 1)) * innerW;
    const yAt = (dip) => 30 + dip * (H - 60);
    const pathD = STAGES.map((s, i) => {
        const x = xAt(i);
        const y = yAt(s.dip);
        if (i === 0)
            return `M ${x} ${y}`;
        const prev = STAGES[i - 1];
        const px = xAt(i - 1);
        const py = yAt(prev.dip);
        const cx1 = px + (x - px) * 0.5;
        const cx2 = px + (x - px) * 0.5;
        return ` C ${cx1} ${py}, ${cx2} ${y}, ${x} ${y}`;
    }).join("");
    return (React.createElement("section", { id: "pathways", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-009 \u00B7 Scale-up corridor", kicker: "The six gates", title: "The corridor between a working prototype and a deployed system.", lede: "Most frontier technologies die between Pilot and First-of-a-Kind \u2014 the famous Valley of Death. The corridor traces the risk profile and names the engineering move that gets you across each gate." }),
            React.createElement("div", { className: "corridor" },
                React.createElement("div", { className: "corridor-curve" },
                    React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", className: "curve-svg" },
                        React.createElement("defs", null,
                            React.createElement("linearGradient", { id: "curveGrad", x1: "0", x2: "1", y1: "0", y2: "0" },
                                React.createElement("stop", { offset: "0%", stopColor: "var(--c-manufacturing)" }),
                                React.createElement("stop", { offset: "55%", stopColor: "var(--c-cities)" }),
                                React.createElement("stop", { offset: "100%", stopColor: "var(--c-water)" })),
                            React.createElement("linearGradient", { id: "curveFill", x1: "0", x2: "0", y1: "0", y2: "1" },
                                React.createElement("stop", { offset: "0%", stopColor: "var(--c-cities)", stopOpacity: "0.18" }),
                                React.createElement("stop", { offset: "100%", stopColor: "var(--c-cities)", stopOpacity: "0" }))),
                        [0.2, 0.5, 0.8].map(g => (React.createElement("line", { key: g, x1: PAD, x2: W - PAD, y1: 30 + g * (H - 60), y2: 30 + g * (H - 60), stroke: "var(--rule-faint)", strokeDasharray: "2 4" }))),
                        React.createElement("text", { x: PAD - 6, y: 36, textAnchor: "end", className: "curve-axis" }, "low risk"),
                        React.createElement("text", { x: PAD - 6, y: H - 24, textAnchor: "end", className: "curve-axis" }, "high risk"),
                        React.createElement("path", { d: `${pathD} L ${xAt(STAGES.length - 1)} ${H - 20} L ${PAD} ${H - 20} Z`, fill: "url(#curveFill)" }),
                        React.createElement("path", { d: pathD, fill: "none", stroke: "url(#curveGrad)", strokeWidth: "2" }),
                        STAGES.map((s, i) => {
                            if (!s.valley)
                                return null;
                            const x = xAt(i);
                            return (React.createElement("g", { key: s.id },
                                React.createElement("rect", { x: x - 36, y: 20, width: 72, height: H - 40, fill: "var(--c-cities)", fillOpacity: "0.08" }),
                                React.createElement("text", { x: x, y: 20, textAnchor: "middle", className: "valley-label" }, "VALLEY OF DEATH")));
                        }),
                        STAGES.map((s, i) => {
                            const x = xAt(i);
                            const y = yAt(s.dip);
                            const isActive = s.id === active;
                            return (React.createElement("g", { key: s.id, onClick: () => setActive(s.id), onMouseEnter: () => setActive(s.id), style: { cursor: "pointer" } },
                                React.createElement("line", { x1: x, y1: y, x2: x, y2: H - 20, stroke: isActive ? "var(--fg)" : "var(--rule)", strokeWidth: isActive ? 1 : 0.7 }),
                                React.createElement("circle", { cx: x, cy: y, r: isActive ? 8 : 5, fill: "var(--bg)", stroke: isActive ? "var(--fg)" : "var(--fg-muted)", strokeWidth: "1.5" }),
                                isActive && React.createElement("circle", { cx: x, cy: y, r: "2.5", fill: "var(--fg)" }),
                                React.createElement("text", { x: x, y: H - 6, textAnchor: "middle", className: `curve-stage ${isActive ? "on" : ""}` },
                                    String(i + 1).padStart(2, "0"),
                                    " \u00B7 ",
                                    s.label)));
                        }))),
                React.createElement("div", { className: "corridor-stages" }, STAGES.map((s, i) => (React.createElement("button", { key: s.id, className: `corridor-stage ${active === s.id ? "active" : ""} ${s.valley ? "valley" : ""}`, onClick: () => setActive(s.id), onMouseEnter: () => setActive(s.id) },
                    React.createElement("div", { className: "cs-num" }, String(i + 1).padStart(2, "0")),
                    React.createElement("div", { className: "cs-label" }, s.label),
                    React.createElement("div", { className: "cs-gates" }, s.gates.join(" · ")))))),
                React.createElement("div", { className: "corridor-detail" },
                    React.createElement("div", { className: "cd-head" },
                        React.createElement("div", { className: "meta" },
                            "\u25BC Gate ",
                            String(STAGES.findIndex(s => s.id === cur.id) + 1).padStart(2, "0"),
                            " \u00B7 ",
                            cur.label),
                        React.createElement("div", { className: "cd-ask" }, cur.ask)),
                    React.createElement("div", { className: "cd-grid" },
                        React.createElement("div", { className: "cd-cell" },
                            React.createElement("div", { className: "meta" }, "Readiness window"),
                            React.createElement("div", { className: "cd-gates" }, cur.gates.map(g => React.createElement("span", { key: g, className: "chip" }, g)))),
                        React.createElement("div", { className: "cd-cell" },
                            React.createElement("div", { className: "meta" }, "What this stage is"),
                            React.createElement("p", null, cur.desc)),
                        React.createElement("div", { className: "cd-cell" },
                            React.createElement("div", { className: "meta" }, "What kills tech here"),
                            React.createElement("p", { style: { color: "var(--c-cities)" } }, cur.kills)),
                        React.createElement("div", { className: "cd-cell" },
                            React.createElement("div", { className: "meta" }, "Engineering move to advance"),
                            React.createElement("ul", { className: "cd-moves" }, cur.moves.map(m => React.createElement("li", { key: m }, m)))))),
                React.createElement("div", { className: "corridor-allmoves" },
                    React.createElement("div", { className: "meta", style: { marginBottom: 10 } }, "Eleven scale-up moves, sequenced and interdependent"),
                    React.createElement("div", { className: "allmoves-grid" }, window.FSA.PATHWAYS.map((m, i) => (React.createElement("div", { key: m, className: "am-pill" },
                        React.createElement("span", { className: "am-num" }, String(i + 1).padStart(2, "0")),
                        React.createElement("span", { className: "am-label" }, m))))))))));
}
/* ── Evidence ─────────────────────────────────────────────── */
function Evidence() {
    const postures = [
        { id: "direct", label: "Direct", desc: "Cards backed by demonstrated mechanisms, peer-reviewed measurements, or operating pilots.", ex: "Operating pilots, peer-reviewed performance data, primary engineering datasheets." },
        { id: "roadmap", label: "Roadmap", desc: "Cards supported by program roadmaps, public targets, or early-stage demonstrations.", ex: "Agency roadmaps, target performance specs, lab-scale demos at the right physics." },
        { id: "analogue", label: "Analogue", desc: "Cards sourced from adjacent industries or first-principles arguments — clearly marked speculative.", ex: "Analogues from petrochemicals, aerospace, marine, or older programs in similar physics." },
    ];
    return (React.createElement("section", { id: "sources", className: "section" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-012 \u00B7 Evidence layer", kicker: "Three postures \u00B7 244 sources", title: "Every claim is tagged so speculative concepts do not read like deployed systems.", lede: "The atlas separates broad engineering reasoning from card-specific source support. Cost, timeline, and deployment claims still need primary or project-specific evidence." }),
            React.createElement("div", { className: "evidence-stack" },
                React.createElement("div", { className: "evidence-grid" }, postures.map(p => (React.createElement("div", { key: p.id, className: "evidence-card", "data-tone": p.id },
                    React.createElement("div", { className: "ev-head" },
                        React.createElement("span", { className: "chip", "data-evidence": p.id },
                            React.createElement("span", { className: "dot" }),
                            p.label),
                        React.createElement("span", { className: "meta" }, p.id === "direct" ? (window.FSA.ENTRIES.filter(e => e.evidence === "direct").length + " cards") :
                            p.id === "roadmap" ? (window.FSA.ENTRIES.filter(e => e.evidence === "roadmap").length + " cards") :
                                (window.FSA.ENTRIES.filter(e => e.evidence === "analogue").length + " cards"))),
                    React.createElement("div", { className: "ev-desc" }, p.desc),
                    React.createElement("div", { className: "ev-ex" }, p.ex))))),
                React.createElement("div", { className: "evidence-note" },
                    React.createElement("span", { className: "meta" }, "Caution map"),
                    React.createElement("p", null, "Broad sources support the engineering lens; direct card sources support specific mechanisms or bottlenecks. Cost, timeline, deployment, and performance claims still need primary or current project-specific evidence. Speculative cards are intentionally marked analogue.")),
                React.createElement(SourcesList, null)))));
}
/* ── Source bank list ─────────────────────────────────────── */
function SourcesList() {
    const sources = window.FSA.SOURCES;
    const sectors = window.FSA.SECTORS;
    const [q, setQ] = useState("");
    const [evFilter, setEvFilter] = useState(null);
    const [sectorFilter, setSectorFilter] = useState(null);
    const filtered = sources.filter(s => {
        if (evFilter && s.ev !== evFilter)
            return false;
        if (sectorFilter && s.sector !== sectorFilter)
            return false;
        if (q) {
            const t = q.toLowerCase();
            if (!s.title.toLowerCase().includes(t) && !s.org.toLowerCase().includes(t))
                return false;
        }
        return true;
    });
    return (React.createElement("div", { className: "sources" },
        React.createElement("div", { className: "sources-head" },
            React.createElement("div", { className: "sources-title" },
                "Source bank \u00B7 ",
                sources.length,
                " records"),
            React.createElement("div", { className: "sources-filters" },
                React.createElement("div", { className: "src-filter-group", role: "group", "aria-label": "Filter by evidence posture" },
                    React.createElement("span", { className: "src-filter-label" }, "Posture"),
                    React.createElement("button", { className: `src-filter src-filter-ev ${!evFilter ? "on" : ""}`, onClick: () => setEvFilter(null) }, "All"),
                    ["direct", "roadmap", "analogue"].map(ev => (React.createElement("button", { key: ev, className: `src-filter src-filter-ev ${evFilter === ev ? "on" : ""}`, onClick: () => setEvFilter(evFilter === ev ? null : ev), "data-ev": ev }, ev)))),
                React.createElement("div", { className: "src-filter-divider", "aria-hidden": "true" }),
                React.createElement("div", { className: "src-filter-group", role: "group", "aria-label": "Filter by sector" },
                    React.createElement("span", { className: "src-filter-label" }, "Sector"),
                    React.createElement("button", { className: `src-filter src-filter-sector ${!sectorFilter ? "on" : ""}`, onClick: () => setSectorFilter(null) }, "All"),
                    sectors.map(s => (React.createElement("button", { key: s.id, className: `src-filter src-filter-sector ${sectorFilter === s.id ? "on" : ""}`, onClick: () => setSectorFilter(sectorFilter === s.id ? null : s.id) }, s.label)))))),
        React.createElement("div", { className: "atlas-search", style: { marginBottom: 12 } },
            React.createElement("span", { className: "atlas-search-icon" }, "\u2315"),
            React.createElement("input", { type: "text", placeholder: "Search the source bank\u2026", value: q, onChange: e => setQ(e.target.value) }),
            q && React.createElement("button", { className: "atlas-search-clear", onClick: () => setQ("") }, "\u00D7")),
        React.createElement("div", { className: "sources-list" },
            filtered.map(s => (React.createElement("div", { key: s.id, className: "source-row" },
                React.createElement("span", { className: "source-year" },
                    s.id,
                    " \u00B7 ",
                    s.year),
                React.createElement("span", { className: "source-title" }, s.title),
                React.createElement("span", { className: "source-org" }, s.org),
                React.createElement("span", { className: "source-tags" },
                    React.createElement("span", { className: "chip", "data-sector": s.sector },
                        React.createElement("span", { className: "dot" }),
                        s.sector)),
                React.createElement("span", { className: "source-posture", "data-ev": s.ev }, s.ev)))),
            filtered.length === 0 && (React.createElement("div", { className: "atlas-empty" }, "No sources match this filter."))),
        React.createElement("div", { className: "sources-count" },
            "Showing ",
            filtered.length,
            " / ",
            sources.length,
            " records \u00B7 evidence tag indicates how strongly each citation supports its claims.")));
}
/* ── Author note ──────────────────────────────────────────── */
function AuthorNote() {
    return (React.createElement("section", { id: "about", className: "section section-author section-about" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA \u00B7 ABOUT", kicker: "Builder note \u00B7 contact", title: "Built by Nathan Anderson to show frontier technology as process architecture.", lede: "This is a portfolio artifact for process-engineering judgment: what must become repeatable, manufacturable, safe, affordable, and integrated before a future system can change the built world." }),
            React.createElement("div", { className: "about-grid" },
                React.createElement("div", { className: "author-body about-main" },
                    React.createElement("p", null, "I built Future Systems Atlas as a Chemical & Biomolecular Engineering student interested in the gap between frontier invention and real-world deployment."),
                    React.createElement("p", null, "The project reflects the way I want to think as a process engineer: not just asking whether a technology is possible, but mapping the feedstocks, unit operations, bottlenecks, readiness gaps, and evidence posture that would determine whether it can actually scale."),
                    React.createElement("p", null, "My working thesis: optimistic future technologies become credible when they are translated into process windows, manufacturing rules, reliability tests, infrastructure interfaces, and source-backed assumptions.")),
                React.createElement("aside", { className: "about-card" },
                    React.createElement("div", { className: "meta" }, "Nathan Anderson"),
                    React.createElement("h3", null, "Chemical & Biomolecular Engineering"),
                    React.createElement("p", null, "Process systems \u00B7 clean technology \u00B7 advanced manufacturing \u00B7 future infrastructure."),
                    React.createElement("div", { className: "about-links" },
                        React.createElement("a", { href: "mailto:fivemoc@gmail.com" }, "Email Nathan \u2192"),
                        React.createElement("a", { href: "https://github.com/nanderson92", target: "_blank", rel: "noreferrer" }, "GitHub \u2192"),
                        React.createElement("a", { href: "https://nanderson92.github.io", target: "_blank", rel: "noreferrer" }, "Main portfolio \u2192")))))));
}
/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
    return (React.createElement("footer", { className: "footer" },
        React.createElement("div", { className: "footer-inner" },
            React.createElement("div", null,
                React.createElement("h3", null, "Future Systems Atlas"),
                React.createElement("p", { className: "desc" }, "A process-engineering atlas for frontier technologies, manufacturability constraints, and deployment pathways."),
                React.createElement("p", { className: "footer-meta", style: { marginTop: 24 } }, "The future is not just invented. It is scaled.")),
            React.createElement("div", { className: "footer-links" },
                React.createElement("div", { className: "meta", style: { marginBottom: 4 } }, "Navigation"),
                React.createElement("a", { href: "#system" }, "System map"),
                React.createElement("a", { href: "#chemicals" }, "Chemicals"),
                React.createElement("a", { href: "#unitops" }, "Unit ops"),
                React.createElement("a", { href: "#readiness" }, "Readiness"),
                React.createElement("a", { href: "#atlas" }, "Atlas index"),
                React.createElement("a", { href: "#sources" }, "Sources"),
                React.createElement("a", { href: "#about" }, "About / contact")),
            React.createElement("div", { className: "footer-links" },
                React.createElement("div", { className: "meta", style: { marginBottom: 4 } }, "Sheet"),
                React.createElement("a", null, "FSA \u00B7 MASTER \u00B7 Rev 2026.05"),
                React.createElement("a", null, "Last updated \u00B7 May 2026"),
                React.createElement("a", null, "Built by Nathan Anderson"),
                React.createElement("a", null, "Independent engineering artifact"))),
        React.createElement("div", { className: "footer-stamp" },
            React.createElement("span", null, "FSA \u00B7 MASTER"),
            React.createElement("span", null, "115 cards \u00B7 244 sources \u00B7 6 ops \u00B7 17 chem \u00B7 12 bottlenecks \u00B7 3 postures"),
            React.createElement("span", null, "\u00A9 N. Anderson 2026"))));
}
Object.assign(window, {
    Nav, Hero, SectionHead, CaseStudies, CasePFD,
    SystemMap, ChemicalSpine, UnitOps, Readiness,
    Pathways, Evidence, AuthorNote, Footer,
    FieldGuide, DefineTerm, DEFS
});

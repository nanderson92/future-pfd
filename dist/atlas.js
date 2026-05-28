/* ────────────────────────────────────────────────────────────
   Atlas Index — 115-card filterable browser.
   ──────────────────────────────────────────────────────────── */
function Atlas() {
    const entries = window.FSA.ENTRIES;
    const sectors = window.FSA.SECTORS;
    const bottlenecks = window.FSA.BOTTLENECKS;
    const chems = window.FSA.CHEMICALS;
    const ops = window.FSA.UNIT_OPS;
    const [q, setQ] = React.useState("");
    const [sector, setSector] = React.useState(null);
    const [bn, setBn] = React.useState(null);
    const [ev, setEv] = React.useState(null);
    const [chem, setChem] = React.useState(null);
    const [op, setOp] = React.useState(null);
    const [view, setView] = React.useState("cards"); // cards | compact
    const [open, setOpen] = React.useState(null);
    React.useEffect(() => {
        const applyFilter = (detail = {}) => {
            setSector(detail.sector || null);
            setBn(detail.bn || null);
            setEv(detail.ev || null);
            setChem(detail.chem || null);
            setOp(detail.op || null);
            setQ(detail.q || "");
            setView("cards");
        };
        const onSector = (e) => applyFilter({ sector: e.detail });
        const onFilter = (e) => applyFilter(e.detail || {});
        window.addEventListener("fsa:atlas-sector", onSector);
        window.addEventListener("fsa:atlas-filter", onFilter);
        if (window.FSA_PENDING_ATLAS_FILTER) {
            applyFilter(window.FSA_PENDING_ATLAS_FILTER);
            window.FSA_PENDING_ATLAS_FILTER = null;
        }
        return () => {
            window.removeEventListener("fsa:atlas-sector", onSector);
            window.removeEventListener("fsa:atlas-filter", onFilter);
        };
    }, []);
    const filtered = React.useMemo(() => {
        return entries.filter(e => {
            if (sector && e.sector !== sector)
                return false;
            if (bn && e.bottleneck !== bn)
                return false;
            if (ev && e.evidence !== ev)
                return false;
            if (chem && e.chemical !== chem)
                return false;
            if (op && e.unitOp !== op)
                return false;
            if (q) {
                const s = q.toLowerCase();
                if (!e.name.toLowerCase().includes(s) && !e.pid.toLowerCase().includes(s))
                    return false;
            }
            return true;
        });
    }, [entries, sector, bn, ev, chem, op, q]);
    const reset = () => { setQ(""); setSector(null); setBn(null); setEv(null); setChem(null); setOp(null); };
    const hasFilter = sector || bn || ev || chem || op || q;
    return (React.createElement("section", { id: "atlas", className: "section section-atlas" },
        React.createElement("div", { className: "frame" },
            React.createElement(SectionHead, { code: "FSA-010 \u00B7 Atlas index", kicker: "115 cards", title: "Process Architecture Index.", lede: "Filter by sector, bottleneck, evidence posture, chemical spine, or unit operation. The curated sections above explain the system; this index preserves the full terrain." }),
            React.createElement("div", { className: "atlas" },
                React.createElement("div", { className: "atlas-controls" },
                    React.createElement("div", { className: "atlas-search" },
                        React.createElement("span", { className: "atlas-search-icon" }, "\u2315"),
                        React.createElement("input", { type: "text", placeholder: "Search the atlas \u2014 try 'fusion', 'DAC', 'membrane'\u2026", value: q, onChange: e => setQ(e.target.value) }),
                        q && React.createElement("button", { className: "atlas-search-clear", onClick: () => setQ("") }, "\u00D7")),
                    React.createElement("div", { className: "atlas-view" },
                        React.createElement("button", { className: view === "cards" ? "on" : "", onClick: () => setView("cards") }, "\u229E Cards"),
                        React.createElement("button", { className: view === "compact" ? "on" : "", onClick: () => setView("compact") }, "\u2630 Compact"))),
                React.createElement("div", { className: "atlas-filters" },
                    React.createElement("div", { className: "filter-group" },
                        React.createElement("div", { className: "filter-label" }, "Sector"),
                        React.createElement("div", { className: "filter-pills" }, sectors.map(s => (React.createElement("button", { key: s.id, className: `pill ${sector === s.id ? "active" : ""}`, "data-sector": s.id, onClick: () => setSector(sector === s.id ? null : s.id) },
                            React.createElement("span", { className: "pill-dot" }),
                            s.label,
                            React.createElement("span", { className: "pill-count" }, s.count)))))),
                    React.createElement("div", { className: "filter-group" },
                        React.createElement("div", { className: "filter-label" }, "Bottleneck"),
                        React.createElement("div", { className: "filter-pills" }, bottlenecks.slice(0, 8).map(b => (React.createElement("button", { key: b.id, className: `pill ${bn === b.id ? "active" : ""}`, onClick: () => setBn(bn === b.id ? null : b.id) }, b.label))))),
                    React.createElement("div", { className: "filter-group" },
                        React.createElement("div", { className: "filter-label" }, "Evidence"),
                        React.createElement("div", { className: "filter-pills" }, ["direct", "roadmap", "analogue"].map(e => (React.createElement("button", { key: e, className: `pill ${ev === e ? "active" : ""}`, "data-evidence": e, onClick: () => setEv(ev === e ? null : e) },
                            React.createElement("span", { className: "pill-dot" }),
                            e))))),
                    React.createElement("div", { className: "filter-group filter-group-2col" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "filter-label" }, "Chemical / material"),
                            React.createElement("select", { value: chem || "", onChange: e => setChem(e.target.value || null), className: "atlas-select" },
                                React.createElement("option", { value: "" }, "All chemicals"),
                                chems.map(c => React.createElement("option", { key: c.sym, value: c.sym },
                                    c.sym,
                                    " \u2014 ",
                                    c.name)))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "filter-label" }, "Unit operation"),
                            React.createElement("select", { value: op || "", onChange: e => setOp(e.target.value || null), className: "atlas-select" },
                                React.createElement("option", { value: "" }, "All unit ops"),
                                ops.map(o => React.createElement("option", { key: o.id, value: o.id }, o.label)))))),
                React.createElement("div", { className: "atlas-meta" },
                    React.createElement("div", { className: "meta" },
                        "Showing ",
                        React.createElement("span", { style: { color: "var(--fg)" } }, filtered.length),
                        " / ",
                        entries.length,
                        " cards"),
                    hasFilter && (React.createElement("button", { className: "atlas-reset", onClick: reset }, "Reset filters \u00D7"))),
                view === "cards" ? (React.createElement("div", { className: "atlas-grid" },
                    filtered.map(e => React.createElement(AtlasCard, { key: e.pid, entry: e, onClick: () => setOpen(e) })),
                    filtered.length === 0 && React.createElement("div", { className: "atlas-empty" }, "No cards match this filter."))) : (React.createElement("div", { className: "atlas-table" },
                    React.createElement("div", { className: "atlas-row atlas-row-head" },
                        React.createElement("span", null, "PFD"),
                        React.createElement("span", null, "Name"),
                        React.createElement("span", null, "Sector"),
                        React.createElement("span", null, "Chem"),
                        React.createElement("span", null, "Op"),
                        React.createElement("span", null, "Bottleneck"),
                        React.createElement("span", null, "Evidence"),
                        React.createElement("span", null, "Readiness")),
                    filtered.map(e => (React.createElement("div", { key: e.pid, className: "atlas-row", onClick: () => setOpen(e) },
                        React.createElement("span", { className: "meta" }, e.pid),
                        React.createElement("span", { className: "row-name" }, e.name),
                        React.createElement("span", { className: "chip", "data-sector": e.sector },
                            React.createElement("span", { className: "dot" }),
                            e.sector),
                        React.createElement("span", { className: "meta" }, e.chemical),
                        React.createElement("span", { className: "meta" }, ops.find(o => o.id === e.unitOp)?.label),
                        React.createElement("span", { className: "meta" }, bottlenecks.find(b => b.id === e.bottleneck)?.label),
                        React.createElement("span", { className: "chip", "data-evidence": e.evidence },
                            React.createElement("span", { className: "dot" }),
                            e.evidence),
                        React.createElement(ReadinessMini, { trl: e.trl, mrl: e.mrl, irl: e.irl, tone: e.sector })))),
                    filtered.length === 0 && React.createElement("div", { className: "atlas-empty" }, "No cards match this filter."))))),
        open && React.createElement(AtlasModal, { entry: open, onClose: () => setOpen(null) })));
}
function AtlasCard({ entry, onClick }) {
    const { pid, name, sector, chemical, bottleneck, evidence, trl, mrl, irl } = entry;
    const bnLabel = window.FSA.BOTTLENECKS.find(b => b.id === bottleneck)?.label;
    const chem = window.FSA.CHEMICALS.find(c => c.sym === chemical);
    return (React.createElement("button", { className: "atlas-card", "data-sector": sector, onClick: onClick },
        React.createElement("div", { className: "ac-head" },
            React.createElement("span", { className: "meta" }, pid),
            React.createElement("span", { className: "chip", "data-evidence": evidence },
                React.createElement("span", { className: "dot" }),
                evidence)),
        React.createElement("div", { className: "ac-name" }, name),
        entry.description && React.createElement("p", { className: "ac-desc" }, entry.description),
        React.createElement("div", { className: "ac-spine" },
            React.createElement("div", { className: "ac-spine-glyph", style: { borderColor: `var(--c-${sector})`, color: `var(--c-${sector})` } },
                React.createElement("span", { className: "ac-spine-sym" }, chemical)),
            React.createElement("div", { className: "ac-spine-meta" },
                React.createElement("div", { className: "meta" }, "spine"),
                React.createElement("div", { className: "ac-spine-name" }, chem?.name || chemical))),
        React.createElement("div", { className: "ac-ladder" },
            React.createElement(ReadinessRow, { label: "TRL", value: trl, max: 9, tone: sector }),
            React.createElement(ReadinessRow, { label: "MRL", value: mrl, max: 9, tone: sector }),
            React.createElement(ReadinessRow, { label: "IRL", value: irl, max: 9, tone: sector })),
        React.createElement("div", { className: "ac-foot" },
            React.createElement("div", { className: "meta" }, "Bottleneck"),
            React.createElement("div", { className: "ac-foot-val" }, bnLabel)),
        React.createElement("span", { className: "ac-sector-bar", style: { background: `var(--c-${sector})` } })));
}
function ReadinessRow({ label, value, max, tone }) {
    return (React.createElement("div", { className: "rl-row" },
        React.createElement("span", { className: "rl-label" }, label),
        React.createElement("span", { className: "rl-bar" }, [...Array(max)].map((_, i) => (React.createElement("span", { key: i, className: `rl-tick ${i < value ? "on" : ""}`, style: i < value ? { background: `var(--c-${tone})` } : null })))),
        React.createElement("span", { className: "rl-val tnum" },
            value,
            "/",
            max)));
}
function ReadinessMini({ trl, mrl, irl, tone }) {
    const rows = [
        { label: "T", v: trl, max: 9 },
        { label: "M", v: mrl, max: 9 },
        { label: "I", v: irl, max: 9 },
    ];
    return (React.createElement("span", { className: "rmini", title: `TRL ${trl}/9 · MRL ${mrl}/9 · IRL ${irl}/9` }, rows.map(r => (React.createElement("span", { key: r.label, className: "rmini-row" },
        React.createElement("span", { className: "rmini-lab" }, r.label),
        React.createElement("span", { className: "rmini-bar" },
            React.createElement("span", { className: "rmini-fill", style: { width: `${(r.v / r.max) * 100}%`, background: `var(--c-${tone})` } })))))));
}
function AtlasModal({ entry, onClose }) {
    React.useEffect(() => {
        const k = e => { if (e.key === "Escape")
            onClose(); };
        window.addEventListener("keydown", k);
        return () => window.removeEventListener("keydown", k);
    }, [onClose]);
    const bnLabel = window.FSA.BOTTLENECKS.find(b => b.id === entry.bottleneck)?.label;
    const opLabel = window.FSA.UNIT_OPS.find(o => o.id === entry.unitOp)?.label;
    const chem = window.FSA.CHEMICALS.find(c => c.sym === entry.chemical);
    const steps = entry.flow || [
        ["P-101", "Process input"],
        ["U-201", opLabel || "Unit operation"],
        ["C-301", "Control window"],
        ["Q-401", "Verification"],
        ["O-501", "Deployable output"],
    ];
    return (React.createElement("div", { className: "modal-scrim", onClick: onClose },
        React.createElement("div", { className: "modal", onClick: e => e.stopPropagation(), "data-sector": entry.sector },
            React.createElement("div", { className: "modal-head" },
                React.createElement("div", null,
                    React.createElement("div", { className: "meta" },
                        entry.pid,
                        " \u00B7 ",
                        entry.sector),
                    React.createElement("div", { className: "modal-title" }, entry.name),
                    entry.description && React.createElement("p", { className: "modal-deck" }, entry.description)),
                React.createElement("button", { className: "modal-close", onClick: onClose }, "Close \u00D7")),
            React.createElement("div", { className: "modal-body" },
                React.createElement("div", { className: "modal-flow" },
                    React.createElement("div", { className: "meta" }, "Process flow"),
                    React.createElement("div", { className: "pfd-blocks", style: { marginTop: 12 } }, steps.map(([code, name], i) => (React.createElement("div", { key: i, className: "pfd-block" },
                        React.createElement("span", { className: "pfd-block-code" }, code),
                        React.createElement("span", { className: "pfd-block-name" }, name),
                        i < steps.length - 1 && React.createElement("span", { className: "pfd-arrow" })))))),
                React.createElement("div", { className: "modal-meta" },
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Sector"),
                        React.createElement("span", { className: "chip", "data-sector": entry.sector },
                            React.createElement("span", { className: "dot" }),
                            entry.sector)),
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Chemical spine"),
                        React.createElement("span", null,
                            React.createElement("strong", null, entry.chemical),
                            " \u00B7 ",
                            chem?.name)),
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Primary unit op"),
                        React.createElement("span", null, opLabel)),
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Bottleneck"),
                        React.createElement("span", { style: { color: `var(--c-${entry.sector})` } }, bnLabel)),
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Scale trigger"),
                        React.createElement("span", null, entry.scaleTrigger)),
                    React.createElement("div", { className: "mm-row" },
                        React.createElement("span", { className: "meta" }, "Evidence posture"),
                        React.createElement("span", { className: "chip", "data-evidence": entry.evidence },
                            React.createElement("span", { className: "dot" }),
                            entry.evidence)),
                    React.createElement("div", { className: "mm-readiness-block" },
                        React.createElement("div", { className: "meta", style: { marginBottom: 10 } }, "Readiness"),
                        React.createElement("div", { className: "ac-ladder" },
                            React.createElement(ReadinessRow, { label: "TRL", value: entry.trl, max: 9, tone: entry.sector }),
                            React.createElement(ReadinessRow, { label: "MRL", value: entry.mrl, max: 9, tone: entry.sector }),
                            React.createElement(ReadinessRow, { label: "IRL", value: entry.irl, max: 9, tone: entry.sector }))))))));
}
Object.assign(window, { Atlas, AtlasCard, AtlasModal, ReadinessRow, ReadinessMini });

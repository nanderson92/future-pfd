/* ────────────────────────────────────────────────────────────
   Ambient starfield background.
   Three depth layers of points with subtle parallax drift.
   ──────────────────────────────────────────────────────────── */
function Topology() {
    const W = 1600;
    const H = 1000;
    // Deterministic pseudo-random
    const seeded = (n) => {
        const x = Math.sin(n * 9301 + 49297) * 233280;
        return x - Math.floor(x);
    };
    // Three layers: far (many, tiny), mid, near (few, larger).
    const layers = React.useMemo(() => {
        const make = (count, rMin, rMax, opMin, opMax, salt) => Array.from({ length: count }, (_, i) => {
            const k = i + salt;
            return {
                x: seeded(k) * W,
                y: seeded(k + 9000) * H,
                r: rMin + seeded(k + 18000) * (rMax - rMin),
                o: opMin + seeded(k + 27000) * (opMax - opMin),
                tw: seeded(k + 36000), // twinkle phase 0..1
            };
        });
        return {
            far: make(220, 0.35, 0.75, 0.35, 0.7, 1),
            mid: make(90, 0.7, 1.3, 0.55, 0.85, 2),
            near: make(26, 1.2, 2.1, 0.75, 1.0, 3),
            // a few "highlight" stars with a soft halo
            bright: make(8, 1.6, 2.4, 0.9, 1.0, 4),
        };
    }, []);
    return (React.createElement("div", { className: "topology", "aria-hidden": "true" },
        React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "xMidYMid slice" },
            React.createElement("defs", null,
                React.createElement("radialGradient", { id: "starHalo", cx: "50%", cy: "50%", r: "50%" },
                    React.createElement("stop", { offset: "0%", stopColor: "var(--topo-line-strong)", stopOpacity: "1" }),
                    React.createElement("stop", { offset: "40%", stopColor: "var(--topo-line-strong)", stopOpacity: "0.35" }),
                    React.createElement("stop", { offset: "100%", stopColor: "var(--topo-line-strong)", stopOpacity: "0" }))),
            React.createElement("g", { className: "drift drift-far" }, layers.far.map((d, i) => (React.createElement("circle", { key: i, cx: d.x, cy: d.y, r: d.r, fill: "var(--topo-line)", opacity: d.o })))),
            React.createElement("g", { className: "drift drift-mid" }, layers.mid.map((d, i) => (React.createElement("circle", { key: i, cx: d.x, cy: d.y, r: d.r, fill: "var(--topo-line-strong)", opacity: d.o, className: d.tw > 0.7 ? "twinkle" : "", style: d.tw > 0.7 ? { animationDelay: `${(d.tw * 6).toFixed(2)}s` } : null })))),
            React.createElement("g", { className: "drift drift-near" }, layers.near.map((d, i) => (React.createElement("circle", { key: i, cx: d.x, cy: d.y, r: d.r, fill: "var(--topo-line-strong)", opacity: d.o, className: d.tw > 0.55 ? "twinkle" : "", style: d.tw > 0.55 ? { animationDelay: `${(d.tw * 5).toFixed(2)}s` } : null })))),
            React.createElement("g", { className: "drift drift-near" }, layers.bright.map((d, i) => (React.createElement("g", { key: i, transform: `translate(${d.x.toFixed(1)} ${d.y.toFixed(1)})` },
                React.createElement("circle", { r: d.r * 4, fill: "url(#starHalo)", opacity: "0.35" }),
                React.createElement("circle", { r: d.r, fill: "var(--topo-line-strong)", opacity: d.o, className: "twinkle", style: { animationDelay: `${(d.tw * 4).toFixed(2)}s` } }))))))));
}
window.Topology = Topology;

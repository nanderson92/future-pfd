/* ────────────────────────────────────────────────────────────
   Future Systems Atlas — App shell + Tweaks
   ──────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "typography": "grotesque",
  "motion": "on",
  "accent": "energy"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply theme + typography to <body>
  React.useEffect(() => {
    document.body.setAttribute("data-theme", t.theme);
    document.body.setAttribute("data-mono", t.typography);
    document.body.setAttribute("data-motion", t.motion);
    document.body.setAttribute("data-accent", t.accent);
  }, [t.theme, t.typography, t.motion, t.accent]);

  return (
    <>
      <Topology />
      <CoordinateGutters />
      <Nav />
      <main className="sheet">
        <Hero />
        <FieldGuide />
        <GalaxyMap />
        <CaseStudies />
        <SystemMap />
        <ChemicalSpine />
        <UnitOps />
        <Readiness />
        <Pathways />
        <Atlas />
        <Evidence />
        <AuthorNote />
      </main>
      <Footer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Surface">
          <window.TweakRadio
            label="Theme"
            value={t.theme}
            onChange={v => setTweak("theme", v)}
            options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
          />
        </window.TweakSection>
        <window.TweakSection title="Typography">
          <window.TweakSelect
            label="Pairing"
            value={t.typography}
            onChange={v => setTweak("typography", v)}
            options={[
              { value: "grotesque", label: "Grotesque + Mono (default)" },
              { value: "serif",     label: "Serif headlines + Mono meta" },
              { value: "mono",      label: "All mono (terminal)" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Motion">
          <window.TweakRadio
            label="Ambient motion"
            value={t.motion}
            onChange={v => setTweak("motion", v)}
            options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]}
          />
        </window.TweakSection>
        <window.TweakSection title="Accent">
          <window.TweakColor
            label="Hero accent"
            value={t.accent}
            onChange={v => setTweak("accent", v)}
            options={[
              { value: "energy",    color: "oklch(0.80 0.155 80)" },
              { value: "carbon",    color: "oklch(0.78 0.135 195)" },
              { value: "water",     color: "oklch(0.76 0.145 245)" },
              { value: "materials", color: "oklch(0.76 0.155 335)" },
              { value: "manufacturing", color: "oklch(0.80 0.145 150)" },
              { value: "cities",    color: "oklch(0.78 0.155 35)" },
              { value: "space",     color: "oklch(0.76 0.155 290)" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

/* ── Coordinate gutters (top/bottom/left/right rules) ─────── */
function CoordinateGutters() {
  return (
    <>

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

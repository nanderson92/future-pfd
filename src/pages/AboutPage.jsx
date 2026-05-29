import About from "../components/About.jsx";

export default function AboutPage() {
  return (
    <section className="page-shell about-page" aria-labelledby="about-title">
      <div className="page-head">
        <p className="eyebrow">Builder note / recruiting path</p>
        <h1 id="about-title">Nathan Anderson</h1>
        <p>
          Chemical & Biomolecular Engineering, Georgia Tech. I am looking for process, R&D,
          scale-up, clean tech, advanced manufacturing, and future-systems engineering work where
          the hard question is whether a promising technology can actually be built.
        </p>
      </div>

      <About />

      <section className="credentials-panel" aria-labelledby="credentials-title">
        <h2 id="credentials-title">Engineering Signals</h2>
        <ul>
          <li>
            <strong>Georgia Tech ChBE undergraduate</strong>
            <span>Chemical and biomolecular engineering training applied to process systems, clean tech, and advanced manufacturing.</span>
          </li>
          <li>
            <strong>115 technology process cards</strong>
            <span>Each card decomposes a frontier technology into material spine, unit operation, bottleneck, readiness, and scale trigger.</span>
          </li>
          <li>
            <strong>244 typed source records</strong>
            <span>Evidence is separated into direct, roadmap, and analogue posture so deployment claims are not treated equally.</span>
          </li>
        </ul>
      </section>

      <div className="about-grid">
        <section>
          <h2>Project Origin</h2>
          <p>
            I built Future Systems Atlas because frontier technologies are usually explained as
            predictions or products. I wanted to show the engineering layer underneath: what goes in,
            what transforms, what breaks first at scale, and which claims have direct evidence versus
            roadmap or analogue support.
          </p>
          <p>
            The thesis is simple: optimistic future systems become credible when they can be mapped
            as repeatable, manufacturable, source-backed process flows.
          </p>
        </section>
        <aside className="contact-panel">
          <h2>Contact</h2>
          <a className="primary-contact" href="#cases">Start with the six process cases</a>
          <a href="mailto:fivemoc@gmail.com">Email Nathan</a>
          <a href="https://github.com/nanderson92" target="_blank" rel="noreferrer">GitHub</a>
        </aside>
      </div>
    </section>
  );
}

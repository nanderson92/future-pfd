import About from "../components/About.jsx";

export default function AboutPage() {
  return (
    <section className="page-shell about-page" aria-labelledby="about-title">
      <div className="page-head">
        <p className="eyebrow">Builder note / recruiting path</p>
        <h1 id="about-title">Nathan Anderson</h1>
        <p>Chemical & Biomolecular Engineering, Georgia Tech.</p>
      </div>

      <About />

      <div className="about-grid">
        <section>
          <h2>Project Origin</h2>
          <p>
            I built Future Systems Atlas because frontier technologies are usually explained as
            predictions or products. I wanted to show the engineering layer underneath: chemicals,
            unit operations, process windows, scale-up bottlenecks, readiness gaps, and evidence posture.
          </p>
          <p>
            The thesis is simple: optimistic future systems become credible when they can be mapped
            as repeatable, manufacturable, source-backed process flows.
          </p>
        </section>
        <aside className="contact-panel">
          <h2>Contact</h2>
          <a href="mailto:fivemoc@gmail.com">Email Nathan</a>
          <span>LinkedIn URL placeholder</span>
          <a href="https://github.com/nanderson92" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://nanderson92.github.io/future-pfd/" target="_blank" rel="noreferrer">Portfolio project</a>
          <span>Resume PDF placeholder</span>
        </aside>
      </div>
    </section>
  );
}

const GUIDE_ITEMS = [
  ["PFD", "Process Flow Diagram", "A schematic of how matter and energy move through a process: inputs in, unit operations across, useful outputs out."],
  ["Unit op", "Unit operation", "A discrete physical or chemical step such as electrolysis, adsorption, filtration, deposition, heat exchange, forming, or qualification."],
  ["Spine", "Chemical spine", "The recurring molecules and materials that connect sectors: H2, CO2, NH3, Si, Li, H2O, carbon, copper, salts, and specialty materials."],
  ["TRL", "Technology Readiness Level", "Asks whether the underlying mechanism works, from early principles to a system proven in its real environment."],
  ["MRL", "Manufacturing Readiness Level", "Asks whether the process can meet yield, quality, cost, throughput, and repeatability at scale."],
  ["IRL", "Infrastructure Readiness Level", "Asks whether utilities, logistics, standards, service networks, permitting, and users can support deployment."],
  ["Limit", "Bottleneck", "The constraint most likely to block scale-up: dilute separations, energy intensity, reliability, supply chain, cost, regulation, or integration."],
  ["Proof", "Evidence posture", "Direct means close evidence. Roadmap means credible targets. Analogue means reasoning from adjacent systems and should stay marked as speculative."]
];

export default function GuidePage() {
  return (
    <section className="page-shell guide-page" aria-labelledby="guide-title">
      <div className="page-head">
        <p className="eyebrow">Reader protocol</p>
        <h1 id="guide-title">How to read the atlas.</h1>
        <p>
          The atlas treats futuristic capability as a process architecture problem:
          what goes in, what transforms it, what fails first, and what evidence exists.
        </p>
      </div>

      <div className="guide-grid">
        {GUIDE_ITEMS.map(([code, title, body]) => (
          <article className="guide-card" key={code}>
            <span>{code}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>

      <section className="protocol-band" aria-labelledby="protocol-title">
        <h2 id="protocol-title">Reader Protocol</h2>
        <ol>
          <li>Start with the visible product or capability.</li>
          <li>Identify the chemical, material, and energy inputs.</li>
          <li>Map the unit operations that transform those inputs.</li>
          <li>Name the bottleneck most likely to block scale-up.</li>
          <li>Separate TRL, MRL, and IRL instead of flattening readiness into one score.</li>
          <li>Check whether evidence is direct, roadmap-based, or analogue.</li>
        </ol>
      </section>
    </section>
  );
}

import { SOURCE_COUNT, TECHNOLOGY_COUNT, SECTORS } from "../data/atlasData.js";

export default function LandingPage() {
  return (
    <section className="landing-page" aria-labelledby="landing-title">
      <div className="landing-copy">
        <p className="eyebrow">Future Systems Atlas</p>
        <h1 id="landing-title">Future Systems Atlas</h1>
        <p className="subtitle">115 frontier technologies mapped as process systems.</p>
        <p className="thesis">Sci-fi becomes real when it becomes a process flow.</p>
        <p className="lede">
          Explore future technologies through the chemicals, unit operations, bottlenecks,
          readiness levels, and evidence required to make them deployable.
        </p>
        <div className="button-row">
          <a className="button primary" href="#map">Launch Atlas</a>
          <a className="button" href="#cases">View Cases</a>
          <a className="button" href="#sources">View Sources (244)</a>
          <a className="button quiet" href="#about">About Nathan</a>
        </div>
        <dl className="stat-strip" aria-label="Atlas scope">
          <div><dt>{TECHNOLOGY_COUNT}</dt><dd>technologies</dd></div>
          <div><dt>{SECTORS.length}</dt><dd>sectors</dd></div>
          <div><dt>{SOURCE_COUNT}</dt><dd>sources</dd></div>
          <div><dt>3</dt><dd>readiness layers</dd></div>
        </dl>
      </div>

      <a className="landing-visual" href="#map" aria-label="Launch the atlas map">
        <div className="orbit-preview" aria-hidden="true">
          <span className="preview-orbit a" />
          <span className="preview-orbit b" />
          <span className="preview-orbit c" />
          <span className="preview-core" />
          {SECTORS.map((sector, index) => {
            const positions = [
              ["26%", "35%", "62px"],
              ["36%", "68%", "54px"],
              ["50%", "26%", "52px"],
              ["64%", "62%", "58px"],
              ["75%", "38%", "56px"],
              ["54%", "78%", "50px"],
              ["82%", "70%", "60px"]
            ];
            const [x, y, size] = positions[index];
            return (
              <span
                className="preview-planet"
                data-sector={sector.id}
                key={sector.id}
                style={{ "--x": x, "--y": y, "--s": size }}
              />
            );
          })}
        </div>
        <div className="landing-visual-readout">
          <span>Canvas app loads on launch</span>
          <strong>Open map interface</strong>
        </div>
      </a>
    </section>
  );
}

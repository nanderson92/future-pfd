(function () {
  const atlas = window.FUTURE_SYSTEMS_ATLAS;
  const technologies = atlas.technologies;
  const sectors = atlas.sectors;
  const chemicals = atlas.chemicals;
  const unitOperations = atlas.unitOperations;
  const bottleneckTaxonomy = atlas.bottleneckTaxonomy;
  const sourceBank = atlas.sourceBank || [];
  const sectionSourceKeys = atlas.sectionSourceKeys || {};

  const state = {
    query: "",
    sector: "All",
    bottleneck: "All",
    chemical: "All",
    unitOperation: "All",
    evidenceStatus: "All",
    sourceQuery: "",
    view: "compact"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const elements = {
    heroMetrics: $("#heroMetrics"),
    masterStack: $("#masterStack"),
    sectorGrid: $("#sectorGrid"),
    chemicalGrid: $("#chemicalGrid"),
    unitOperationGrid: $("#unitOperationGrid"),
    bottleneckGrid: $("#bottleneckGrid"),
    readinessGrid: $("#readinessGrid"),
    pathwayGrid: $("#pathwayGrid"),
    caseStudyGrid: $("#caseStudyGrid"),
    sourceStats: $("#sourceStats"),
    evidenceMatrixGrid: $("#evidenceMatrixGrid"),
    evidenceAuditGrid: $("#evidenceAuditGrid"),
    sourceBankGrid: $("#sourceBankGrid"),
    sourceSearch: $("#sourceSearch"),
    search: $("#searchInput"),
    clearSearch: $("#clearSearch"),
    resetFilters: $("#resetFilters"),
    topPill: $("#topPill"),
    progressLinks: $$(".progress-rail a"),
    sectorFilters: $("#sectorFilters"),
    bottleneckFilters: $("#bottleneckFilters"),
    chemicalFilters: $("#chemicalFilters"),
    unitFilters: $("#unitFilters"),
    evidenceFilters: $("#evidenceFilters"),
    sectionPanels: {
      concept: $("#conceptSourcePanel"),
      readerProtocol: $("#readerProtocolSourcePanel"),
      chemicals: $("#chemicalSourcePanel"),
      unitOperations: $("#unitSourcePanel"),
      readiness: $("#readinessSourcePanel"),
      pathways: $("#pathwaySourcePanel"),
      cases: $("#caseSourcePanel")
    },
    grid: $("#technologyGrid"),
    resultLine: $("#resultLine"),
    stats: $("#atlasStats"),
    modal: $("#detailModal"),
    modalContent: $("#modalContent")
  };

  const techById = new Map(technologies.map((tech) => [tech.id, tech]));
  const sourceByKey = new Map(sourceBank.map((source) => [source.key, source]));
  let lastFocusedElement = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function colorForSector(sector) {
    return sectors[sector]?.color || "#7d5cff";
  }

  function styleForTech(tech) {
    return `--accent:${escapeHtml(colorForSector(tech.category))}`;
  }

  function formulaHtml(formula) {
    return escapeHtml(formula).replace(/(\d+)/g, "<sub>$1</sub>");
  }

  function processRoleClass(index) {
    return ["role-feed", "role-separation", "role-energy", "role-fabrication", "role-qa", "role-infrastructure"][index % 6];
  }

  function operationFamily(name) {
    const families = {
      separation: ["Distillation", "Crystallization", "Membrane separation", "Filtration", "Drying", "Absorption", "Adsorption", "Air separation", "Ion exchange", "Precipitation", "Solvent recovery"],
      conversion: ["Electrolysis", "Catalysis", "Pyrolysis", "Gasification", "Fermentation", "Polymerization", "Combustion", "Leaching", "Hydrometallurgy", "Electrochemical separation"],
      fabrication: ["Lithography", "Chemical vapor deposition", "Physical vapor deposition", "Atomic layer deposition", "Coating", "Curing", "Casting"],
      energy: ["Calcination", "Sintering", "Annealing", "Extrusion", "Compression", "Liquefaction", "Heat exchange"],
      waste: ["Plasma processing", "Sterilization", "Wastewater treatment"]
    };
    return Object.entries(families).find(([, items]) => items.includes(name))?.[0] || "conversion";
  }

  function pathwayTier(title) {
    const lower = title.toLowerCase();
    if (lower.includes("energy") || lower.includes("materials") || lower.includes("separations")) return "Foundational";
    if (lower.includes("policy") || lower.includes("supply") || lower.includes("cost")) return "Systemic";
    return "Operational";
  }

  function pathwayAccent(title) {
    const lower = title.toLowerCase();
    if (lower.includes("energy")) return "var(--energy)";
    if (lower.includes("separation")) return "var(--separation)";
    if (lower.includes("manufacturing") || lower.includes("factory")) return "var(--fabrication)";
    if (lower.includes("control") || lower.includes("automation") || lower.includes("testing") || lower.includes("experimentation")) return "var(--qa)";
    if (lower.includes("supply") || lower.includes("policy") || lower.includes("cost")) return "var(--infrastructure)";
    return "var(--conversion)";
  }

  function futuristicReason(tech) {
    if (tech.name === "Synthetic fuel from air and water") {
      return "Decarbonized aviation without a new airframe; closes the carbon loop using air, water, and electrons.";
    }
    return `This is futuristic because it makes ${tech.name.toLowerCase()} look usable in the real world. The hard part is not the image of the technology; it is the controlled process architecture, quality window, and infrastructure needed to make it repeatable.`;
  }

  function countBy(items, predicate) {
    return items.filter(predicate).length;
  }

  function topList(items, limit = 5) {
    return items.slice(0, limit);
  }

  function chipList(items, type, limit = 5) {
    return `
      <div class="pill-list">
        ${topList(items, limit)
          .map(
            (item) => `
              <button class="tag-chip" type="button" data-filter-type="${escapeHtml(type)}" data-filter-value="${escapeHtml(item)}">
                ${escapeHtml(item)}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function staticPills(items, limit = 5) {
    return `<div class="pill-list">${topList(items, limit).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function uniqueKeys(keys = []) {
    return [...new Set((keys || []).filter(Boolean))];
  }

  function recordsForKeys(keys = []) {
    return uniqueKeys(keys).map((key) => sourceByKey.get(key)).filter(Boolean);
  }

  function evidenceClass(status = "") {
    const lower = status.toLowerCase();
    if (lower.includes("speculative") || lower.includes("analogue") || lower.includes("hypothesis")) return "caution";
    if (lower.includes("roadmap") || lower.includes("early") || lower.includes("partial") || lower.includes("constrained")) return "medium";
    if (lower.includes("direct") || lower.includes("starter") || lower.includes("supported")) return "strong";
    return "caution";
  }

  function compactOrg(name = "") {
    return name
      .replace("National Academies of Sciences, Engineering, and Medicine", "NASEM")
      .replace("International Energy Agency", "IEA")
      .replace("U.S. Department of Energy", "DOE")
      .replace("Department of Energy", "DOE")
      .replace("National Institute of Standards and Technology", "NIST")
      .replace("National Aeronautics and Space Administration", "NASA")
      .replace("U.S. Environmental Protection Agency", "EPA")
      .replace("Food and Drug Administration", "FDA")
      .replace("Government Accountability Office", "GAO")
      .replace("U.S. Geological Survey", "USGS")
      .replace("International Renewable Energy Agency", "IRENA");
  }

  function sourceLabel(source) {
    const firstSentence = source.citation.split(".")[0] || source.citation;
    const yearMatch = source.citation.match(/(?:19|20)\d{2}/);
    const org = compactOrg(firstSentence).split("/")[0].trim();
    const shortOrg = org.length > 32 ? `${org.slice(0, 29)}…` : org;
    return `${shortOrg}${yearMatch ? ` ${yearMatch[0]}` : ""}`;
  }

  function sourceTierClass(source) {
    return source.tier === "Tier 1" ? "tier-one" : source.tier === "Tier 2" ? "tier-two" : "tier-three";
  }

  function sourceChip(source, index) {
    const number = String(index + 1).padStart(2, "0");
    return `
      <a class="source-chip ${sourceTierClass(source)}" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer" title="Supports: ${escapeHtml(source.supports)} Limit: ${escapeHtml(source.limitation)}">
        <span>[${number}]</span>
        <b>${escapeHtml(sourceLabel(source))}</b>
        <small>${escapeHtml(source.group)}</small>
      </a>
    `;
  }

  function sourceList(keys = [], limit = 4) {
    const sources = recordsForKeys(keys).slice(0, limit);
    if (!sources.length) return `<div class="source-list empty">Source expansion needed.</div>`;
    return `<div class="source-list">${sources.map(sourceChip).join("")}</div>`;
  }

  function evidenceBadge(status) {
    return `<span class="evidence-badge ${evidenceClass(status)}">${escapeHtml(status || "Needs source expansion")}</span>`;
  }

  function sourceMini(keys = [], limit = 3) {
    const sources = recordsForKeys(keys).slice(0, limit);
    return sources.length ? `<div class="source-mini">${sources.map((source, index) => `<a class="${sourceTierClass(source)}" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(source.supports)}"><span>[${index + 1}]</span>${escapeHtml(sourceLabel(source))}</a>`).join("")}</div>` : "";
  }

  function sourceDetailCards(keys = [], limit = 6) {
    const sources = recordsForKeys(keys).slice(0, limit);
    if (!sources.length) return `<p class="source-support-empty">No direct source records mapped yet.</p>`;
    return `
      <div class="source-detail-grid">
        ${sources.map((source, index) => `
          <article class="source-detail-card ${sourceTierClass(source)}">
            <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer"><span>[${index + 1}]</span>${escapeHtml(sourceLabel(source))}</a>
            <p><strong>Supports:</strong> ${escapeHtml(source.supports)}</p>
            <p><strong>Limit:</strong> ${escapeHtml(source.limitation)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function sectionEvidencePanel(title, claim, keys = [], status = "Supported as framing", limit = 4) {
    return `
      <article class="section-evidence-card">
        <div>
          <span class="evidence-label">Evidence for this section</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(claim)}</p>
          ${evidenceBadge(status)}
        </div>
        ${sourceList(keys, limit)}
      </article>
    `;
  }

  function pfdMarkup(steps, variant = "mini", title = "Simplified PFD", id = "PFD") {
    return `
      <div class="pfd-shell pfd-plate-lite ${variant}">
        <div class="pfd-lite-header">
          <span>${escapeHtml(title)}</span>
          <strong>${escapeHtml(id)}</strong>
        </div>
        <div class="pfd-rail" aria-hidden="true">
          <span>material stream</span>
          <span>energy / conversion</span>
          <span>QA gate</span>
        </div>
        <ol class="pfd-flow ${variant}">
          ${steps.map((step, index) => `<li class="${processRoleClass(index)}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(step)}</li>`).join("")}
        </ol>
        <div class="process-legend compact" aria-hidden="true">
          <span class="legend-conversion">Conversion</span>
          <span class="legend-separation">Separation</span>
          <span class="legend-energy">Energy</span>
          <span class="legend-fabrication">Fabrication</span>
          <span class="legend-qa">QA</span>
        </div>
      </div>
    `;
  }

  function readinessLabel(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "Speculative";
    if (number <= 3) return "Low";
    if (number <= 6) return "Medium";
    return "High";
  }

  function readinessBars(readiness) {
    return `
      <div class="readiness-bars" aria-label="Qualitative readiness levels">
        ${["trl", "mrl", "irl"]
          .map(
            (key) => {
              const numeric = Number(readiness[key]);
              const clamped = Number.isFinite(numeric) ? Math.max(1, Math.min(9, numeric)) : 1;
              const value = (clamped / 9) * 100;
              return `
                <div>
                  <span>${key.toUpperCase()}</span>
                  <i style="--value:${value}%" aria-hidden="true"></i>
                  <strong>${escapeHtml(readinessLabel(readiness[key]))}</strong>
                  <small aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<b class="${i + 1 <= clamped ? "filled" : ""}"></b>`).join("")}</small>
                </div>
              `;
            }
          )
          .join("")}
      </div>
    `;
  }

  function searchableText(tech) {
    return [
      tech.name,
      tech.category,
      tech.originalCategory,
      tech.sciFiPromise,
      tech.realisticPathway,
      tech.readinessGap,
      tech.scaleCondition,
      tech.processQuestion,
      tech.pfdSteps.join(" "),
      tech.inputs.join(" "),
      tech.outputs.join(" "),
      tech.chemicals.join(" "),
      tech.materials.join(" "),
      tech.unitOperations.join(" "),
      (tech.criticalParameters || []).join(" "),
      tech.bottlenecks.join(" "),
      tech.bottleneckTags.join(" "),
      tech.evidenceStatus,
      tech.evidenceNote
    ]
      .join(" ")
      .toLowerCase();
  }

  function filteredTechnologies() {
    const query = state.query.trim().toLowerCase();
    return technologies.filter((tech) => {
      const inQuery = !query || searchableText(tech).includes(query);
      const inSector = state.sector === "All" || tech.category === state.sector;
      const inBottleneck = state.bottleneck === "All" || tech.bottleneckTags.includes(state.bottleneck);
      const inChemical = state.chemical === "All" || tech.chemicals.includes(state.chemical) || tech.materials.includes(state.chemical);
      const inUnit = state.unitOperation === "All" || tech.unitOperations.includes(state.unitOperation);
      const inEvidence = state.evidenceStatus === "All" || tech.evidenceStatus === state.evidenceStatus;
      return inQuery && inSector && inBottleneck && inChemical && inUnit && inEvidence;
    });
  }

  function renderHeroMetrics() {
    const featuredCount = technologies.filter((tech) => tech.featured).length;
    elements.heroMetrics.innerHTML = `
      <span><strong>${technologies.length}</strong> technologies mapped</span>
      <span><strong>${Object.keys(sectors).length}</strong> future-system sectors</span>
      <span><strong>${chemicals.length}</strong> chemicals / materials</span>
      <span><strong>${unitOperations.length}</strong> recurring unit ops</span>
      <span><strong>${bottleneckTaxonomy.length}</strong> bottleneck classes</span>
      <span><strong>${featuredCount}</strong> featured case studies</span>
    `;
  }

  function renderStats() {
    elements.stats.innerHTML = `
      <div><strong>${technologies.length}</strong><span>preserved PFD entries</span></div>
      <div><strong>${chemicals.length}</strong><span>chemical/material spine</span></div>
      <div><strong>${unitOperations.length}</strong><span>unit operations</span></div>
    `;
  }

  function renderMasterStack() {
    const colors = ["var(--energy)", "var(--conversion)", "var(--separation)", "var(--fabrication)", "var(--qa)", "var(--infrastructure)", "var(--violet)", "var(--green)"];
    elements.masterStack.innerHTML = atlas.masterStack
      .map(
        (layer, index) => `
          <article class="stack-node" style="--stack-color:${colors[index % colors.length]}">
            <div class="stack-index">${String(index + 1).padStart(2, "0")}</div>
            <div class="stack-main">
              <h3>${escapeHtml(layer.title)}</h3>
              <p>${escapeHtml(layer.detail)}</p>
            </div>
            <div class="stack-tags">${staticPills(layer.tags)}</div>
            <span class="stack-action" aria-hidden="true">Layer ${String(index + 1).padStart(2, "0")}</span>
          </article>
        `
      )
      .join("");
  }

  function renderSectorGrid() {
    elements.sectorGrid.innerHTML = Object.entries(sectors)
      .map(([name, meta]) => {
        const count = countBy(technologies, (tech) => tech.category === name);
        return `
          <article class="sector-card" style="--accent:${escapeHtml(meta.color)}" data-filter-type="sector" data-filter-value="${escapeHtml(name)}">
            <span>${escapeHtml(meta.code)}</span>
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(meta.thesis)}</p>
            <button type="button" class="inline-link" data-filter-type="sector" data-filter-value="${escapeHtml(name)}">
              View ${count} systems <span aria-hidden="true">→</span>
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderChemicalGrid() {
    elements.chemicalGrid.innerHTML = chemicals
      .map(
        (chemical) => {
          const count = chemical.relatedTechnologies.length;
          const foundational = count >= 8;
          return `
            <article class="chemical-card ${foundational ? "is-foundational" : ""}" style="--heat:${Math.min(1, count / 8).toFixed(2)}">
              ${foundational ? `<div class="foundational-ribbon">★ Foundational</div>` : ""}
              <div class="formula">${formulaHtml(chemical.formula)}</div>
              <h3>${escapeHtml(chemical.name)}</h3>
              <p>${escapeHtml(chemical.role)}</p>
              <dl>
                <div><dt>Made / sourced from</dt><dd>${escapeHtml(chemical.madeFrom)}</dd></div>
                <div><dt>Process pathway</dt><dd>${escapeHtml(chemical.processPathway.join(" → "))}</dd></div>
                <div><dt>Main bottleneck</dt><dd>${escapeHtml(chemical.bottlenecks[0])}</dd></div>
              </dl>
              <div class="tag-block">
                <span>Enables</span>
                ${staticPills(chemical.enables, 4)}
              </div>
              <div class="tag-block">
                <span>Related unit operations</span>
                ${staticPills(chemical.unitOperations, 4)}
              </div>
              <div class="evidence-strip">
                ${evidenceBadge(chemical.evidenceStatus)}
                ${sourceMini(chemical.sourceKeys, 3)}
              </div>
              <button type="button" class="inline-link" data-filter-type="chemical" data-filter-value="${escapeHtml(chemical.name)}">
                <span aria-hidden="true">→</span> ${count} related PFD${count === 1 ? "" : "s"}
              </button>
            </article>
          `;
        }
      )
      .join("");
  }

  function renderUnitOperations() {
    elements.unitOperationGrid.innerHTML = unitOperations
      .map(
        (operation, index) => {
          const count = operation.appearsIn.length;
          const family = operationFamily(operation.name);
          return `
            <article class="unit-card family-${family} ${count === 0 ? "is-unmapped" : ""}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              ${count === 0 ? `<div class="coming-soon">Defined, not yet mapped</div>` : ""}
              <h3>${escapeHtml(operation.name)}</h3>
              <p>${escapeHtml(operation.description)}</p>
              <p class="scale-note">${escapeHtml(operation.scaleChallenge)}</p>
              <div class="evidence-strip compact">
                ${evidenceBadge(operation.evidenceStatus)}
                ${sourceMini(operation.sourceKeys, 3)}
              </div>
              <button type="button" class="inline-link" data-filter-type="unitOperation" data-filter-value="${escapeHtml(operation.name)}">
                ${count === 0 ? "Coming soon" : `→ ${count} mapped PFD${count === 1 ? "" : "s"}`}
              </button>
            </article>
          `;
        }
      )
      .join("");
  }

  function renderBottlenecksAndReadiness() {
    const counts = bottleneckTaxonomy.map((tag) => ({ tag, count: countBy(technologies, (tech) => tech.bottleneckTags.includes(tag)) }));
    const maxCount = Math.max(...counts.map((item) => item.count), 1);
    elements.bottleneckGrid.innerHTML = `
      <div class="bottleneck-chip-cloud">
        ${counts
          .map((item) => `
            <button class="taxonomy-chip" type="button" style="--weight:${(item.count / maxCount).toFixed(2)}" data-filter-type="bottleneck" data-filter-value="${escapeHtml(item.tag)}">
              ${escapeHtml(item.tag)} <span>${item.count}</span>
            </button>
          `)
          .join("")}
      </div>
      <div class="bottleneck-bars" aria-label="Top bottlenecks by frequency">
        ${counts
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map((item) => `
            <button type="button" data-filter-type="bottleneck" data-filter-value="${escapeHtml(item.tag)}" style="--bar:${((item.count / maxCount) * 100).toFixed(1)}%">
              <span>${escapeHtml(item.tag)}</span><i></i><strong>${item.count}</strong>
            </button>
          `)
          .join("")}
      </div>
    `;

    elements.readinessGrid.innerHTML = `
      <div class="readiness-matrix" aria-label="MRL by IRL readiness map">
        <span class="axis axis-x">MRL →</span>
        <span class="axis axis-y">IRL →</span>
        ${technologies
          .map((tech) => {
            const mrl = Math.max(1, Math.min(9, Number(tech.readiness.mrl) || 1));
            const irl = Math.max(1, Math.min(9, Number(tech.readiness.irl) || 1));
            const trl = Math.max(1, Math.min(9, Number(tech.readiness.trl) || 1));
            return `<button class="readiness-dot" title="${escapeHtml(tech.name)} · TRL ${trl} / MRL ${mrl} / IRL ${irl}" style="--x:${((mrl - 1) / 8) * 100}%;--y:${100 - ((irl - 1) / 8) * 100}%;--dot-color:${escapeHtml(colorForSector(tech.category))}" data-tech="${escapeHtml(tech.id)}"></button>`;
          })
          .join("")}
      </div>
      <div class="readiness-legend">
        <span>TRL = technology readiness</span>
        <span>MRL = manufacturing readiness</span>
        <span>IRL = infrastructure readiness</span>
      </div>
    `;
  }

  function renderPathways() {
    if (!elements.pathwayGrid) return;
    const tiers = ["Foundational", "Operational", "Systemic"];
    elements.pathwayGrid.innerHTML = tiers
      .map((tier) => {
        const items = atlas.processPathways.filter((pathway) => pathwayTier(pathway.title) === tier);
        return `
          <section class="pathway-tier tier-${tier.toLowerCase()}">
            <div class="tier-label">${escapeHtml(tier)}</div>
            <div class="tier-cards">
              ${items
                .map((pathway, index) => `
                  <article class="pathway-card" style="--pathway-accent:${pathwayAccent(pathway.title)}">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(pathway.title)}</h3>
                    <p>${escapeHtml(pathway.text)}</p>
                  </article>
                `)
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }

  function renderCaseStudies() {
    const cases = atlas.featuredCaseIds.map((id) => techById.get(id)).filter(Boolean);
    elements.caseStudyGrid.innerHTML = cases
      .map(
        (tech) => `
          <article class="case-card teaser-card" style="${styleForTech(tech)}">
            <div class="card-kicker">
              <span class="category-badge outlined">${escapeHtml(tech.originalCategory)}</span>
              <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">View case study <span aria-hidden="true">→</span></button>
            </div>
            <h3>${escapeHtml(tech.name)}</h3>
            <p class="promise">${escapeHtml(tech.sciFiPromise)}</p>
            <div class="case-label">Process architecture teaser</div>
            ${pfdMarkup(tech.pfdSteps, "case", "Featured PFD", tech.id.toUpperCase().slice(0, 9))}
            <div class="case-evidence">
              ${evidenceBadge(tech.evidenceStatus)}
              ${sourceMini(tech.sourceKeys, 3)}
            </div>
          </article>
        `
      )
      .join("");
  }


  function renderSectionEvidencePanels() {
    const panels = elements.sectionPanels || {};
    if (panels.concept) {
      panels.concept.innerHTML = sectionEvidencePanel(
        "Visible product vs. hidden process system",
        "The atlas thesis is supported as an engineering framing: frontier technologies usually require feedstocks, unit operations, QA/reliability systems, manufacturing readiness, and infrastructure before deployment.",
        [...(sectionSourceKeys.thesis || []), ...(sectionSourceKeys.hiddenSystems || [])],
        "Supported as framing",
        5
      );
    }
    if (panels.readerProtocol) {
      panels.readerProtocol.innerHTML = sectionEvidencePanel(
        "Reader protocol",
        "The protocol uses a process-systems lens: trace inputs, transformations, control limits, QA gates, readiness, and integration constraints before treating a concept as deployable.",
        [...(sectionSourceKeys.thesis || []), ...(sectionSourceKeys.readiness || [])],
        "Supported as engineering lens",
        4
      );
    }
    if (panels.chemicals) {
      panels.chemicals.innerHTML = sectionEvidencePanel(
        "Chemical spine",
        "The named chemicals and materials recur because clean-energy, semiconductor, water, carbon-management, and space-infrastructure systems are constrained by supply, purity, conversion, separation, and materials durability.",
        sectionSourceKeys.chemicals || [],
        "Partially supported",
        5
      );
    }
    if (panels.unitOperations) {
      panels.unitOperations.innerHTML = sectionEvidencePanel(
        "Recurring unit operations",
        "Separation, heat transfer, deposition, impurity control, recycle, and QA appear repeatedly as scale-up gates across unrelated frontier technologies.",
        sectionSourceKeys.unitOperations || [],
        "Supported as engineering lens",
        5
      );
    }
    if (panels.readiness) {
      panels.readiness.innerHTML = sectionEvidencePanel(
        "TRL is not enough",
        "Readiness sources justify separating technical maturity from manufacturing maturity, infrastructure integration, reliability, and economic deployment constraints.",
        sectionSourceKeys.readiness || [],
        "Supported",
        5
      );
    }
    if (panels.pathways) {
      panels.pathways.innerHTML = sectionEvidencePanel(
        "Scale-up pathways",
        "The repeated moves listed here are cross-domain patterns, not universal laws; the sources support them as common deployment levers across energy, water, semiconductors, bio, and advanced manufacturing.",
        sectionSourceKeys.pathways || [],
        "Supported as cross-domain pattern",
        5
      );
    }
    if (panels.cases) {
      const caseKeys = uniqueKeys(atlas.featuredCaseIds.flatMap((id) => techById.get(id)?.sourceKeys || [])).slice(0, 8);
      panels.cases.innerHTML = sectionEvidencePanel(
        "Featured case studies",
        "Featured cards use direct citations first, then chemical/unit-operation/framework sources. The evidence status badge controls how strongly each case should be written.",
        caseKeys,
        "Direct and roadmap evidence mixed",
        6
      );
    }
  }

  function renderSources() {
    if (!elements.sourceStats || !elements.evidenceMatrixGrid || !elements.sourceBankGrid) return;
    const tierOneCount = sourceBank.filter((source) => source.tier === "Tier 1").length;
    const directStarterCards = technologies.filter((tech) => tech.evidenceStatus === "Direct starter set").length;
    const roadmapCards = technologies.filter((tech) => tech.evidenceStatus === "Roadmap / early-stage sourced").length;
    const speculativeCards = technologies.filter((tech) => tech.evidenceStatus === "Speculative / analogue-sourced").length;
    elements.sourceStats.innerHTML = `
      <div class="source-stat-card"><strong>${sourceBank.length}</strong><span>source records in bank</span></div>
      <div class="source-stat-card"><strong>${tierOneCount}</strong><span>Tier 1 / authoritative</span></div>
      <div class="source-stat-card"><strong>${directStarterCards}</strong><span>direct starter cards</span></div>
      <div class="source-stat-card"><strong>${roadmapCards + speculativeCards}</strong><span>roadmap / speculative cards flagged</span></div>
    `;

    const claimRows = [
      {
        section: "Project thesis",
        claim: "Frontier technologies require process systems, not invention alone.",
        status: "Supported as framing",
        keys: sectionSourceKeys.thesis || []
      },
      {
        section: "Readiness",
        claim: "TRL must be separated from manufacturing readiness and integration readiness.",
        status: "Supported",
        keys: sectionSourceKeys.readiness || []
      },
      {
        section: "Chemical spine",
        claim: "Hydrogen, CO2, ammonia, silicon, lithium, copper, water, membranes, catalysts, and polymers recur across future systems.",
        status: "Partially supported",
        keys: sectionSourceKeys.chemicals || []
      },
      {
        section: "Visible product vs hidden process system",
        claim: "Flying cars, smart buildings, fusion plants, vertical farms, artificial organs, and space habitats depend on less-visible manufacturing, QA, utility, infrastructure, reliability, and regulatory systems.",
        status: "Supported as cross-domain framing; direct card evidence varies",
        keys: sectionSourceKeys.hiddenSystems || []
      },
      {
        section: "Unit operations",
        claim: "Separations, heat transfer, impurity control, thin-film deposition, and QA often determine scale-up viability.",
        status: "Supported as engineering lens",
        keys: sectionSourceKeys.unitOperations || []
      },
      {
        section: "Atmospheric water harvesting",
        claim: "Sorbent capture, thermal regeneration, condensation, and potable-water polishing are the core PFD blocks; low humidity increases difficulty.",
        status: "Supported, but economics need caution",
        keys: sectionSourceKeys.atmosphericWater || []
      },
      {
        section: "Scale-up pathways",
        claim: "Common deployment levers include materials, clean energy, separations, process control, modularity, reliability testing, supply chains, and infrastructure.",
        status: "Supported as cross-domain pattern",
        keys: sectionSourceKeys.pathways || []
      }
    ];

    elements.evidenceMatrixGrid.innerHTML = claimRows.map((row) => `
      <article class="matrix-card">
        <span>${escapeHtml(row.section)}</span>
        <h3>${escapeHtml(row.claim)}</h3>
        ${evidenceBadge(row.status)}
        ${sourceList(row.keys, 4)}
      </article>
    `).join("");

    if (elements.evidenceAuditGrid) {
      const priorityAudit = technologies
        .filter((tech) => tech.evidenceStatus !== "Direct starter set")
        .sort((a, b) => a.evidenceStatus.localeCompare(b.evidenceStatus) || a.name.localeCompare(b.name));
      elements.evidenceAuditGrid.innerHTML = priorityAudit.map((tech) => `
        <article class="audit-card" style="${styleForTech(tech)}">
          <span>${escapeHtml(tech.category)}</span>
          <h3>${escapeHtml(tech.name)}</h3>
          ${evidenceBadge(tech.evidenceStatus)}
          <p>${escapeHtml(tech.evidenceNote)}</p>
          ${sourceMini(tech.sourceKeys, 4)}
        </article>
      `).join("");
    }

    const sourceQuery = state.sourceQuery.trim().toLowerCase();
    const visibleSources = sourceBank.filter((source) => {
      if (!sourceQuery) return true;
      return [source.group, source.tier, source.type, source.citation, source.supports, source.limitation].join(" ").toLowerCase().includes(sourceQuery);
    });
    const groups = [...new Set(visibleSources.map((source) => source.group))];
    elements.sourceBankGrid.innerHTML = groups.length ? groups.map((group) => {
      const groupSources = visibleSources.filter((source) => source.group === group);
      return `
        <article class="source-group-card">
          <div class="source-group-head">
            <span>${escapeHtml(group)}</span>
            <strong>${groupSources.length}</strong>
          </div>
          <div class="source-group-list">
            ${groupSources.map((source, index) => `
              <a class="${sourceTierClass(source)}" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
                <b>[${String(index + 1).padStart(2, "0")}] ${escapeHtml(source.tier)} · ${escapeHtml(source.type)}</b>
                <strong>${escapeHtml(source.citation)}</strong>
                <em>Supports: ${escapeHtml(source.supports)}</em>
                <small>Limit: ${escapeHtml(source.limitation)}</small>
              </a>
            `).join("")}
          </div>
        </article>
      `;
    }).join("") : `
      <div class="empty-state source-empty">
        <h3>No source records match this search.</h3>
        <p>Try a broader term such as DOE, NASEM, water, semiconductor, readiness, manufacturing, or membrane.</p>
      </div>
    `;
  }

  function filterButton(label, count, type, value, active) {
    const zero = count === 0 && value !== "All";
    return `
      <button
        class="filter-chip ${active ? "is-active" : ""} ${zero ? "is-zero" : ""}"
        type="button"
        data-filter-type="${escapeHtml(type)}"
        data-filter-value="${escapeHtml(value)}"
        aria-pressed="${active}"
        ${zero ? `title="Coming soon"` : ""}
      >
        ${escapeHtml(label)} <span>${count}</span>
      </button>
    `;
  }

  function renderFilters() {
    elements.sectorFilters.innerHTML = [
      filterButton("All", technologies.length, "sector", "All", state.sector === "All"),
      ...Object.entries(sectors).map(([sectorName, meta]) =>
        filterButton(`${meta.code}. ${sectorName}`, countBy(technologies, (tech) => tech.category === sectorName), "sector", sectorName, state.sector === sectorName)
      )
    ].join("");

    elements.bottleneckFilters.innerHTML = [
      filterButton("All", technologies.length, "bottleneck", "All", state.bottleneck === "All"),
      ...bottleneckTaxonomy.map((tag) =>
        filterButton(tag, countBy(technologies, (tech) => tech.bottleneckTags.includes(tag)), "bottleneck", tag, state.bottleneck === tag)
      )
    ].join("");

    elements.chemicalFilters.innerHTML = [
      filterButton("All", technologies.length, "chemical", "All", state.chemical === "All"),
      ...chemicals.map((chemical) =>
        filterButton(chemical.name, chemical.relatedTechnologies.length, "chemical", chemical.name, state.chemical === chemical.name)
      )
    ].join("");

    elements.unitFilters.innerHTML = [
      filterButton("All", technologies.length, "unitOperation", "All", state.unitOperation === "All"),
      ...unitOperations.map((operation) =>
        filterButton(operation.name, operation.appearsIn.length, "unitOperation", operation.name, state.unitOperation === operation.name)
      )
    ].join("");

    if (elements.evidenceFilters) {
      const statuses = [...new Set(technologies.map((tech) => tech.evidenceStatus))];
      elements.evidenceFilters.innerHTML = [
        filterButton("All", technologies.length, "evidenceStatus", "All", state.evidenceStatus === "All"),
        ...statuses.map((status) => filterButton(status, countBy(technologies, (tech) => tech.evidenceStatus === status), "evidenceStatus", status, state.evidenceStatus === status))
      ].join("");
    }
  }

  function renderTechnologyCard(tech) {
    return `
      <article class="technology-card" style="${styleForTech(tech)}">
        <div class="card-kicker">
          <span class="category-badge">${escapeHtml(tech.category)}</span>
          <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">Details <span aria-hidden="true">→</span></button>
        </div>
        <h3>${escapeHtml(tech.name)}</h3>
        <div class="card-label">Sci-fi promise</div>
        <p class="promise">${escapeHtml(tech.sciFiPromise)}</p>
        <div class="card-label">Engineering pathway</div>
        <p class="pathway">${escapeHtml(tech.realisticPathway)}</p>
        <div class="card-label">Mini-PFD</div>
        ${pfdMarkup(tech.pfdSteps)}
        <div class="card-split">
          <div>
            <span>Readiness Gap</span>
            <p>${escapeHtml(tech.readinessGap)}</p>
          </div>
          <div>
            <span>Scale Trigger</span>
            <p>${escapeHtml(tech.scaleCondition)}</p>
          </div>
        </div>
        ${readinessBars(tech.readiness)}
        <div class="evidence-panel-inline">
          <div>${evidenceBadge(tech.evidenceStatus)}<p>${escapeHtml(tech.evidenceNote)}</p></div>
          ${sourceMini(tech.sourceKeys, 3)}
        </div>
        <div class="tag-block">
          <span>Chemicals / materials</span>
          ${chipList([...tech.chemicals, ...tech.materials], "chemical", 5)}
        </div>
        <div class="tag-block">
          <span>Unit operations</span>
          ${chipList(tech.unitOperations, "unitOperation", 5)}
        </div>
        <div class="tag-block">
          <span>Critical parameters</span>
          ${staticPills(tech.criticalParameters || [], 5)}
        </div>
        <div class="tag-block">
          <span>Bottleneck tags</span>
          ${chipList(tech.bottleneckTags, "bottleneck", 4)}
        </div>
        <p class="engineer-question">${escapeHtml(tech.processQuestion)}</p>
      </article>
    `;
  }

  function renderCompactRow(tech) {
    const spine = [...tech.chemicals, ...tech.materials].slice(0, 3);
    return `
      <article class="compact-card" style="${styleForTech(tech)}">
        <div class="compact-primary">
          <span class="category-badge">${escapeHtml(tech.category)}</span>
          <h3>${escapeHtml(tech.name)}</h3>
          <p>${escapeHtml(tech.sciFiPromise)}</p>
        </div>
        <div class="compact-cell">
          <span>Hidden process</span>
          <p>${escapeHtml(tech.pfdSteps.join(" → "))}</p>
        </div>
        <div class="compact-cell">
          <span>Key bottleneck</span>
          <p>${escapeHtml(tech.bottleneckTags[0] || tech.bottlenecks[0] || "Scale-up uncertainty")}</p>
        </div>
        <div class="compact-cell">
          <span>Chemical spine</span>
          ${staticPills(spine, 3)}
        </div>
        <div class="compact-cell evidence-cell">
          <span>Evidence</span>
          ${evidenceBadge(tech.evidenceStatus)}
          ${sourceMini(tech.sourceKeys, 2)}
        </div>
        <div class="compact-action">
          <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">Open <span aria-hidden="true">→</span></button>
        </div>
      </article>
    `;
  }

  function renderLibrary() {
    const matches = filteredTechnologies();
    const noun = matches.length === 1 ? "PFD" : "PFDs";
    const activeFilters = [state.sector, state.bottleneck, state.chemical, state.unitOperation].filter((item) => item !== "All");
    const filterText = activeFilters.length ? ` filtered by ${activeFilters.map(escapeHtml).join(" + ")}` : "";
    const searchText = state.query.trim() ? ` matching "${escapeHtml(state.query.trim())}"` : "";

    elements.resultLine.innerHTML = `Showing <strong>${matches.length}</strong> of ${technologies.length} ${noun}${filterText}${searchText}.`;
    const hasActiveState = state.query.trim() || activeFilters.length;
    elements.resetFilters?.classList.toggle("is-visible", Boolean(hasActiveState));
    elements.clearSearch?.classList.toggle("is-visible", Boolean(state.query.trim()));
    elements.grid.classList.toggle("is-compact", state.view === "compact");

    if (!matches.length) {
      elements.grid.innerHTML = `
        <div class="empty-state">
          <h3>No process systems match this view.</h3>
          <p>Try clearing one filter or searching for a broader term like hydrogen, membrane, coating, water, MRL, or infrastructure.</p>
        </div>
      `;
      return;
    }

    elements.grid.innerHTML = matches.map((tech) => (state.view === "compact" ? renderCompactRow(tech) : renderTechnologyCard(tech))).join("");
  }

  function modalSection(title, content) {
    return `
      <section class="modal-section">
        <h4>${escapeHtml(title)}</h4>
        ${content}
      </section>
    `;
  }

  function relatedLinks(tech) {
    const links = tech.relatedTechnologies
      .map((id) => techById.get(id))
      .filter(Boolean)
      .map((related) => `<button type="button" class="related-link" data-tech="${escapeHtml(related.id)}">${escapeHtml(related.name)}</button>`)
      .join("");
    return links ? `<div class="related-list">${links}</div>` : "<p>No close related systems mapped yet.</p>";
  }

  function openModal(techId) {
    const tech = techById.get(techId);
    if (!tech) return;

    lastFocusedElement = document.activeElement;
    elements.modalContent.innerHTML = `
      <div class="modal-hero" style="${styleForTech(tech)}">
        <span class="category-badge">${escapeHtml(tech.category)}</span>
        <h2 id="modalTitle">${escapeHtml(tech.name)}</h2>
        <p>${escapeHtml(tech.sciFiPromise)}</p>
      </div>
      <div class="modal-body">
        ${modalSection("Why it feels futuristic", `<p>${escapeHtml(futuristicReason(tech))}</p>`)}
        ${modalSection("Realistic process architecture", `<p>${escapeHtml(tech.realisticPathway)}</p>`)}
        ${modalSection("Evidence status", `<div class="modal-evidence-status">${evidenceBadge(tech.evidenceStatus)}<p>${escapeHtml(tech.evidenceNote)}</p></div>${sourceList(tech.sourceKeys, 8)}`)}
        ${modalSection("What the sources support / do not support", sourceDetailCards(tech.sourceKeys, 8))}
        ${modalSection("Simplified PFD", pfdMarkup(tech.pfdSteps, "detail", "Detailed PFD", tech.id.toUpperCase().slice(0, 9)))}
        <div class="modal-columns">
          ${modalSection("Key inputs", staticPills(tech.inputs))}
          ${modalSection("Main outputs", staticPills(tech.outputs))}
          ${modalSection("Readiness", readinessBars(tech.readiness))}
        </div>
        <div class="modal-columns">
          ${modalSection("Chemicals and materials", chipList([...tech.chemicals, ...tech.materials], "chemical", 8))}
          ${modalSection("Unit operations", chipList(tech.unitOperations, "unitOperation", 8))}
          ${modalSection("Bottleneck tags", chipList(tech.bottleneckTags, "bottleneck", 6))}
        </div>
        ${modalSection("Critical process parameters", staticPills(tech.criticalParameters || [], 8))}
        ${modalSection("Critical bottlenecks", `<p>${escapeHtml(tech.bottlenecks.join("; "))}</p>`)}
        ${modalSection("Manufacturing / deployment readiness gap", `<p>${escapeHtml(tech.readinessGap)}</p>`)}
        ${modalSection("What would need to be true for scale?", `<p>${escapeHtml(tech.scaleCondition)}</p>`)}
        <div class="question-panel">
          <span>Process engineer's question</span>
          <strong>${escapeHtml(tech.processQuestion)}</strong>
        </div>
        ${modalSection("Related technologies", relatedLinks(tech))}
      </div>
    `;

    elements.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".modal-close").focus();
  }

  function closeModal() {
    elements.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }

  function applyFilter(type, value) {
    const countFor = {
      sector: value === "All" ? technologies.length : countBy(technologies, (tech) => tech.category === value),
      bottleneck: value === "All" ? technologies.length : countBy(technologies, (tech) => tech.bottleneckTags.includes(value)),
      chemical: value === "All" ? technologies.length : (chemicals.find((item) => item.name === value)?.relatedTechnologies.length || 0),
      unitOperation: value === "All" ? technologies.length : (unitOperations.find((item) => item.name === value)?.appearsIn.length || 0),
      evidenceStatus: value === "All" ? technologies.length : countBy(technologies, (tech) => tech.evidenceStatus === value)
    }[type];
    if (countFor === 0 && value !== "All") return;
    if (type === "sector") state.sector = state.sector === value ? "All" : value;
    if (type === "bottleneck") state.bottleneck = state.bottleneck === value ? "All" : value;
    if (type === "chemical") state.chemical = state.chemical === value ? "All" : value;
    if (type === "unitOperation") state.unitOperation = state.unitOperation === value ? "All" : value;
    if (type === "evidenceStatus") state.evidenceStatus = state.evidenceStatus === value ? "All" : value;
    renderFilters();
    renderLibrary();
    $("#atlas").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindEvents() {
    elements.clearSearch?.addEventListener("click", () => {
      state.query = "";
      elements.search.value = "";
      renderLibrary();
      elements.search.focus();
    });

    elements.resetFilters?.addEventListener("click", () => {
      state.query = "";
      state.sector = "All";
      state.bottleneck = "All";
      state.chemical = "All";
      state.unitOperation = "All";
      state.evidenceStatus = "All";
      elements.search.value = "";
      renderFilters();
      renderLibrary();
    });

    elements.search.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderLibrary();
    });

    elements.sourceSearch?.addEventListener("input", (event) => {
      state.sourceQuery = event.target.value;
      renderSources();
    });

    document.addEventListener("click", (event) => {
      const filter = event.target.closest("[data-filter-type]");
      if (filter) {
        applyFilter(filter.dataset.filterType, filter.dataset.filterValue);
        return;
      }

      const techButton = event.target.closest("[data-tech]");
      if (techButton) {
        openModal(techButton.dataset.tech);
        return;
      }

      const viewButton = event.target.closest("[data-view]");
      if (viewButton) {
        state.view = viewButton.dataset.view;
        $$(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === state.view));
        renderLibrary();
      }
    });

    elements.modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      const modalOpen = elements.modal.getAttribute("aria-hidden") === "false";
      if (event.key === "Escape" && modalOpen) closeModal();
      if (event.key === "Tab" && modalOpen) {
        const focusable = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", elements.modal).filter((item) => !item.disabled);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    const sections = ["content", "concept", "system-map", "chemical-spine", "unit-ops", "readiness", "pathways", "case-studies", "atlas", "sources"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elements.progressLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.section === entry.target.id));
          }
        });
      }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });
      sections.forEach((section) => observer.observe(section));
    } else if (elements.progressLinks[0]) {
      elements.progressLinks[0].classList.add("is-active");
    }

    window.addEventListener("scroll", () => {
      elements.topPill?.classList.toggle("is-visible", window.scrollY > 720);
    }, { passive: true });
  }

  function init() {
    renderHeroMetrics();
    renderStats();
    renderMasterStack();
    renderSectorGrid();
    renderChemicalGrid();
    renderUnitOperations();
    renderBottlenecksAndReadiness();
    renderPathways();
    renderCaseStudies();
    renderSectionEvidencePanels();
    renderSources();
    renderFilters();
    renderLibrary();
    bindEvents();
  }

  init();
})();

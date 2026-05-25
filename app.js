(function () {
  const atlas = window.FUTURE_SYSTEMS_ATLAS;
  const technologies = atlas.technologies;
  const sectors = atlas.sectors;
  const chemicals = atlas.chemicals;
  const unitOperations = atlas.unitOperations;
  const bottleneckTaxonomy = atlas.bottleneckTaxonomy;

  const state = {
    query: "",
    sector: "All",
    bottleneck: "All",
    chemical: "All",
    unitOperation: "All",
    view: "cards"
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
    caseStudyGrid: $("#caseStudyGrid"),
    search: $("#searchInput"),
    sectorFilters: $("#sectorFilters"),
    bottleneckFilters: $("#bottleneckFilters"),
    chemicalFilters: $("#chemicalFilters"),
    unitFilters: $("#unitFilters"),
    grid: $("#technologyGrid"),
    resultLine: $("#resultLine"),
    stats: $("#atlasStats"),
    modal: $("#detailModal"),
    modalContent: $("#modalContent")
  };

  const techById = new Map(technologies.map((tech) => [tech.id, tech]));

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

  function pfdMarkup(steps, variant = "mini") {
    return `
      <ol class="pfd-flow ${variant}">
        ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
    `;
  }

  function readinessBars(readiness) {
    return `
      <div class="readiness-bars" aria-label="Readiness levels">
        ${["trl", "mrl", "irl"]
          .map(
            (key) => `
              <div>
                <span>${key.toUpperCase()}</span>
                <strong>${escapeHtml(readiness[key])}/9</strong>
                <i style="--value:${(Number(readiness[key]) / 9) * 100}%"></i>
              </div>
            `
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
      tech.bottlenecks.join(" "),
      tech.bottleneckTags.join(" ")
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
      return inQuery && inSector && inBottleneck && inChemical && inUnit;
    });
  }

  function renderHeroMetrics() {
    const featuredCount = technologies.filter((tech) => tech.featured).length;
    elements.heroMetrics.innerHTML = `
      <span><strong>${technologies.length}</strong> full-library PFDs</span>
      <span><strong>${Object.keys(sectors).length}</strong> future-system sectors</span>
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
    elements.masterStack.innerHTML = atlas.masterStack
      .map(
        (layer, index) => `
          <article class="stack-node">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(layer.title)}</h3>
            <p>${escapeHtml(layer.detail)}</p>
            ${staticPills(layer.tags)}
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
          <article class="sector-card" style="--accent:${escapeHtml(meta.color)}">
            <span>${escapeHtml(meta.code)}</span>
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(meta.thesis)}</p>
            <button type="button" class="inline-link" data-filter-type="sector" data-filter-value="${escapeHtml(name)}">
              View ${count} systems
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderChemicalGrid() {
    elements.chemicalGrid.innerHTML = chemicals
      .map(
        (chemical) => `
          <article class="chemical-card">
            <div class="formula">${escapeHtml(chemical.formula)}</div>
            <h3>${escapeHtml(chemical.name)}</h3>
            <p>${escapeHtml(chemical.role)}</p>
            <dl>
              <div><dt>Sourced from</dt><dd>${escapeHtml(chemical.madeFrom)}</dd></div>
              <div><dt>Bottleneck</dt><dd>${escapeHtml(chemical.bottlenecks[0])}</dd></div>
            </dl>
            ${staticPills(chemical.unitOperations, 3)}
            <button type="button" class="inline-link" data-filter-type="chemical" data-filter-value="${escapeHtml(chemical.name)}">
              Related PFDs: ${chemical.relatedTechnologies.length}
            </button>
          </article>
        `
      )
      .join("");
  }

  function renderUnitOperations() {
    elements.unitOperationGrid.innerHTML = unitOperations
      .map(
        (operation, index) => `
          <article class="unit-card">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(operation.name)}</h3>
            <p>${escapeHtml(operation.description)}</p>
            <p class="scale-note">${escapeHtml(operation.scaleChallenge)}</p>
            <button type="button" class="inline-link" data-filter-type="unitOperation" data-filter-value="${escapeHtml(operation.name)}">
              Appears in ${operation.appearsIn.length} PFDs
            </button>
          </article>
        `
      )
      .join("");
  }

  function renderBottlenecksAndReadiness() {
    elements.bottleneckGrid.innerHTML = bottleneckTaxonomy
      .map((tag) => {
        const count = countBy(technologies, (tech) => tech.bottleneckTags.includes(tag));
        return `
          <button class="taxonomy-chip" type="button" data-filter-type="bottleneck" data-filter-value="${escapeHtml(tag)}">
            ${escapeHtml(tag)} <span>${count}</span>
          </button>
        `;
      })
      .join("");

    const readinessItems = [
      ["TRL", "Technology readiness", "Can the science or device function under relevant conditions?"],
      ["MRL", "Manufacturing readiness", "Can it be produced repeatedly with quality, yield, and maintainable cost?"],
      ["IRL", "Infrastructure readiness", "Can it plug into grids, water loops, supply chains, safety systems, and regulation?"]
    ];
    elements.readinessGrid.innerHTML = readinessItems
      .map(
        ([code, title, text]) => `
          <article>
            <span>${escapeHtml(code)}</span>
            <h4>${escapeHtml(title)}</h4>
            <p>${escapeHtml(text)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderCaseStudies() {
    const cases = atlas.featuredCaseIds.map((id) => techById.get(id)).filter(Boolean);
    elements.caseStudyGrid.innerHTML = cases
      .map(
        (tech) => `
          <article class="case-card" style="${styleForTech(tech)}">
            <div class="card-kicker">
              <span class="category-badge">${escapeHtml(tech.originalCategory)}</span>
              <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">Open Case</button>
            </div>
            <h3>${escapeHtml(tech.name)}</h3>
            <p class="promise">${escapeHtml(tech.sciFiPromise)}</p>
            ${pfdMarkup(tech.pfdSteps, "case")}
            <div class="case-columns">
              <div>
                <span>Key chemicals/materials</span>
                ${chipList([...tech.chemicals, ...tech.materials], "chemical", 5)}
              </div>
              <div>
                <span>Unit operations</span>
                ${chipList(tech.unitOperations, "unitOperation", 5)}
              </div>
            </div>
            <div class="question-panel">
              <span>Scale trigger</span>
              <strong>${escapeHtml(tech.scaleCondition)}</strong>
            </div>
          </article>
        `
      )
      .join("");
  }

  function filterButton(label, count, type, value, active) {
    return `
      <button
        class="filter-chip ${active ? "is-active" : ""}"
        type="button"
        data-filter-type="${escapeHtml(type)}"
        data-filter-value="${escapeHtml(value)}"
        aria-pressed="${active}"
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
  }

  function renderTechnologyCard(tech) {
    return `
      <article class="technology-card" style="${styleForTech(tech)}">
        <div class="card-kicker">
          <span class="category-badge">${escapeHtml(tech.category)}</span>
          <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">Details</button>
        </div>
        <h3>${escapeHtml(tech.name)}</h3>
        <p class="promise">${escapeHtml(tech.sciFiPromise)}</p>
        <p class="pathway">${escapeHtml(tech.realisticPathway)}</p>
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
        <div class="tag-block">
          <span>Chemicals / materials</span>
          ${chipList([...tech.chemicals, ...tech.materials], "chemical", 5)}
        </div>
        <div class="tag-block">
          <span>Unit operations</span>
          ${chipList(tech.unitOperations, "unitOperation", 5)}
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
    return `
      <article class="compact-card" style="${styleForTech(tech)}">
        <div>
          <span class="category-badge">${escapeHtml(tech.originalCategory)}</span>
          <h3>${escapeHtml(tech.name)}</h3>
          <p>${escapeHtml(tech.realisticPathway)}</p>
        </div>
        <div class="compact-meta">
          ${staticPills(tech.bottleneckTags, 3)}
          <button class="detail-button" type="button" data-tech="${escapeHtml(tech.id)}">Details</button>
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

    elements.resultLine.innerHTML = `Showing <strong>${matches.length}</strong> ${noun}${filterText}${searchText}.`;
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

    elements.modalContent.innerHTML = `
      <div class="modal-hero" style="${styleForTech(tech)}">
        <span class="category-badge">${escapeHtml(tech.category)}</span>
        <h2 id="modalTitle">${escapeHtml(tech.name)}</h2>
        <p>${escapeHtml(tech.sciFiPromise)}</p>
      </div>
      <div class="modal-body">
        ${modalSection("Why it feels futuristic", `<p>${escapeHtml(tech.sciFiPromise)}</p>`)}
        ${modalSection("Realistic process architecture", `<p>${escapeHtml(tech.realisticPathway)}</p>`)}
        ${modalSection("Simplified PFD", pfdMarkup(tech.pfdSteps, "detail"))}
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
        ${modalSection("Critical process parameters", `<p>${escapeHtml(tech.bottlenecks.join("; "))}</p>`)}
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
  }

  function applyFilter(type, value) {
    if (type === "sector") state.sector = state.sector === value ? "All" : value;
    if (type === "bottleneck") state.bottleneck = state.bottleneck === value ? "All" : value;
    if (type === "chemical") state.chemical = state.chemical === value ? "All" : value;
    if (type === "unitOperation") state.unitOperation = state.unitOperation === value ? "All" : value;
    renderFilters();
    renderLibrary();
    $("#atlas").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindEvents() {
    elements.search.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderLibrary();
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
      if (event.key === "Escape" && elements.modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  }

  function init() {
    renderHeroMetrics();
    renderStats();
    renderMasterStack();
    renderSectorGrid();
    renderChemicalGrid();
    renderUnitOperations();
    renderBottlenecksAndReadiness();
    renderCaseStudies();
    renderFilters();
    renderLibrary();
    bindEvents();
  }

  init();
})();

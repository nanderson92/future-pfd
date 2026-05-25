(function () {
  const atlas = window.FUTURE_SYSTEMS_ATLAS;
  const technologies = atlas.technologies;
  const categoryMeta = atlas.categoryMeta;
  const processPathways = atlas.processPathways;

  const state = {
    category: "All",
    query: ""
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const elements = {
    search: $("#searchInput"),
    filters: $("#categoryFilters"),
    grid: $("#technologyGrid"),
    resultLine: $("#resultLine"),
    stats: $("#atlasStats"),
    pathways: $("#pathwayGrid"),
    modal: $("#detailModal"),
    modalContent: $("#modalContent")
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function categoryColor(category) {
    return categoryMeta[category]?.color || "#18a999";
  }

  function styleForCategory(category) {
    return `--accent:${escapeHtml(categoryColor(category))}`;
  }

  function list(items, className = "pill-list") {
    return `<div class="${className}">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function pfdMarkup(steps, variant = "mini") {
    return `
      <ol class="pfd-flow ${variant}">
        ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
    `;
  }

  function searchableText(tech) {
    return [
      tech.name,
      tech.category,
      tech.promise,
      tech.realisticPathway,
      tech.readinessGap,
      tech.scaleCondition,
      tech.processQuestion,
      tech.pfdSteps.join(" "),
      tech.inputs.join(" "),
      tech.outputs.join(" "),
      tech.bottlenecks.join(" ")
    ]
      .join(" ")
      .toLowerCase();
  }

  function filteredTechnologies() {
    const query = state.query.trim().toLowerCase();
    return technologies.filter((tech) => {
      const inCategory = state.category === "All" || tech.category === state.category;
      const inQuery = !query || searchableText(tech).includes(query);
      return inCategory && inQuery;
    });
  }

  function renderStats() {
    const categoryCount = Object.keys(categoryMeta).length;
    elements.stats.innerHTML = `
      <div><strong>${technologies.length}</strong><span>technologies</span></div>
      <div><strong>${categoryCount}</strong><span>engineering domains</span></div>
      <div><strong>4-6</strong><span>PFD steps per card</span></div>
    `;
  }

  function renderFilters() {
    const categories = ["All", ...Object.keys(categoryMeta)];
    elements.filters.innerHTML = categories
      .map((category) => {
        const isActive = category === state.category;
        const count = category === "All" ? technologies.length : technologies.filter((tech) => tech.category === category).length;
        const color = category === "All" ? "#1d2430" : categoryColor(category);
        return `
          <button
            class="filter-chip ${isActive ? "is-active" : ""}"
            type="button"
            data-category="${escapeHtml(category)}"
            style="--accent:${escapeHtml(color)}"
            aria-pressed="${isActive}"
          >
            ${escapeHtml(category)} <span>${count}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderCards() {
    const matches = filteredTechnologies();
    const noun = matches.length === 1 ? "technology" : "technologies";
    const categoryText = state.category === "All" ? "all categories" : state.category;
    const searchText = state.query.trim() ? ` matching "${escapeHtml(state.query.trim())}"` : "";

    elements.resultLine.innerHTML = `Showing <strong>${matches.length}</strong> ${noun} in ${escapeHtml(categoryText)}${searchText}.`;

    if (!matches.length) {
      elements.grid.innerHTML = `
        <div class="empty-state">
          <h3>No process systems match this view.</h3>
          <p>Try a broader category or search for a bottleneck like energy, membranes, safety, QA, or infrastructure.</p>
        </div>
      `;
      return;
    }

    elements.grid.innerHTML = matches
      .map(
        (tech) => `
          <article class="technology-card" style="${styleForCategory(tech.category)}">
            <div class="card-kicker">
              <span class="category-badge">${escapeHtml(tech.category)}</span>
              <button class="detail-button" type="button" data-tech="${escapeHtml(slugify(tech.name))}">Details</button>
            </div>
            <h3>${escapeHtml(tech.name)}</h3>
            <p class="promise">${escapeHtml(tech.promise)}</p>
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
            <div class="bottleneck-row" aria-label="Critical bottlenecks">
              ${tech.bottlenecks.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            <p class="engineer-question">${escapeHtml(tech.processQuestion)}</p>
          </article>
        `
      )
      .join("");
  }

  function modalSection(title, content) {
    return `
      <section class="modal-section">
        <h4>${escapeHtml(title)}</h4>
        ${content}
      </section>
    `;
  }

  function openModal(techId) {
    const tech = technologies.find((item) => slugify(item.name) === techId);
    if (!tech) return;

    elements.modalContent.innerHTML = `
      <div class="modal-hero" style="${styleForCategory(tech.category)}">
        <span class="category-badge">${escapeHtml(tech.category)}</span>
        <h2 id="modalTitle">${escapeHtml(tech.name)}</h2>
        <p>${escapeHtml(tech.promise)}</p>
      </div>
      <div class="modal-body">
        ${modalSection("Realistic Engineering Pathway", `<p>${escapeHtml(tech.realisticPathway)}</p>`)}
        ${modalSection("Simplified PFD", pfdMarkup(tech.pfdSteps, "detail"))}
        <div class="modal-columns">
          ${modalSection("Key Inputs", list(tech.inputs))}
          ${modalSection("Main Outputs", list(tech.outputs))}
          ${modalSection("Critical Bottlenecks", list(tech.bottlenecks))}
        </div>
        ${modalSection("Manufacturing / Deployment Readiness Gap", `<p>${escapeHtml(tech.readinessGap)}</p>`)}
        ${modalSection("What Would Need To Be True For Scale?", `<p>${escapeHtml(tech.scaleCondition)}</p>`)}
        <div class="question-panel">
          <span>Process engineer's question</span>
          <strong>${escapeHtml(tech.processQuestion)}</strong>
        </div>
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

  function renderPathways() {
    elements.pathways.innerHTML = processPathways
      .map(
        (pathway, index) => `
          <article class="pathway-card">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(pathway.title)}</h3>
            <p>${escapeHtml(pathway.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function bindEvents() {
    elements.search.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderCards();
    });

    elements.filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      renderFilters();
      renderCards();
    });

    elements.grid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tech]");
      if (!button) return;
      openModal(button.dataset.tech);
    });

    elements.modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && elements.modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
  }

  function init() {
    renderStats();
    renderFilters();
    renderCards();
    renderPathways();
    bindEvents();
  }

  init();
})();

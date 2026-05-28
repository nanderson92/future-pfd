/* ────────────────────────────────────────────────────────────
   Future Systems Atlas — Data
   Sectors, chemicals, unit ops, bottlenecks, and 115 entries.
   ──────────────────────────────────────────────────────────── */

const atlasData = (() => {
  const SECTORS = [
    { id: "energy",        label: "Energy",        coord: "07°N",  count: 0 },
    { id: "carbon",        label: "Carbon",        coord: "19°N",  count: 0 },
    { id: "water",         label: "Water",         coord: "24°N",  count: 0 },
    { id: "materials",     label: "Materials",     coord: "33°N",  count: 0 },
    { id: "manufacturing", label: "Manufacturing", coord: "41°N",  count: 0 },
    { id: "cities",        label: "Cities",        coord: "48°N",  count: 0 },
    { id: "space",         label: "Space",         coord: "57°N",  count: 0 },
  ];

  const CHEMICALS = [
    { sym: "H₂",  num: "01", name: "Hydrogen",       group: "energy carrier",   uses: ["fuels", "ammonia", "steel", "storage"], color: "energy" },
    { sym: "CO₂", num: "02", name: "Carbon dioxide", group: "carbon spine",     uses: ["DAC", "fuels", "concrete", "polymers"], color: "carbon" },
    { sym: "NH₃", num: "03", name: "Ammonia",        group: "nitrogen carrier", uses: ["fertilizer", "fuels", "shipping", "storage"], color: "energy" },
    { sym: "Si",  num: "14", name: "Silicon",        group: "semiconductor",    uses: ["solar", "ICs", "sensors", "MEMS"], color: "materials" },
    { sym: "Li",  num: "03", name: "Lithium",        group: "alkali metal",     uses: ["batteries", "ceramics", "alloys"], color: "manufacturing" },
    { sym: "Cu",  num: "29", name: "Copper",         group: "transition",       uses: ["motors", "grids", "wiring", "catalysts"], color: "cities" },
    { sym: "H₂O", num: "—",  name: "Water",          group: "utility",          uses: ["purification", "desal", "AWH", "life support"], color: "water" },
    { sym: "C*",  num: "06", name: "Carbon (eng.)",  group: "structural",       uses: ["composites", "anodes", "fibers", "biochar"], color: "materials" },
    { sym: "CH₄", num: "—",  name: "Methane",        group: "C1 building",      uses: ["pyrolysis", "syngas", "biogas"], color: "carbon" },
    { sym: "He",  num: "02", name: "Helium",         group: "noble",            uses: ["cryo", "MRI", "fusion"], color: "space" },
    { sym: "U",   num: "92", name: "Uranium",        group: "fissile",          uses: ["SMR", "fuel cycle"], color: "energy" },
    { sym: "T",   num: "—",  name: "Tritium",        group: "fusion fuel",      uses: ["DT fusion", "breeding blankets"], color: "energy" },
    { sym: "Pt",  num: "78", name: "Platinum",       group: "PGM catalyst",     uses: ["electrolysis", "fuel cells"], color: "manufacturing" },
    { sym: "Ni",  num: "28", name: "Nickel",         group: "transition",       uses: ["cathodes", "alloys", "catalysts"], color: "manufacturing" },
    { sym: "Co",  num: "27", name: "Cobalt",         group: "transition",       uses: ["cathodes", "catalysts"], color: "manufacturing" },
    { sym: "Fe",  num: "26", name: "Iron",           group: "transition",       uses: ["iron-air cells", "steel", "redox cycles"], color: "energy" },
    { sym: "Na",  num: "11", name: "Sodium",         group: "alkali metal",     uses: ["sodium-ion cells", "salts", "heat transfer"], color: "energy" },
    { sym: "AlON",num: "—",  name: "Aluminum oxynitride", group: "ceramic",     uses: ["transparent armor", "windows", "optics"], color: "materials" },
    { sym: "BAs", num: "—",  name: "Boron arsenide", group: "semiconductor",    uses: ["thermal management", "power devices"], color: "materials" },
    { sym: "SiO₂",num: "—",  name: "Silica",         group: "oxide",           uses: ["aerogels", "glass", "dielectrics", "membranes"], color: "materials" },
    { sym: "CaCO₃",num:"—", name: "Calcium carbonate", group: "mineral",       uses: ["cement", "mineralization", "building materials"], color: "carbon" },
    { sym: "RE",  num: "57+",name: "Rare earths",    group: "lanthanide",       uses: ["magnets", "motors", "lasers"], color: "space" },
  ];

  const UNIT_OPS = [
    { id: "separation",  label: "Separation",  family: "matter movement",    examples: "membranes · distillation · adsorption · crystallization" },
    { id: "reaction",    label: "Reaction",    family: "transformation",      examples: "catalysis · electrolysis · photochemistry · pyrolysis" },
    { id: "heat",        label: "Heat transfer", family: "energy movement",   examples: "exchangers · regenerators · thermal storage" },
    { id: "deposition",  label: "Deposition",  family: "interface control",   examples: "CVD · ALD · PVD · electroplating" },
    { id: "fabrication", label: "Fabrication", family: "shape & assembly",    examples: "additive · roll-to-roll · injection · joining" },
    { id: "qa",          label: "QA · cycling", family: "manufacturing proof", examples: "metrology · reliability · process windows" },
  ];

  const BOTTLENECKS = [
    { id: "energy-intensity", label: "Energy intensity",      family: "thermodynamic" },
    { id: "separations",      label: "Dilute separations",    family: "matter movement" },
    { id: "yield",            label: "Yield & selectivity",    family: "reaction" },
    { id: "reliability",      label: "Reliability / cycles",   family: "manufacturing proof" },
    { id: "supply",           label: "Supply chain",          family: "material limit" },
    { id: "infrastructure",   label: "Infrastructure",        family: "deployment" },
    { id: "cost",             label: "Capex & cost-down",     family: "economics" },
    { id: "safety",           label: "Safety & containment",  family: "operational" },
    { id: "scale-up",         label: "Scale-up reactor",      family: "engineering" },
    { id: "integration",      label: "System integration",    family: "deployment" },
    { id: "regulation",       label: "Regulation & standards",family: "policy" },
    { id: "purity",           label: "Trace purity control",  family: "process window" },
  ];

  const STACK = [
    { id: "resources",      label: "Resources",            sub: "primary feedstocks · land · water · ores · waste streams", nodes: ["bauxite", "brines", "biomass", "feed gas", "scrap", "air", "seawater"] },
    { id: "chemicals",      label: "Platform chemicals",   sub: "molecular building blocks", nodes: ["H₂", "CO₂", "NH₃", "olefins", "syngas", "salts"] },
    { id: "unit-ops",       label: "Unit operations",      sub: "reactors · separations · coatings · deposition · QA", nodes: ["electrolysis", "membranes", "CVD", "distillation", "crystallization"] },
    { id: "manufacturing",  label: "Manufacturing systems", sub: "process windows · reliability · throughput", nodes: ["roll-to-roll", "additive", "wafer fabs", "biofermentation"] },
    { id: "infrastructure", label: "Infrastructure",       sub: "utilities · grids · logistics · standards · safety", nodes: ["grid", "pipelines", "ports", "permits", "service"] },
    { id: "deployable",     label: "Deployable systems",   sub: "products in the built world", nodes: ["vehicles", "buildings", "power plants", "habitats", "appliances"] },
  ];

  const PATHWAYS = [
    "Increase yield per pass",  "Close recycle loops",  "Reduce energy intensity",
    "Tighten process windows",  "Substitute supply-constrained inputs", "Cut capital intensity",
    "Improve reliability cycling","Standardize interfaces", "Modularize for replication",
    "Co-locate utilities & feedstocks", "Drive cost-of-quality down",
  ];

  /* ── 115 atlas entries ──────────────────────────────────── */
  const RAW = [
    // ENERGY (17)
    ["Solid-state batteries", "energy", "Li", "deposition", "purity", "roadmap"],
    ["Sodium-ion batteries", "energy", "Na", "fabrication", "reliability", "direct"],
    ["Iron–air batteries", "energy", "Fe", "reaction", "cost", "direct"],
    ["Lithium–sulfur batteries", "energy", "Li", "reaction", "reliability", "roadmap"],
    ["Solid-oxide fuel cells", "energy", "Pt", "deposition", "reliability", "direct"],
    ["Green hydrogen electrolysis", "energy", "H₂", "reaction", "energy-intensity", "direct"],
    ["High-temperature SMR hydrogen", "energy", "H₂", "reaction", "purity", "direct"],
    ["Closed-loop geothermal", "energy", "H₂O", "heat", "scale-up", "roadmap"],
    ["Enhanced geothermal systems", "energy", "H₂O", "heat", "infrastructure", "roadmap"],
    ["Tokamak fusion", "energy", "T", "qa", "scale-up", "analogue"],
    ["Inertial confinement fusion", "energy", "T", "qa", "scale-up", "analogue"],
    ["Stellarator fusion", "energy", "T", "fabrication", "scale-up", "analogue"],
    ["Floating offshore wind", "energy", "Cu", "fabrication", "infrastructure", "direct"],
    ["Airborne wind energy", "energy", "Cu", "fabrication", "reliability", "analogue"],
    ["Perovskite tandem PV", "energy", "Si", "deposition", "reliability", "roadmap"],
    ["Concentrating solar thermal", "energy", "H₂O", "heat", "cost", "direct"],
    ["Tidal stream energy", "energy", "Cu", "fabrication", "reliability", "direct"],

    // CARBON (16)
    ["Liquid-solvent DAC", "carbon", "CO₂", "separation", "energy-intensity", "direct"],
    ["Solid-sorbent DAC", "carbon", "CO₂", "separation", "energy-intensity", "direct"],
    ["Ocean alkalinity enhancement", "carbon", "CO₂", "reaction", "regulation", "roadmap"],
    ["Enhanced rock weathering", "carbon", "CO₂", "reaction", "scale-up", "roadmap"],
    ["Biochar at scale", "carbon", "C*", "reaction", "supply", "direct"],
    ["Mineralized concrete (CO₂-cured)", "carbon", "CO₂", "reaction", "integration", "direct"],
    ["H₂-DRI carbon-negative steel", "carbon", "H₂", "reaction", "infrastructure", "roadmap"],
    ["Synthetic e-kerosene", "carbon", "CO₂", "reaction", "cost", "roadmap"],
    ["e-Methanol", "carbon", "CO₂", "reaction", "cost", "direct"],
    ["CO₂-to-polymers", "carbon", "CO₂", "reaction", "yield", "roadmap"],
    ["Methane pyrolysis", "carbon", "CH₄", "reaction", "yield", "roadmap"],
    ["Mineral carbonation", "carbon", "CO₂", "reaction", "scale-up", "direct"],
    ["Marine CO₂ removal", "carbon", "CO₂", "separation", "regulation", "analogue"],
    ["BECCS", "carbon", "C*", "separation", "supply", "direct"],
    ["Industrial flue capture", "carbon", "CO₂", "separation", "cost", "direct"],
    ["Cement clinker substitution", "carbon", "C*", "reaction", "integration", "direct"],

    // WATER (14)
    ["Atmospheric water (sorbent)", "water", "H₂O", "separation", "energy-intensity", "roadmap"],
    ["Atmospheric water (cooled)", "water", "H₂O", "heat", "energy-intensity", "direct"],
    ["Solar-thermal desalination", "water", "H₂O", "separation", "cost", "direct"],
    ["Membrane distillation", "water", "H₂O", "separation", "reliability", "roadmap"],
    ["Forward osmosis", "water", "H₂O", "separation", "purity", "roadmap"],
    ["Capacitive deionization", "water", "H₂O", "separation", "scale-up", "roadmap"],
    ["Electrochemical PFAS destruction", "water", "H₂O", "reaction", "yield", "roadmap"],
    ["Direct lithium extraction", "water", "Li", "separation", "yield", "roadmap"],
    ["Produced water reuse", "water", "H₂O", "separation", "purity", "direct"],
    ["Greywater closed-loop", "water", "H₂O", "separation", "integration", "direct"],
    ["Fog harvesting", "water", "H₂O", "separation", "supply", "analogue"],
    ["Hypersaline brine valorization", "water", "Li", "reaction", "cost", "roadmap"],
    ["Seawater uranium extraction", "water", "U", "separation", "yield", "analogue"],
    ["Membrane-less electrolytic purification", "water", "H₂O", "reaction", "reliability", "analogue"],

    // MATERIALS (18)
    ["Mycelium structural composites", "materials", "C*", "fabrication", "reliability", "roadmap"],
    ["Self-healing concrete", "materials", "CaCO₃", "reaction", "reliability", "roadmap"],
    ["Programmable metamaterials", "materials", "Si", "fabrication", "scale-up", "analogue"],
    ["Topological photonic crystals", "materials", "Si", "deposition", "yield", "analogue"],
    ["Transparent aluminum (AlON)", "materials", "AlON", "fabrication", "cost", "direct"],
    ["PHA bioplastics", "materials", "C*", "reaction", "yield", "direct"],
    ["Living building materials", "materials", "C*", "reaction", "regulation", "roadmap"],
    ["Mass-timber CLT", "materials", "C*", "fabrication", "supply", "direct"],
    ["Graphene mass manufacturing", "materials", "C*", "deposition", "yield", "roadmap"],
    ["Cubic boron arsenide thermal", "materials", "BAs", "deposition", "scale-up", "analogue"],
    ["Aerogels (silica/polyimide)", "materials", "SiO₂", "fabrication", "cost", "direct"],
    ["Metal-organic frameworks", "materials", "Cu", "reaction", "scale-up", "roadmap"],
    ["Quantum-dot displays", "materials", "Si", "deposition", "purity", "direct"],
    ["Solid-state electrolytes", "materials", "Li", "deposition", "purity", "roadmap"],
    ["Cathode active material recycling", "materials", "Ni", "separation", "supply", "direct"],
    ["Rare-earth-free permanent magnets", "materials", "Fe", "fabrication", "supply", "roadmap"],
    ["Photonic neuromorphic chips", "materials", "Si", "deposition", "yield", "analogue"],
    ["Diamond semiconductors", "materials", "C*", "deposition", "scale-up", "analogue"],

    // MANUFACTURING (16)
    ["3D-printed buildings", "manufacturing", "C*", "fabrication", "reliability", "direct"],
    ["Vat photopolymerization at scale", "manufacturing", "C*", "fabrication", "yield", "direct"],
    ["Cold-spray additive", "manufacturing", "Cu", "deposition", "reliability", "direct"],
    ["Continuous-flow chemistry", "manufacturing", "CO₂", "reaction", "scale-up", "direct"],
    ["Modular nuclear factories", "manufacturing", "U", "qa", "regulation", "roadmap"],
    ["Roll-to-roll perovskite", "manufacturing", "Si", "deposition", "yield", "roadmap"],
    ["Lab-grown meat bioreactors", "manufacturing", "C*", "reaction", "cost", "roadmap"],
    ["Cellular agriculture (dairy)", "manufacturing", "C*", "reaction", "cost", "direct"],
    ["Mycelium leather", "manufacturing", "C*", "fabrication", "reliability", "direct"],
    ["Precision fermentation proteins", "manufacturing", "C*", "reaction", "yield", "direct"],
    ["Spider-silk fibers", "manufacturing", "C*", "fabrication", "scale-up", "roadmap"],
    ["Digital twins for fabs", "manufacturing", "Si", "qa", "integration", "direct"],
    ["Co-bot assembly cells", "manufacturing", "Cu", "qa", "integration", "direct"],
    ["Self-assembling materials", "manufacturing", "Si", "deposition", "yield", "analogue"],
    ["Closed-loop battery recycling", "manufacturing", "Li", "separation", "yield", "direct"],
    ["Atomic-layer manufacturing", "manufacturing", "Si", "deposition", "yield", "roadmap"],

    // CITIES (17)
    ["Vertical farms", "cities", "H₂O", "fabrication", "cost", "direct"],
    ["Cultivated produce greenhouses", "cities", "H₂O", "heat", "cost", "direct"],
    ["Urban air mobility (eVTOL)", "cities", "Cu", "qa", "regulation", "roadmap"],
    ["Hyperloop", "cities", "Cu", "fabrication", "infrastructure", "analogue"],
    ["Autonomous transit pods", "cities", "Cu", "qa", "regulation", "roadmap"],
    ["Smart-glass facades", "cities", "Si", "deposition", "cost", "direct"],
    ["Building-integrated PV", "cities", "Si", "deposition", "integration", "direct"],
    ["District geothermal", "cities", "H₂O", "heat", "infrastructure", "direct"],
    ["Sewage-thermal recovery", "cities", "H₂O", "heat", "integration", "direct"],
    ["Smart water grids", "cities", "H₂O", "qa", "integration", "direct"],
    ["Underground freight", "cities", "Cu", "fabrication", "infrastructure", "analogue"],
    ["Robotic last-mile delivery", "cities", "Cu", "qa", "regulation", "direct"],
    ["Microgrids + V2G", "cities", "Cu", "qa", "integration", "direct"],
    ["Heat-pump retrofits at scale", "cities", "Cu", "heat", "supply", "direct"],
    ["Cooling-as-a-service", "cities", "H₂O", "heat", "integration", "direct"],
    ["Urban DAC integration", "cities", "CO₂", "separation", "integration", "roadmap"],
    ["Modular timber towers", "cities", "C*", "fabrication", "regulation", "direct"],

    // SPACE (17)
    ["Reusable super-heavy launch", "space", "CH₄", "qa", "reliability", "direct"],
    ["Methalox propulsion", "space", "CH₄", "reaction", "reliability", "direct"],
    ["Lunar regolith ISRU", "space", "H₂O", "reaction", "scale-up", "roadmap"],
    ["Mars ISRU (Sabatier)", "space", "CO₂", "reaction", "reliability", "roadmap"],
    ["Asteroid mining", "space", "Ni", "fabrication", "infrastructure", "analogue"],
    ["Orbital solar power", "space", "Si", "fabrication", "scale-up", "analogue"],
    ["Active debris removal", "space", "Cu", "qa", "regulation", "roadmap"],
    ["Cislunar fuel depots", "space", "H₂", "qa", "infrastructure", "roadmap"],
    ["Rotating space habitats", "space", "Cu", "fabrication", "scale-up", "analogue"],
    ["Lunar nuclear power", "space", "U", "qa", "regulation", "roadmap"],
    ["On-orbit manufacturing", "space", "Si", "fabrication", "scale-up", "roadmap"],
    ["Microgravity pharma synthesis", "space", "C*", "reaction", "yield", "roadmap"],
    ["Cryo propellant transfer", "space", "H₂", "heat", "reliability", "direct"],
    ["Inflatable habitats", "space", "C*", "fabrication", "reliability", "roadmap"],
    ["Optical inter-satellite links", "space", "Si", "deposition", "reliability", "direct"],
    ["Space elevators (tether cable)", "space", "C*", "fabrication", "supply", "analogue"],
    ["Helium-3 lunar mining", "space", "He", "separation", "yield", "analogue"],
  ];

  const FLOW_LIBRARY = {
    "Solid-state batteries": {
      description: "Lithium inventory is moved through coated electrodes and a solid electrolyte stack; the hard part is clean interfaces that survive cycling.",
      flow: [["M-101", "Cathode/anode powders"], ["C-201", "Slurry or dry coating"], ["L-301", "Solid electrolyte layer"], ["A-401", "Cell stacking"], ["F-501", "Formation cycling"], ["Q-601", "Pack qualification"]]
    },
    "Sodium-ion batteries": {
      description: "A lower-cost ion-storage cell built around sodium-compatible cathodes, hard carbon anodes, electrolyte filling, and formation cycling.",
      flow: [["M-101", "Na cathode + hard carbon"], ["C-201", "Electrode coating"], ["A-301", "Cell assembly"], ["E-401", "Electrolyte filling"], ["F-501", "Formation"], ["Q-601", "Cycle screening"]]
    },
    "Iron–air batteries": {
      description: "Iron is reversibly oxidized and reduced against an air electrode; the process bottleneck is cheap, durable cycling rather than carbon chemistry.",
      flow: [["M-101", "Iron electrode"], ["A-201", "Air electrode"], ["E-301", "Electrolyte management"], ["R-401", "Fe/FeOx redox cycling"], ["W-501", "Water balance"], ["Q-601", "Long-duration cycling"]]
    },
    "Green hydrogen electrolysis": {
      description: "Purified water and renewable electricity are converted into hydrogen and oxygen, then dried, compressed, and stored.",
      flow: [["W-101", "Water purification"], ["E-201", "Power conditioning"], ["R-301", "Electrolyzer stack"], ["S-401", "Gas separation"], ["D-501", "Drying + cleanup"], ["C-601", "Compression/storage"]]
    },
    "High-temperature SMR hydrogen": {
      description: "High-temperature nuclear heat drives hydrogen production more efficiently, but the plant must couple heat, chemistry, safety, and purification.",
      flow: [["Q-101", "Nuclear heat"], ["W-201", "Steam/feed prep"], ["R-301", "Thermochemical or SOEC step"], ["S-401", "H₂ separation"], ["P-501", "Purification"], ["T-601", "Storage/export"]]
    },
    "Closed-loop geothermal": {
      description: "A sealed working fluid loop extracts heat from engineered wells without producing formation fluids at the surface.",
      flow: [["W-101", "Closed well loop"], ["HX-201", "Subsurface heat pickup"], ["P-301", "Working-fluid circulation"], ["HX-401", "Surface heat exchange"], ["T-501", "Power or district heat"], ["Q-601", "Thermal decline monitoring"]]
    },
    "Tokamak fusion": {
      description: "A magnetically confined plasma must sustain fusion power while heat, neutron damage, tritium breeding, and component replacement remain controllable.",
      flow: [["F-101", "D–T fuel handling"], ["M-201", "Magnetic confinement"], ["P-301", "Plasma heating/current drive"], ["X-401", "Blanket + neutron capture"], ["HX-501", "Heat extraction"], ["Q-601", "Materials/availability"]]
    },
    "Inertial confinement fusion": {
      description: "Precision fuel capsules are compressed by laser energy; credible scale-up depends on target fabrication, repetition rate, and energy recovery.",
      flow: [["T-101", "Fuel target fabrication"], ["L-201", "Laser pulse shaping"], ["C-301", "Capsule compression"], ["R-401", "Ignition/burn"], ["HX-501", "Energy capture"], ["Q-601", "Shot-rate reliability"]]
    },
    "Stellarator fusion": {
      description: "Three-dimensional magnetic coils stabilize plasma without pulsed tokamak operation, shifting the bottleneck toward fabrication precision and component maintenance.",
      flow: [["C-101", "3D coil fabrication"], ["V-201", "Vacuum vessel"], ["P-301", "Plasma heating"], ["M-401", "Steady confinement"], ["HX-501", "Blanket heat removal"], ["Q-601", "Maintainability"]]
    },
    "Perovskite tandem PV": {
      description: "Perovskite and silicon absorber layers are stacked to capture more spectrum, but moisture, ions, and scalable coating windows limit deployment.",
      flow: [["S-101", "Silicon bottom cell"], ["C-201", "Perovskite coating"], ["A-301", "Anneal/crystallize"], ["E-401", "Contacts"], ["L-501", "Encapsulation"], ["Q-601", "Outdoor stability"]]
    },
    "Liquid-solvent DAC": {
      description: "Large contactors move ambient air across alkaline solvent, then regenerate concentrated CO₂ using heat and caustic recovery.",
      flow: [["A-101", "Air contactor"], ["S-201", "Alkaline solvent capture"], ["C-301", "Carbonate loop"], ["R-401", "Calcination/regeneration"], ["P-501", "CO₂ purification"], ["C-601", "Compression"]]
    },
    "Solid-sorbent DAC": {
      description: "Ambient air passes through solid sorbents that bind CO₂ and release it under heat or vacuum swing.",
      flow: [["A-101", "Air contactor"], ["B-201", "Sorbent bed capture"], ["V-301", "Vacuum/thermal swing"], ["S-401", "CO₂ desorption"], ["D-501", "Drying/polishing"], ["C-601", "Compression"]]
    },
    "Atmospheric water (sorbent)": {
      description: "A hygroscopic sorbent captures water vapor from air, then releases it with heat for condensation and purification.",
      flow: [["A-101", "Ambient air"], ["B-201", "Sorbent capture"], ["R-301", "Thermal regeneration"], ["HX-401", "Condensation"], ["F-501", "Purification"], ["T-601", "Storage"]]
    },
    "Electrochemical PFAS destruction": {
      description: "Contaminated water is concentrated and treated electrochemically to break persistent carbon-fluorine bonds.",
      flow: [["W-101", "Contaminated water"], ["C-201", "Pre-concentration"], ["E-301", "Electrochemical cell"], ["R-401", "C–F bond destruction"], ["F-501", "Byproduct removal"], ["Q-601", "Effluent verification"]]
    },
    "Direct lithium extraction": {
      description: "Lithium is selectively pulled from brines using sorbents, membranes, or ion-exchange media, then polished into battery-grade product.",
      flow: [["B-101", "Brine intake"], ["F-201", "Solids pretreatment"], ["S-301", "Selective Li capture"], ["R-401", "Elution/regeneration"], ["C-501", "Concentration"], ["Q-601", "Battery-grade polishing"]]
    },
    "Vertical farms": {
      description: "Controlled-environment agriculture converts electricity, water, nutrients, CO₂, and genetics into produce under tight climate and disease control.",
      flow: [["S-101", "Seeds/seedlings"], ["N-201", "Nutrient dosing"], ["L-301", "LED lighting"], ["C-401", "Climate control"], ["H-501", "Harvest + handling"], ["Q-601", "Food safety"]]
    },
    "Urban air mobility (eVTOL)": {
      description: "The vehicle is only one subsystem; battery cycles, certification, charging, noise, and vertiport operations determine deployment.",
      flow: [["A-101", "Airframe + rotors"], ["B-201", "Battery pack"], ["D-301", "Drive electronics"], ["Q-401", "Certification testing"], ["C-501", "Charging/vertiport"], ["O-601", "Fleet operations"]]
    },
    "Reusable super-heavy launch": {
      description: "Full reuse depends on fast propellant loading, thermal protection inspection, engine reliability, and high-throughput refurbishment.",
      flow: [["P-101", "Methalox propellants"], ["L-201", "Vehicle loading"], ["E-301", "Engine ignition"], ["F-401", "Ascent/reentry"], ["I-501", "Inspection/refurb"], ["Q-601", "Rapid reuse"]]
    },
    "Mars ISRU (Sabatier)": {
      description: "Martian CO₂ and imported or locally produced hydrogen are converted to methane and water for propellant loops.",
      flow: [["A-101", "Mars CO₂ intake"], ["H-201", "H₂ supply"], ["R-301", "Sabatier reactor"], ["S-401", "CH₄/H₂O separation"], ["E-501", "Water electrolysis"], ["T-601", "Propellant storage"]]
    },
    "Cryo propellant transfer": {
      description: "The core process is managing heat leak, boiloff, phase behavior, and coupling between two tanks in microgravity.",
      flow: [["T-101", "Donor tank chilldown"], ["P-201", "Line conditioning"], ["M-301", "Microgravity transfer"], ["V-401", "Venting/pressure control"], ["Z-501", "Zero-boiloff cooling"], ["Q-601", "Mass accounting"]]
    },
    "Lab-grown meat bioreactors": {
      description: "Cells must expand in sterile culture, differentiate on scaffolds, and be harvested without media cost or contamination dominating the economics.",
      flow: [["C-101", "Cell banking"], ["M-201", "Media prep"], ["B-301", "Bioreactor growth"], ["D-401", "Differentiation"], ["H-501", "Harvest/scaffold"], ["F-601", "Food formulation"]]
    },
    "Roll-to-roll perovskite": {
      description: "The same photovoltaic chemistry must survive continuous coating, drying, registration, encapsulation, and inline quality control.",
      flow: [["W-101", "Flexible web"], ["C-201", "Slot-die coating"], ["D-301", "Dry/anneal window"], ["E-401", "Electrodes"], ["L-501", "Encapsulation"], ["Q-601", "Inline inspection"]]
    },
    "Lithium–sulfur batteries": {
      description: "High theoretical energy density only matters if sulfur loss, lithium-metal failure, electrolyte consumption, and cycle fade can be controlled together.",
      flow: [["S-101", "Sulfur cathode"], ["L-201", "Li-metal anode"], ["E-301", "Electrolyte design"], ["C-401", "Cell assembly"], ["F-501", "Polysulfide control"], ["Q-601", "Cycle-life screen"]]
    },
    "Solid-oxide fuel cells": {
      description: "SOFC deployment is a ceramic-stack manufacturing and thermal-cycling problem as much as an electrochemical conversion problem.",
      flow: [["G-101", "Fuel + air feed"], ["R-201", "Internal reforming"], ["E-301", "Electrochemical stack"], ["HX-401", "Heat recuperation"], ["P-501", "Power conditioning"], ["Q-601", "Thermal-cycle QA"]]
    },
    "Enhanced geothermal systems": {
      description: "EGS depends on creating and controlling a subsurface heat exchanger without unacceptable seismicity, water loss, or drilling cost.",
      flow: [["D-101", "Deep wells"], ["F-201", "Reservoir stimulation"], ["P-301", "Water circulation"], ["HX-401", "Rock heat pickup"], ["T-501", "Power conversion"], ["M-601", "Seismic monitoring"]]
    },
    "Floating offshore wind": {
      description: "The turbine is mature; the frontier is floating platform fabrication, mooring reliability, dynamic export cables, and offshore maintenance logistics.",
      flow: [["F-101", "Floating platform"], ["T-201", "Turbine assembly"], ["M-301", "Mooring system"], ["C-401", "Dynamic cable"], ["G-501", "Grid export"], ["Q-601", "Offshore O&M"]]
    },
    "Concentrating solar thermal": {
      description: "Concentrating solar becomes dispatchable heat or power only if mirrors, receiver temperature, thermal storage, and fouling losses stay inside an operating window.",
      flow: [["M-101", "Heliostat field"], ["R-201", "Solar receiver"], ["HX-301", "Heat-transfer fluid"], ["T-401", "Thermal storage"], ["P-501", "Power block"], ["Q-601", "Optical cleanliness"]]
    },
    "Synthetic e-kerosene": {
      description: "Aviation e-fuel is a coupling problem between captured CO₂, green H₂, syngas chemistry, product upgrading, and fuel certification.",
      flow: [["C-101", "CO₂ feed"], ["H-201", "Green H₂"], ["R-301", "RWGS/syngas"], ["F-401", "Fischer–Tropsch"], ["U-501", "Hydrocracking"], ["Q-601", "Jet-fuel spec"]]
    },
    "e-Methanol": {
      description: "E-methanol turns CO₂ and hydrogen into a liquid carrier, but the economics hinge on catalyst productivity, recycle ratio, and low-cost hydrogen.",
      flow: [["C-101", "CO₂ feed"], ["H-201", "H₂ feed"], ["R-301", "Methanol synthesis"], ["HX-401", "Heat removal"], ["D-501", "Distillation"], ["RC-601", "Gas recycle"]]
    },
    "CO₂-to-polymers": {
      description: "The engineering question is not just using CO₂, but inserting it into polymer chains with controlled molecular weight, purity, and marketable properties.",
      flow: [["C-101", "CO₂ purification"], ["E-201", "Epoxide/comonomer"], ["R-301", "Catalytic copolymerization"], ["S-401", "Catalyst removal"], ["F-501", "Pelletizing"], ["Q-601", "Property testing"]]
    },
    "Methane pyrolysis": {
      description: "Methane pyrolysis avoids CO₂ formation only if heat delivery, carbon handling, reactor fouling, and hydrogen separation scale cleanly.",
      flow: [["G-101", "Methane feed"], ["R-201", "High-temp pyrolysis"], ["S-301", "H₂ separation"], ["C-401", "Solid carbon removal"], ["HX-501", "Heat recovery"], ["Q-601", "Fouling control"]]
    },
    "Industrial flue capture": {
      description: "Post-combustion capture is a solvent, heat-integration, corrosion, and retrofit problem tied to the host plant rather than a standalone box.",
      flow: [["F-101", "Flue-gas cooling"], ["A-201", "Absorber contact"], ["S-301", "Solvent regeneration"], ["C-401", "CO₂ compression"], ["W-501", "Solvent reclaiming"], ["Q-601", "Emissions QA"]]
    },
    "Solar-thermal desalination": {
      description: "The useful product is fresh water; the process challenge is coupling low-grade heat, evaporation/condensation, fouling control, and brine management.",
      flow: [["S-101", "Saline intake"], ["P-201", "Pretreatment"], ["HX-301", "Solar heat input"], ["E-401", "Evaporation"], ["C-501", "Condensation"], ["B-601", "Brine handling"]]
    },
    "Membrane distillation": {
      description: "Membrane distillation is attractive when low-grade heat is available, but wetting, scaling, and module heat loss determine whether it lasts.",
      flow: [["S-101", "Saline feed"], ["HX-201", "Feed heating"], ["M-301", "Hydrophobic membrane"], ["V-401", "Vapor transport"], ["C-501", "Condensate recovery"], ["Q-601", "Wetting/scaling QA"]]
    },
    "Produced water reuse": {
      description: "Oilfield or industrial produced water becomes reusable only after suspended solids, organics, salts, and trace contaminants are handled as one train.",
      flow: [["W-101", "Produced water"], ["F-201", "Oil/solids removal"], ["M-301", "Membrane/thermal step"], ["A-401", "Trace adsorption"], ["D-501", "Disinfection"], ["Q-601", "Reuse verification"]]
    },
    "Mycelium structural composites": {
      description: "Mycelium products scale through biology plus manufacturing: feedstock variability, growth control, drying, pressing, and fire/moisture qualification.",
      flow: [["B-101", "Biomass feedstock"], ["I-201", "Mycelium inoculation"], ["G-301", "Controlled growth"], ["D-401", "Drying/kill step"], ["P-501", "Pressing/finishing"], ["Q-601", "Fire/moisture tests"]]
    },
    "PHA bioplastics": {
      description: "PHA is a fermentation-to-polymer problem where carbon feedstock, organism productivity, downstream extraction, and cost dominate scale-up.",
      flow: [["F-101", "Sugar/oil feed"], ["B-201", "Microbial fermentation"], ["H-301", "Cell harvest"], ["E-401", "Polymer extraction"], ["P-501", "Pelletizing"], ["Q-601", "Molecular weight QA"]]
    },
    "Graphene mass manufacturing": {
      description: "The hard part is not making graphene once; it is controlling layer count, defects, transfer, and dispersion at industrial throughput.",
      flow: [["C-101", "Carbon precursor"], ["D-201", "CVD/exfoliation"], ["S-301", "Layer separation"], ["T-401", "Transfer/dispersion"], ["F-501", "Film or powder form"], ["Q-601", "Defect metrology"]]
    },
    "Metal-organic frameworks": {
      description: "MOFs move from papers to products when synthesis, activation, shaping, moisture stability, and cycle life are engineered together.",
      flow: [["M-101", "Metal salts"], ["L-201", "Organic linker"], ["R-301", "Solvothermal synthesis"], ["A-401", "Activation"], ["F-501", "Pellet/monolith forming"], ["Q-601", "Adsorption cycling"]]
    },
    "Cathode active material recycling": {
      description: "Battery recycling is a separations and refining train whose value depends on black-mass quality, metals recovery, impurity control, and cathode-grade output.",
      flow: [["B-101", "Battery black mass"], ["L-201", "Leaching"], ["S-301", "Metals separation"], ["P-401", "Precipitation"], ["C-501", "Cathode precursor"], ["Q-601", "Impurity QA"]]
    },
    "3D-printed buildings": {
      description: "Construction printing depends on rheology, pumpability, layer adhesion, curing, reinforcement integration, and code qualification.",
      flow: [["M-101", "Cementitious mix"], ["R-201", "Rheology tuning"], ["P-301", "Pump/extrude"], ["L-401", "Layer build"], ["C-501", "Cure + reinforce"], ["Q-601", "Code inspection"]]
    },
    "Continuous-flow chemistry": {
      description: "Flow chemistry compresses reaction time and inventory, but scale-up shifts to residence-time distribution, heat removal, fouling, and numbering-up.",
      flow: [["F-101", "Metered feeds"], ["M-201", "Micromixing"], ["R-301", "Flow reactor"], ["HX-401", "Heat control"], ["S-501", "Inline separation"], ["Q-601", "PAT feedback"]]
    },
    "Closed-loop battery recycling": {
      description: "Closed-loop recycling works only if collection, discharge, shredding, hydrometallurgy, precursor synthesis, and cell qualification connect cleanly.",
      flow: [["C-101", "Collected packs"], ["D-201", "Discharge/dismantle"], ["S-301", "Shredding/sorting"], ["L-401", "Leach + recover"], ["P-501", "CAM precursor"], ["Q-601", "Cell validation"]]
    },
    "Building-integrated PV": {
      description: "BIPV must satisfy building-envelope, electrical, weathering, fire, and aesthetic constraints simultaneously, not just photovoltaic efficiency.",
      flow: [["G-101", "Glass/module stack"], ["E-201", "Cell integration"], ["S-301", "Sealing/weatherproofing"], ["W-401", "Wiring/inverter"], ["I-501", "Facade installation"], ["Q-601", "Code + leak tests"]]
    },
    "Heat-pump retrofits at scale": {
      description: "The deployment problem is matching refrigerant loops, building loads, installer labor, grid peaks, and user comfort across old housing stock.",
      flow: [["B-101", "Building audit"], ["L-201", "Load calculation"], ["H-301", "Heat-pump install"], ["D-401", "Duct/hydronic fit"], ["C-501", "Controls tuning"], ["Q-601", "Seasonal performance"]]
    },
    "Microgrids + V2G": {
      description: "Vehicle-to-grid microgrids require power electronics, forecasting, controls, interconnection standards, and battery degradation accounting.",
      flow: [["G-101", "Local generation"], ["B-201", "Battery/EV fleet"], ["I-301", "Inverters"], ["C-401", "Dispatch control"], ["U-501", "Utility interface"], ["Q-601", "Degradation tracking"]]
    },
    "Methalox propulsion": {
      description: "Methalox engines are a cryogenic combustion and turbomachinery system where mixture ratio, cooling, ignition, and reusability dominate.",
      flow: [["P-101", "CH₄/O₂ loading"], ["T-201", "Turbopumps"], ["I-301", "Ignition sequence"], ["C-401", "Regenerative cooling"], ["N-501", "Nozzle expansion"], ["Q-601", "Hot-fire reuse QA"]]
    },
    "Lunar regolith ISRU": {
      description: "Regolith ISRU has to mine, sort, heat, react, and separate useful oxygen or metals under abrasive dust and limited power.",
      flow: [["M-101", "Regolith excavation"], ["S-201", "Size sorting"], ["R-301", "Reduction/molten electrolysis"], ["S-401", "O₂ separation"], ["C-501", "Metal/slag handling"], ["Q-601", "Dust-tolerant QA"]]
    },
    "On-orbit manufacturing": {
      description: "Orbital manufacturing shifts the factory problem to feedstock launch, robotic handling, thermal control, metrology, and repairability in microgravity.",
      flow: [["F-101", "Launched feedstock"], ["R-201", "Robotic handling"], ["P-301", "Print/form process"], ["T-401", "Thermal control"], ["M-501", "In-space metrology"], ["Q-601", "Assembly validation"]]
    },
    "Inflatable habitats": {
      description: "Inflatable habitats depend on packed deployment, multilayer softgoods, micrometeoroid protection, leak detection, and long-duration structural health.",
      flow: [["S-101", "Softgoods stack"], ["P-201", "Packed launch"], ["D-301", "Deployment/inflation"], ["S-401", "Structure lockout"], ["L-501", "Leak monitoring"], ["Q-601", "MMOD durability"]]
    }
  };


  Object.assign(FLOW_LIBRARY, {
    "Airborne wind energy": {
      description: "Tethered wings or kites harvest stronger winds aloft, but the system succeeds only if autonomous flight, tether fatigue, winch control, and grid interconnection are reliable.",
      flow: [["W-101", "Launch/landing station"], ["A-201", "Autonomous wing flight"], ["T-301", "Tether load transfer"], ["G-401", "Generator/winch conversion"], ["C-501", "Power conditioning"], ["Q-601", "Fatigue + flight safety"]]
    },
    "Tidal stream energy": {
      description: "Tidal turbines convert predictable marine currents into power; durability against corrosion, biofouling, blade loading, and subsea maintenance controls economics.",
      flow: [["S-101", "Seabed survey"], ["F-201", "Foundation install"], ["T-301", "Rotor/turbine capture"], ["E-401", "Subsea export cable"], ["P-501", "Power conversion"], ["Q-601", "Marine reliability checks"]]
    },
    "Ocean alkalinity enhancement": {
      description: "Alkaline minerals or electrochemical alkalinity are added to seawater to increase CO₂ uptake, making verification, ecological limits, and distribution control central.",
      flow: [["M-101", "Alkalinity source"], ["P-201", "Grinding/dissolution"], ["D-301", "Ocean dosing"], ["C-401", "Carbonate equilibration"], ["M-501", "MRV sampling"], ["R-601", "Ecological/regulatory review"]]
    },
    "Enhanced rock weathering": {
      description: "Crushed silicate or carbonate minerals are spread over land so weathering consumes CO₂, with mining, grinding energy, soil impacts, and measurement dominating scale-up.",
      flow: [["R-101", "Rock mining"], ["G-201", "Comminution"], ["L-301", "Field logistics"], ["S-401", "Soil application"], ["W-501", "Weathering uptake"], ["M-601", "Carbon accounting"]]
    },
    "Biochar at scale": {
      description: "Biomass is thermally converted into stable carbon-rich char; the process hinges on feedstock logistics, pyrolysis conditions, product stability, and soil certification.",
      flow: [["B-101", "Biomass collection"], ["D-201", "Drying/sizing"], ["PY-301", "Pyrolysis"], ["G-401", "Syngas/heat recovery"], ["C-501", "Char conditioning"], ["M-601", "Stability + MRV"]]
    },
    "Mineralized concrete (CO₂-cured)": {
      description: "Concrete products are cured with CO₂ so carbonates form inside the material; deployment depends on strength, curing throughput, CO₂ delivery, and code acceptance.",
      flow: [["M-101", "Cementitious mix"], ["F-201", "Block/precast forming"], ["C-301", "CO₂ curing chamber"], ["R-401", "Carbonate formation"], ["S-501", "Strength testing"], ["Q-601", "Code qualification"]]
    },
    "H₂-DRI carbon-negative steel": {
      description: "Iron ore is reduced using hydrogen instead of carbon monoxide, then melted and refined; infrastructure for clean H₂ and high-temperature solids handling is the constraint.",
      flow: [["O-101", "Iron ore pellets"], ["H-201", "Hydrogen supply"], ["R-301", "Direct reduction shaft"], ["E-401", "Electric melting"], ["A-501", "Alloy/refining"], ["Q-601", "Steel certification"]]
    },
    "Mineral carbonation": {
      description: "CO₂ is reacted with alkaline minerals or industrial residues to form stable carbonates, shifting the challenge to contact area, kinetics, water use, and solids handling.",
      flow: [["F-101", "CO₂ stream"], ["M-201", "Alkaline mineral/residue"], ["P-301", "Grinding/activation"], ["R-401", "Carbonation reactor"], ["S-501", "Solids separation"], ["M-601", "Storage verification"]]
    },
    "Marine CO₂ removal": {
      description: "CO₂ is removed from seawater or ocean chemistry is shifted so the ocean can absorb more carbon, making MRV and ecological safety inseparable from the process train.",
      flow: [["I-101", "Seawater intake"], ["S-201", "DIC/alkalinity shift"], ["G-301", "CO₂ stripping/capture"], ["R-401", "Water return"], ["M-501", "Ocean monitoring"], ["V-601", "MRV + permitting"]]
    },
    "BECCS": {
      description: "Biomass energy with carbon capture couples land, combustion or fermentation, CO₂ capture, compression, and geologic storage into one accounting-sensitive system.",
      flow: [["B-101", "Biomass supply"], ["E-201", "Energy conversion"], ["C-301", "CO₂ capture"], ["D-401", "Dehydration/compression"], ["T-501", "Transport"], ["S-601", "Storage + MRV"]]
    },
    "Cement clinker substitution": {
      description: "Lower-clinker cement replaces energy-intensive clinker with supplementary binders while maintaining strength gain, durability, supply, and code acceptance.",
      flow: [["M-101", "SCM/binder sourcing"], ["G-201", "Grinding/blending"], ["R-301", "Hydration chemistry"], ["C-401", "Cure protocol"], ["S-501", "Strength/durability"], ["Q-601", "Standard approval"]]
    },
    "Atmospheric water (cooled)": {
      description: "Air is cooled below its dew point and condensed; energy use depends on humidity, heat exchange, refrigeration efficiency, and condensate quality control.",
      flow: [["A-101", "Ambient air intake"], ["F-201", "Filtration"], ["HX-301", "Dew-point cooling"], ["C-401", "Condensation"], ["P-501", "Water polishing"], ["T-601", "Storage/sanitation"]]
    },
    "Forward osmosis": {
      description: "A draw solution pulls water through a membrane osmotically, but the full process is only useful if draw regeneration and membrane fouling are controlled.",
      flow: [["F-101", "Feed water"], ["M-201", "FO membrane contact"], ["D-301", "Draw solution dilution"], ["R-401", "Draw regeneration"], ["P-501", "Product polishing"], ["Q-601", "Flux/fouling check"]]
    },
    "Capacitive deionization": {
      description: "Salts are removed by charging porous electrodes and then released during regeneration, making electrode stability and brine management the main scale questions.",
      flow: [["W-101", "Brackish feed"], ["P-201", "Particle pretreatment"], ["E-301", "Electrode adsorption"], ["R-401", "Regeneration pulse"], ["B-501", "Brine handling"], ["Q-601", "Conductivity control"]]
    },
    "Greywater closed-loop": {
      description: "Building wastewater is locally treated and reused, requiring robust filtration, biological control, disinfection, monitoring, and plumbing integration.",
      flow: [["G-101", "Greywater collection"], ["F-201", "Screening/filtration"], ["B-301", "Bio/adsorptive treatment"], ["D-401", "Disinfection"], ["T-501", "Reuse storage"], ["Q-601", "Sensor verification"]]
    },
    "Fog harvesting": {
      description: "Mesh or structured surfaces collect droplets from fog, so site climate, surface wetting, drainage, fouling, and storage determine practical yield.",
      flow: [["S-101", "Site fog resource"], ["M-201", "Mesh/surface capture"], ["C-301", "Droplet coalescence"], ["D-401", "Gravity drainage"], ["P-501", "Filtration"], ["T-601", "Storage"]]
    },
    "Hypersaline brine valorization": {
      description: "Concentrated brines are converted from disposal liabilities into salts, lithium, magnesium, or chemicals through staged separation and crystallization.",
      flow: [["B-101", "Hypersaline brine"], ["P-201", "Pretreatment"], ["E-301", "Evaporation/concentration"], ["X-401", "Selective crystallization"], ["S-501", "Ion recovery"], ["W-601", "Residual disposal"]]
    },
    "Seawater uranium extraction": {
      description: "Uranium is captured from extremely dilute seawater using selective adsorbents, so the economics depend on adsorption rate, deployment lifetime, and elution chemistry.",
      flow: [["S-101", "Seawater exposure"], ["A-201", "Amidoxime adsorbent"], ["L-301", "Long-duration loading"], ["E-401", "Elution"], ["C-501", "Concentration/purification"], ["Q-601", "Adsorbent reuse"]]
    },
    "Membrane-less electrolytic purification": {
      description: "Electrochemical gradients and reactions purify water without a conventional membrane, trading membrane fouling for electrode durability and byproduct control.",
      flow: [["W-101", "Contaminated feed"], ["E-201", "Electrode reactor"], ["R-301", "Redox/ion migration"], ["S-401", "Phase/product split"], ["P-501", "Polishing"], ["Q-601", "Byproduct monitoring"]]
    },
    "Self-healing concrete": {
      description: "Concrete is modified with bacteria, capsules, or mineral precursors that seal cracks, making survivability, activation, and structural verification the core issues.",
      flow: [["M-101", "Concrete matrix"], ["A-201", "Healing additive"], ["F-301", "Casting/curing"], ["D-401", "Crack activation"], ["R-501", "Mineral sealing"], ["Q-601", "Durability testing"]]
    },
    "Programmable metamaterials": {
      description: "Microstructured materials encode unusual mechanical or optical response through geometry; scale-up is precision fabrication plus repeatable property verification.",
      flow: [["D-101", "Lattice design"], ["M-201", "Material selection"], ["F-301", "Microfabrication"], ["A-401", "Array assembly"], ["T-501", "Property test"], ["Q-601", "Defect tolerance"]]
    },
    "Topological photonic crystals": {
      description: "Nanostructured optical lattices guide light through protected modes, but device relevance depends on pattern fidelity, losses, coupling, and wafer-scale yield.",
      flow: [["S-101", "Substrate prep"], ["L-201", "Lithographic pattern"], ["E-301", "Etch/deposition"], ["C-401", "Waveguide coupling"], ["M-501", "Optical metrology"], ["Q-601", "Yield mapping"]]
    },
    "Transparent aluminum (AlON)": {
      description: "AlON ceramics become transparent only after powder purity, forming, sintering, and polishing produce a dense optical body without scattering defects.",
      flow: [["P-101", "AlON powder"], ["F-201", "Press/form green body"], ["S-301", "High-temp sintering"], ["H-401", "Hot isostatic pressing"], ["P-501", "Optical polishing"], ["Q-601", "Transmission/impact test"]]
    },
    "Living building materials": {
      description: "Living materials embed organisms or bio-mineral processes into construction products, so moisture, nutrients, containment, and code approval become process variables.",
      flow: [["B-101", "Biological inoculum"], ["M-201", "Mineral/matrix feed"], ["G-301", "Growth or curing"], ["S-401", "Stabilization"], ["E-501", "Environmental exposure"], ["Q-601", "Biosafety/code review"]]
    },
    "Mass-timber CLT": {
      description: "Cross-laminated timber scales through lamination quality, adhesive cure, moisture control, fire performance, and supply of certified wood feedstock.",
      flow: [["L-101", "Lumber grading"], ["D-201", "Drying/conditioning"], ["A-301", "Adhesive layup"], ["P-401", "Panel pressing"], ["M-501", "Machining"], ["Q-601", "Fire/structural rating"]]
    },
    "Cubic boron arsenide thermal": {
      description: "Boron arsenide promises exceptional thermal transport, but the process challenge is growing large, pure crystals and integrating them into devices.",
      flow: [["P-101", "High-purity precursors"], ["G-201", "Crystal growth"], ["C-301", "Defect control"], ["W-401", "Wafering/polish"], ["I-501", "Device integration"], ["Q-601", "Thermal metrology"]]
    },
    "Aerogels (silica/polyimide)": {
      description: "Aerogels deliver insulation by locking pores into a low-density network; manufacturing must control gelation, drying stress, dusting, and mechanical fragility.",
      flow: [["S-101", "Sol preparation"], ["G-201", "Gelation"], ["A-301", "Aging/solvent exchange"], ["D-401", "Supercritical/ambient drying"], ["R-501", "Reinforcement"], ["Q-601", "Thermal/mechanical test"]]
    },
    "Quantum-dot displays": {
      description: "Quantum-dot displays depend on nanoscale emitter synthesis, ligand control, deposition uniformity, encapsulation, and lifetime under blue/UV excitation.",
      flow: [["N-101", "QD synthesis"], ["P-201", "Purification/ligand exchange"], ["I-301", "Ink formulation"], ["C-401", "Film patterning"], ["E-501", "Encapsulation"], ["Q-601", "Color/lifetime test"]]
    },
    "Solid-state electrolytes": {
      description: "Solid electrolytes must combine ionic conductivity with manufacturable interfaces, density, moisture stability, and compatibility with lithium metal or cathodes.",
      flow: [["P-101", "Electrolyte powder"], ["M-201", "Mixing/milling"], ["F-301", "Tape/cold press"], ["S-401", "Sinter/densify"], ["I-501", "Electrode interface"], ["Q-601", "Impedance/cycling"]]
    },
    "Rare-earth-free permanent magnets": {
      description: "Alternative magnets replace constrained rare earth supply with new alloys or architectures, but coercivity, temperature stability, and mass production must close together.",
      flow: [["A-101", "Alloy feedstock"], ["M-201", "Melt/spin or powder route"], ["H-301", "Heat treatment"], ["F-401", "Magnet forming"], ["M-501", "Magnetization"], ["Q-601", "Coercivity/aging test"]]
    },
    "Photonic neuromorphic chips": {
      description: "Photonic neural hardware routes computation through light, making waveguide loss, modulator energy, memory integration, and packaging the real manufacturing gates.",
      flow: [["W-101", "Photonic wafer"], ["L-201", "Waveguide patterning"], ["D-301", "Modulator/detector deposition"], ["I-401", "Memory/electronics integration"], ["P-501", "Optical packaging"], ["Q-601", "Inference benchmark"]]
    },
    "Diamond semiconductors": {
      description: "Diamond electronics promise extreme thermal and power performance, but wafer growth, doping, contacts, and defect control remain the process bottlenecks.",
      flow: [["S-101", "Diamond seed/substrate"], ["CVD-201", "Diamond growth"], ["D-301", "Doping/implant"], ["A-401", "Anneal/activate"], ["M-501", "Ohmic contacts"], ["Q-601", "Power/thermal test"]]
    },
    "Vat photopolymerization at scale": {
      description: "Resin printing becomes production only when exposure, cure depth, resin refill, post-cure, and part qualification are repeatable at high throughput.",
      flow: [["R-101", "Resin formulation"], ["E-201", "Layer exposure"], ["B-301", "Build/recoat cycle"], ["W-401", "Wash"], ["C-501", "Post-cure"], ["Q-601", "Dimensional/material QA"]]
    },
    "Cold-spray additive": {
      description: "Metal powders are accelerated into a surface and bonded without melting, so powder quality, impact velocity, residual stress, and adhesion drive performance.",
      flow: [["P-101", "Metal powder"], ["G-201", "Gas heating/pressurization"], ["N-301", "Supersonic nozzle"], ["D-401", "Particle impact deposition"], ["M-501", "Machining/heat treat"], ["Q-601", "Adhesion/fatigue test"]]
    },
    "Modular nuclear factories": {
      description: "Factory-built nuclear systems move cost risk from field construction into repeatable modules, quality documentation, supplier control, and licensing evidence.",
      flow: [["D-101", "Standard module design"], ["F-201", "Factory fabrication"], ["N-301", "NQA documentation"], ["A-401", "Module assembly"], ["T-501", "Transport/site install"], ["L-601", "Licensing package"]]
    },
    "Cellular agriculture (dairy)": {
      description: "Dairy proteins made by microbes require strain productivity, sterile fermentation, protein recovery, formulation, and food-grade cost control.",
      flow: [["S-101", "Production strain"], ["F-201", "Fermentation"], ["H-301", "Cell removal"], ["P-401", "Protein purification"], ["F-501", "Food formulation"], ["Q-601", "Taste/safety QA"]]
    },
    "Mycelium leather": {
      description: "Mycelium leather is a controlled growth and finishing process where substrate, morphology, drying, tanning, and wear performance have to be tuned together.",
      flow: [["S-101", "Biomass substrate"], ["I-201", "Inoculation"], ["G-301", "Sheet growth"], ["D-401", "Drying/pressing"], ["F-501", "Finishing/coating"], ["Q-601", "Abrasion/moisture test"]]
    },
    "Precision fermentation proteins": {
      description: "Engineered microbes make target proteins, but commercial scale depends on strain stability, titer, downstream purification, and food or pharma qualification.",
      flow: [["S-101", "Engineered strain"], ["M-201", "Media prep"], ["F-301", "Fermentation"], ["H-401", "Harvest/clarify"], ["P-501", "Protein purification"], ["Q-601", "Specification release"]]
    },
    "Spider-silk fibers": {
      description: "Synthetic spider silk requires producing protein at useful concentration, spinning it into aligned fibers, and post-treating for strength and toughness.",
      flow: [["S-101", "Silk protein feed"], ["P-201", "Protein concentration"], ["D-301", "Dope formulation"], ["S-401", "Wet/dry spinning"], ["D-501", "Draw/post-treat"], ["Q-601", "Tensile testing"]]
    },
    "Digital twins for fabs": {
      description: "A fab digital twin is a live process-control layer: equipment telemetry, recipe context, yield data, and fault detection must be synchronized into decisions.",
      flow: [["E-101", "Equipment telemetry"], ["R-201", "Recipe/context data"], ["M-301", "Metrology feed"], ["D-401", "Model calibration"], ["C-501", "Control recommendation"], ["Q-601", "Yield validation"]]
    },
    "Co-bot assembly cells": {
      description: "Collaborative robots scale when sensing, fixturing, safety envelopes, end-effectors, and changeover procedures are engineered as one workcell.",
      flow: [["P-101", "Part presentation"], ["F-201", "Fixturing"], ["R-301", "Robot path"], ["S-401", "Safety sensing"], ["I-501", "Assembly operation"], ["Q-601", "Cycle-time QA"]]
    },
    "Self-assembling materials": {
      description: "Self-assembly uses molecular or colloidal interactions to create structure, but production needs concentration, solvent, kinetics, defects, and locking steps controlled.",
      flow: [["B-101", "Building-block synthesis"], ["S-201", "Solvent/condition set"], ["A-301", "Self-assembly"], ["L-401", "Lock-in/crosslink"], ["W-501", "Wash/dry"], ["Q-601", "Structure verification"]]
    },
    "Atomic-layer manufacturing": {
      description: "Atomic-layer manufacturing extends ALD-like precision into production, where precursor delivery, surface saturation, purge timing, and throughput become limiting.",
      flow: [["S-101", "Substrate/surface prep"], ["P-201", "Precursor pulse"], ["R-301", "Surface-limited reaction"], ["P-401", "Purge/counterpulse"], ["N-501", "Cycle repeat"], ["Q-601", "Thickness/metrology"]]
    },
    "Cultivated produce greenhouses": {
      description: "High-tech greenhouses turn agriculture into climate control, irrigation chemistry, lighting, pest management, and logistics under a tight energy budget.",
      flow: [["S-101", "Seed/propagation"], ["C-201", "Climate control"], ["N-301", "Nutrient irrigation"], ["L-401", "Lighting/shading"], ["H-501", "Harvest/pack"], ["Q-601", "Yield/quality tracking"]]
    },
    "Hyperloop": {
      description: "Hyperloop is less a pod and more an infrastructure process: tube fabrication, vacuum maintenance, levitation, switching, safety, and permitting have to align.",
      flow: [["T-101", "Tube corridor"], ["V-201", "Vacuum pumping"], ["L-301", "Levitation/propulsion"], ["S-401", "Switching/control"], ["E-501", "Emergency systems"], ["Q-601", "Safety certification"]]
    },
    "Autonomous transit pods": {
      description: "Transit pods depend on fleet operations, charging, sensing, routing, maintenance, and passenger safety more than on the vehicle shell alone.",
      flow: [["V-101", "Vehicle platform"], ["S-201", "Sensor suite"], ["R-301", "Routing/control"], ["C-401", "Charging depot"], ["M-501", "Fleet maintenance"], ["Q-601", "Safety case"]]
    },
    "Smart-glass facades": {
      description: "Electrochromic glass changes building heat and light loads, but production must control coating uniformity, wiring, sealing, and long-term cycling.",
      flow: [["G-101", "Glass substrate"], ["C-201", "Transparent conductor"], ["E-301", "Electrochromic stack"], ["L-401", "Lamination/seal"], ["B-501", "Building controls"], ["Q-601", "Cycling/weathering"]]
    },
    "District geothermal": {
      description: "District geothermal moves heat through shared wells, heat exchangers, and distribution loops, with siting, drilling, load matching, and customer interconnects as constraints.",
      flow: [["R-101", "Resource survey"], ["W-201", "Well drilling"], ["HX-301", "Heat exchange"], ["P-401", "Distribution loop"], ["B-501", "Building interface"], ["Q-601", "Load/temperature control"]]
    },
    "Sewage-thermal recovery": {
      description: "Wastewater heat recovery treats sewers as a low-grade heat source, requiring fouling-tolerant exchangers, heat pumps, and building load integration.",
      flow: [["S-101", "Sewer heat source"], ["F-201", "Screening/fouling control"], ["HX-301", "Heat exchanger"], ["HP-401", "Heat pump lift"], ["B-501", "Building loop"], ["Q-601", "Sanitary/thermal monitoring"]]
    },
    "Smart water grids": {
      description: "Smart water grids add sensors and controls to distribution networks so leaks, pressure, quality, and demand can be managed in real time.",
      flow: [["N-101", "Pipe network"], ["S-201", "Sensor nodes"], ["D-301", "Data ingestion"], ["M-401", "Leak/quality model"], ["C-501", "Valve/pump control"], ["Q-601", "Service verification"]]
    },
    "Underground freight": {
      description: "Underground freight systems shift delivery to tunnels or conduits, making excavation, routing, loading, controls, and maintenance access the key process steps.",
      flow: [["C-101", "Corridor/tunnel"], ["L-201", "Loading interface"], ["V-301", "Vehicle/capsule motion"], ["S-401", "Sorting/routing"], ["U-501", "Urban terminal"], ["Q-601", "Reliability/safety"]]
    },
    "Robotic last-mile delivery": {
      description: "Last-mile robots require fleet charging, perception, curb navigation, handoff security, weather durability, and local regulatory approval.",
      flow: [["O-101", "Order dispatch"], ["R-201", "Robot assignment"], ["P-301", "Path planning"], ["N-401", "Sidewalk navigation"], ["H-501", "Secure handoff"], ["Q-601", "Fleet uptime/safety"]]
    },
    "Cooling-as-a-service": {
      description: "Cooling-as-a-service turns HVAC into an operating platform where equipment, refrigerants, controls, maintenance, financing, and performance guarantees are bundled.",
      flow: [["L-101", "Building load audit"], ["E-201", "Equipment install"], ["R-301", "Refrigerant loop"], ["C-401", "Controls optimization"], ["M-501", "Service maintenance"], ["Q-601", "Performance guarantee"]]
    },
    "Urban DAC integration": {
      description: "Urban DAC must fit capture equipment into buildings or districts while managing air contact, heat, noise, footprint, CO₂ logistics, and public acceptance.",
      flow: [["A-101", "Urban air contact"], ["S-201", "Sorbent/solvent capture"], ["H-301", "Heat integration"], ["C-401", "CO₂ compression"], ["L-501", "Transport/use"], ["Q-601", "Permitting/MRV"]]
    },
    "Modular timber towers": {
      description: "Tall timber buildings require prefabricated panels, connection design, moisture/fire protection, installation sequencing, and code-qualified structural behavior.",
      flow: [["T-101", "Certified timber"], ["P-201", "Panel fabrication"], ["C-301", "Connection hardware"], ["F-401", "Fire/moisture treatment"], ["A-501", "Site assembly"], ["Q-601", "Structural/code check"]]
    },
    "Asteroid mining": {
      description: "Asteroid mining is a resource-processing chain under extreme logistics: prospecting, rendezvous, excavation, beneficiation, storage, and return or in-space use.",
      flow: [["P-101", "Prospecting"], ["R-201", "Rendezvous/anchoring"], ["E-301", "Excavation"], ["B-401", "Beneficiation"], ["S-501", "Storage/transfer"], ["Q-601", "Resource assay"]]
    },
    "Orbital solar power": {
      description: "Space solar power requires launchable arrays, autonomous assembly, power beaming, thermal control, and a safe ground receiving architecture.",
      flow: [["M-101", "PV/module launch"], ["A-201", "On-orbit assembly"], ["P-301", "Power conversion"], ["B-401", "Microwave/laser beam"], ["R-501", "Ground rectenna"], ["Q-601", "Safety/grid validation"]]
    },
    "Active debris removal": {
      description: "Debris removal is a rendezvous and disposal problem where sensing, capture, attitude control, deorbit, and legal authorization matter together.",
      flow: [["T-101", "Target catalog"], ["R-201", "Rendezvous"], ["C-301", "Capture mechanism"], ["A-401", "Attitude stabilization"], ["D-501", "Deorbit/disposal"], ["Q-601", "Conjunction/legal clearance"]]
    },
    "Cislunar fuel depots": {
      description: "Fuel depots become useful only when cryogenic storage, transfer, docking, boiloff control, and traffic scheduling are dependable in cislunar space.",
      flow: [["D-101", "Depot tankage"], ["C-201", "Cryo storage"], ["D-301", "Docking interface"], ["T-401", "Fluid transfer"], ["B-501", "Boiloff management"], ["Q-601", "Mission availability"]]
    },
    "Rotating space habitats": {
      description: "Artificial-gravity habitats require structural mass, rotating joints, life support, vibration control, radiation shielding, and maintainable assembly methods.",
      flow: [["S-101", "Structure modules"], ["A-201", "On-orbit assembly"], ["R-301", "Spin-up/control"], ["L-401", "Life-support loop"], ["S-501", "Shielding"], ["Q-601", "Dynamics/crew safety"]]
    },
    "Lunar nuclear power": {
      description: "Lunar fission systems must be launched, deployed, cooled, shielded, and operated remotely while satisfying space nuclear safety requirements.",
      flow: [["R-101", "Reactor module"], ["L-201", "Launch/landing"], ["D-301", "Surface deployment"], ["HX-401", "Heat rejection"], ["P-501", "Power conditioning"], ["Q-601", "Nuclear safety case"]]
    },
    "Microgravity pharma synthesis": {
      description: "Microgravity pharma uses altered crystal growth or biology, but value depends on controlled reactors, sterile handling, return logistics, and quality evidence.",
      flow: [["R-101", "Reaction/culture payload"], ["O-201", "Microgravity operation"], ["C-301", "Crystal/cell growth"], ["S-401", "Stabilization"], ["R-501", "Return logistics"], ["Q-601", "Analytical release"]]
    },
    "Optical inter-satellite links": {
      description: "Laser links need precise pointing, optical surfaces, thermal stability, electronics, and network control to turn spacecraft into useful infrastructure.",
      flow: [["O-101", "Optical terminal"], ["L-201", "Laser source"], ["P-301", "Pointing/acquisition"], ["T-401", "Thermal control"], ["N-501", "Network routing"], ["Q-601", "Link availability"]]
    },
    "Space elevators (tether cable)": {
      description: "A space elevator is fundamentally a materials and dynamics problem: tether strength, defect tolerance, deployment, climbers, debris risk, and repairability all dominate.",
      flow: [["M-101", "Ultra-strength fiber"], ["T-201", "Tether fabrication"], ["D-301", "Orbital deployment"], ["C-401", "Climber power/traction"], ["M-501", "Debris monitoring"], ["Q-601", "Inspection/repair"]]
    },
    "Helium-3 lunar mining": {
      description: "Helium-3 concepts require processing huge volumes of regolith for tiny concentrations, so excavation energy, thermal release, separation, and transport dominate.",
      flow: [["R-101", "Regolith mining"], ["H-201", "High-temp heating"], ["G-301", "Volatile release"], ["S-401", "Gas separation"], ["C-501", "Cryogenic storage"], ["Q-601", "Isotope yield audit"]]
    }
  });

  function descriptionFor(name, sector) {
    if (FLOW_LIBRARY[name]?.description) return FLOW_LIBRARY[name].description;
    const sectorLine = {
      energy: "Energy systems scale only when the device physics can be coupled to durable materials, balance-of-plant hardware, and maintainable infrastructure.",
      carbon: "Carbon systems depend on moving dilute or reactive carbon streams through capture, conversion, storage, and verification without hiding the energy penalty.",
      water: "Water systems turn scarcity or contamination into a separations problem: intake, selectivity, energy use, fouling control, and verified output quality.",
      materials: "Materials systems scale when the useful property can be made repeatably across area, volume, interfaces, and service life.",
      manufacturing: "Manufacturing systems win when the process window, quality control, throughput, and cost of failure can be controlled repeatedly.",
      cities: "Urban technologies must survive real buildings, fleets, utilities, regulations, maintenance cycles, and user adoption rather than only lab performance.",
      space: "Space systems have to close mass, energy, thermal, reliability, and maintenance loops under launch and operating constraints."
    };
    return sectorLine[sector] || "This card maps the technology into the process steps and constraints that would have to become repeatable before deployment.";
  }

  function templateFlow(unitOp, sector) {
    const templates = {
      separation: [["I-101", "Feed stream"], ["P-201", "Pretreatment"], ["S-301", "Selective separation"], ["R-401", "Regeneration/recycle"], ["Q-501", "Purity verification"], ["T-601", "Product handling"]],
      reaction: [["F-101", "Feed preparation"], ["R-201", "Reaction zone"], ["HX-301", "Heat management"], ["S-401", "Product separation"], ["RC-501", "Recycle loop"], ["Q-601", "Yield control"]],
      heat: [["Q-101", "Heat source/sink"], ["HX-201", "Heat exchange"], ["P-301", "Working-fluid loop"], ["C-401", "Thermal control"], ["U-501", "Useful output"], ["Q-601", "Efficiency monitoring"]],
      deposition: [["S-101", "Substrate prep"], ["C-201", "Coating/deposition"], ["A-301", "Anneal/cure"], ["I-401", "Interface control"], ["L-501", "Encapsulation"], ["Q-601", "Inline metrology"]],
      fabrication: [["M-101", "Material feed"], ["F-201", "Forming/assembly"], ["J-301", "Joining/integration"], ["T-401", "Tolerance control"], ["Q-501", "Inspection"], ["R-601", "Reliability test"]],
      qa: [["D-101", "Device/system"], ["S-201", "Stress protocol"], ["M-301", "Measurement"], ["A-401", "Failure analysis"], ["W-501", "Process window"], ["Q-601", "Qualification"]]
    };
    return templates[unitOp] || templates.fabrication;
  }

  const ENTRIES = RAW.map(([name, sector, chemical, unitOp, bottleneck, evidence], i) => {
    const pid = `PFD-${String(100 + i + 1).padStart(3, "0")}`;
    const trl = Math.max(1, Math.min(9, 2 + ((i * 7) % 8)));
    const mrl = Math.max(1, Math.min(9, 1 + ((i * 5 + 3) % 8)));
    const irl = Math.max(1, Math.min(9, 1 + ((i * 3 + 5) % 7)));
    const flowDef = FLOW_LIBRARY[name];
    return {
      pid, name, sector, chemical, unitOp, bottleneck, evidence,
      trl, mrl, irl,
      description: descriptionFor(name, sector),
      flow: flowDef?.flow || templateFlow(unitOp, sector),
      scaleTrigger: scaleTriggerFor(bottleneck),
    };
  });

  function scaleTriggerFor(bn) {
    const map = {
      "energy-intensity": "low-cost utilities + waste heat",
      "separations":      "selective membranes at scale",
      "yield":            "tuned catalysts, recycle loops",
      "reliability":      "thousand-cycle qualification",
      "supply":           "secondary supply + substitutes",
      "infrastructure":   "shared utilities + standards",
      "cost":             "capex compression by 4×",
      "safety":           "containment + permitting paths",
      "scale-up":         "modular replicable reactor",
      "integration":      "fitting existing grids/plants",
      "regulation":       "approved performance class",
      "purity":           "in-line metrology + control",
    };
    return map[bn] || "manufacturable, repeatable, integrated";
  }

  // Compute sector counts
  for (const s of SECTORS) {
    s.count = ENTRIES.filter(e => e.sector === s.id).length;
  }

  // Featured case studies
  const FEATURED = [
    {
      pid: "PFD-117",
      name: "Atmospheric Water Harvesting",
      sector: "water",
      inputs: ["S-101  Ambient air", "Q-301  Heat input"],
      output: "P-401  Potable water",
      steps: [
        ["B-101", "Ambient air"],
        ["A-201", "Sorbent capture"],
        ["R-301", "Regeneration"],
        ["HX-401", "Condensation"],
        ["F-501", "Purification"],
        ["T-601", "Storage"],
      ],
      bottleneck: "Energy use at low humidity",
      trigger: "Low-cost sorbents + waste heat",
      readiness: "MRL · IRL",
      reasoning: "The bottleneck is not whether water can be captured; it is whether the sorbent can regenerate with cheap heat while still producing useful yield under dry-air conditions."
    },
    {
      pid: "PFD-104",
      name: "Green Hydrogen Electrolysis",
      sector: "energy",
      inputs: ["S-101  Deionized water", "E-201  Renewable power"],
      output: "P-401  H₂  ·  O₂",
      steps: [
        ["B-101", "Water treatment"],
        ["E-201", "Electrolyzer stack"],
        ["S-301", "Gas separation"],
        ["C-401", "Compression"],
        ["F-501", "Drying"],
        ["T-601", "H₂ storage"],
      ],
      bottleneck: "Stack durability + iridium loading",
      trigger: "PGM-free catalysts at $/kW < 300",
      readiness: "MRL",
      reasoning: "The science is real, but deployment is constrained by stack lifetime, catalyst loading, water quality, compression, and coupling to cheap electricity."
    },
    {
      pid: "PFD-039",
      name: "Solid-Sorbent Direct Air Capture",
      sector: "carbon",
      inputs: ["S-101  Ambient air", "Q-301  Waste heat"],
      output: "P-401  CO₂ (fuel / mineralization / storage)",
      steps: [
        ["B-101", "Contactor inlet"],
        ["A-201", "Amine sorbent"],
        ["R-301", "Thermal swing"],
        ["S-401", "CO₂ desorption"],
        ["F-501", "Drying/polishing"],
        ["T-601", "Compression"],
      ],
      bottleneck: "Energy + sorbent cycle life",
      trigger: "Sorbents lasting 10⁴ cycles",
      readiness: "MRL · cost",
      reasoning: "DAC is a dilute-separations problem first; cycle life and regeneration energy decide whether the contactor becomes a plant rather than a demo."
    },
    {
      pid: "PFD-115",
      name: "Perovskite Tandem PV",
      sector: "energy",
      inputs: ["S-101  Silicon bottom cell", "C-201  Perovskite ink"],
      output: "P-401  Tandem solar module",
      steps: [
        ["S-101", "Silicon cell prep"],
        ["C-201", "Perovskite coating"],
        ["A-301", "Anneal/crystallize"],
        ["E-401", "Contact stack"],
        ["L-501", "Encapsulation"],
        ["Q-601", "Outdoor stability"],
      ],
      bottleneck: "Moisture/thermal reliability",
      trigger: "Bankable 25-year module data",
      readiness: "MRL · reliability",
      reasoning: "Efficiency is the visible win, but bankability comes from coating uniformity, interface control, encapsulation, and outdoor degradation data."
    },
    {
      pid: "PFD-158",
      name: "Roll-to-Roll Perovskite Manufacturing",
      sector: "manufacturing",
      inputs: ["W-101  Flexible web", "C-201  Perovskite precursor"],
      output: "P-401  Continuous PV laminate",
      steps: [
        ["W-101", "Web handling"],
        ["C-201", "Slot-die coating"],
        ["D-301", "Dry/anneal window"],
        ["E-401", "Electrode deposition"],
        ["L-501", "Encapsulation"],
        ["Q-601", "Inline inspection"],
      ],
      bottleneck: "Yield across area and time",
      trigger: "Closed-loop coating control",
      readiness: "MRL · process window",
      reasoning: "This case shows the manufacturing layer explicitly: the same chemistry must survive web speed, drying gradients, registration, defects, and inline metrology."
    },
    {
      pid: "PFD-202",
      name: "Cryo Propellant Transfer",
      sector: "space",
      inputs: ["T-101  Donor tank", "Z-201  Cryogenic cooling"],
      output: "P-401  Receiver tank propellant inventory",
      steps: [
        ["T-101", "Donor chilldown"],
        ["P-201", "Line conditioning"],
        ["M-301", "Microgravity transfer"],
        ["V-401", "Venting/pressure control"],
        ["Z-501", "Zero-boiloff cooling"],
        ["Q-601", "Mass accounting"],
      ],
      bottleneck: "Boiloff + phase management",
      trigger: "Repeated transfer demo in orbit",
      readiness: "IRL · reliability",
      reasoning: "The bottleneck is thermal and operational: a depot only works if heat leak, pressure control, gauging, and transfer coupling behave repeatedly in microgravity."
    },
  ];

  /* ── Source bank ──────────────────────────────────────────
     Representative citations across sectors and postures.   */
  const SOURCES = [
    { id: "src-001", year: 2023, title: "Net Zero Roadmap: A Global Pathway",                  org: "IEA",                                    sector: "energy",        ev: "roadmap"  },
    { id: "src-002", year: 2024, title: "Annual Technology Baseline (ATB)",                    org: "NREL",                                   sector: "energy",        ev: "direct"   },
    { id: "src-003", year: 2024, title: "Hydrogen Shot Technology Assessment",                 org: "DOE",                                    sector: "energy",        ev: "roadmap"  },
    { id: "src-004", year: 2024, title: "Battery Storage Cost & Performance Update",           org: "Lazard",                                 sector: "energy",        ev: "direct"   },
    { id: "src-005", year: 2024, title: "Long Duration Energy Storage Council Report",         org: "LDES Council",                           sector: "energy",        ev: "roadmap"  },
    { id: "src-006", year: 2023, title: "NIF Ignition Achievement — Shot N221204",              org: "LLNL",                                   sector: "energy",        ev: "direct"   },
    { id: "src-007", year: 2024, title: "ITER Construction Status Update",                     org: "ITER Organization",                      sector: "energy",        ev: "roadmap"  },
    { id: "src-008", year: 2023, title: "Enhanced Geothermal Systems — Frontier Observatory",  org: "DOE / FORGE",                            sector: "energy",        ev: "direct"   },
    { id: "src-009", year: 2024, title: "Commonwealth Fusion Systems — SPARC Progress",        org: "CFS",                                    sector: "energy",        ev: "roadmap"  },
    { id: "src-010", year: 2024, title: "IPCC AR6 Working Group III · Mitigation",             org: "IPCC",                                   sector: "carbon",        ev: "direct"   },
    { id: "src-011", year: 2024, title: "Mammoth DAC Operations Bulletin",                     org: "Climeworks",                             sector: "carbon",        ev: "direct"   },
    { id: "src-012", year: 2023, title: "DAC Hubs Program — Phase 1 Awards",                   org: "DOE",                                    sector: "carbon",        ev: "roadmap"  },
    { id: "src-013", year: 2024, title: "Carbon to Value Initiative Annual Review",            org: "RMI",                                    sector: "carbon",        ev: "roadmap"  },
    { id: "src-014", year: 2023, title: "Ocean Alkalinity Enhancement — Field Trials",         org: "Ocean Visions",                          sector: "carbon",        ev: "analogue" },
    { id: "src-015", year: 2024, title: "Enhanced Rock Weathering Lifecycle Assessment",       org: "Nature Communications",                  sector: "carbon",        ev: "roadmap"  },
    { id: "src-016", year: 2024, title: "Mineralized Concrete — Field Performance Bulletin",   org: "CarbonCure / Solidia",                   sector: "carbon",        ev: "direct"   },
    { id: "src-017", year: 2024, title: "Aqueduct 4.0 Water Risk Atlas",                       org: "WRI",                                    sector: "water",         ev: "direct"   },
    { id: "src-018", year: 2023, title: "Atmospheric Water Generation Performance Survey",     org: "DOE / Water Power Tech.",                sector: "water",         ev: "direct"   },
    { id: "src-019", year: 2024, title: "Direct Lithium Extraction Pilot Data",                org: "Lilac Solutions",                        sector: "water",         ev: "roadmap"  },
    { id: "src-020", year: 2023, title: "Electrochemical PFAS Destruction — EPA Bench Tests",  org: "US EPA",                                 sector: "water",         ev: "direct"   },
    { id: "src-021", year: 2024, title: "Forward Osmosis Membrane Service Life Study",         org: "Aquaporin / J. Membr. Sci.",             sector: "water",         ev: "direct"   },
    { id: "src-022", year: 2024, title: "Critical Minerals Outlook",                           org: "USGS",                                   sector: "materials",     ev: "direct"   },
    { id: "src-023", year: 2023, title: "Perovskite Tandem Stability — 25-Year Outdoor Data",  org: "Oxford PV / NREL",                       sector: "materials",     ev: "direct"   },
    { id: "src-024", year: 2024, title: "MOF Sorbent Cycle-Life Benchmarks",                   org: "Nature Materials",                       sector: "materials",     ev: "roadmap"  },
    { id: "src-025", year: 2024, title: "Solid-Electrolyte Conductivity Roadmap",              org: "BMW / Solid Power",                      sector: "materials",     ev: "roadmap"  },
    { id: "src-026", year: 2023, title: "Graphene Industrialization Survey",                   org: "Graphene Council",                       sector: "materials",     ev: "analogue" },
    { id: "src-027", year: 2024, title: "Roll-to-Roll Manufacturing Yield Reports",            org: "Fraunhofer ISE",                         sector: "manufacturing", ev: "direct"   },
    { id: "src-028", year: 2024, title: "Modular Nuclear Factory Cost Models",                 org: "IEEFA / MIT",                            sector: "manufacturing", ev: "roadmap"  },
    { id: "src-029", year: 2023, title: "Cultivated Meat Techno-Economic Analysis",            org: "Good Food Institute",                    sector: "manufacturing", ev: "roadmap"  },
    { id: "src-030", year: 2024, title: "Precision Fermentation Capacity Map",                 org: "Synonym",                                sector: "manufacturing", ev: "direct"   },
    { id: "src-031", year: 2024, title: "Closed-Loop Battery Recycling — Recovery Yields",     org: "Redwood Materials",                      sector: "manufacturing", ev: "direct"   },
    { id: "src-032", year: 2024, title: "FOAK Project Finance — Spec Sheet",                   org: "Breakthrough Energy",                    sector: "manufacturing", ev: "roadmap"  },
    { id: "src-033", year: 2024, title: "UAM Concept of Operations 2.0",                       org: "FAA",                                    sector: "cities",        ev: "roadmap"  },
    { id: "src-034", year: 2024, title: "Joby S4 Type Certification Status",                   org: "Joby Aviation",                          sector: "cities",        ev: "direct"   },
    { id: "src-035", year: 2024, title: "Heat Pump Retrofit Cost Curves",                      org: "RMI / BloombergNEF",                     sector: "cities",        ev: "direct"   },
    { id: "src-036", year: 2023, title: "Vertical Farm Energy Benchmark",                      org: "Cornell CEA",                            sector: "cities",        ev: "direct"   },
    { id: "src-037", year: 2024, title: "District Geothermal — Eversource Pilot",              org: "Eversource",                             sector: "cities",        ev: "direct"   },
    { id: "src-038", year: 2024, title: "Smart Glass Switching-Cycle Life Report",             org: "View / Sage",                            sector: "cities",        ev: "direct"   },
    { id: "src-039", year: 2024, title: "Starship Flight Test Bulletin · IFT-5",               org: "SpaceX",                                 sector: "space",         ev: "direct"   },
    { id: "src-040", year: 2024, title: "Artemis Reference Architecture Update",               org: "NASA",                                   sector: "space",         ev: "roadmap"  },
    { id: "src-041", year: 2023, title: "Lunar Surface ISRU Capabilities Roadmap",             org: "NASA Tech. Memorandum",                  sector: "space",         ev: "roadmap"  },
    { id: "src-042", year: 2024, title: "On-Orbit Manufacturing Pilot — ISS NL",               org: "ISS National Lab",                       sector: "space",         ev: "direct"   },
    { id: "src-043", year: 2023, title: "Asteroid Mining — Resource Modeling",                 org: "Colorado School of Mines",               sector: "space",         ev: "analogue" },
    { id: "src-044", year: 2024, title: "Space Debris Active Removal Status",                  org: "ESA Space Safety",                       sector: "space",         ev: "roadmap"  },
    { id: "src-045", year: 2024, title: "Electricity Outlook · 2026 Edition",                  org: "BloombergNEF",                           sector: "energy",        ev: "direct"   },
    { id: "src-046", year: 2024, title: "Manufacturing Readiness Level Deskbook v3.0",         org: "OUSD R&E (Manufacturing)",               sector: "manufacturing", ev: "direct"   },
    { id: "src-047", year: 2023, title: "Advanced Air Mobility Implementation Plan: Innovate28", org: "FAA", sector: "cities", ev: "roadmap" },
    { id: "src-048", year: 2025, title: "Advanced Air Mobility National Strategy", org: "US DOT", sector: "cities", ev: "roadmap" },
    { id: "src-049", year: 2024, title: "Advanced Air Mobility: Opportunities, Challenges, and Research Needs", org: "NTL", sector: "cities", ev: "direct" },
    { id: "src-050", year: 2026, title: "Advanced Air Mobility Mission", org: "NASA", sector: "cities", ev: "direct" },
    { id: "src-051", year: 2020, title: "Advancing Aerial Mobility: A National Blueprint, chapter 2", org: "NASEM", sector: "cities", ev: "analogue" },
    { id: "src-052", year: 2024, title: "Graphene oxide-based membranes for water desalination: progress and challenges", org: "npj Clean Water", sector: "materials", ev: "roadmap" },
    { id: "src-053", year: 2015, title: "Graphene-based membranes", org: "Chemical Society Reviews", sector: "materials", ev: "direct" },
    { id: "src-054", year: 2018, title: "Building the space elevator: lessons from biological design", org: "Journal of the Royal Society Interface", sector: "materials", ev: "analogue" },
    { id: "src-055", year: 2020, title: "Self-healing polymers", org: "Nature Reviews Materials", sector: "materials", ev: "direct" },
    { id: "src-056", year: 2024, title: "Radiative cooling and indoor light management enabled by a transparent, haze-free metafilm", org: "Nature Communications", sector: "materials", ev: "direct" },
    { id: "src-057", year: 2024, title: "A state-of-the-art review of novel aerogel insulation materials for building applications", org: "Energy Sources, Part A", sector: "materials", ev: "roadmap" },
    { id: "src-058", year: 2022, title: "Icephobic/anti-icing properties of superhydrophobic surfaces", org: "Advances in Colloid and Interface Science", sector: "materials", ev: "roadmap" },
    { id: "src-059", year: 2024, title: "Scalable robust photothermal superhydrophobic coatings", org: "Nature Communications", sector: "materials", ev: "direct" },
    { id: "src-060", year: 2024, title: "Breaking the limits of acoustic science: A review of acoustic metamaterials", org: "Materials Science and Engineering: R", sector: "materials", ev: "roadmap" },
    { id: "src-061", year: 2023, title: "An overview of atmospheric water harvesting methods", org: "PMC / peer-reviewed review", sector: "water", ev: "roadmap" },
    { id: "src-062", year: 2020, title: "MOF water harvesters", org: "Nature Nanotechnology review context", sector: "water", ev: "direct" },
    { id: "src-063", year: 2018, title: "Adsorption-based atmospheric water harvesting device for arid climates", org: "Nature Communications", sector: "water", ev: "analogue" },
    { id: "src-064", year: 2021, title: "Adsorption-based atmospheric water harvesting", org: "Joule", sector: "water", ev: "direct" },
    { id: "src-065", year: 2024, title: "Advancements in atmospheric water harvesting", org: "Communications Engineering", sector: "water", ev: "direct" },
    { id: "src-066", year: 2023, title: "Global water yield strategy for metal-organic-framework-based atmospheric water harvesting", org: "Cell Reports Physical Science", sector: "water", ev: "direct" },
    { id: "src-067", year: 2023, title: "The U.S. Biomanufacturing Economy: Value Added, Supply Chains, Cost, Sustainability, and Efficiency", org: "NIST AMS 100-52", sector: "manufacturing", ev: "direct" },
    { id: "src-068", year: 2023, title: "Successes and Challenges in Biomanufacturing", org: "NASEM", sector: "manufacturing", ev: "roadmap" },
    { id: "src-069", year: null, title: "Vaccines on Demand Program", org: "BARDA", sector: "manufacturing", ev: "roadmap" },
    { id: "src-070", year: 2023, title: "Food Safety Aspects of Cell-Based Food", org: "FAO and WHO", sector: "manufacturing", ev: "roadmap" },
    { id: "src-071", year: 2022, title: "Sensor technologies for quality control in engineered tissue manufacturing", org: "PMC", sector: "manufacturing", ev: "direct" },
    { id: "src-072", year: 2021, title: "Quality control methods in musculoskeletal tissue engineering", org: "Bone Research", sector: "manufacturing", ev: "direct" },
    { id: "src-073", year: 2024, title: "Carbon Capture, Utilisation and Storage", org: "IEA", sector: "carbon", ev: "direct" },
    { id: "src-074", year: 2020, title: "CCUS in Clean Energy Transitions", org: "IEA", sector: "carbon", ev: "roadmap" },
    { id: "src-075", year: 2024, title: "Direct Air Capture", org: "IEA", sector: "carbon", ev: "roadmap" },
    { id: "src-076", year: 2019, title: "Negative Emissions Technologies and Reliable Sequestration: Direct Air Capture chapter", org: "NASEM", sector: "carbon", ev: "direct" },
    { id: "src-077", year: 2024, title: "Cement", org: "IEA", sector: "carbon", ev: "roadmap" },
    { id: "src-078", year: 2018, title: "Technology Roadmap: Low-Carbon Transition in the Cement Industry", org: "IEA and Cement Sustaina", sector: "carbon", ev: "roadmap" },
    { id: "src-079", year: 2024, title: "Global decarbonization potential of CO2 mineralization in concrete materials", org: "Nature Communications / PMC", sector: "carbon", ev: "direct" },
    { id: "src-080", year: 2024, title: "Global Hydrogen Review 2024", org: "IEA", sector: "materials", ev: "roadmap" },
    { id: "src-081", year: 2025, title: "Global Hydrogen Review 2025", org: "IEA", sector: "materials", ev: "direct" },
    { id: "src-082", year: 2021, title: "Ammonia Technology Roadmap: Towards more sustainable nitrogen fertiliser production", org: "IEA", sector: "materials", ev: "roadmap" },
    { id: "src-083", year: 2025, title: "Global Critical Minerals Outlook 2025", org: "IEA", sector: "materials", ev: "direct" },
    { id: "src-084", year: 2025, title: "Mineral Commodity Summaries 2025", org: "USGS", sector: "materials", ev: "direct" },
    { id: "src-085", year: 2026, title: "DOE Explains.", org: "DOE Office of Science", sector: "energy", ev: "roadmap" },
    { id: "src-086", year: 2023, title: "Artificial Photosynthesis: Current Advancements and Future Prospects", org: "Catalysts / PMC", sector: "energy", ev: "roadmap" },
    { id: "src-087", year: 2008, title: "Whole Brain Emulation: A Roadmap", org: "Future of Humanity Institute, University of Oxford", sector: "manufacturing", ev: "analogue" },
    { id: "src-088", year: 2022, title: "The Prospects of Whole Brain Emulation within the Next Half-Century", org: "PhilArchive copy", sector: "manufacturing", ev: "direct" },
    { id: "src-089", year: 2025, title: "How “Real” is Your Real-Time Simultaneous Speech-to-Text Translation? Transactions of the Association for Computational Linguistics", org: "Papi, S., et al", sector: "manufacturing", ev: "direct" },
    { id: "src-090", year: 2024, title: "Recent Advances in End-to-End Simultaneous Speech Translation", org: "IJCAI", sector: "manufacturing", ev: "roadmap" },
    { id: "src-091", year: 2025, title: "Real-time speech-to-speech translation", org: "Google Research", sector: "manufacturing", ev: "analogue" },
    { id: "src-092", year: 2019, title: "Quantum Computing: Progress and Prospects", org: "NASEM", sector: "materials", ev: "direct" },
    { id: "src-093", year: 2025, title: "Quantum Computing Explained", org: "NIST", sector: "materials", ev: "direct" },
    { id: "src-094", year: 2023, title: "Data Centres and Data Transmission Networks", org: "IEA", sector: "materials", ev: "direct" },
    { id: "src-095", year: 2025, title: "Energy demand from AI", org: "IEA", sector: "materials", ev: "direct" },
    { id: "src-096", year: null, title: "Personal Fabrication Research in HCI and Graphics. MIT CSAIL / HCI Engineering Group", org: "Baudisch, P., and Mueller, S", sector: "manufacturing", ev: "roadmap" },
    { id: "src-097", year: 2023, title: "Advancing Plastic Recycling: Challenges and Opportunities in Distributed Recycling by Additive Manufacturing", org: "Polymers", sector: "manufacturing", ev: "roadmap" },
    { id: "src-098", year: 2020, title: "Plastic recycling in additive manufacturing: A systematic literature review and opportunities for the circular economy", org: "Journal of Cleaner Production", sector: "manufacturing", ev: "roadmap" },
    { id: "src-099", year: 2025, title: "ACM Computing Surveys", org: "A Review on Human–Robot Trust in Home Service R", sector: "cities", ev: "roadmap" },
    { id: "src-100", year: 2019, title: "Journal of Information, Communication and Ethics in Society", org: "Responsible domestic robotics: exploring ethica", sector: "cities", ev: "direct" },
    { id: "src-101", year: 2023, title: "Transportation Research Part D", org: "Drones in last-mile delivery: A systematic revi", sector: "cities", ev: "roadmap" },
    { id: "src-102", year: null, title: "Package Delivery by Drone, Part 135", org: "FAA", sector: "cities", ev: "direct" },
    { id: "src-103", year: 2023, title: "Smart Adaptive Homes and Their Potential to Improve Space Efficiency and Personalisation", org: "Buildings", sector: "cities", ev: "direct" },
    { id: "src-104", year: null, title: "TRANSFORM: Dynamic and Adaptive Furniture", org: "MIT Media Lab / Tangible Media Group", sector: "cities", ev: "analogue" },
    { id: "src-105", year: 2021, title: "Techno-Economic Analysis of Lithium Extraction from Geothermal Brines", org: "National Renewable Energy Laboratory", sector: "materials", ev: "direct" },
    { id: "src-106", year: 2024, title: "Digital Twins for Advanced Manufacturing", org: "NIST", sector: "manufacturing", ev: "direct" },
    { id: "src-107", year: 2023, title: "Foundational Research Gaps and Future Directions for Digital Twins", org: "NASEM", sector: "manufacturing", ev: "direct" },
    { id: "src-108", year: 2021, title: "Design and manufacture of AR head-mounted displays: A review", org: "Light: Advanced Manufacturing", sector: "cities", ev: "roadmap" },
    { id: "src-109", year: 2023, title: "Waveguide-based augmented reality displays", org: "Light: Science & Applications", sector: "cities", ev: "roadmap" },
    { id: "src-110", year: 2024, title: "Haptic Sensing and Feedback Techniques toward Virtual Reality", org: "Advanced Science / PMC", sector: "cities", ev: "roadmap" },
    { id: "src-111", year: 2020, title: "Toward the next-generation VR/AR optics: A review of holographic near-eye displays from a human-centric perspective", org: "Optica", sector: "cities", ev: "roadmap" },
    { id: "src-112", year: 2022, title: "Holographic techniques for augmented reality and virtual reality near-eye displays", org: "Light: Advanced Manufacturing", sector: "cities", ev: "roadmap" },
    { id: "src-113", year: 2020, title: "Transparent OLED: 8 Things You Need to Know About Transparent OLED Technology", org: "Planar", sector: "cities", ev: "analogue" },
    { id: "src-114", year: 2025, title: "Transparent OLEDs: Introduction and Market Status", org: "OLED-Info", sector: "cities", ev: "analogue" },
    { id: "src-115", year: 2023, title: "NASA's Electrified Aircraft Propulsion Research and Development Efforts", org: "NASA Office of Inspector General", sector: "cities", ev: "direct" },
    { id: "src-116", year: 2026, title: "Electrified Aircraft Propulsion", org: "NASA", sector: "cities", ev: "direct" },
    { id: "src-117", year: 2023, title: "Pathways to Commercial Liftoff: Long Duration Energy Storage", org: "DOE", sector: "energy", ev: "direct" },
    { id: "src-118", year: 2024, title: "Achieving the Promise of Low-Cost Long Duration Energy Storage", org: "DOE", sector: "energy", ev: "roadmap" },
    { id: "src-119", year: 2019, title: "A Strategic Plan for U.S", org: "Burning Plasma Research", sector: "energy", ev: "direct" },
    { id: "src-120", year: 2020, title: "Powering the Future: Fusion & Plasmas", org: "FESAC", sector: "energy", ev: "roadmap" },
    { id: "src-121", year: 2025, title: "Fusion Energy: Additional Planning Would Strengthen DOE's Efforts to Advance Commercialization", org: "US GAO", sector: "energy", ev: "roadmap" },
    { id: "src-122", year: 2024, title: "Fusion Blankets Research Objectives", org: "EPRI / U.S. Department of Energy", sector: "energy", ev: "direct" },
    { id: "src-123", year: 2025, title: "A state-of-the-art review of underground logistics systems", org: "Tunnelling and Underground Space Technology", sector: "cities", ev: "analogue" },
    { id: "src-124", year: 2015, title: "Underground Systems in Service of City Logistics", org: "LOGIC", sector: "cities", ev: "direct" },
    { id: "src-125", year: 2026, title: "Smart Urban Logistics and Tube-Based Freight Systems", org: "Smart Cities 9(3), 52", sector: "cities", ev: "direct" },
    { id: "src-126", year: null, title: "Off-Site and Modular Construction Explained", org: "National Institute of Building Sciences / WBDG", sector: "cities", ev: "direct" },
    { id: "src-127", year: null, title: "Modular and Off-Site Construction Guide", org: "American Institute of Architects and National I", sector: "cities", ev: "direct" },
    { id: "src-128", year: 2025, title: "Modular Construction: A Comprehensive Review", org: "Buildings 15(12), 2020", sector: "cities", ev: "roadmap" },
    { id: "src-129", year: 2023, title: "Investigation of the Severity of Modular Construction Barriers", org: "Journal of Construction Engineering and Managem", sector: "cities", ev: "direct" },
    { id: "src-130", year: 2025, title: "Cool Walkability Planning: Providing Pedestrian Thermal Comfort in Hot Climate Cities", org: "Victoria Transport Policy Institute", sector: "cities", ev: "direct" },
    { id: "src-131", year: 2024, title: "Assessing Cool Corridor Heat Resilience Strategies for Human-Scale Transportation", org: "Iroz-Elardo, N., et al", sector: "cities", ev: "direct" },
    { id: "src-132", year: 2020, title: "City design for health and resilience in hot and dry climates", org: "BMJ / PMC", sector: "cities", ev: "direct" },
    { id: "src-133", year: 2022, title: "Behavioural thermal regulation explains pedestrian path choice in a hot urban environment", org: "Scientific Reports", sector: "cities", ev: "direct" },
    { id: "src-134", year: 2023, title: "Pneumatic Urban Waste Collection Systems: A Review", org: "Applied Sciences 13(2), 877", sector: "cities", ev: "roadmap" },
    { id: "src-135", year: 2014, title: "Assessing the financial and environmental performance of underground automated vacuum waste collection systems", org: "Tunnelling and Underground Space Technology", sector: "cities", ev: "direct" },
    { id: "src-136", year: null, title: "Environmental Protection Agency. Sustainable Materials Management", org: "U.S", sector: "cities", ev: "direct" },
    { id: "src-137", year: 2008, title: "Desalination: A National Perspective", org: "NRC", sector: "water", ev: "direct" },
    { id: "src-138", year: 2019, title: "Desalination", org: "USGS", sector: "water", ev: "direct" },
    { id: "src-139", year: 2026, title: "Desalination Basics", org: "DOE", sector: "water", ev: "direct" },
    { id: "src-140", year: 2024, title: "Interim Guidance on the Destruction and Disposal of PFAS and Materials Containing PFAS", org: "US EPA", sector: "water", ev: "direct" },
    { id: "src-141", year: 2026, title: "Water Reuse and Recycling / National Water Reuse Action Plan", org: "US EPA", sector: "water", ev: "roadmap" },
    { id: "src-142", year: 2012, title: "Water Reuse: Potential for Expanding the Nation's Water Supply Through Reuse of Municipal Wastewater", org: "NRC", sector: "water", ev: "direct" },
    { id: "src-143", year: 2022, title: "Industrial Decarbonization Roadmap", org: "DOE", sector: "carbon", ev: "roadmap" },
    { id: "src-144", year: 2020, title: "Iron and Steel Technology Roadmap", org: "IEA", sector: "carbon", ev: "roadmap" },
    { id: "src-145", year: 2023, title: "CHIPS Metrology Program", org: "NIST", sector: "manufacturing", ev: "roadmap" },
    { id: "src-146", year: 2023, title: "Metrology Gaps in the Semiconductor Ecosystem", org: "NIST", sector: "manufacturing", ev: "direct" },
    { id: "src-147", year: 2015, title: "Yield Enhancement", org: "International Technology Roadmap for Semiconduc", sector: "manufacturing", ev: "roadmap" },
    { id: "src-148", year: 2024, title: "Lights-out factories: review and prospect", org: "Journal publication indexed by Beijing Institut", sector: "manufacturing", ev: "direct" },
    { id: "src-149", year: 2024, title: "A focused review on techniques for achieving cloaking using metamaterials", org: "Optik", sector: "materials", ev: "roadmap" },
    { id: "src-150", year: 2021, title: "From invisibility to intelligent antennas: A review of electromagnetic cloaking", org: "EPJ Applied Metamaterials", sector: "materials", ev: "roadmap" },
    { id: "src-151", year: null, title: "C., et al. Claytronics: A Scalable Basis for Future Robots. Carnegie Mellon University", org: "Goldstein, S", sector: "materials", ev: "analogue" },
    { id: "src-152", year: 2022, title: "Shape morphing mechanical metamaterials through reversible plasticity", org: "Science Robotics", sector: "materials", ev: "direct" },
    { id: "src-153", year: 2022, title: "APL Materials", org: "Programmable shape-morphing of rose-shaped mech", sector: "materials", ev: "direct" },
    { id: "src-154", year: 2022, title: "A methodological review on self-healing asphalt pavements", org: "Construction and Building Materials", sector: "cities", ev: "roadmap" },
    { id: "src-155", year: 2021, title: "Self-Healing Asphalt: A Systematic Bibliometric Analysis", org: "Materials", sector: "cities", ev: "roadmap" },
    { id: "src-156", year: 2024, title: "The self-healing performance of asphalt binder and mixtures", org: "Innovative Infrastructure Solutions", sector: "cities", ev: "roadmap" },
    { id: "src-157", year: 2024, title: "A comprehensive review on self-cleaning glass surfaces", org: "Materials", sector: "materials", ev: "roadmap" },
    { id: "src-158", year: 2025, title: "A comprehensive review on realization of self-cleaning surfaces", org: "Discover Materials", sector: "materials", ev: "roadmap" },
    { id: "src-159", year: 2023, title: "Superior self-cleaning surfaces via the synergy of superhydrophobicity and photocatalysis", org: "Journal of Cleaner Production", sector: "materials", ev: "direct" },
    { id: "src-160", year: 2024, title: "Clathrate metal superhydrides under high-pressure conditions", org: "National Science Review", sector: "materials", ev: "roadmap" },
    { id: "src-161", year: 2024, title: "Are hydrides under high-pressure–high-temperature superconductors? National Science Review", org: "Hirsch, J. E", sector: "materials", ev: "direct" },
    { id: "src-162", year: 2022, title: "Room-temperature superconductivity study retracted", org: "Science", sector: "materials", ev: "analogue" },
    { id: "src-163", year: 2025, title: "Journal of Applied Physics", org: "Roadblocks to ambient-pressure room-temperature", sector: "materials", ev: "direct" },
    { id: "src-164", year: 2020, title: "Senolytic drugs: from discovery to translation", org: "Journal of Internal Medicine", sector: "manufacturing", ev: "roadmap" },
    { id: "src-165", year: 2024, title: "Senolytics: from pharmacological inhibitors to immunotherapies, a promising future? npj Aging", org: "Lelarge, V., et al", sector: "manufacturing", ev: "roadmap" },
    { id: "src-166", year: null, title: "NCT04313634. Targeting Cellular Senescence With Senolytics to Improve Skeletal Health in Older Humans", org: "ClinicalTrials.gov", sector: "manufacturing", ev: "direct" },
    { id: "src-167", year: 2024, title: "Evaluating the Safety and Efficacy of Hemoglobin-Based Blood Substitutes", org: "US FDA", sector: "manufacturing", ev: "direct" },
    { id: "src-168", year: 2023, title: "Hemoglobin-Based Oxygen Carriers: Where Are We Now in 2023? International Journal of Molecular Sciences", org: "Chen, L., et al", sector: "manufacturing", ev: "roadmap" },
    { id: "src-169", year: 2018, title: "Current Trends and Challenges in the Clinical Translation of Nanoparticulate Nanomedicines", org: "Frontiers in Pharmacology", sector: "manufacturing", ev: "roadmap" },
    { id: "src-170", year: 2025, title: "Nano bio-robots: a new frontier in targeted therapeutic delivery", org: "Frontiers / PMC", sector: "manufacturing", ev: "analogue" },
    { id: "src-171", year: 2021, title: "Implanted Brain-Computer Interface Devices for Patients with Paralysis or Amputation: Non-clinical Testing and Clinical Considerations", org: "US FDA", sector: "manufacturing", ev: "direct" },
    { id: "src-172", year: 2025, title: "Science & Tech Spotlight: Brain-Computer Interfaces", org: "US GAO", sector: "manufacturing", ev: "roadmap" },
    { id: "src-173", year: 2020, title: "A Review of Sensory Feedback in Upper-Limb Prostheses From the Perspective of Human Motor Control", org: "Frontiers in Neuroscience", sector: "manufacturing", ev: "roadmap" },
    { id: "src-174", year: 2022, title: "Multichannel haptic feedback unlocks prosthetic hand dexterity", org: "Scientific Reports", sector: "manufacturing", ev: "direct" },
    { id: "src-175", year: 2018, title: "Reflecting health: smart mirrors for personalized medicine", org: "npj Digital Medicine", sector: "cities", ev: "analogue" },
    { id: "src-176", year: 2024, title: "Internet-of-Mirrors for connected healthcare and beauty", org: "Internet of Things and Cyber-Physical Systems", sector: "cities", ev: "direct" },
    { id: "src-177", year: 2022, title: "New Directions for Chemical Engineering", org: "NASEM", sector: "manufacturing", ev: "analogue" },
    { id: "src-178", year: 2020, title: "Deployment of Deep Decarbonization Technologies", org: "NASEM", sector: "manufacturing", ev: "direct" },
    { id: "src-179", year: null, title: "Rapid Advancement in Process Intensification Deployment", org: "RAPID Manufacturing Institute / AIChE", sector: "manufacturing", ev: "roadmap" },
    { id: "src-180", year: 2024, title: "Individual wearable air purifier protects against pollen, house dust mite, and cat allergens", org: "Allergy, Asthma & Clinical Immunology", sector: "cities", ev: "direct" },
    { id: "src-181", year: 2025, title: "Air Purifier Buying Guide", org: "Consumer Reports", sector: "cities", ev: "analogue" },
    { id: "src-182", year: 2022, title: "Personal Cooling Garments: A Review", org: "Polymers", sector: "cities", ev: "roadmap" },
    { id: "src-183", year: 2025, title: "Enhancing thermal comfort: a comprehensive review of wearable cooling systems", org: "Next Energy", sector: "cities", ev: "roadmap" },
    { id: "src-184", year: 2026, title: "Emerging Technology Program", org: "US FDA", sector: "manufacturing", ev: "direct" },
    { id: "src-185", year: 2025, title: "Advanced Manufacturing Technologies Designation Program Guidance", org: "US FDA", sector: "manufacturing", ev: "direct" },
    { id: "src-186", year: 2025, title: "Examples of Accepted Emerging Technologies", org: "US FDA", sector: "manufacturing", ev: "roadmap" },
    { id: "src-187", year: 2024, title: "Present and future of micro-transfer printing for heterogeneous integration", org: "APL Photonics", sector: "manufacturing", ev: "direct" },
    { id: "src-188", year: 2017, title: "Transfer print techniques for heterogeneous integration of photonic components", org: "Progress in Quantum Electronics", sector: "manufacturing", ev: "direct" },
    { id: "src-189", year: 2024, title: "Polymer Advanced Technologies", org: "Recent advances in conductive materials for pri", sector: "manufacturing", ev: "roadmap" },
    { id: "src-190", year: 2023, title: "Technology Readiness Levels", org: "NASA", sector: "manufacturing", ev: "direct" },
    { id: "src-191", year: 2020, title: "Technology Readiness Assessment Guide, GAO-20-48G", org: "US GAO", sector: "manufacturing", ev: "direct" },
    { id: "src-192", year: 2016, title: "Manufacturing Readiness Level Deskbook, version 2.5", org: "US Department of Defense", sector: "manufacturing", ev: "direct" },
    { id: "src-193", year: 2010, title: "Contextual Role of TRLs and MRLs in Technology Management", org: "Sandia National Laboratories / OSTI", sector: "manufacturing", ev: "direct" },
    { id: "src-194", year: 2009, title: "Defining an Integration Readiness Level for Defense Acquisition", org: "INCOSE / Systems Engineering context", sector: "manufacturing", ev: "direct" },
    { id: "src-195", year: 2020, title: "On-site autonomous construction robots: Toward unsupervised building", org: "Automation in Construction", sector: "cities", ev: "roadmap" },
    { id: "src-196", year: 2023, title: "Construction Robotics: From Automation to Collaboration", org: "Annual Review of Control, Robotics, and Autonom", sector: "cities", ev: "roadmap" },
    { id: "src-197", year: 2024, title: "Transforming Construction: Automation and Robotics for a Safer Future", org: "NIOSH", sector: "cities", ev: "direct" },
    { id: "src-198", year: 2023, title: "Insights into evaluating and using industrial exoskeletons", org: "International Journal of Industrial Ergonomics", sector: "manufacturing", ev: "roadmap" },
    { id: "src-199", year: 2025, title: "Safety in Wearable Robotic Exoskeletons: Design, Control, and Regulatory Considerations", org: "ASME Journal of Mechanisms and Robotics", sector: "manufacturing", ev: "roadmap" },
    { id: "src-200", year: 2023, title: "The Ethics of Mandatory Exoskeleton Use in Commercial and Industrial Settings", org: "IEEE Transactions on Technology and Society", sector: "manufacturing", ev: "direct" },
    { id: "src-201", year: 2021, title: "Swarm Robotics: Past, Present, and Future", org: "Proceedings of the IEEE", sector: "cities", ev: "roadmap" },
    { id: "src-202", year: 2023, title: "A Review of Swarm Robotics in a Nutshell", org: "Drones 7(4), 269", sector: "cities", ev: "roadmap" },
    { id: "src-203", year: 2021, title: "Swarm Robotics: A Perspective on the Latest Reviewed Concepts and Applications", org: "Sensors", sector: "cities", ev: "roadmap" },
    { id: "src-204", year: 2023, title: "Better Windows, Better Outcomes: How Electrochromics Improve Health, Productivity, and Efficiency", org: "DOE Building Technologies O", sector: "cities", ev: "direct" },
    { id: "src-205", year: 2024, title: "Smart Manufacturing", org: "NIST", sector: "manufacturing", ev: "roadmap" },
    { id: "src-206", year: 2024, title: "Options for a National Plan for Smart Manufacturing", org: "NASEM", sector: "manufacturing", ev: "direct" },
    { id: "src-207", year: 2020, title: "Connecting, Deploying, and Using the Smart Manufacturing Systems Test Bed", org: "NIST", sector: "manufacturing", ev: "direct" },
    { id: "src-208", year: 2022, title: "National Strategy for Advanced Manufacturing", org: "White House / National Science and Technology C", sector: "manufacturing", ev: "roadmap" },
    { id: "src-209", year: 2023, title: "In-Situ Resource Utilization overview", org: "NASA", sector: "space", ev: "roadmap" },
    { id: "src-210", year: 2025, title: "Environmental Control and Life Support Systems (ECLSS)", org: "NASA", sector: "space", ev: "direct" },
    { id: "src-211", year: 2012, title: "Mars In Situ Resource Utilization Technology Evaluation", org: "NASA NTRS", sector: "space", ev: "direct" },
    { id: "src-212", year: null, title: "Life support and MELiSSA regenerative loop program", org: "ESA", sector: "space", ev: "direct" },
    { id: "src-213", year: 1997, title: "Advanced Technology for Human Support in Space", org: "NRC", sector: "space", ev: "direct" },
    { id: "src-214", year: 2024, title: "Space-Based Solar Power", org: "NASA Office of Technology, Policy, and Strategy", sector: "space", ev: "direct" },
    { id: "src-215", year: 2024, title: "New Study Updates NASA on Space-Based Solar Power", org: "NASA", sector: "space", ev: "direct" },
    { id: "src-216", year: 2024, title: "ESA accelerates the race towards clean energy from space", org: "ESA", sector: "space", ev: "roadmap" },
    { id: "src-217", year: 2024, title: "Atomically Precise Manufacturing of Silicon Electronics", org: "ACS / PMC", sector: "manufacturing", ev: "roadmap" },
    { id: "src-218", year: 2018, title: "Evaluating future nanotechnology: The net societal impacts of atomically precise manufacturing", org: "Futures", sector: "manufacturing", ev: "analogue" },
    { id: "src-219", year: 2020, title: "A molecular assembler that produces polymers", org: "Nature Communications", sector: "manufacturing", ev: "direct" },
    { id: "src-220", year: 1982, title: "Advanced Automation for Space Missions", org: "NASA Conference Publication 2255", sector: "manufacturing", ev: "direct" },
    { id: "src-221", year: 2016, title: "Are Self-Replicating Machines Feasible?", org: "Ellery, A", sector: "manufacturing", ev: "analogue" },
    { id: "src-222", year: 2022, title: "Self-replicating hierarchical modular robotic swarms", org: "Communications Engineering", sector: "manufacturing", ev: "direct" },
    { id: "src-223", year: 2024, title: "Sustainable Aviation Fuel State-of-Industry Report", org: "NREL", sector: "energy", ev: "direct" },
    { id: "src-224", year: null, title: "Department of Energy Alternative Fuels Data Center. Sustainable Aviation Fuel", org: "U.S", sector: "energy", ev: "direct" },
    { id: "src-225", year: 2024, title: "Forging a sustainable sky: aviation e-fuels review", org: "PMC / peer-reviewed review", sector: "energy", ev: "direct" },
    { id: "src-226", year: 2019, title: "Organs-On-Chips for Radiation Countermeasures", org: "US FDA", sector: "manufacturing", ev: "direct" },
    { id: "src-227", year: 2006, title: "Challenges in tissue engineering", org: "Journal of the Royal Society Interface", sector: "manufacturing", ev: "direct" },
    { id: "src-228", year: 2020, title: "Organ-on-a-Chip: A new paradigm for drug development", org: "Trends in Pharmacological Sciences / PMC", sector: "manufacturing", ev: "roadmap" },
    { id: "src-229", year: 2025, title: "Strategic Transit Automation Research Plan 2.0: 2023–2028", org: "FTA", sector: "cities", ev: "roadmap" },
    { id: "src-230", year: 2020, title: "Autonomous Shuttle Bus for Public Transportation: A Review", org: "Energies 13(11), 2917", sector: "cities", ev: "roadmap" },
    { id: "src-231", year: 2018, title: "Low-Speed Automated Shuttles: State of the Practice. U.S", org: "DOT / Volpe", sector: "cities", ev: "direct" },
    { id: "src-232", year: 2016, title: "Hyperloop Commercial Feasibility Analysis. U.S", org: "Department of Transportation / Volpe National T", sector: "cities", ev: "direct" },
    { id: "src-233", year: 2020, title: "Hyperloop Feasibility Study", org: "Mid-Ohio Regional Planning Commission", sector: "cities", ev: "direct" },
    { id: "src-234", year: 2005, title: "Report to Congress: Costs and Benefits of Magnetic Levitation", org: "FRA", sector: "cities", ev: "direct" },
    { id: "src-235", year: 2024, title: "Development and Challenges of Maglev Transportation", org: "IntechOpen", sector: "cities", ev: "roadmap" },
    { id: "src-236", year: 2021, title: "Impacts of Automated Vehicles on Highway Infrastructure", org: "FHWA", sector: "cities", ev: "direct" },
    { id: "src-237", year: 2024, title: "Connected and Autonomous Vehicle Technology: Determining the Impact on State DOT Maintenance Programs", org: "NCHRP Research Report 1084", sector: "cities", ev: "direct" },
    { id: "src-238", year: 2020, title: "Smart Roads: An Overview of What Future Mobility Will Look Like", org: "Infrastructures", sector: "cities", ev: "analogue" },
    { id: "src-239", year: 2016, title: "Seven chemical separations to change the world. Nature 532, 435–437", org: "DOI: 10.1038/532435a", sector: "manufacturing", ev: "direct" },
    { id: "src-240", year: 2015, title: "Bandwidth Study on Energy Use and Potential Energy Saving Opportunities in U.S", org: "DOE", sector: "manufacturing", ev: "analogue" },
    { id: "src-241", year: 2024, title: "Trends, Insights, and Future Prospects for Production in Controlled Environment Agriculture and Agrivoltaics", org: "USDA ERS", sector: "cities", ev: "direct" },
    { id: "src-242", year: 2021, title: "Review of energy efficiency in controlled environment agriculture", org: "Renewable and Sustainable Energy Reviews", sector: "cities", ev: "direct" },
    { id: "src-243", year: 2025, title: "The emergence of indoor agriculture as a driver of global energy demand", org: "Nature Food", sector: "cities", ev: "direct" },
    { id: "src-244", year: 2025, title: "Vertical Farming — No Longer a Futuristic Concept", org: "USDA ARS", sector: "cities", ev: "direct" },
  ];

  return { SECTORS, CHEMICALS, UNIT_OPS, BOTTLENECKS, STACK, PATHWAYS, ENTRIES, FEATURED, SOURCES };
})();

export const { SECTORS, CHEMICALS, UNIT_OPS, BOTTLENECKS, STACK, PATHWAYS, ENTRIES, FEATURED, SOURCES } = atlasData;
export const SOURCE_COUNT = SOURCES.length;
export const TECHNOLOGY_COUNT = ENTRIES.length;
export default atlasData;


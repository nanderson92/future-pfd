const CATEGORY_META = {
  Energy: { color: "#18a999", description: "Generation, storage, fuels, and grid pathways" },
  "Climate Tech": { color: "#4f8f5b", description: "Carbon, cooling, circularity, and environmental systems" },
  Infrastructure: { color: "#2b6cb0", description: "Water, heat, logistics, and public works" },
  "Urban Systems": { color: "#8b6f47", description: "Buildings, cities, and civic-scale deployment" },
  Transportation: { color: "#d0782f", description: "Aircraft, roads, pods, trains, and charging" },
  Manufacturing: { color: "#6f63c7", description: "Factories, printed systems, and process development" },
  Robotics: { color: "#c04d7a", description: "Autonomous machines and physical task execution" },
  Materials: { color: "#3b8bb8", description: "Coatings, membranes, composites, and functional matter" },
  Bio: { color: "#5b9f61", description: "Biological production and living systems" },
  "Medical Tech": { color: "#b84b5f", description: "Therapies, implants, diagnostics, and augmentation" },
  Computing: { color: "#596fba", description: "AI, simulation, displays, and information infrastructure" },
  Space: { color: "#7f66a8", description: "Off-world processing, habitats, and orbital systems" }
};

const PROCESS_PATHWAYS = [
  {
    title: "Better materials",
    text: "Higher-temperature alloys, membranes, catalysts, coatings, and structural composites convert lab effects into durable equipment."
  },
  {
    title: "Cheaper clean energy",
    text: "Electrification, hydrogen, thermal storage, and renewable heat lower the operating cost of energy-intensive future systems."
  },
  {
    title: "Advanced manufacturing",
    text: "Printed electronics, additive metal, roll-to-roll coating, and modular skids make small demonstrations repeatable at scale."
  },
  {
    title: "High-throughput experimentation",
    text: "Automated labs and screening platforms compress discovery cycles for catalysts, materials, cell lines, and process windows."
  },
  {
    title: "Process control and automation",
    text: "Sensors, advanced control, digital twins, and QA feedback loops keep complex systems inside manufacturable operating windows."
  },
  {
    title: "Modular factories",
    text: "Containerized units and standardized interfaces let new technologies scale by replication instead of one-off megaprojects."
  },
  {
    title: "Better separations",
    text: "Membranes, adsorption, crystallization, distillation, and electrochemical separations often decide whether economics work."
  },
  {
    title: "Supply-chain redesign",
    text: "Critical minerals, feedstock logistics, recycled streams, and quality specifications must exist before deployment can grow."
  },
  {
    title: "Policy and infrastructure deployment",
    text: "Permits, codes, utility interconnects, public procurement, and shared infrastructure turn isolated hardware into systems."
  },
  {
    title: "Reliability testing",
    text: "Field exposure, failure-mode analysis, safety cases, and maintenance plans decide whether prototypes can become trusted assets."
  },
  {
    title: "Cost reduction through scale",
    text: "Learning curves, yield improvement, standardization, and utilization rates determine whether technical possibility becomes adoption."
  }
];

const PROCESS_QUESTIONS = {
  cost: "What unit operation dominates cost?",
  scale: "What fails during scale-up?",
  quality: "What quality attribute controls adoption?",
  material: "What material bottleneck prevents deployment?",
  infrastructure: "What infrastructure must exist first?",
  manufacturable: "What makes this manufacturable instead of just possible?"
};

function t(item) {
  return {
    name: item.name,
    category: item.category,
    promise: item.promise,
    realisticPathway: item.realisticPathway,
    pfdSteps: item.pfdSteps,
    inputs: item.inputs,
    outputs: item.outputs,
    bottlenecks: item.bottlenecks,
    readinessGap: item.readinessGap,
    scaleCondition: item.scaleCondition,
    processQuestion: item.processQuestion
  };
}

const technologies = [
  t({
    name: "Fusion power plants",
    category: "Energy",
    promise: "Near-limitless clean energy.",
    realisticPathway: "Plasma confinement, superconducting magnets, tritium breeding, heat extraction, turbine integration, and neutron-tolerant materials.",
    pfdSteps: ["Fuel preparation", "Plasma confinement", "Heat capture", "Power cycle", "Grid integration"],
    inputs: ["Deuterium", "Tritium", "Coolant"],
    outputs: ["Electricity", "Waste heat", "Activated materials"],
    bottlenecks: ["Materials durability", "Tritium supply", "Net-electric economics"],
    readinessGap: "Burning plasma progress has not yet become a maintainable net-electric plant.",
    scaleCondition: "Blankets, magnets, and maintenance cycles must support high availability.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Space-based solar power",
    category: "Energy",
    promise: "Continuous solar power beamed from orbit.",
    realisticPathway: "Ultra-light PV arrays, robotic orbital assembly, wireless power transmission, safe rectenna fields, low launch cost, and grid integration.",
    pfdSteps: ["Solar collection", "DC conversion", "Wireless transmission", "Rectenna capture", "Grid conditioning"],
    inputs: ["Orbital arrays", "Sunlight", "Ground rectennas"],
    outputs: ["Dispatchable electricity", "Thermal losses"],
    bottlenecks: ["Launch economics", "Transmission efficiency", "Orbital maintenance"],
    readinessGap: "The system is plausible in pieces but not as a low-cost orbital utility.",
    scaleCondition: "Launch, assembly, and transmission losses must fall below terrestrial alternatives.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Direct air capture cities",
    category: "Climate Tech",
    promise: "Cities that remove CO2 from the sky.",
    realisticPathway: "Low-energy sorbents, modular air contactors, renewable heat, CO2 purification, compression, storage, utilization, or mineralization.",
    pfdSteps: ["Air intake", "CO2 capture", "Sorbent regeneration", "Purification/compression", "Storage or utilization"],
    inputs: ["Air", "Sorbent", "Clean heat and power"],
    outputs: ["Concentrated CO2", "Cleaned air"],
    bottlenecks: ["Energy demand", "Sorbent degradation", "Cost per ton"],
    readinessGap: "Early plants exist, but city-scale removal needs much cheaper modules and low-carbon energy.",
    scaleCondition: "Capture cost must drop while storage and verification capacity expands.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Synthetic fuel from air and water",
    category: "Climate Tech",
    promise: "Carbon-neutral jet fuel made from CO2 and water.",
    realisticPathway: "Direct air capture, green hydrogen, catalytic CO2 conversion, methanol or Fischer-Tropsch synthesis, refining, and fuel certification.",
    pfdSteps: ["Air and water intake", "CO2 capture and electrolysis", "Syngas or methanol", "Hydrocarbon synthesis", "Fuel upgrading"],
    inputs: ["CO2", "Water", "Renewable electricity"],
    outputs: ["Drop-in fuel", "Oxygen", "Process heat"],
    bottlenecks: ["Clean hydrogen cost", "Energy intensity", "Fuel certification"],
    readinessGap: "Chemistry is known; economics depend on cheap electricity and high plant utilization.",
    scaleCondition: "Green hydrogen and CO2 must become low-cost, reliable feedstocks.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Green hydrogen cities",
    category: "Energy",
    promise: "Hydrogen-powered transit, industry, and buildings.",
    realisticPathway: "Cheap electrolyzers, renewable electricity, storage tanks or caverns, pipelines, fuel cells, safety systems, and end-use conversion.",
    pfdSteps: ["Water feed", "Electrolysis", "Compression/storage", "Distribution", "Fuel cell or combustion use"],
    inputs: ["Water", "Renewable power", "Storage hardware"],
    outputs: ["Hydrogen", "Oxygen", "Useful energy"],
    bottlenecks: ["Storage", "Distribution", "Leakage and cost"],
    readinessGap: "Hydrogen is industrially mature, but city-scale clean distribution is not.",
    scaleCondition: "Electrolyzer cost, storage safety, and pipeline compatibility must align.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Green ammonia fuel",
    category: "Energy",
    promise: "Ammonia as a carbon-free shipping and fertilizer fuel.",
    realisticPathway: "Green hydrogen, nitrogen separation, Haber-Bosch or alternative synthesis, cracking or direct combustion, and NOx management.",
    pfdSteps: ["Air separation", "Hydrogen production", "Ammonia synthesis", "Storage/shipping", "Fuel or fertilizer use"],
    inputs: ["Nitrogen", "Green hydrogen", "Power"],
    outputs: ["Ammonia", "Heat", "Fertilizer or fuel"],
    bottlenecks: ["Toxicity", "Combustion control", "Infrastructure"],
    readinessGap: "Production is mature; low-carbon synthesis and safe fuel use need deployment.",
    scaleCondition: "Ports, engines, safety systems, and NOx controls must standardize.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Carbon-negative concrete",
    category: "Materials",
    promise: "Buildings that store atmospheric carbon.",
    realisticPathway: "CO2 capture, mineralization chemistry, alkaline waste feedstocks, low-carbon cement blends, curing control, and structural certification.",
    pfdSteps: ["CO2 source", "Mineralization reactor", "Aggregate/cement formulation", "Controlled curing", "Structural product"],
    inputs: ["CO2", "Alkaline minerals or wastes", "Cementitious binders"],
    outputs: ["Carbon-storing concrete", "Construction products"],
    bottlenecks: ["Strength", "Durability", "Standards and feedstock scale"],
    readinessGap: "Pilot products exist, but broad code acceptance and feedstock logistics lag.",
    scaleCondition: "Carbon storage must be verified without compromising structural performance.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Low-carbon steel",
    category: "Manufacturing",
    promise: "Skyscrapers, vehicles, and infrastructure made without coal.",
    realisticPathway: "Green hydrogen direct reduction, electric arc furnaces, clean electricity, scrap sorting, and low-carbon iron ore processing.",
    pfdSteps: ["Iron ore prep", "Hydrogen reduction", "Sponge iron", "Electric furnace", "Steel finishing"],
    inputs: ["Iron ore", "Green hydrogen", "Clean electricity"],
    outputs: ["Low-carbon steel", "Water vapor", "Slag"],
    bottlenecks: ["Hydrogen supply", "Ore quality", "Electric furnace capacity"],
    readinessGap: "Demonstrations are advancing, but global steel needs massive hydrogen and power scale.",
    scaleCondition: "Green hydrogen must be available at commodity industrial volumes.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Carbon-negative plastics",
    category: "Materials",
    promise: "Plastics made from captured carbon instead of fossil carbon.",
    realisticPathway: "CO2 or biomass feedstocks, catalytic conversion, polymerization, purification, compounding, and recycling loops.",
    pfdSteps: ["CO2 or biomass feed", "Monomer synthesis", "Polymerization", "Extrusion/molding", "Recycling loop"],
    inputs: ["CO2 or biomass", "Catalysts", "Energy"],
    outputs: ["Polymer resin", "Finished plastic", "Recycle stream"],
    bottlenecks: ["Cost", "Catalyst selectivity", "Product performance"],
    readinessGap: "Some polymers can use alternative carbon; broad commodity substitution remains expensive.",
    scaleCondition: "Carbon-derived monomers must meet price and performance targets.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Industrial waste-heat networks",
    category: "Infrastructure",
    promise: "Cities heated by hidden industrial energy.",
    realisticPathway: "Heat exchangers, heat pumps, thermal storage, district heating loops, sensors, and urban retrofits.",
    pfdSteps: ["Waste heat source", "Heat recovery", "Heat pump/storage", "District loop", "Building use"],
    inputs: ["Industrial heat", "Pumps", "Thermal network"],
    outputs: ["Building heat", "Lower fuel demand"],
    bottlenecks: ["Coordination", "Retrofit cost", "Temperature matching"],
    readinessGap: "Technologies are mature, but projects require shared infrastructure planning.",
    scaleCondition: "Cities must coordinate industrial sites, utilities, and building retrofits.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Artificial photosynthesis",
    category: "Energy",
    promise: "Sunlight directly converted into fuel.",
    realisticPathway: "Photoelectrochemical catalysts, membrane separators, water splitting, CO2 reduction, product separation, and stability engineering.",
    pfdSteps: ["Sunlight and feed", "Photoelectrochemical conversion", "Membrane separation", "Fuel polishing", "Storage"],
    inputs: ["Sunlight", "Water", "CO2"],
    outputs: ["Hydrogen or carbon fuel", "Oxygen"],
    bottlenecks: ["Catalyst lifetime", "Efficiency", "Scale-up"],
    readinessGap: "Lab devices work, but stable outdoor fuel modules are not mature.",
    scaleCondition: "Catalysts must survive years while maintaining useful conversion efficiency.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Thermal batteries",
    category: "Energy",
    promise: "Cheap stored heat powering factories and grids.",
    realisticPathway: "Resistive heating with renewables, refractory storage media, heat exchangers, insulated modules, and steam or hot air output.",
    pfdSteps: ["Renewable electricity", "Resistive heating", "Thermal storage", "Heat extraction", "Industrial use"],
    inputs: ["Electricity", "Storage media", "Insulated modules"],
    outputs: ["High-temperature heat", "Steam or hot air"],
    bottlenecks: ["Heat losses", "Materials durability", "Integration"],
    readinessGap: "Commercial systems are emerging; matching heat quality to processes is the adoption hurdle.",
    scaleCondition: "Factories must be able to replace fossil heat without reliability penalties.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Grid-scale flow batteries",
    category: "Energy",
    promise: "Cities stabilized by massive liquid batteries.",
    realisticPathway: "Low-cost electrolytes, membranes, tanks, pumps, power electronics, and long-cycle-life electrochemical stacks.",
    pfdSteps: ["Electrolyte production", "Tank storage", "Electrochemical stack", "Power conversion", "Grid dispatch"],
    inputs: ["Electrolyte", "Membranes", "Electricity"],
    outputs: ["Stored electricity", "Grid services"],
    bottlenecks: ["Electrolyte cost", "Membrane degradation", "System footprint"],
    readinessGap: "Technically fielded, but cost and bankability limit very large deployment.",
    scaleCondition: "Electrolytes and stacks must deliver long life at grid-storage prices.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Ambient geothermal networks",
    category: "Infrastructure",
    promise: "Neighborhoods heated and cooled by the ground.",
    realisticPathway: "Boreholes, heat pumps, district thermal loops, thermal storage, and building retrofits.",
    pfdSteps: ["Ground loop", "Heat pump", "Thermal distribution", "Building HVAC", "Return loop"],
    inputs: ["Boreholes", "Electricity", "Water or glycol loop"],
    outputs: ["Heating", "Cooling", "Thermal storage"],
    bottlenecks: ["Drilling cost", "Urban deployment", "Retrofit complexity"],
    readinessGap: "Ground-source systems work; district-scale implementation depends on planning and capital.",
    scaleCondition: "Borefield installation must be standardized and financed like utility infrastructure.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Methane pyrolysis for clean hydrogen",
    category: "Energy",
    promise: "Hydrogen with solid carbon instead of CO2 emissions.",
    realisticPathway: "High-temperature reactors, catalyst or plasma systems, carbon separation, hydrogen purification, and solid carbon markets.",
    pfdSteps: ["Methane feed", "Pyrolysis reactor", "Hydrogen separation", "Carbon handling", "End use"],
    inputs: ["Methane", "Heat or plasma power", "Catalyst"],
    outputs: ["Hydrogen", "Solid carbon"],
    bottlenecks: ["Reactor fouling", "Carbon product value", "Heat management"],
    readinessGap: "Processes are promising but need robust continuous carbon removal.",
    scaleCondition: "Solid carbon must become a managed product, not a disposal liability.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Atmospheric water harvesting",
    category: "Infrastructure",
    promise: "Water pulled from air anywhere.",
    realisticPathway: "Sorbent materials, cooling and condensation, solar or waste-heat regeneration, filtration, remineralization, and storage.",
    pfdSteps: ["Ambient air", "Water capture", "Regeneration/condensation", "Purification", "Storage"],
    inputs: ["Humid air", "Sorbent or condenser", "Energy"],
    outputs: ["Potable water", "Dry air"],
    bottlenecks: ["Energy at low humidity", "Sorbent lifetime", "Throughput"],
    readinessGap: "Small systems exist, but dry-climate water production is energy-limited.",
    scaleCondition: "Capture media must produce useful volumes with low-grade heat or solar power.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Desalination megastructures",
    category: "Infrastructure",
    promise: "Ocean water converted into abundant freshwater.",
    realisticPathway: "Reverse osmosis, energy recovery, renewable power, membrane cleaning, brine management, and mineral recovery.",
    pfdSteps: ["Seawater intake", "Pretreatment", "RO membranes", "Remineralization", "Distribution"],
    inputs: ["Seawater", "Membranes", "Electricity"],
    outputs: ["Freshwater", "Concentrated brine"],
    bottlenecks: ["Brine disposal", "Energy demand", "Membrane fouling"],
    readinessGap: "Desalination is mature, but megascale ecological and energy impacts must be managed.",
    scaleCondition: "Brine handling and clean power must scale with plant capacity.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Brine mining",
    category: "Materials",
    promise: "Extracting valuable minerals from desalination waste.",
    realisticPathway: "Selective membranes, precipitation, electrochemical separation, evaporation, crystallization, and product purification.",
    pfdSteps: ["Brine feed", "Selective extraction", "Precipitation/crystallization", "Purification", "Mineral products"],
    inputs: ["Concentrated brine", "Reagents", "Electricity"],
    outputs: ["Lithium or salts", "Treated brine"],
    bottlenecks: ["Selectivity", "Economics", "Variable composition"],
    readinessGap: "Minerals are present, but concentrations and separation costs rarely close the loop.",
    scaleCondition: "Selective separations must beat commodity mineral supply chains.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Self-cleaning city water systems",
    category: "Infrastructure",
    promise: "Pipes and drains that resist fouling.",
    realisticPathway: "Anti-biofouling coatings, embedded sensors, flow optimization, automated flushing, and predictive maintenance.",
    pfdSteps: ["Water flow", "Sensor monitoring", "Fouling detection", "Automated cleaning", "Quality control"],
    inputs: ["Water network", "Sensors", "Cleaning protocols"],
    outputs: ["Cleaner pipes", "Maintenance data"],
    bottlenecks: ["Coating lifetime", "Retrofit cost", "Sensor reliability"],
    readinessGap: "Pieces exist, but buried infrastructure is difficult to retrofit and verify.",
    scaleCondition: "Coatings and sensors must survive decades of real water chemistry.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "PFAS destruction systems",
    category: "Climate Tech",
    promise: "Permanent destruction of forever chemicals.",
    realisticPathway: "Concentration by adsorption or membranes, electrochemical oxidation, plasma treatment, supercritical water oxidation, and verification analytics.",
    pfdSteps: ["Contaminated water", "PFAS concentration", "Destruction reactor", "Polishing", "Discharge verification"],
    inputs: ["PFAS water", "Adsorbent or membrane", "Energy"],
    outputs: ["Treated water", "Destroyed fluorochemicals"],
    bottlenecks: ["Energy use", "Byproduct control", "Analytical verification"],
    readinessGap: "Concentration is common; verified destruction at low cost is still developing.",
    scaleCondition: "Treatment trains must prove mineralization without creating new hazards.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Wastewater-to-drinking-water systems",
    category: "Infrastructure",
    promise: "Closed-loop urban water.",
    realisticPathway: "Membrane bioreactors, reverse osmosis, UV advanced oxidation, activated carbon, real-time monitoring, and public acceptance.",
    pfdSteps: ["Wastewater", "Biological treatment", "Membrane filtration", "Advanced oxidation", "Potable storage"],
    inputs: ["Municipal wastewater", "Membranes", "Oxidants and UV"],
    outputs: ["Potable water", "Concentrate", "Biosolids"],
    bottlenecks: ["Trust", "Monitoring", "Failure-mode safety"],
    readinessGap: "Technically proven, but social trust and monitoring standards determine adoption.",
    scaleCondition: "Real-time QA must make failures visible and containable.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "City-scale nutrient recovery",
    category: "Climate Tech",
    promise: "Sewage transformed into fertilizer.",
    realisticPathway: "Ammonia stripping, struvite precipitation, anaerobic digestion, biosolids treatment, and pathogen control.",
    pfdSteps: ["Wastewater", "Nutrient concentration", "Precipitation/recovery", "Purification", "Fertilizer"],
    inputs: ["Wastewater", "Magnesium or alkali", "Digesters"],
    outputs: ["Fertilizer products", "Biogas", "Cleaner effluent"],
    bottlenecks: ["Contamination", "Product acceptance", "Plant integration"],
    readinessGap: "Recovery systems exist, but fertilizer markets demand consistent quality.",
    scaleCondition: "Recovered products must meet agronomic and contaminant specifications.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Smart stormwater infrastructure",
    category: "Urban Systems",
    promise: "Cities that absorb floods intelligently.",
    realisticPathway: "Permeable surfaces, bioswales, retention tanks, sensors, predictive control, and green roofs.",
    pfdSteps: ["Rainfall", "Distributed capture", "Filtration/storage", "Controlled release", "Reuse or discharge"],
    inputs: ["Rainwater", "Green infrastructure", "Sensors"],
    outputs: ["Reduced flooding", "Stored water", "Cleaner runoff"],
    bottlenecks: ["Land use", "Maintenance", "Hydraulic coordination"],
    readinessGap: "Components are mature; networked control and maintenance funding are uneven.",
    scaleCondition: "Cities must operate stormwater assets as an active distributed system.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Modular emergency water units",
    category: "Infrastructure",
    promise: "Disaster zones instantly supplied with clean water.",
    realisticPathway: "Containerized filtration, solar power, membrane modules, chemical dosing, and sensor-based quality assurance.",
    pfdSteps: ["Local source", "Pretreatment", "Membrane/UV treatment", "Storage", "Distribution"],
    inputs: ["Surface or well water", "Filters", "Solar or generator power"],
    outputs: ["Safe water", "Waste concentrate"],
    bottlenecks: ["Variable feedwaters", "Robustness", "Operator simplicity"],
    readinessGap: "Portable units exist, but disaster reliability depends on maintenance and consumables.",
    scaleCondition: "Units must handle unknown water quality with simple QA signals.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Closed-loop building water",
    category: "Urban Systems",
    promise: "Skyscrapers that recycle most of their water.",
    realisticPathway: "Greywater separation, membrane filtration, UV disinfection, smart plumbing, and nonpotable reuse loops.",
    pfdSteps: ["Sink/shower water", "Filtration", "Disinfection", "Storage", "Toilet or irrigation reuse"],
    inputs: ["Greywater", "Membranes", "UV systems"],
    outputs: ["Reuse water", "Sludge or concentrate"],
    bottlenecks: ["Plumbing retrofits", "Health codes", "User trust"],
    readinessGap: "New buildings can integrate loops; existing buildings are harder to retrofit.",
    scaleCondition: "Codes and plumbing standards must normalize nonpotable reuse.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Smart glass buildings",
    category: "Materials",
    promise: "Buildings that tint, insulate, and regulate light automatically.",
    realisticPathway: "Electrochromic coatings, transparent conductors, ion-conducting layers, sealing, cycling durability, and building controls.",
    pfdSteps: ["Glass prep", "Conductive coating", "Electrochromic deposition", "Lamination/sealing", "Module testing"],
    inputs: ["Glass", "Conductive oxides", "Electrochromic materials"],
    outputs: ["Smart glazing", "Control data"],
    bottlenecks: ["Coating uniformity", "Cycling durability", "Cost"],
    readinessGap: "Commercial products exist, but cost and large-area reliability limit broad adoption.",
    scaleCondition: "Large panels must hold optical performance through years of cycling.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Self-healing concrete",
    category: "Materials",
    promise: "Roads and buildings that repair cracks.",
    realisticPathway: "Encapsulated healing agents, bacteria-based mineralization, polymer networks, moisture-triggered chemistry, and durability testing.",
    pfdSteps: ["Cement matrix", "Healing additive integration", "Casting", "Crack activation", "Repair reaction"],
    inputs: ["Cement", "Healing agents", "Moisture"],
    outputs: ["Repaired microcracks", "Longer service life"],
    bottlenecks: ["Long-term performance", "Structural certification", "Cost"],
    readinessGap: "Lab and pilot materials are promising; infrastructure codes need field evidence.",
    scaleCondition: "Healing must be predictable under real loads, climates, and maintenance cycles.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Adaptive building skins",
    category: "Urban Systems",
    promise: "Buildings that breathe, shade, cool, and harvest energy.",
    realisticPathway: "Responsive materials, sensors, actuators, solar coatings, thermal storage layers, and control algorithms.",
    pfdSteps: ["Sensor input", "Control system", "Material or actuator response", "Heat/light regulation", "Performance feedback"],
    inputs: ["Sensors", "Facade modules", "Control power"],
    outputs: ["Reduced loads", "Occupant comfort", "Operating data"],
    bottlenecks: ["Reliability", "Maintenance", "Cost"],
    readinessGap: "Architectural prototypes exist, but lifecycle reliability is a barrier.",
    scaleCondition: "Facade modules must be serviceable and energy-positive over their lifetime.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Radiative cooling materials",
    category: "Climate Tech",
    promise: "Surfaces that cool buildings without electricity.",
    realisticPathway: "Photonic coatings, polymer films, selective infrared emission, weather-resistant layers, and roof or wall integration.",
    pfdSteps: ["Coating formulation", "Film deposition", "Curing", "Installation", "Cooling performance"],
    inputs: ["Polymers", "Pigments", "Roof or wall substrate"],
    outputs: ["Passive cooling", "Lower AC load"],
    bottlenecks: ["Durability", "Dirt and humidity", "Cost"],
    readinessGap: "Materials work in trials; real urban exposure decides energy savings.",
    scaleCondition: "Coatings must stay reflective and emissive after years outdoors.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Transparent solar windows",
    category: "Energy",
    promise: "Skyscrapers that generate power from glass.",
    realisticPathway: "Transparent photovoltaics, spectral-selective absorbers, conductive coatings, module wiring, and building integration.",
    pfdSteps: ["Glass substrate", "Transparent PV coating", "Encapsulation", "Wiring", "Building power interface"],
    inputs: ["Glass", "PV absorbers", "Transparent conductors"],
    outputs: ["Electricity", "Daylighting"],
    bottlenecks: ["Efficiency-transparency tradeoff", "Lifetime", "Wiring integration"],
    readinessGap: "Prototypes exist, but power density is low versus conventional panels.",
    scaleCondition: "Windows must deliver useful energy without compromising daylight or facade life.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "3D-printed buildings",
    category: "Manufacturing",
    promise: "Houses printed by robots.",
    realisticPathway: "Printable cementitious materials, robotic gantries, rheology control, reinforcement integration, codes, and QA.",
    pfdSteps: ["Mix formulation", "Pumping", "Robotic deposition", "Curing", "Reinforcement/finishing"],
    inputs: ["Cement mix", "Robotic gantry", "Reinforcement"],
    outputs: ["Printed shell", "Construction data"],
    bottlenecks: ["Structural reliability", "Code acceptance", "Reinforcement integration"],
    readinessGap: "Printed structures exist, but mainstream construction needs repeatable QA and code pathways.",
    scaleCondition: "Printed walls must meet conventional structural and insurance standards.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Living buildings",
    category: "Bio",
    promise: "Architecture integrated with biology.",
    realisticPathway: "Algae facades, biofilms, controlled growth media, water and nutrient loops, containment, and maintenance protocols.",
    pfdSteps: ["Nutrient/water loop", "Biological growth module", "Light/CO2 exchange", "Biomass harvesting", "Loop control"],
    inputs: ["Water", "Nutrients", "CO2 and light"],
    outputs: ["Biomass", "Shading", "Captured carbon"],
    bottlenecks: ["Biofouling", "Control", "Maintenance"],
    readinessGap: "Demonstrations are visually compelling but operationally fragile.",
    scaleCondition: "Biological modules must be maintainable like building equipment.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Urban vertical farms",
    category: "Urban Systems",
    promise: "Skyscrapers producing food.",
    realisticPathway: "LED lighting, hydroponics or aeroponics, nutrient recycling, climate control, automation, and crop genetics.",
    pfdSteps: ["Water/nutrients", "Controlled growth", "Monitoring", "Harvest", "Packaging and nutrient recycle"],
    inputs: ["Seeds", "Water", "Electricity and nutrients"],
    outputs: ["Produce", "Plant waste", "Data"],
    bottlenecks: ["Electricity cost", "Crop economics", "Automation"],
    readinessGap: "Leafy greens work best; staple crops are far harder economically.",
    scaleCondition: "Energy and labor costs must fall for broader crop categories.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Autonomous waste sorting facilities",
    category: "Robotics",
    promise: "Trash transformed into clean material streams.",
    realisticPathway: "Machine vision, robotics, density separation, shredding, washing, polymer identification, and recycling markets.",
    pfdSteps: ["Mixed waste", "Sorting", "Cleaning", "Separation", "Reprocessing"],
    inputs: ["Mixed waste", "Robots", "Wash water"],
    outputs: ["Recovered materials", "Rejects", "Process data"],
    bottlenecks: ["Contamination", "Market value", "Identification accuracy"],
    readinessGap: "Robotic sorting is growing, but feed variability limits purity and economics.",
    scaleCondition: "Recovered streams must meet buyer specifications at high throughput.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Pneumatic waste networks",
    category: "Infrastructure",
    promise: "Cities without garbage trucks.",
    realisticPathway: "Underground vacuum tubes, centralized sorting, odor control, maintenance access, and district-scale deployment.",
    pfdSteps: ["Building waste inlet", "Vacuum transport", "Central collection", "Sorting", "Recycling/disposal"],
    inputs: ["Bagged waste", "Vacuum power", "Tube network"],
    outputs: ["Centralized waste streams", "Reduced truck traffic"],
    bottlenecks: ["Retrofit cost", "Clogging", "Maintenance access"],
    readinessGap: "District systems exist, but retrofitting dense cities is capital-intensive.",
    scaleCondition: "Networks must be designed with buildings, streets, and sorting facilities together.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Underground logistics networks",
    category: "Infrastructure",
    promise: "Packages moving invisibly under cities.",
    realisticPathway: "Autonomous carts, tunnels, routing algorithms, distribution hubs, and maintenance systems.",
    pfdSteps: ["Package intake", "Routing hub", "Underground transport", "Local delivery node", "Customer handoff"],
    inputs: ["Packages", "Tunnels", "Autonomous carriers"],
    outputs: ["Delivered goods", "Traffic reduction"],
    bottlenecks: ["Excavation cost", "Interoperability", "Maintenance"],
    readinessGap: "Automation is feasible; civil works and network rights are the hard part.",
    scaleCondition: "Tunnel deployment must cost less than surface logistics congestion.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Modular megastructure cities",
    category: "Urban Systems",
    promise: "Plug-and-play urban expansion.",
    realisticPathway: "Prefabricated modules, standardized utility interfaces, structural connectors, logistics, and codes.",
    pfdSteps: ["Module fabrication", "Transport", "Utility connection", "Structural assembly", "Commissioning"],
    inputs: ["Prefab modules", "Utility interfaces", "Cranes and logistics"],
    outputs: ["Habitable units", "Connected services"],
    bottlenecks: ["Standardization", "Permitting", "Transport limits"],
    readinessGap: "Modular construction exists; city-scale plug-and-play standards do not.",
    scaleCondition: "Interfaces must become as standardized as shipping containers.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Climate-controlled pedestrian corridors",
    category: "Urban Systems",
    promise: "Walkable cities protected from extreme weather.",
    realisticPathway: "District energy, passive design, shading, evaporative cooling, air filtration, and modular canopy systems.",
    pfdSteps: ["Outdoor corridor", "Shade/air handling", "Cooling/filtration", "Sensor control", "Pedestrian environment"],
    inputs: ["Canopy modules", "Thermal energy", "Sensors"],
    outputs: ["Comfortable walkways", "Filtered air"],
    bottlenecks: ["Capital cost", "Maintenance", "Energy use"],
    readinessGap: "Elements are proven; continuous public-space systems need civic funding.",
    scaleCondition: "Corridors must improve mobility enough to justify operating cost.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "City-scale digital twins",
    category: "Computing",
    promise: "Cities simulated and optimized in real time.",
    realisticPathway: "Sensor networks, GIS, building data, traffic models, utility data, simulation platforms, and governance.",
    pfdSteps: ["Sensors/data", "Integration platform", "Simulation model", "Decision support", "Operations"],
    inputs: ["City sensors", "GIS data", "Utility and traffic feeds"],
    outputs: ["Operational forecasts", "Planning scenarios"],
    bottlenecks: ["Data interoperability", "Privacy", "Model trust"],
    readinessGap: "Digital twins exist in fragments; whole-city governance remains immature.",
    scaleCondition: "Data standards and privacy rules must support cross-agency operations.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Urban heat-island reversal systems",
    category: "Climate Tech",
    promise: "Cities that actively cool themselves.",
    realisticPathway: "Reflective materials, tree canopy, water features, cool pavements, district cooling, and thermal mapping.",
    pfdSteps: ["Thermal mapping", "Surface/material intervention", "Cooling deployment", "Monitoring", "Adjustment"],
    inputs: ["Thermal data", "Cool materials", "Vegetation and water"],
    outputs: ["Lower surface temperatures", "Reduced cooling load"],
    bottlenecks: ["Maintenance", "Neighborhood coordination", "Water availability"],
    readinessGap: "Known interventions need coordinated deployment at neighborhood scale.",
    scaleCondition: "Cooling measures must be measured, maintained, and equitably distributed.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Flying cars / eVTOL air taxis",
    category: "Transportation",
    promise: "Personal aerial mobility.",
    realisticPathway: "High-density batteries, distributed electric propulsion, autonomous avionics, vertiports, air traffic management, and noise reduction.",
    pfdSteps: ["Battery charging", "Flight control", "Electric propulsion", "Vertiport operations", "Maintenance"],
    inputs: ["Electricity", "Battery packs", "Airspace data"],
    outputs: ["Passenger trips", "Noise and maintenance data"],
    bottlenecks: ["Energy density", "Safety", "Airspace management"],
    readinessGap: "Aircraft are nearing certification, but network operations remain unproven.",
    scaleCondition: "Vehicles, vertiports, and traffic control must reach airline-grade reliability.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Hyperloop-style transport",
    category: "Transportation",
    promise: "Ultra-fast tube transportation.",
    realisticPathway: "Low-pressure tubes, magnetic levitation, linear motors, vacuum pumps, safety systems, and thermal expansion control.",
    pfdSteps: ["Pod loading", "Evacuated tube", "Propulsion/levitation", "Braking", "Station handling"],
    inputs: ["Passengers or cargo", "Low-pressure tubes", "Electric power"],
    outputs: ["High-speed trips", "Heat and vacuum loads"],
    bottlenecks: ["Infrastructure cost", "Emergency safety", "Thermal expansion"],
    readinessGap: "Subsystem demos exist; full corridor safety and economics are unresolved.",
    scaleCondition: "Tube construction and emergency procedures must beat existing rail or air options.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Autonomous electric transit pods",
    category: "Transportation",
    promise: "Personalized public transit.",
    realisticPathway: "Batteries, charging networks, autonomy stacks, route optimization, fleet management, and maintenance hubs.",
    pfdSteps: ["Passenger request", "Fleet routing", "Vehicle dispatch", "Charging/maintenance", "Data feedback"],
    inputs: ["Trip demand", "EV pods", "Route data"],
    outputs: ["Passenger mobility", "Fleet data"],
    bottlenecks: ["Autonomy reliability", "Urban integration", "Fleet utilization"],
    readinessGap: "Shuttles operate in limited domains; mixed urban traffic is harder.",
    scaleCondition: "Autonomy must handle edge cases while fleet economics remain favorable.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Hydrogen aircraft",
    category: "Transportation",
    promise: "Zero-carbon flight.",
    realisticPathway: "Liquid hydrogen storage, cryogenic tanks, fuel cells or turbines, airport fueling systems, and safety certification.",
    pfdSteps: ["Hydrogen production", "Liquefaction", "Airport storage", "Aircraft fueling", "Propulsion"],
    inputs: ["Green hydrogen", "Cryogenic tanks", "Airport infrastructure"],
    outputs: ["Flight power", "Water vapor", "Boiloff losses"],
    bottlenecks: ["Volumetric energy density", "Infrastructure", "Certification"],
    readinessGap: "Components exist, but aircraft design and airport fuel systems must change together.",
    scaleCondition: "Cryogenic fueling must become routine, safe, and fast at airports.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Electric aviation",
    category: "Transportation",
    promise: "Quiet zero-emission regional aircraft.",
    realisticPathway: "High-energy batteries, lightweight structures, thermal management, fast charging, and short-haul route design.",
    pfdSteps: ["Grid power", "Fast charging", "Battery storage", "Electric propulsion", "Thermal management"],
    inputs: ["Electricity", "Batteries", "Lightweight airframe"],
    outputs: ["Short-haul flight", "Battery heat"],
    bottlenecks: ["Battery specific energy", "Charging speed", "Payload range"],
    readinessGap: "Small aircraft are feasible; larger regional missions need better batteries.",
    scaleCondition: "Battery packs must improve without compromising cycle life and safety.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Maglev trains",
    category: "Transportation",
    promise: "Frictionless ultra-fast ground travel.",
    realisticPathway: "Superconducting or electromagnetic levitation, guideway infrastructure, power electronics, and control systems.",
    pfdSteps: ["Grid power", "Levitation/propulsion", "Vehicle control", "Station operations", "Maintenance"],
    inputs: ["Guideway", "Electricity", "Control systems"],
    outputs: ["High-speed transport", "Grid demand"],
    bottlenecks: ["Guideway cost", "Network deployment", "Right-of-way"],
    readinessGap: "Maglev works technically; deployment is dominated by capital planning.",
    scaleCondition: "Corridor demand must justify dedicated guideway investment.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Self-healing roads",
    category: "Materials",
    promise: "Roads that repair themselves.",
    realisticPathway: "Asphalt binders with microcapsules, induction heating materials, recycled polymers, and embedded sensors.",
    pfdSteps: ["Asphalt formulation", "Road paving", "Damage sensing", "Healing activation", "Performance monitoring"],
    inputs: ["Asphalt", "Healing additives", "Sensors or heating"],
    outputs: ["Extended pavement life", "Maintenance alerts"],
    bottlenecks: ["Cost", "Field validation", "Additive durability"],
    readinessGap: "Materials work in trials; lifecycle economics must beat conventional resurfacing.",
    scaleCondition: "Healing performance must persist under traffic, weather, and maintenance.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Robotic construction fleets",
    category: "Robotics",
    promise: "Cities built by autonomous machines.",
    realisticPathway: "Autonomous earthmoving, robotic layout, concrete printing, machine vision, BIM integration, and safety controls.",
    pfdSteps: ["Digital design", "Robotic site prep", "Automated construction", "Inspection", "Handoff"],
    inputs: ["BIM model", "Robots", "Construction materials"],
    outputs: ["Built assets", "Inspection data"],
    bottlenecks: ["Unstructured sites", "Safety", "System integration"],
    readinessGap: "Robots handle specific tasks, but full construction sites change constantly.",
    scaleCondition: "Autonomy must be reliable around people, weather, and material variability.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Smart highways",
    category: "Transportation",
    promise: "Roads that communicate with vehicles.",
    realisticPathway: "Embedded sensors, V2X communication, dynamic signage, charging lanes, and predictive maintenance.",
    pfdSteps: ["Road sensors", "Data network", "Vehicle communication", "Traffic/control response", "Maintenance feedback"],
    inputs: ["Sensors", "Vehicles", "Communication network"],
    outputs: ["Traffic optimization", "Maintenance alerts"],
    bottlenecks: ["Standardization", "Cybersecurity", "Retrofit cost"],
    readinessGap: "Pilot corridors exist, but national interoperability is immature.",
    scaleCondition: "Vehicle and infrastructure standards must converge.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Wireless road charging",
    category: "Infrastructure",
    promise: "EVs charging while driving.",
    realisticPathway: "Inductive coils, power electronics, vehicle receivers, billing systems, and grid upgrades.",
    pfdSteps: ["Grid power", "Roadside coils", "Vehicle receiver", "Battery charging", "Billing/control"],
    inputs: ["Electricity", "Embedded coils", "Vehicle receivers"],
    outputs: ["Vehicle charge", "Grid load data"],
    bottlenecks: ["Efficiency", "Cost", "Interoperability"],
    readinessGap: "Demonstrations work; deployment depends on road construction economics.",
    scaleCondition: "Charging lanes must be shared, efficient, and compatible across vehicles.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Autonomous factories",
    category: "Manufacturing",
    promise: "Factories that run themselves.",
    realisticPathway: "Robotics, machine vision, sensors, process control, digital twins, predictive maintenance, and human oversight.",
    pfdSteps: ["Raw material intake", "Automated processing", "Inspection", "Packaging", "Feedback control"],
    inputs: ["Raw materials", "Robots", "Sensors"],
    outputs: ["Finished goods", "Quality data"],
    bottlenecks: ["Exception handling", "System integration", "Maintenance"],
    readinessGap: "Automated lines exist, but fully autonomous mixed production is rare.",
    scaleCondition: "Systems must recover from abnormal conditions without hiding risk.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Factory-in-a-box",
    category: "Manufacturing",
    promise: "Deployable microfactories anywhere.",
    realisticPathway: "Modular process skids, standard utilities, automation, QA modules, and containerized production.",
    pfdSteps: ["Feedstock", "Modular process unit", "Inspection", "Packaged product", "Service loop"],
    inputs: ["Feedstock", "Utility hookups", "Skid modules"],
    outputs: ["Local products", "QA records"],
    bottlenecks: ["Flexibility vs. QA", "Utility variability", "Throughput"],
    readinessGap: "Containerized systems work for narrow products; flexible manufacturing is harder.",
    scaleCondition: "Modules must maintain validated quality across deployment sites.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Self-replicating manufacturing systems",
    category: "Manufacturing",
    promise: "Machines that build more machines.",
    realisticPathway: "Modular robotics, standardized parts, additive manufacturing, supply-chain libraries, and automated assembly.",
    pfdSteps: ["Raw materials", "Part fabrication", "Assembly", "Calibration", "Replication"],
    inputs: ["Materials", "Part libraries", "Assembly robots"],
    outputs: ["Machine modules", "Calibration data"],
    bottlenecks: ["Complexity", "Precision", "Component diversity"],
    readinessGap: "Partial automation exists, but complete replication needs broad component supply.",
    scaleCondition: "Machines must fabricate enough of their own precision components to matter.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Molecular assemblers",
    category: "Manufacturing",
    promise: "Atomically precise manufacturing.",
    realisticPathway: "Scanning probe systems, DNA origami, molecular machines, self-assembly, and nanolithography.",
    pfdSteps: ["Molecular feedstocks", "Directed assembly", "Error correction", "Product stabilization", "Scale-out"],
    inputs: ["Molecules", "Templates", "Energy"],
    outputs: ["Nanostructures", "Assembly defects"],
    bottlenecks: ["Speed", "Error rates", "Scale"],
    readinessGap: "Precision exists in research tools, not high-throughput production.",
    scaleCondition: "Assembly must become massively parallel with reliable defect correction.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Programmable matter",
    category: "Materials",
    promise: "Materials that change shape or function on command.",
    realisticPathway: "Metamaterials, embedded actuation, responsive polymers, microelectronics, and distributed control.",
    pfdSteps: ["Material fabrication", "Actuator integration", "Sensing/control", "Shape response", "Reset"],
    inputs: ["Responsive materials", "Microelectronics", "Power"],
    outputs: ["Reconfigurable form", "Control data"],
    bottlenecks: ["Power delivery", "Manufacturability", "Control complexity"],
    readinessGap: "Programmable structures exist at small scales; useful macro products remain limited.",
    scaleCondition: "Actuation, sensing, and power must be manufacturable inside the material.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Swarm robotics",
    category: "Robotics",
    promise: "Fleets of small robots building or repairing environments.",
    realisticPathway: "Low-cost robots, distributed algorithms, localization, charging, task coordination, and fault tolerance.",
    pfdSteps: ["Task input", "Swarm coordination", "Local action", "Feedback", "Mission update"],
    inputs: ["Robot fleet", "Task map", "Power"],
    outputs: ["Distributed work", "Status data"],
    bottlenecks: ["Messy environments", "Localization", "Fault tolerance"],
    readinessGap: "Swarm demos exist; real-world reliability and task value are uneven.",
    scaleCondition: "Individual failures must not collapse mission performance.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Robotic maintenance cities",
    category: "Robotics",
    promise: "Robots constantly repairing infrastructure.",
    realisticPathway: "Inspection drones, crawling robots, machine vision, repair materials, and scheduling systems.",
    pfdSteps: ["Inspection", "Defect detection", "Repair dispatch", "Material application", "Verification"],
    inputs: ["Infrastructure assets", "Inspection robots", "Repair materials"],
    outputs: ["Repaired defects", "Asset condition data"],
    bottlenecks: ["Uncontrolled environments", "Repair quality", "Access"],
    readinessGap: "Inspection is advancing faster than autonomous repair.",
    scaleCondition: "Robotic repairs must meet the same standards as human crews.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Additive manufacturing of metal parts",
    category: "Manufacturing",
    promise: "Complex metal parts printed on demand.",
    realisticPathway: "Powder production, laser or electron-beam melting, thermal control, in-situ monitoring, post-processing, and qualification.",
    pfdSteps: ["Metal powder", "Layer deposition", "Melting", "Heat treatment", "Inspection/certification"],
    inputs: ["Metal powder", "Laser or beam energy", "Inert gas"],
    outputs: ["Qualified parts", "Scrap powder", "Inspection data"],
    bottlenecks: ["Defects", "Repeatability", "Qualification"],
    readinessGap: "High-value parts are real; commodity substitution needs faster, cheaper, certified processes.",
    scaleCondition: "In-situ QA must predict part performance without excessive testing.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Roll-to-roll printed electronics",
    category: "Manufacturing",
    promise: "Electronics printed like newspapers.",
    realisticPathway: "Conductive inks, flexible substrates, coating and printing tools, drying or sintering, registration control, and inspection.",
    pfdSteps: ["Ink formulation", "Substrate prep", "Printing/coating", "Curing/sintering", "Testing"],
    inputs: ["Conductive inks", "Flexible substrate", "Thermal or photonic curing"],
    outputs: ["Flexible circuits", "Defect maps"],
    bottlenecks: ["Defect density", "Resolution", "Registration"],
    readinessGap: "Specific devices are manufacturable; dense high-performance electronics are harder.",
    scaleCondition: "Printing yield must meet electronics-grade defect limits.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Micromodular printed electronics",
    category: "Manufacturing",
    promise: "Microelectronic devices assembled like printable components.",
    realisticPathway: "Microdevice fabrication, release into inks, controlled deposition, substrate boundary control, printed interconnects, and inspection.",
    pfdSteps: ["Microdevice fabrication", "Release/ink formulation", "Droplet deposition", "Interconnect printing", "Circuit testing"],
    inputs: ["Microdevices", "Carrier inks", "Substrates"],
    outputs: ["Hybrid circuits", "Rejected placements"],
    bottlenecks: ["Placement control", "Yield", "Interconnect reliability"],
    readinessGap: "Promising for hybrid electronics, but precision placement at speed is difficult.",
    scaleCondition: "Deposition tools must place devices accurately with high throughput.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "AI-guided process development",
    category: "Computing",
    promise: "AI discovering optimal manufacturing recipes.",
    realisticPathway: "High-throughput experiments, sensors, Bayesian optimization, physics-informed models, and automated labs.",
    pfdSteps: ["Experiment design", "Automated testing", "Data capture", "Model update", "New recipe"],
    inputs: ["Process variables", "Experimental platform", "Sensor data"],
    outputs: ["Optimized recipes", "Process models"],
    bottlenecks: ["Data quality", "Scale transfer", "Model trust"],
    readinessGap: "Optimization tools work, but plant transfer requires mechanistic understanding.",
    scaleCondition: "Lab data must predict pilot and production behavior.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Lights-out semiconductor fabs",
    category: "Manufacturing",
    promise: "Fully automated chip factories.",
    realisticPathway: "Wafer automation, metrology, contamination control, advanced process control, and predictive maintenance.",
    pfdSteps: ["Wafer input", "Lithography/etch/deposition", "Metrology", "Feedback control", "Packaging"],
    inputs: ["Wafers", "Process gases", "Ultra-clean tools"],
    outputs: ["Chips", "Yield data", "Waste chemicals"],
    bottlenecks: ["Yield learning", "Tool complexity", "Contamination control"],
    readinessGap: "Fabs are highly automated, but process learning still needs deep human engineering.",
    scaleCondition: "Automation must accelerate yield learning without reducing process insight.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "On-demand pharmaceutical factories",
    category: "Medical Tech",
    promise: "Medicines manufactured locally when needed.",
    realisticPathway: "Continuous manufacturing, modular reactors, PAT sensors, quality-by-design, and regulatory validation.",
    pfdSteps: ["Raw materials", "Continuous synthesis", "Purification", "Formulation", "QA release"],
    inputs: ["Drug precursors", "Solvents", "PAT sensors"],
    outputs: ["Finished medicine", "Batch records"],
    bottlenecks: ["Regulatory approval", "Robustness", "Cleaning validation"],
    readinessGap: "Continuous pharma is real, but local flexible production needs validated controls.",
    scaleCondition: "Quality release must be fast, automated, and regulator-trusted.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Modular biomanufacturing",
    category: "Bio",
    promise: "Organisms producing chemicals anywhere.",
    realisticPathway: "Engineered microbes, fermentation, downstream processing, sterilization, and modular bioreactors.",
    pfdSteps: ["Feedstock", "Fermentation", "Cell removal", "Purification", "Product formulation"],
    inputs: ["Sugars or gases", "Microbes", "Sterile media"],
    outputs: ["Bioproduct", "Biomass", "Spent media"],
    bottlenecks: ["Contamination", "Yield", "Downstream cost"],
    readinessGap: "Fermentation scales well for some products; many targets lose economics downstream.",
    scaleCondition: "Titers, rates, yields, and purification must beat petrochemical routes.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Self-optimizing chemical plants",
    category: "Manufacturing",
    promise: "Chemical plants that tune themselves.",
    realisticPathway: "Sensors, advanced process control, digital twins, optimization, safety constraints, and operator oversight.",
    pfdSteps: ["Feedstocks", "Reactor/separation train", "Sensors", "Control algorithm", "Adjusted operation"],
    inputs: ["Feedstocks", "Process data", "Control models"],
    outputs: ["Products", "Setpoint changes", "Alarms"],
    bottlenecks: ["Safety", "Model reliability", "Edge cases"],
    readinessGap: "Advanced control is common, but autonomous optimization is constrained by safety cases.",
    scaleCondition: "Models must be accurate enough to optimize without violating safety margins.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Graphene membranes",
    category: "Materials",
    promise: "Ultra-fast water purification and gas separation.",
    realisticPathway: "Scalable graphene synthesis, defect control, membrane support layers, module fabrication, and fouling control.",
    pfdSteps: ["Carbon source", "Graphene growth", "Transfer/support", "Pore engineering", "Module assembly"],
    inputs: ["Carbon precursor", "Support membrane", "Etching tools"],
    outputs: ["Separation modules", "Reject stream"],
    bottlenecks: ["Defect-free scale-up", "Fouling", "Module sealing"],
    readinessGap: "Exceptional lab transport must become defect-controlled square meters.",
    scaleCondition: "Membranes must be produced with controlled pores and low defect density.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Carbon nanotube elevators / cables",
    category: "Materials",
    promise: "Ultra-strong cables for space elevators or megastructures.",
    realisticPathway: "Long CNT fiber spinning, alignment, defect reduction, load transfer, and composite processing.",
    pfdSteps: ["CNT synthesis", "Purification", "Fiber spinning", "Alignment/densification", "Cable testing"],
    inputs: ["Carbon feedstock", "CNT reactors", "Binders"],
    outputs: ["CNT fibers", "Composite cables"],
    bottlenecks: ["Macroscale strength", "Defects", "Load transfer"],
    readinessGap: "Lab materials are strong, but long cables fall far below theoretical strength.",
    scaleCondition: "Fiber strength must survive kilometers of defects and joining.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Smart clothing",
    category: "Materials",
    promise: "Clothing that monitors health and adapts temperature.",
    realisticPathway: "Flexible sensors, conductive fibers, washable electronics, low-power modules, and data systems.",
    pfdSteps: ["Fiber/textile prep", "Sensor integration", "Encapsulation", "Garment assembly", "Data interface"],
    inputs: ["Textiles", "Sensors", "Flexible batteries"],
    outputs: ["Wearable data", "Thermal response"],
    bottlenecks: ["Durability", "Washability", "Comfort"],
    readinessGap: "Wearables exist; seamless textile integration is still fragile.",
    scaleCondition: "Electronics must survive washing, bending, sweat, and daily use.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Exoskeleton suits",
    category: "Robotics",
    promise: "Wearable strength enhancement.",
    realisticPathway: "Lightweight actuators, batteries, sensors, control algorithms, ergonomics, and safety systems.",
    pfdSteps: ["User sensing", "Control logic", "Actuator response", "Mechanical assistance", "Feedback"],
    inputs: ["User motion", "Actuators", "Battery power"],
    outputs: ["Assisted movement", "Biomechanics data"],
    bottlenecks: ["Battery mass", "Comfort", "Control"],
    readinessGap: "Industrial and medical exoskeletons exist, but broad everyday use is limited.",
    scaleCondition: "Assistance must be comfortable enough to wear for full shifts.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Cloaking materials",
    category: "Materials",
    promise: "Invisibility or optical camouflage.",
    realisticPathway: "Metamaterials, adaptive displays, cameras, light-field control, and flexible substrates.",
    pfdSteps: ["Environmental sensing", "Optical computation", "Surface emission/reflection", "Camouflage effect", "Feedback"],
    inputs: ["Cameras", "Metasurfaces", "Display power"],
    outputs: ["Reduced visibility", "Heat and data load"],
    bottlenecks: ["Broadband performance", "Viewing angles", "Power"],
    readinessGap: "Narrow-band effects exist; practical all-angle invisibility is far away.",
    scaleCondition: "Optical control must work across wavelengths, angles, and real backgrounds.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Metamaterial sound control",
    category: "Materials",
    promise: "Rooms, vehicles, and cities with engineered silence.",
    realisticPathway: "Acoustic metamaterial panels, resonator arrays, additive manufacturing, and building integration.",
    pfdSteps: ["Material design", "Resonator fabrication", "Panel assembly", "Installation", "Acoustic tuning"],
    inputs: ["Acoustic design", "Printed panels", "Mounting hardware"],
    outputs: ["Noise reduction", "Tuned acoustic response"],
    bottlenecks: ["Bandwidth", "Cost", "Aesthetics"],
    readinessGap: "Targeted panels work; broadband thin solutions are harder.",
    scaleCondition: "Panels must reduce real noise while fitting architectural constraints.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Self-cleaning surfaces",
    category: "Materials",
    promise: "Windows, buildings, and vehicles that stay clean.",
    realisticPathway: "Hydrophobic or photocatalytic coatings, durable binders, surface texture, and UV activation.",
    pfdSteps: ["Surface prep", "Coating deposition", "Curing", "Field exposure", "Cleaning action"],
    inputs: ["Substrate", "Coating chemistry", "UV or water"],
    outputs: ["Cleaner surface", "Degraded contaminants"],
    bottlenecks: ["Abrasion", "Durability", "Soiling variability"],
    readinessGap: "Products exist, but long-term outdoor performance is inconsistent.",
    scaleCondition: "Coatings must survive abrasion, weather, and cleaning chemicals.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Anti-icing materials",
    category: "Materials",
    promise: "Aircraft, roads, and power lines resisting ice.",
    realisticPathway: "Icephobic coatings, heating elements, surface textures, and phase-change materials.",
    pfdSteps: ["Surface prep", "Coating/heater integration", "Environmental exposure", "Ice prevention/removal", "Inspection"],
    inputs: ["Surface", "Coatings or heaters", "Power if active"],
    outputs: ["Reduced ice accretion", "Safety data"],
    bottlenecks: ["Durability", "Harsh conditions", "Energy use"],
    readinessGap: "Many coatings work in tests, but severe weather and abrasion reduce life.",
    scaleCondition: "Materials must perform under real icing, erosion, UV, and maintenance.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Aerogel insulation cities",
    category: "Materials",
    promise: "Ultra-insulated lightweight buildings and vehicles.",
    realisticPathway: "Silica or polymer aerogel production, drying processes, composite panels, fire safety, and cost reduction.",
    pfdSteps: ["Sol-gel formation", "Aging", "Drying", "Composite integration", "Panel installation"],
    inputs: ["Silica or polymer precursors", "Solvents", "Drying energy"],
    outputs: ["Aerogel panels", "Insulated envelopes"],
    bottlenecks: ["Brittleness", "Manufacturing cost", "Fire and moisture performance"],
    readinessGap: "Aerogels are commercial but too expensive for universal building use.",
    scaleCondition: "Panel manufacturing must lower cost while preserving insulation value.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Shape-shifting materials",
    category: "Materials",
    promise: "Objects that morph on demand.",
    realisticPathway: "Shape-memory alloys or polymers, embedded heaters, soft robotics, and control systems.",
    pfdSteps: ["Material fabrication", "Actuator programming", "Stimulus input", "Shape response", "Reset"],
    inputs: ["Shape-memory material", "Heat or field input", "Controls"],
    outputs: ["Morphed geometry", "Fatigue data"],
    bottlenecks: ["Speed", "Fatigue", "Energy use"],
    readinessGap: "Actuating materials are real, but robust large motions are application-specific.",
    scaleCondition: "Repeated shape change must be fast, efficient, and fatigue-resistant.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Self-healing polymers",
    category: "Materials",
    promise: "Products that repair scratches and cracks.",
    realisticPathway: "Dynamic covalent bonds, microcapsules, supramolecular networks, and thermal or light activation.",
    pfdSteps: ["Polymer synthesis", "Healing chemistry integration", "Product forming", "Damage activation", "Repair"],
    inputs: ["Monomers", "Healing agents", "Stimulus energy"],
    outputs: ["Repaired polymer", "Longer product life"],
    bottlenecks: ["Strength vs. healing", "Activation conditions", "Aging"],
    readinessGap: "Coatings are closer than structural plastics.",
    scaleCondition: "Healing must not sacrifice mechanical strength or processing speed.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Transparent displays everywhere",
    category: "Computing",
    promise: "Glass surfaces acting as screens.",
    realisticPathway: "Transparent OLEDs, microLEDs, conductive films, encapsulation, and power/data integration.",
    pfdSteps: ["Glass/substrate", "Transparent electronics", "Emissive layer", "Encapsulation", "Display integration"],
    inputs: ["Glass", "Emitters", "Transparent conductors"],
    outputs: ["Transparent display", "Heat and data load"],
    bottlenecks: ["Brightness", "Transparency", "Lifetime"],
    readinessGap: "Displays exist, but durable architectural integration is limited.",
    scaleCondition: "Panels must be bright, transparent, repairable, and power-efficient.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Holographic interfaces",
    category: "Computing",
    promise: "3D displays floating in space.",
    realisticPathway: "Light-field displays, volumetric displays, spatial light modulators, and eye tracking.",
    pfdSteps: ["3D data", "Optical computation", "Light modulation", "Volumetric/light-field projection", "User feedback"],
    inputs: ["3D scene data", "Optics", "Compute"],
    outputs: ["3D visual field", "Heat"],
    bottlenecks: ["Resolution", "Brightness", "Compute load"],
    readinessGap: "Niche systems exist; consumer-scale high-resolution volume is hard.",
    scaleCondition: "Optics and compute must deliver bright 3D imagery without bulky hardware.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Room-temperature superconductors",
    category: "Materials",
    promise: "Lossless power grids, levitation, and compact magnets.",
    realisticPathway: "Materials discovery, high-throughput synthesis, pressure-free stability, and wire or tape manufacturing.",
    pfdSteps: ["Material synthesis", "Phase stabilization", "Wire fabrication", "Property testing", "Device integration"],
    inputs: ["Precursors", "Synthesis equipment", "Characterization tools"],
    outputs: ["Superconducting forms", "Validated property data"],
    bottlenecks: ["Verified properties", "Manufacturable form", "Current density"],
    readinessGap: "No broadly verified ambient superconductor exists for engineering deployment.",
    scaleCondition: "A stable material must be independently verified and manufacturable as wire or tape.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Bio-inspired structural materials",
    category: "Materials",
    promise: "Lightweight materials as strong as shells, bone, or spider silk.",
    realisticPathway: "Hierarchical composites, additive manufacturing, biomimetic assembly, and fiber alignment.",
    pfdSteps: ["Material formulation", "Hierarchical structuring", "Curing/consolidation", "Testing", "Product"],
    inputs: ["Fibers", "Matrix materials", "Structuring process"],
    outputs: ["Lightweight composite", "Performance data"],
    bottlenecks: ["Scalable hierarchy", "Defect control", "Cost"],
    readinessGap: "We can mimic pieces of nature; industrial hierarchy control is the bottleneck.",
    scaleCondition: "Manufacturing must control structure across nano, micro, and macro scales.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Lab-grown organs",
    category: "Medical Tech",
    promise: "Replacement organs grown on demand.",
    realisticPathway: "Stem cells, scaffolds, vascularization, bioreactors, immune compatibility, and quality control.",
    pfdSteps: ["Patient cells", "Differentiation", "Scaffold seeding", "Bioreactor culture", "Maturation/testing"],
    inputs: ["Patient cells", "Growth factors", "Scaffolds"],
    outputs: ["Tissue construct", "QC data"],
    bottlenecks: ["Vascularization", "Functional integration", "Sterility"],
    readinessGap: "Simple tissues are closer; full organs require vascular and functional complexity.",
    scaleCondition: "Organs must mature with perfusion, function, and patient-specific compatibility.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Cultivated meat",
    category: "Bio",
    promise: "Meat without animals.",
    realisticPathway: "Cell lines, growth media, bioreactors, scaffolding, downstream structuring, and food safety.",
    pfdSteps: ["Cell culture", "Proliferation", "Differentiation", "Structuring", "Harvesting/packaging"],
    inputs: ["Cell lines", "Growth media", "Bioreactors"],
    outputs: ["Cultivated meat", "Spent media"],
    bottlenecks: ["Media cost", "Texture", "Bioreactor scale"],
    readinessGap: "Products exist at limited scale; price and structure remain difficult.",
    scaleCondition: "Media, bioreactors, and scaffolds must reach food-scale economics.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Personalized medicine factories",
    category: "Medical Tech",
    promise: "Therapies made specifically for one patient.",
    realisticPathway: "Genomic data, cell processing, automated biomanufacturing, rapid QA, and cold-chain logistics.",
    pfdSteps: ["Patient sample", "Genetic/cellular processing", "Expansion", "Formulation", "QA and treatment"],
    inputs: ["Patient sample", "Genomic data", "Sterile consumables"],
    outputs: ["Personal therapy", "Release data"],
    bottlenecks: ["Cost", "QA speed", "Regulation"],
    readinessGap: "Personalized therapies exist but remain expensive and operationally complex.",
    scaleCondition: "Autologous workflows must become automated, closed, and rapidly releasable.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Neural interfaces",
    category: "Medical Tech",
    promise: "Direct brain-computer communication.",
    realisticPathway: "Implantable electrodes, biocompatible materials, signal processing, wireless power/data, and surgical methods.",
    pfdSteps: ["Neural signal", "Electrode capture", "Signal processing", "Command output", "Feedback"],
    inputs: ["Neural activity", "Implant electrodes", "Decoder models"],
    outputs: ["Digital commands", "Neural feedback"],
    bottlenecks: ["Biocompatibility", "Signal stability", "Surgery risk"],
    readinessGap: "Clinical systems exist for narrow uses; long-term high-bandwidth interfaces are early.",
    scaleCondition: "Interfaces must remain stable and safe for years.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Artificial limbs with touch feedback",
    category: "Medical Tech",
    promise: "Prosthetics that feel natural.",
    realisticPathway: "Sensors, haptics, neural interfaces, lightweight actuators, and adaptive control.",
    pfdSteps: ["User intent", "Signal capture", "Actuator movement", "Sensor feedback", "Neural/haptic response"],
    inputs: ["User signals", "Prosthetic actuators", "Touch sensors"],
    outputs: ["Assisted motion", "Tactile feedback"],
    bottlenecks: ["Interface reliability", "Affordability", "Comfort"],
    readinessGap: "Advanced prototypes work, but cost and fitting complexity limit access.",
    scaleCondition: "Feedback systems must become robust, serviceable, and reimbursable.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Anti-aging therapies",
    category: "Medical Tech",
    promise: "Dramatically extended healthy lifespan.",
    realisticPathway: "Senolytics, gene therapies, regenerative medicine, biomarkers, and controlled trials.",
    pfdSteps: ["Biomarker diagnosis", "Targeted therapy", "Monitoring", "Adjustment", "Long-term outcomes"],
    inputs: ["Patient biomarkers", "Therapeutic agents", "Clinical data"],
    outputs: ["Healthspan outcomes", "Safety data"],
    bottlenecks: ["Biological complexity", "Safety", "Trial duration"],
    readinessGap: "Specific age-related mechanisms are targetable, but broad lifespan extension is unproven.",
    scaleCondition: "Therapies must show durable benefit without unacceptable long-term risk.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Synthetic blood",
    category: "Medical Tech",
    promise: "Universal artificial blood supply.",
    realisticPathway: "Oxygen carriers, hemoglobin engineering, particle stabilization, sterility, and transfusion safety.",
    pfdSteps: ["Hemoglobin/carrier synthesis", "Stabilization", "Purification", "Formulation", "Clinical use"],
    inputs: ["Oxygen carriers", "Stabilizers", "Sterile process"],
    outputs: ["Blood substitute", "Safety data"],
    bottlenecks: ["Safety", "Circulation time", "Side effects"],
    readinessGap: "The need is clear, but oxygen delivery without toxicity is hard.",
    scaleCondition: "Products must oxygenate tissue without triggering vascular or immune harm.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Medical nanobots",
    category: "Medical Tech",
    promise: "Tiny machines repairing the body.",
    realisticPathway: "Targeted nanoparticles, drug delivery vehicles, micro/nanorobots, imaging guidance, and biodegradability.",
    pfdSteps: ["Nanocarrier fabrication", "Targeting functionalization", "Injection", "Navigation/accumulation", "Therapy release"],
    inputs: ["Nanocarriers", "Targeting ligands", "Imaging guidance"],
    outputs: ["Localized therapy", "Clearance products"],
    bottlenecks: ["Control", "Safety", "Clearance"],
    readinessGap: "Targeted delivery exists; autonomous repair robots are still speculative.",
    scaleCondition: "Particles must localize, act, and clear with predictable safety.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Organ-on-chip drug testing",
    category: "Medical Tech",
    promise: "Replacing animal testing with human-like micro-organs.",
    realisticPathway: "Microfluidics, cell culture, sensors, tissue models, and standardized assays.",
    pfdSteps: ["Chip fabrication", "Cell seeding", "Fluid perfusion", "Drug dosing", "Sensor readout"],
    inputs: ["Microfluidic chips", "Human cells", "Drug candidates"],
    outputs: ["Response data", "Toxicity signals"],
    bottlenecks: ["Biological validity", "Standardization", "Throughput"],
    readinessGap: "Useful models exist, but regulatory substitution needs validation.",
    scaleCondition: "Assays must be reproducible across labs and predictive of human outcomes.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Cybernetic implants",
    category: "Medical Tech",
    promise: "Enhanced human capabilities.",
    realisticPathway: "Biocompatible electronics, wireless power, neural/sensor integration, and regulatory approval.",
    pfdSteps: ["Implant fabrication", "Sterilization", "Surgical integration", "Signal/control loop", "Monitoring"],
    inputs: ["Implant hardware", "Power/data link", "Surgical workflow"],
    outputs: ["Enhanced function", "Health monitoring data"],
    bottlenecks: ["Safety", "Ethics", "Long-term reliability"],
    readinessGap: "Medical implants are real; elective enhancement faces technical and ethical barriers.",
    scaleCondition: "Long-term safety and consent frameworks must be stronger than novelty demand.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Quantum computers",
    category: "Computing",
    promise: "Solving impossible computational problems.",
    realisticPathway: "Stable qubits, error correction, cryogenics, control electronics, and scalable fabrication.",
    pfdSteps: ["Qubit fabrication", "Cryogenic operation", "Gate control", "Error correction", "Computation output"],
    inputs: ["Qubits", "Cryogenic systems", "Control electronics"],
    outputs: ["Quantum computation", "Error syndromes"],
    bottlenecks: ["Error rates", "Scaling", "Fabrication yield"],
    readinessGap: "Noisy systems exist; fault-tolerant useful machines need many more reliable qubits.",
    scaleCondition: "Error correction overhead must become manufacturable and economical.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Neuromorphic computing",
    category: "Computing",
    promise: "Brain-like efficient AI hardware.",
    realisticPathway: "Memristors, analog circuits, spiking networks, semiconductor integration, and new software stacks.",
    pfdSteps: ["Device fabrication", "Synaptic array integration", "Training/inference", "Output", "Model update"],
    inputs: ["Memristive devices", "Semiconductor wafers", "AI workloads"],
    outputs: ["Low-power inference", "Device drift data"],
    bottlenecks: ["Manufacturability", "Programming models", "Device variability"],
    readinessGap: "Research chips exist; software and foundry integration lag mainstream hardware.",
    scaleCondition: "Devices must be reliable enough for standard chip manufacturing.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "AI assistants embedded everywhere",
    category: "Computing",
    promise: "Ambient intelligent environments.",
    realisticPathway: "Edge computing, sensors, privacy-preserving AI, energy-efficient chips, and interoperability.",
    pfdSteps: ["Sensor data", "Edge processing", "AI model", "Action/recommendation", "Feedback"],
    inputs: ["Sensors", "Edge chips", "User context"],
    outputs: ["Actions", "Recommendations", "Audit logs"],
    bottlenecks: ["Privacy", "Trust", "Energy and standards"],
    readinessGap: "Assistants are widespread, but safe ambient integration needs governance.",
    scaleCondition: "Systems must be useful while minimizing surveillance and failure risk.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Fully immersive VR worlds",
    category: "Computing",
    promise: "Realistic alternate realities.",
    realisticPathway: "Displays, optics, haptics, low-latency rendering, spatial audio, and motion tracking.",
    pfdSteps: ["User tracking", "Rendering engine", "Display/haptics/audio", "Sensory feedback", "Session adaptation"],
    inputs: ["Headset sensors", "Graphics compute", "Haptic devices"],
    outputs: ["Immersive experience", "Motion data"],
    bottlenecks: ["Comfort", "Realism", "Latency"],
    readinessGap: "VR is real, but full-body realism and long-duration comfort remain limited.",
    scaleCondition: "Hardware must become lighter, lower-latency, and socially acceptable.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Augmented reality cities",
    category: "Computing",
    promise: "Digital information overlaid on the physical city.",
    realisticPathway: "AR glasses, mapping, localization, edge computing, visual interfaces, and safety standards.",
    pfdSteps: ["Spatial map", "User localization", "Content rendering", "Display overlay", "Interaction"],
    inputs: ["City maps", "Wearables", "Edge compute"],
    outputs: ["Context overlays", "Interaction data"],
    bottlenecks: ["Wearable hardware", "Social acceptance", "Safety"],
    readinessGap: "AR works on phones and some headsets; everyday city use needs better hardware.",
    scaleCondition: "Glasses must be useful, comfortable, private, and safe in public.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Universal real-time translation",
    category: "Computing",
    promise: "Language barriers disappearing.",
    realisticPathway: "Speech recognition, neural translation, low-latency inference, context modeling, and wearable devices.",
    pfdSteps: ["Speech input", "Recognition", "Translation model", "Speech synthesis", "User output"],
    inputs: ["Audio", "Language models", "Device compute"],
    outputs: ["Translated speech", "Transcripts"],
    bottlenecks: ["Nuance", "Latency", "Privacy"],
    readinessGap: "Translation is powerful but still fails in culture, domain, and noisy context.",
    scaleCondition: "Systems must preserve meaning, privacy, and timing in real conversations.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Autonomous scientific discovery",
    category: "Computing",
    promise: "AI labs discovering new materials and drugs.",
    realisticPathway: "Robotic labs, high-throughput experiments, active learning, simulation, and automated characterization.",
    pfdSteps: ["Hypothesis generation", "Robotic experiment", "Characterization", "Model update", "Next experiment"],
    inputs: ["Hypotheses", "Robotic lab", "Characterization tools"],
    outputs: ["Candidate materials or drugs", "Experimental data"],
    bottlenecks: ["Physical-world data quality", "Transferability", "Automation scope"],
    readinessGap: "Closed-loop labs work in focused domains; general discovery remains human-guided.",
    scaleCondition: "Automation must produce trustworthy data faster than human-led iteration.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Digital immortality / mind archives",
    category: "Computing",
    promise: "Preserving a person digitally.",
    realisticPathway: "Data capture, personal AI models, memory archives, behavior modeling, and ethical boundaries.",
    pfdSteps: ["Personal data", "Model training", "Behavior simulation", "Interaction engine", "Archive interface"],
    inputs: ["Personal records", "Voice/video/data", "AI models"],
    outputs: ["Interactive archive", "Consent records"],
    bottlenecks: ["Identity", "Consent", "Fidelity and ethics"],
    readinessGap: "AI likenesses are possible; personhood and continuity are not engineering claims.",
    scaleCondition: "Consent, provenance, and limits must be explicit before systems are trusted.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Lunar oxygen production",
    category: "Space",
    promise: "Moon bases making their own oxygen.",
    realisticPathway: "Regolith processing, molten electrolysis or reduction chemistry, oxygen separation, and storage.",
    pfdSteps: ["Regolith mining", "Chemical reduction/electrolysis", "Oxygen separation", "Liquefaction/storage", "Habitat or propellant use"],
    inputs: ["Lunar regolith", "Power", "Reactors"],
    outputs: ["Oxygen", "Metal-rich residue"],
    bottlenecks: ["Dust handling", "Energy supply", "Autonomous maintenance"],
    readinessGap: "The chemistry is plausible; lunar industrial operation is unproven.",
    scaleCondition: "Systems must run through dust, thermal cycling, and limited maintenance.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Mars fuel production",
    category: "Space",
    promise: "Making rocket fuel on Mars.",
    realisticPathway: "Atmospheric CO2 capture, water mining, electrolysis, Sabatier reaction, and methane/oxygen liquefaction.",
    pfdSteps: ["CO2 and water", "Electrolysis", "Sabatier reactor", "Methane/oxygen storage", "Vehicle fueling"],
    inputs: ["Martian CO2", "Water ice", "Power"],
    outputs: ["Methane", "Oxygen", "Water recycle"],
    bottlenecks: ["Autonomous reliability", "Water access", "Power"],
    readinessGap: "Subscale oxygen production was demonstrated; full propellant plants remain future systems.",
    scaleCondition: "Plants must produce and store propellant before crew arrival without repair crews.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Closed-loop life support",
    category: "Space",
    promise: "Self-sustaining habitats.",
    realisticPathway: "Water recycling, air revitalization, food growth, waste processing, and microbial control.",
    pfdSteps: ["Human waste/CO2", "Recovery systems", "Water/oxygen/food", "Habitat loop", "Monitoring"],
    inputs: ["Crew waste", "CO2", "Power and consumables"],
    outputs: ["Water", "Oxygen", "Food or biomass"],
    bottlenecks: ["Reliability", "Biological control", "Trace contaminants"],
    readinessGap: "ISS systems recover much, but fully closed long-duration loops are not solved.",
    scaleCondition: "Loops must tolerate failures and microbial shifts for years.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Space habitats",
    category: "Space",
    promise: "Orbiting cities.",
    realisticPathway: "Modular structures, radiation shielding, closed-loop systems, artificial gravity concepts, and orbital logistics.",
    pfdSteps: ["Module fabrication", "Launch/assembly", "Life-support integration", "Shielding", "Operations"],
    inputs: ["Habitat modules", "Launch capacity", "Life-support systems"],
    outputs: ["Habitable volume", "Waste streams", "Operational data"],
    bottlenecks: ["Launch mass", "Closed-loop reliability", "Radiation"],
    readinessGap: "Stations exist; city-scale habitats need cheaper logistics and robust loops.",
    scaleCondition: "Launch and maintenance costs must fall while life support becomes highly reliable.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Asteroid mining",
    category: "Space",
    promise: "Metals mined from space.",
    realisticPathway: "Prospecting, robotic capture or mining, in-space processing, material transport, and market development.",
    pfdSteps: ["Asteroid survey", "Extraction", "Beneficiation", "Refining", "Transport/use"],
    inputs: ["Target asteroid", "Mining robots", "Processing power"],
    outputs: ["Metals or volatiles", "In-space feedstocks"],
    bottlenecks: ["Economics", "Autonomous mining", "Transport"],
    readinessGap: "Prospecting is possible; profitable extraction is not yet demonstrated.",
    scaleCondition: "In-space demand must justify extraction before Earth-return economics do.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Orbital manufacturing",
    category: "Space",
    promise: "Products made better in microgravity.",
    realisticPathway: "Autonomous manufacturing platforms, feedstock launch, in-space process control, and return logistics.",
    pfdSteps: ["Feedstock launch", "Microgravity processing", "Inspection", "Return or orbital use", "Learning loop"],
    inputs: ["Feedstock", "Orbital platform", "Power"],
    outputs: ["Microgravity products", "Inspection data"],
    bottlenecks: ["Market demand", "Process control", "Return logistics"],
    readinessGap: "Experiments are real; commercial demand and repeatability are uncertain.",
    scaleCondition: "Microgravity must create a product valuable enough to pay for logistics.",
    processQuestion: PROCESS_QUESTIONS.cost
  }),
  t({
    name: "Space elevators",
    category: "Space",
    promise: "Cheap access to orbit via cable.",
    realisticPathway: "Ultra-strong materials, orbital dynamics, climber power systems, and anchor infrastructure.",
    pfdSteps: ["Cable material production", "Deployment", "Climber operation", "Orbital transfer", "Maintenance"],
    inputs: ["Ultra-strong cable", "Anchor station", "Climbers"],
    outputs: ["Payload to orbit", "Cable stress data"],
    bottlenecks: ["Material strength", "Deployment risk", "Debris impacts"],
    readinessGap: "Required cable performance is beyond current manufacturable materials.",
    scaleCondition: "Materials must achieve enormous specific strength at practical length and reliability.",
    processQuestion: PROCESS_QUESTIONS.material
  }),
  t({
    name: "Terraforming concepts",
    category: "Space",
    promise: "Transforming planets into Earth-like worlds.",
    realisticPathway: "Currently speculative; would require planetary-scale atmospheric engineering, energy input, volatile management, biology, and thousands of years.",
    pfdSteps: ["Resource assessment", "Atmospheric modification", "Thermal control", "Water cycling", "Biosphere introduction"],
    inputs: ["Planetary volatiles", "Massive energy", "Long-term governance"],
    outputs: ["Altered climate", "Ecological risk"],
    bottlenecks: ["Scale", "Ethics", "Time and energy"],
    readinessGap: "This is planetary engineering speculation, not near-term infrastructure.",
    scaleCondition: "Societies would need energy, ethics, and time horizons far beyond current projects.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  }),
  t({
    name: "Replicator-like food machines",
    category: "Manufacturing",
    promise: "Food generated on demand.",
    realisticPathway: "Ingredient cartridges, 3D food printing, flavor chemistry, texture engineering, and heating/cooling modules.",
    pfdSteps: ["Ingredient storage", "Dosing/mixing", "Structuring/printing", "Cooking", "Serving"],
    inputs: ["Ingredient cartridges", "Water", "Heat"],
    outputs: ["Prepared food", "Spent cartridges"],
    bottlenecks: ["Texture", "Ingredient stability", "Cost"],
    readinessGap: "Food printers exist, but broad culinary replacement is not close.",
    scaleCondition: "Cartridge logistics and texture control must beat conventional cooking convenience.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Household recycling machines",
    category: "Manufacturing",
    promise: "Homes converting waste into usable material.",
    realisticPathway: "Sorting, shredding, washing, polymer identification, extrusion, and safety systems.",
    pfdSteps: ["Waste input", "Sorting", "Cleaning", "Shredding", "Pellet/filament output"],
    inputs: ["Household waste", "Water", "Small extruder"],
    outputs: ["Pellets or filament", "Rejects"],
    bottlenecks: ["Contamination", "Energy use", "Safety"],
    readinessGap: "Small recyclers exist, but household waste streams are too messy for reliable products.",
    scaleCondition: "Input sorting must become simple enough for non-experts.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Smart mirrors / health rooms",
    category: "Medical Tech",
    promise: "Bathrooms that monitor health daily.",
    realisticPathway: "Optical sensors, biosensors, AI interpretation, and privacy-preserving data systems.",
    pfdSteps: ["User scan/sample", "Sensor readout", "AI analysis", "Health feedback", "Clinical escalation"],
    inputs: ["Images", "Vitals or samples", "AI models"],
    outputs: ["Health insights", "Trend data"],
    bottlenecks: ["Accuracy", "Privacy", "Regulation"],
    readinessGap: "Consumer sensors are common, but clinical-grade home interpretation is limited.",
    scaleCondition: "Measurements must be accurate enough to help without overdiagnosis.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Personal air filtration bubbles",
    category: "Medical Tech",
    promise: "Clean-air zones around individuals.",
    realisticPathway: "Wearable filtration, airflow control, low-noise fans, sensors, and battery systems.",
    pfdSteps: ["Ambient air", "Filtration", "Directed flow", "Breathing zone", "Sensor feedback"],
    inputs: ["Ambient air", "Filters", "Battery power"],
    outputs: ["Cleaner breathing zone", "Used filters"],
    bottlenecks: ["Comfort", "Battery", "Effectiveness"],
    readinessGap: "Wearable filtration is possible, but invisible protective bubbles are airflow-hard.",
    scaleCondition: "Airflow must protect users without noise, bulk, or high power.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Home robots",
    category: "Robotics",
    promise: "Robot assistants doing chores.",
    realisticPathway: "Manipulation, perception, navigation, low-cost actuators, and safe human-robot interaction.",
    pfdSteps: ["Task recognition", "Motion planning", "Manipulation", "Feedback", "Task completion"],
    inputs: ["Home environment", "Robot hardware", "Task model"],
    outputs: ["Completed chores", "Learning data"],
    bottlenecks: ["Dexterity", "Reliability", "Cost"],
    readinessGap: "Vacuuming is solved; general household manipulation is not.",
    scaleCondition: "Robots must handle messy homes with low failure rates and safe behavior.",
    processQuestion: PROCESS_QUESTIONS.scale
  }),
  t({
    name: "Universal fabrication appliances",
    category: "Manufacturing",
    promise: "Households making objects on demand.",
    realisticPathway: "Multi-material 3D printing, tool-changing robotics, digital part libraries, and recycling feedstock.",
    pfdSteps: ["Digital design", "Material selection", "Fabrication", "Finishing", "Recycling"],
    inputs: ["Design files", "Material cartridges", "Fabrication tools"],
    outputs: ["Household objects", "Scrap recycle"],
    bottlenecks: ["Materials variety", "Safety", "Precision"],
    readinessGap: "3D printers are useful, but universal object fabrication needs more materials and finishing.",
    scaleCondition: "Appliances must make safe, precise parts from standardized materials.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Personal climate-control clothing",
    category: "Materials",
    promise: "Clothing that heats or cools the body.",
    realisticPathway: "Phase-change materials, thermoelectrics, microfluidics, flexible batteries, and smart textiles.",
    pfdSteps: ["Body/temp sensing", "Thermal module response", "Heat transfer", "Comfort control", "Recharge/reset"],
    inputs: ["Smart textile", "Battery", "Thermal materials"],
    outputs: ["Comfort control", "Heat rejection"],
    bottlenecks: ["Battery life", "Comfort", "Washability"],
    readinessGap: "Heated apparel exists; active cooling in soft clothing is harder.",
    scaleCondition: "Thermal systems must be light, washable, quiet, and energy-efficient.",
    processQuestion: PROCESS_QUESTIONS.quality
  }),
  t({
    name: "Adaptive furniture / shape-changing rooms",
    category: "Robotics",
    promise: "Rooms reconfiguring themselves.",
    realisticPathway: "Modular robotics, soft actuators, embedded rails, sensors, and control systems.",
    pfdSteps: ["User input", "Spatial planning", "Actuator control", "Furniture movement", "Safety check"],
    inputs: ["Room map", "Actuated furniture", "Sensors"],
    outputs: ["Reconfigured space", "Safety state"],
    bottlenecks: ["Cost", "Safety", "Mechanical reliability"],
    readinessGap: "Transforming furniture exists; autonomous whole-room reconfiguration is niche.",
    scaleCondition: "Moving modules must be quiet, safe, durable, and worth the floor-space tradeoff.",
    processQuestion: PROCESS_QUESTIONS.manufacturable
  }),
  t({
    name: "Personal drone assistants",
    category: "Robotics",
    promise: "Small drones that follow and help users.",
    realisticPathway: "Lightweight batteries, perception, autonomy, noise reduction, safety cages, and regulations.",
    pfdSteps: ["User command", "Flight planning", "Task execution", "Charging dock", "Maintenance"],
    inputs: ["User commands", "Drone hardware", "Battery"],
    outputs: ["Aerial assistance", "Flight data"],
    bottlenecks: ["Safety", "Noise", "Regulation"],
    readinessGap: "Drones are capable, but indoor/public personal use faces safety and nuisance barriers.",
    scaleCondition: "Drones must become quiet, collision-safe, and legally acceptable around people.",
    processQuestion: PROCESS_QUESTIONS.infrastructure
  })
];

const SECTOR_META = {
  "Clean Energy Civilization": {
    code: "A",
    color: "#d97706",
    thesis: "Power, fuels, storage, and grids that make future infrastructure energetically possible."
  },
  "Carbon and Atmospheric Engineering": {
    code: "B",
    color: "#0f172a",
    thesis: "CO2, methane, heat, and atmospheric chemistry converted into managed industrial streams."
  },
  "Future Water Systems": {
    code: "C",
    color: "#0891b2",
    thesis: "Water capture, purification, reuse, contaminant destruction, and mineral recovery loops."
  },
  "Future Materials and Smart Surfaces": {
    code: "D",
    color: "#7c3aed",
    thesis: "Functional materials, membranes, coatings, composites, glass, and adaptive surfaces."
  },
  "Advanced Manufacturing and Microfactories": {
    code: "E",
    color: "#7d5cff",
    thesis: "Factories, fabs, skids, printed systems, robotic production, and autonomous process development."
  },
  "Future Cities and Built Environments": {
    code: "F",
    color: "#059669",
    thesis: "Buildings, districts, waste, logistics, heat, food, and urban operating systems."
  },
  "Transportation and Mobility": {
    code: "G",
    color: "#bdb5ff",
    thesis: "Aircraft, roads, rail, shipping, charging, fuels, and city mobility infrastructure."
  },
  "Biomanufacturing, Medicine, and Human Augmentation": {
    code: "H",
    color: "#f3bfdc",
    thesis: "Cells, therapies, organs, cultivated food, biosensors, and controlled biological production."
  },
  "Computing, Semiconductors, and Ambient Intelligence": {
    code: "I",
    color: "#76f1ff",
    thesis: "Chips, displays, AI infrastructure, quantum systems, sensors, and scientific automation."
  },
  "Space and Off-World Industry": {
    code: "J",
    color: "#050507",
    thesis: "ISRU, habitats, orbital manufacturing, life support, and autonomous off-world plants."
  }
};

const MASTER_STACK = [
  {
    title: "Planetary / local resources",
    detail: "Air, water, minerals, biomass, waste, sunlight, CO2, industrial heat",
    tags: ["Resources", "Feedstocks", "Waste streams"]
  },
  {
    title: "Primary conversion systems",
    detail: "Electrolysis, air separation, mining, refining, fermentation, capture, purification",
    tags: ["Conversion", "Purification", "Capture"]
  },
  {
    title: "Platform chemicals + materials",
    detail: "H2, NH3, methanol, syngas, silicon, lithium salts, polymers, metals, CO2, O2, N2",
    tags: ["Intermediates", "Bulk materials", "Energy carriers"]
  },
  {
    title: "Advanced materials + devices",
    detail: "Batteries, smart glass, membranes, sensors, catalysts, chips, coatings, composites",
    tags: ["Devices", "Materials", "Performance"]
  },
  {
    title: "Manufacturing systems",
    detail: "Fabs, microfactories, bioreactors, additive manufacturing, roll-to-roll lines, modular plants",
    tags: ["MRL", "Yield", "Quality"]
  },
  {
    title: "Infrastructure systems",
    detail: "Grids, water loops, hydrogen networks, smart buildings, transit, data centers, circular waste",
    tags: ["Deployment", "Maintenance", "Safety"]
  },
  {
    title: "Future worlds",
    detail: "Clean cities, autonomous factories, resilient neighborhoods, space habitats, carbon-negative infrastructure",
    tags: ["Cities", "Industry", "Off-world"]
  },
  {
    title: "Feedback loops",
    detail: "Recycling, data, quality control, reliability testing, process optimization, policy, economics",
    tags: ["Learning", "Controls", "Scale"]
  }
];

function chem(name, formula, role, madeFrom, processPathway, enables, bottlenecks, unitOperations) {
  return { name, formula, role, madeFrom, processPathway, enables, bottlenecks, unitOperations, relatedTechnologies: [] };
}

const CHEMICAL_SPINE = [
  chem("Hydrogen", "H2", "Energy carrier for steel, ammonia, synthetic fuels, aircraft, fuel cells, and propellant.", "Water electrolysis or methane reforming/pyrolysis", ["Water feed", "Electrolysis", "Purification", "Compression/liquefaction", "Distribution"], ["Green hydrogen cities", "Green ammonia fuel", "Low-carbon steel", "Synthetic fuel from air and water"], ["Clean electricity cost", "Storage density", "Leakage and safety"], ["Electrolysis", "Compression", "Liquefaction"]),
  chem("Carbon dioxide", "CO2", "Carbon feedstock and climate liability that links capture, fuels, plastics, concrete, and storage.", "Air, flue gas, fermentation, mineral processes", ["Capture", "Regeneration", "Purification", "Compression", "Use or storage"], ["Direct air capture cities", "Synthetic fuel from air and water", "Carbon-negative concrete", "Mars fuel production"], ["Low concentration", "Energy penalty", "Storage verification"], ["Adsorption", "Absorption", "Compression"]),
  chem("Ammonia", "NH3", "Hydrogen carrier, fertilizer backbone, and possible carbon-free shipping fuel.", "Nitrogen plus hydrogen", ["Air separation", "Hydrogen production", "Synthesis", "Storage", "Distribution"], ["Green ammonia fuel", "City-scale nutrient recovery", "Ammonia shipping"], ["Toxicity", "NOx control", "Infrastructure"], ["Air separation", "Catalysis", "Compression"]),
  chem("Methanol", "CH3OH", "Platform molecule for synthetic fuels, chemicals, solvents, and CO2 utilization.", "Syngas or CO2 plus hydrogen", ["Feed cleanup", "Catalytic synthesis", "Separation", "Storage"], ["Synthetic fuel from air and water", "CO2-to-methanol", "Carbon-negative plastics"], ["Hydrogen cost", "Catalyst selectivity", "Product separation"], ["Catalysis", "Distillation", "Heat exchange"]),
  chem("Methane", "CH4", "Fuel, hydrogen feedstock, and Sabatier product for off-world propellant.", "Natural gas, biogas, or CO2 hydrogenation", ["Gas cleanup", "Conversion", "Separation", "Storage"], ["Methane pyrolysis for clean hydrogen", "Mars fuel production", "Thermal batteries"], ["Fugitive emissions", "Carbon handling", "Reactor fouling"], ["Pyrolysis", "Gas separation", "Compression"]),
  chem("Syngas", "CO + H2", "Flexible intermediate for methanol, Fischer-Tropsch fuels, and chemical synthesis.", "Gasification, reforming, or CO2 conversion", ["Feed prep", "Gasification/reforming", "Shift/control", "Cleanup", "Synthesis"], ["Synthetic fuels", "Methanol", "Carbon-derived plastics"], ["Tar/impurity cleanup", "Ratio control", "Capital cost"], ["Gasification", "Catalysis", "Absorption"]),
  chem("Oxygen", "O2", "Oxidant for life support, combustion, medical systems, and off-world propellant.", "Air separation, electrolysis, regolith processing", ["Separation/generation", "Drying", "Compression", "Storage"], ["Lunar oxygen production", "Mars fuel production", "Closed-loop life support"], ["Energy supply", "Purity", "Cryogenic storage"], ["Air separation", "Electrolysis", "Liquefaction"]),
  chem("Nitrogen", "N2", "Inerting gas, ammonia feedstock, semiconductor utility, and habitat atmosphere component.", "Air separation", ["Air intake", "Separation", "Purification", "Compression"], ["Green ammonia fuel", "Semiconductor fabs", "Space habitats"], ["Purity", "Power demand", "Distribution"], ["Air separation", "Membrane separation", "Compression"]),
  chem("Water", "H2O", "Universal solvent, coolant, feedstock, cleaning medium, and life-support loop material.", "Surface water, seawater, air, wastewater, ice", ["Intake", "Treatment", "Polishing", "Reuse", "Discharge"], ["Desalination megastructures", "Wastewater-to-drinking-water systems", "Green hydrogen cities"], ["Scarcity", "Purity requirements", "Brine/waste handling"], ["Filtration", "Membrane separation", "Wastewater treatment"]),
  chem("Sulfuric acid", "H2SO4", "Industrial acid for mining, batteries, fertilizers, and hydrometallurgical extraction.", "Sulfur or sulfide processing", ["Sulfur burning", "SO2 conversion", "Absorption", "Distribution"], ["Battery materials", "Brine mining", "Hydrometallurgy"], ["Corrosion", "Sulfur supply", "Waste acid management"], ["Absorption", "Catalysis", "Leaching"]),
  chem("Sodium hydroxide", "NaOH", "Base for mineralization, water treatment, chemical recycling, and pH control.", "Chlor-alkali electrolysis", ["Brine prep", "Electrolysis", "Separation", "Storage"], ["Carbon-negative concrete", "PFAS destruction systems", "Wastewater treatment"], ["Electricity cost", "Caustic handling", "Chlorine co-product balance"], ["Electrolysis", "Ion exchange", "Precipitation"]),
  chem("Chlorine", "Cl2", "Reactive intermediate for polymers, water disinfection, electronics, and chemical synthesis.", "Chlor-alkali electrolysis", ["Brine prep", "Electrolysis", "Drying", "Use/storage"], ["Water systems", "Semiconductor processing", "Polymer production"], ["Toxicity", "Transport risk", "Demand coupling with caustic"], ["Electrolysis", "Drying", "Absorption"]),
  chem("Silicon", "Si", "Semiconductor and solar backbone for chips, sensors, photovoltaics, and power electronics.", "Quartz reduction and purification", ["Quartz reduction", "Purification", "Crystal growth", "Wafering"], ["Lights-out semiconductor fabs", "Transparent solar windows", "Perovskite/silicon solar"], ["Purity", "Energy intensity", "Fab yield"], ["Crystallization", "Chemical vapor deposition", "Lithography"]),
  chem("Lithium", "Li", "Battery metal for EVs, grid storage, aircraft, drones, and portable future systems.", "Brines, hard rock, clay, recycling", ["Extraction", "Concentration", "Purification", "Conversion", "Cathode/electrolyte use"], ["Grid-scale flow batteries", "Electric aviation", "Wireless road charging"], ["Resource concentration", "Water use", "Refining capacity"], ["Leaching", "Crystallization", "Ion exchange"]),
  chem("Sodium", "Na", "Low-cost battery and chemical platform for storage, caustic, salts, and heat-transfer systems.", "Salt/brine processing", ["Salt purification", "Electrochemical conversion", "Material formulation"], ["Thermal batteries", "Sodium-ion storage", "Chemical production"], ["Energy cost", "Moisture sensitivity", "Material performance"], ["Electrochemical separation", "Drying", "Crystallization"]),
  chem("Nickel", "Ni", "Battery, catalyst, alloy, and high-temperature material for electrified industry.", "Sulfide/laterite ores or recycling", ["Mining", "Leaching/smelting", "Refining", "Precursor production"], ["Electric aviation", "Thermal batteries", "Hydrogen systems"], ["Ore quality", "Processing emissions", "Price volatility"], ["Hydrometallurgy", "Leaching", "Precipitation"]),
  chem("Cobalt", "Co", "Battery and catalyst material where performance competes with supply-chain risk.", "Copper/nickel byproduct mining and recycling", ["Ore processing", "Separation", "Refining", "Cathode precursor"], ["High-energy batteries", "Wearables", "Electric aircraft"], ["Ethical sourcing", "Price volatility", "Recycling"], ["Hydrometallurgy", "Ion exchange", "Precipitation"]),
  chem("Manganese", "Mn", "Battery, steel, and catalyst element for lower-cost energy materials.", "Manganese ores and recycling", ["Ore concentration", "Leaching", "Purification", "Precursor production"], ["Batteries", "Low-carbon steel", "Catalysts"], ["Purity", "Processing waste", "Market scale"], ["Leaching", "Crystallization", "Precipitation"]),
  chem("Copper", "Cu", "Electrical metal for grids, motors, charging, data centers, and thermal systems.", "Ore mining, smelting, solvent extraction/electrowinning, recycling", ["Mining", "Concentration", "Refining", "Wire/foil production"], ["Smart grids", "Wireless road charging", "Data centers"], ["Ore grade decline", "Permitting", "Recycling quality"], ["Flotation", "Leaching", "Electrochemical separation"]),
  chem("Aluminum", "Al", "Lightweight structural and conductive metal for aircraft, buildings, grids, and space systems.", "Bauxite to alumina to electrolytic aluminum", ["Bayer process", "Electrolysis", "Casting", "Forming"], ["Electric aviation", "Space habitats", "Smart buildings"], ["Electricity demand", "Red mud", "Recycling alloys"], ["Calcination", "Electrolysis", "Casting"]),
  chem("Rare earth elements", "REE", "Magnet and optical materials for motors, wind, robotics, displays, and sensors.", "Mineral concentrates and recycling", ["Mining", "Leaching", "Solvent extraction", "Separation", "Metal/alloy production"], ["eVTOL aircraft", "Home robots", "Maglev trains"], ["Separation complexity", "Geographic concentration", "Waste streams"], ["Leaching", "Solvent extraction", "Crystallization"]),
  chem("Graphite", "C", "Battery anode, thermal, electrical, and carbon composite material.", "Natural graphite, synthetic coke routes, recycling", ["Purification", "Spheronization", "Coating", "Anode production"], ["Batteries", "Graphene membranes", "Carbon nanotube fibers"], ["Purity", "Energy intensity", "Supply concentration"], ["Coating", "Sintering", "Purification"]),
  chem("Cement/concrete chemistries", "Ca-Si-Al hydrates", "Structural chemistry for carbon-negative buildings, self-healing concrete, and urban materials.", "Limestone, clays, supplementary cementitious materials, CO2 mineralization", ["Calcination", "Blending", "Hydration", "Curing", "Testing"], ["Carbon-negative concrete", "Self-healing concrete", "3D-printed buildings"], ["CO2 emissions", "Strength certification", "Durability"], ["Calcination", "Curing", "Mineralization"]),
  chem("Polymers", "various", "Structural, flexible, electronic, membrane, and self-healing materials.", "Fossil, biomass, or CO2-derived monomers", ["Monomer synthesis", "Polymerization", "Compounding", "Forming", "Recycling"], ["Carbon-negative plastics", "Smart clothing", "Self-healing polymers"], ["Performance parity", "Recycling", "Additive compatibility"], ["Polymerization", "Extrusion", "Solvent recovery"]),
  chem("Conductive inks", "Ag/Cu/C/polymer", "Printed electronics material for roll-to-roll devices and micromodular circuits.", "Metal particles, carbon materials, polymers, solvents", ["Ink formulation", "Printing", "Drying", "Sintering", "Inspection"], ["Roll-to-roll printed electronics", "Micromodular printed electronics", "Smart clothing"], ["Viscosity control", "Sintering temperature", "Defect density"], ["Coating", "Drying", "Sintering"]),
  chem("Photoresists", "polymer systems", "Pattern-transfer chemistry for semiconductor, display, sensor, and photonic manufacturing.", "Specialty polymers, solvents, photoactive compounds", ["Coating", "Exposure", "Development", "Etch transfer", "Stripping"], ["Lights-out semiconductor fabs", "Photonic computing", "Transparent displays"], ["Resolution", "Defectivity", "Chemical purity"], ["Lithography", "Coating", "Solvent recovery"]),
  chem("Solvents", "various", "Cleaning, synthesis, coating, extraction, and purification media.", "Petrochemical, bio-based, or recycled streams", ["Sourcing", "Use", "Recovery", "Purification", "Reuse"], ["Pharmaceutical factories", "Printed electronics", "Chemical recycling"], ["VOC control", "Purity", "Recovery energy"], ["Distillation", "Solvent recovery", "Drying"]),
  chem("Electrolytes", "salts + solvents", "Ion-transport media for batteries, electrolyzers, fuel cells, and sensors.", "Salts, solvents, polymers, additives", ["Salt purification", "Mixing", "Drying", "Filling", "Sealing"], ["Flow batteries", "Green hydrogen cities", "Smart glass buildings"], ["Stability", "Membrane compatibility", "Purity"], ["Drying", "Filtration", "Electrochemical separation"]),
  chem("Sorbents", "MOFs/amines/zeolites", "Selective capture materials for CO2, water, contaminants, and gases.", "Porous solids, amines, polymers, minerals", ["Synthesis", "Shaping", "Contacting", "Regeneration", "Replacement"], ["Direct air capture cities", "Atmospheric water harvesting", "PFAS destruction systems"], ["Degradation", "Selectivity", "Regeneration energy"], ["Adsorption", "Drying", "Heat exchange"]),
  chem("Membranes", "polymer/ceramic/graphene", "Selective barriers for water, gases, ions, chips, and bioprocessing.", "Polymers, ceramics, graphene, supports", ["Casting/growth", "Pore control", "Module assembly", "Cleaning", "Replacement"], ["Desalination megastructures", "Graphene membranes", "Wastewater-to-drinking-water systems"], ["Fouling", "Defects", "Pressure drop"], ["Membrane separation", "Filtration", "Coating"]),
  chem("Catalysts", "metals/enzymes/oxides", "Kinetic enablers for fuels, hydrogen, chemicals, plastics, and environmental systems.", "Metals, supports, enzymes, oxides", ["Synthesis", "Activation", "Reaction", "Regeneration", "Recovery"], ["Artificial photosynthesis", "Synthetic fuels", "Methane pyrolysis"], ["Lifetime", "Selectivity", "Poisoning"], ["Catalysis", "Calcination", "Filtration"]),
  chem("Biomass-derived feedstocks", "bio-carbon", "Renewable carbon source for fermentation, fuels, polymers, nutrients, and biochar.", "Crops, residues, algae, waste biomass", ["Collection", "Pretreatment", "Conversion", "Purification", "Residue handling"], ["Modular biomanufacturing", "Cultivated meat", "Carbon-negative plastics"], ["Land use", "Variability", "Downstream cost"], ["Fermentation", "Gasification", "Filtration"])
];

function op(name, description, scaleChallenge) {
  return { name, description, appearsIn: [], scaleChallenge };
}

const UNIT_OPERATIONS = [
  op("Electrolysis", "Uses electricity to split or transform chemical species.", "Cost and lifetime depend on power price, catalysts, membranes, and operating current density."),
  op("Catalysis", "Accelerates chemical conversion through engineered active sites.", "Selectivity, poisoning, heat management, and catalyst lifetime control economics."),
  op("Adsorption", "Captures molecules on selective solid surfaces.", "Capacity, regeneration energy, humidity, and degradation often dominate scale-up."),
  op("Absorption", "Transfers gases into liquids for capture or reaction.", "Solvent loss, heat duty, corrosion, and mass transfer determine viability."),
  op("Distillation", "Separates liquids by volatility.", "Energy intensity and azeotropes can dominate process cost."),
  op("Crystallization", "Forms purified solids from solution or melt.", "Nucleation control, impurity rejection, and particle handling are hard to scale."),
  op("Membrane separation", "Separates by size, charge, solubility, or diffusivity.", "Fouling, defects, pressure drop, and module sealing decide reliability."),
  op("Filtration", "Removes particles, cells, or solids from fluids.", "Cake formation, cleaning cycles, and variable feeds limit uptime."),
  op("Drying", "Removes solvent or water from solids, films, gases, or products.", "Energy use, cracking, residual solvent, and throughput set constraints."),
  op("Calcination", "Thermally decomposes or activates solids.", "High-temperature heat, emissions, and solid residence time matter."),
  op("Pyrolysis", "Thermally decomposes feedstocks without oxygen.", "Reactor fouling, heat transfer, and product handling are scale risks."),
  op("Gasification", "Converts carbonaceous feedstocks into synthesis gas.", "Feed variability, tar control, and gas cleanup dominate complexity."),
  op("Fermentation", "Uses organisms or enzymes to convert feedstocks.", "Contamination, oxygen transfer, sterility, and downstream recovery drive cost."),
  op("Polymerization", "Links monomers into polymers.", "Heat removal, molecular weight control, and residual monomer limits matter."),
  op("Lithography", "Patterns materials for chips and microdevices.", "Resolution, overlay, particle defects, and photoresist chemistry set yield."),
  op("Chemical vapor deposition", "Deposits thin films from vapor-phase chemistry.", "Uniformity, precursor purity, and tool uptime control device quality."),
  op("Physical vapor deposition", "Deposits films by sputtering or evaporation.", "Film stress, adhesion, and uniformity limit scale."),
  op("Atomic layer deposition", "Deposits ultrathin conformal layers by sequential surface reactions.", "Cycle time, precursor cost, and defect density matter."),
  op("Coating", "Applies functional layers to substrates.", "Uniformity, adhesion, drying, and inline inspection define manufacturability."),
  op("Curing", "Sets a material through heat, light, moisture, or chemical reaction.", "Incomplete cure, shrinkage, and durability define quality."),
  op("Sintering", "Densifies particles with heat or light.", "Temperature compatibility, shrinkage, and conductivity control device performance."),
  op("Annealing", "Thermally treats materials to improve structure or properties.", "Thermal budgets, atmosphere, and stress control matter."),
  op("Extrusion", "Forces material through a die to form continuous products.", "Rheology, die swell, cooling, and additive dispersion set quality."),
  op("Compression", "Raises gas pressure for storage, reaction, or transport.", "Energy use, leakage, heat rejection, and safety shape design."),
  op("Liquefaction", "Converts gases into cryogenic liquids.", "Energy penalty, boiloff, insulation, and safety dominate deployment."),
  op("Heat exchange", "Transfers heat between streams or storage media.", "Fouling, pinch temperature, materials, and integration determine performance."),
  op("Combustion", "Releases heat through oxidation.", "Emissions, flame stability, NOx, and safety constrain future fuels."),
  op("Plasma processing", "Uses ionized gas for conversion, etching, or destruction.", "Power efficiency, electrode life, and scale-up uniformity are key."),
  op("Sterilization", "Destroys microbes for medical and bioprocess systems.", "Material compatibility, validation, and sterility assurance constrain operations."),
  op("Solvent recovery", "Recovers and purifies solvent for reuse.", "Energy use, water content, impurities, and VOC control drive design."),
  op("Wastewater treatment", "Removes organics, nutrients, pathogens, and trace contaminants.", "Variable feeds, monitoring, sludge, and failure safety matter."),
  op("Air separation", "Separates air into nitrogen, oxygen, argon, or other streams.", "Power demand, purity, and integration determine economics."),
  op("Ion exchange", "Swaps ions on resin or functional materials.", "Selectivity, regeneration chemicals, fouling, and brine waste matter."),
  op("Precipitation", "Forms solids from dissolved species.", "Selectivity, particle size, impurities, and solid-liquid separation drive quality."),
  op("Leaching", "Dissolves target species from solids.", "Reagent use, kinetics, impurity co-dissolution, and waste handling dominate."),
  op("Hydrometallurgy", "Extracts and refines metals in aqueous systems.", "Selectivity, reagent recycle, residue management, and purity set scale."),
  op("Electrochemical separation", "Uses electrical potential to separate or transform ions.", "Membrane life, current efficiency, and impurity management control economics.")
];

const BOTTLENECK_TAXONOMY = [
  "energy penalty",
  "material degradation",
  "low yield",
  "poor selectivity",
  "slow kinetics",
  "fouling",
  "heat management",
  "mass-transfer limitation",
  "separation cost",
  "purity requirement",
  "infrastructure gap",
  "safety risk",
  "regulatory barrier",
  "reliability gap",
  "supply-chain constraint",
  "cost curve problem",
  "public acceptance",
  "maintenance burden",
  "data/control problem",
  "manufacturing repeatability",
  "quality-control challenge",
  "lifecycle/recycling issue",
  "extreme environment durability",
  "scale-up uncertainty"
];

const FEATURED_CASE_IDS = [
  "micromodular-printed-electronics",
  "smart-glass-buildings",
  "synthetic-fuel-from-air-and-water",
  "carbon-negative-concrete",
  "lights-out-semiconductor-fabs",
  "atmospheric-water-harvesting",
  "green-ammonia-fuel",
  "urban-vertical-farms",
  "autonomous-waste-sorting-facilities",
  "lunar-oxygen-production",
  "mars-fuel-production"
];

function slugifyAtlas(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function textForTech(tech) {
  return [
    tech.name,
    tech.category,
    tech.promise,
    tech.realisticPathway,
    tech.readinessGap,
    tech.scaleCondition,
    tech.pfdSteps.join(" "),
    tech.inputs.join(" "),
    tech.outputs.join(" "),
    tech.bottlenecks.join(" ")
  ].join(" ").toLowerCase().normalize("NFKC").replace(/\s+/g, " ");
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word));
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function sectorFor(tech) {
  const text = textForTech(tech);
  const name = (tech.name || "").toLowerCase().normalize("NFKC");
  if (tech.category === "Space" || hasAny(name, ["lunar", "mars", "orbital", "asteroid", "space elevator", "space habitat", "terraforming"])) return "Space and Off-World Industry";
  if (tech.category === "Transportation") return "Transportation and Mobility";
  if (tech.category === "Medical Tech" || (tech.category === "Bio" && !name.includes("living building"))) return "Biomanufacturing, Medicine, and Human Augmentation";
  if (tech.category === "Computing" || hasAny(name, ["semiconductor", "quantum", "neuromorphic", "ai assistant", "immersive vr", "augmented reality", "real-time translation", "scientific discovery", "mind archives", "transparent displays", "holographic"])) return "Computing, Semiconductors, and Ambient Intelligence";
  if (hasAny(name, ["atmospheric water", "desalination", "brine mining", "self-cleaning city water", "pfas", "wastewater", "nutrient recovery", "stormwater", "emergency water", "closed-loop building water"]) || hasAny(text, ["reverse osmosis", "potable storage"])) return "Future Water Systems";
  if (name.includes("living building")) return "Future Cities and Built Environments";
  if (hasAny(name, ["direct air capture", "synthetic fuel", "carbon-negative", "low-carbon steel", "low-carbon", "methane pyrolysis"]) || hasAny(text, ["co2 capture", "captured carbon", "fischer-tropsch", "mineralization reactor"])) return "Carbon and Atmospheric Engineering";
  if (tech.category === "Energy" || hasAny(name, ["fusion", "solar power", "hydrogen", "ammonia", "battery", "geothermal", "thermal batteries"]) || name.includes("industrial waste-heat")) return "Clean Energy Civilization";
  if (tech.category === "Materials" || hasAny(name, ["smart glass", "radiative cooling", "self-healing", "adaptive building skins", "transparent solar", "graphene", "carbon nanotube", "metamaterial", "aerogel", "shape-shifting", "anti-icing", "self-cleaning surfaces"])) return "Future Materials and Smart Surfaces";
  if (tech.category === "Manufacturing" || tech.category === "Robotics" || hasAny(name, ["factory", "robot", "printed", "additive", "fab", "microfactory", "construction"])) return "Advanced Manufacturing and Microfactories";
  return "Future Cities and Built Environments";
}

function inferChemicals(tech) {
  const text = textForTech(tech);
  const chemicals = [];
  if (hasAny(text, ["hydrogen", "electrolysis", "fuel cell", "h2"])) chemicals.push("Hydrogen");
  if (hasAny(text, ["co2", "carbon", "air capture", "mineralization"])) chemicals.push("Carbon dioxide");
  if (text.includes("ammonia") || text.includes("nitrogen")) chemicals.push("Ammonia", "Nitrogen");
  if (text.includes("methanol")) chemicals.push("Methanol");
  if (text.includes("methane") || text.includes("sabatier")) chemicals.push("Methane");
  if (text.includes("syngas") || text.includes("fischer")) chemicals.push("Syngas");
  if (hasAny(text, ["oxygen", "o2", "life support", "regolith"])) chemicals.push("Oxygen");
  if (hasAny(text, ["water", "desalination", "wastewater", "hydroponic", "electrolysis"])) chemicals.push("Water");
  if (hasAny(text, ["silicon", "semiconductor", "wafer", "solar"])) chemicals.push("Silicon", "Photoresists");
  if (hasAny(text, ["battery", "lithium", "electric aviation", "ev"])) chemicals.push("Lithium", "Electrolytes", "Graphite");
  if (hasAny(text, ["cobalt", "nickel", "manganese", "cathode"])) chemicals.push("Nickel", "Cobalt", "Manganese");
  if (hasAny(text, ["copper", "grid", "charging", "electronics", "conductive"])) chemicals.push("Copper");
  if (hasAny(text, ["aluminum", "aircraft", "lightweight", "space habitat"])) chemicals.push("Aluminum");
  if (hasAny(text, ["magnet", "motor", "levitation", "rare earth"])) chemicals.push("Rare earth elements");
  if (hasAny(text, ["concrete", "cement", "curing"])) chemicals.push("Cement/concrete chemistries");
  if (hasAny(text, ["polymer", "plastic", "textile", "smart clothing", "self-healing"])) chemicals.push("Polymers");
  if (hasAny(text, ["printed electronics", "ink", "roll-to-roll", "micromodular"])) chemicals.push("Conductive inks", "Solvents");
  if (hasAny(text, ["sorbent", "adsorption", "capture"])) chemicals.push("Sorbents");
  if (hasAny(text, ["membrane", "filtration", "reverse osmosis"])) chemicals.push("Membranes");
  if (hasAny(text, ["catalyst", "catalytic", "artificial photosynthesis"])) chemicals.push("Catalysts");
  if (hasAny(text, ["biomass", "fermentation", "cultivated", "algae", "bio"])) chemicals.push("Biomass-derived feedstocks");
  if (chemicals.length < 2) chemicals.push("Water", "Catalysts");
  return unique(chemicals).slice(0, 6);
}

function inferMaterials(tech, chemicals) {
  const text = textForTech(tech);
  const materials = [];
  if (hasAny(text, ["glass", "window"])) materials.push("Glass", "Transparent conductors");
  if (hasAny(text, ["membrane", "graphene"])) materials.push("Membrane modules", "Graphene");
  if (hasAny(text, ["concrete", "cement"])) materials.push("Cementitious materials", "Mineral aggregates");
  if (hasAny(text, ["battery", "electrolyte"])) materials.push("Electrodes", "Electrolytes");
  if (hasAny(text, ["chip", "semiconductor", "display"])) materials.push("Silicon wafers", "Photoresists", "Thin films");
  if (hasAny(text, ["coating", "surface", "anti-icing", "radiative"])) materials.push("Functional coatings", "Binders");
  if (hasAny(text, ["textile", "clothing", "wearable"])) materials.push("Smart textiles", "Flexible electronics");
  if (hasAny(text, ["metal", "steel", "aircraft", "maglev"])) materials.push("Metals and alloys");
  if (hasAny(text, ["bioreactor", "cell", "organ", "meat"])) materials.push("Growth media", "Scaffolds");
  chemicals.forEach((item) => {
    if (["Polymers", "Membranes", "Conductive inks", "Sorbents", "Catalysts", "Electrolytes"].includes(item)) materials.push(item);
  });
  return unique(materials).slice(0, 5);
}

function inferUnitOperations(tech) {
  const text = textForTech(tech);
  const ops = [];
  const checks = [
    ["electrolysis", "Electrolysis"],
    ["catalyst", "Catalysis"],
    ["catalytic", "Catalysis"],
    ["adsorption", "Adsorption"],
    ["sorbent", "Adsorption"],
    ["absorption", "Absorption"],
    ["distillation", "Distillation"],
    ["crystallization", "Crystallization"],
    ["membrane", "Membrane separation"],
    ["filtration", "Filtration"],
    ["drying", "Drying"],
    ["calcination", "Calcination"],
    ["pyrolysis", "Pyrolysis"],
    ["gasification", "Gasification"],
    ["fermentation", "Fermentation"],
    ["polymerization", "Polymerization"],
    ["lithography", "Lithography"],
    ["chemical vapor", "Chemical vapor deposition"],
    ["physical vapor", "Physical vapor deposition"],
    ["atomic layer", "Atomic layer deposition"],
    ["coating", "Coating"],
    ["curing", "Curing"],
    ["sintering", "Sintering"],
    ["annealing", "Annealing"],
    ["extrusion", "Extrusion"],
    ["compression", "Compression"],
    ["liquefaction", "Liquefaction"],
    ["heat", "Heat exchange"],
    ["combustion", "Combustion"],
    ["plasma", "Plasma processing"],
    ["sterilization", "Sterilization"],
    ["solvent", "Solvent recovery"],
    ["wastewater", "Wastewater treatment"],
    ["air separation", "Air separation"],
    ["ion exchange", "Ion exchange"],
    ["precipitation", "Precipitation"],
    ["leaching", "Leaching"],
    ["hydrometallurgy", "Hydrometallurgy"],
    ["electrochemical", "Electrochemical separation"]
  ];
  checks.forEach(([needle, opName]) => {
    if (text.includes(needle)) ops.push(opName);
  });
  if (tech.category === "Energy") ops.push("Electrolysis", "Heat exchange", "Compression");
  if (tech.category === "Climate Tech") ops.push("Adsorption", "Catalysis", "Compression");
  if (tech.category === "Infrastructure") ops.push("Membrane separation", "Filtration", "Wastewater treatment");
  if (tech.category === "Materials") ops.push("Coating", "Curing", "Filtration");
  if (tech.category === "Manufacturing") ops.push("Coating", "Drying", "Inspection");
  if (tech.category === "Bio" || tech.category === "Medical Tech") ops.push("Fermentation", "Filtration", "Sterilization");
  if (tech.category === "Space") ops.push("Electrolysis", "Compression", "Heat exchange");
  return unique(ops).filter((name) => UNIT_OPERATIONS.some((opItem) => opItem.name === name)).slice(0, 6);
}


function inferCriticalParameters(tech) {
  const text = textForTech(tech);
  const params = [];
  if (hasAny(text, ["hydrogen", "ammonia", "methane", "co2", "gas", "air"])) params.push("purity", "pressure", "leak rate");
  if (hasAny(text, ["heat", "thermal", "fusion", "pyrolysis", "combustion", "geothermal"])) params.push("temperature", "heat flux", "residence time");
  if (hasAny(text, ["water", "desalination", "wastewater", "pfas", "membrane", "filtration"])) params.push("flux", "recovery ratio", "fouling rate");
  if (hasAny(text, ["coating", "glass", "display", "semiconductor", "printed", "lithography", "electronics", "surface"])) params.push("film thickness", "defect density", "line width / registration");
  if (hasAny(text, ["battery", "electrolyte", "electrolysis", "fuel cell", "electrochemical"])) params.push("current density", "voltage efficiency", "cycle life");
  if (hasAny(text, ["bioreactor", "cell", "fermentation", "organ", "cultivated", "medical"])) params.push("sterility", "cell density", "viability", "residence time");
  if (hasAny(text, ["concrete", "building", "road", "construction"])) params.push("strength", "curing time", "durability");
  if (hasAny(text, ["robot", "autonomous", "ai", "digital twin", "sensor"])) params.push("uptime", "sensor drift", "control latency");
  if (params.length < 4) params.push("yield", "throughput", "unit cost", "reliability");
  return unique(params).slice(0, 6);
}

function inferBottleneckTags(tech) {
  const text = textForTech(tech);
  const tags = [];
  if (hasAny(text, ["energy", "electricity", "power", "heat", "efficiency"])) tags.push("energy penalty");
  if (hasAny(text, ["degradation", "durability", "lifetime", "abrasion", "fatigue"])) tags.push("material degradation");
  if (hasAny(text, ["yield", "repeatability", "defect"])) tags.push("low yield", "manufacturing repeatability");
  if (hasAny(text, ["selectivity", "purity"])) tags.push("poor selectivity", "purity requirement");
  if (hasAny(text, ["fouling", "contamination"])) tags.push("fouling");
  if (hasAny(text, ["thermal", "heat"])) tags.push("heat management");
  if (hasAny(text, ["separation", "purification", "downstream"])) tags.push("separation cost");
  if (hasAny(text, ["infrastructure", "distribution", "pipeline", "grid", "airport", "city", "retrofit"])) tags.push("infrastructure gap");
  if (hasAny(text, ["safety", "toxicity", "leakage", "nox", "cryogenic"])) tags.push("safety risk");
  if (hasAny(text, ["regulation", "regulatory", "code", "certification", "standards", "permitting"])) tags.push("regulatory barrier");
  if (hasAny(text, ["reliability", "maintenance", "robust"])) tags.push("reliability gap", "maintenance burden");
  if (hasAny(text, ["supply", "feedstock", "critical", "resource"])) tags.push("supply-chain constraint");
  if (hasAny(text, ["cost", "economics", "market", "capital"])) tags.push("cost curve problem");
  if (hasAny(text, ["public", "trust", "acceptance", "social"])) tags.push("public acceptance");
  if (hasAny(text, ["sensor", "data", "control", "model", "autonomy"])) tags.push("data/control problem");
  if (hasAny(text, ["qa", "quality", "inspection", "validation"])) tags.push("quality-control challenge");
  if (hasAny(text, ["recycle", "recycling", "lifecycle"])) tags.push("lifecycle/recycling issue");
  if (hasAny(text, ["space", "lunar", "mars", "radiation", "dust", "icing", "harsh"])) tags.push("extreme environment durability");
  tags.push("scale-up uncertainty");
  return unique(tags).filter((tag) => BOTTLENECK_TAXONOMY.includes(tag)).slice(0, 4);
}

function inferReadiness(tech, sector, bottleneckTags) {
  const text = textForTech(tech);
  let trl = 5;
  if (hasAny(text, ["commercial", "mature", "exist", "proven", "fielded"])) trl += 2;
  if (hasAny(text, ["prototype", "pilot", "demonstration", "trial"])) trl += 1;
  if (hasAny(text, ["speculative", "far away", "unproven", "not yet", "no broadly verified"])) trl -= 2;
  if (sector === "Space and Off-World Industry") trl -= 1;
  trl = Math.max(1, Math.min(9, trl));

  let mrl = Math.max(1, Math.min(9, trl - (hasAny(text, ["manufacturing", "repeatable", "yield", "defect", "quality"]) ? 2 : 1)));
  let irl = Math.max(1, Math.min(9, trl - (bottleneckTags.includes("infrastructure gap") ? 3 : 1)));
  if (hasAny(text, ["city", "grid", "airport", "pipeline", "district", "space", "orbital"])) irl = Math.max(1, irl - 1);

  const biggestGap = bottleneckTags.includes("infrastructure gap")
    ? "Infrastructure readiness"
    : bottleneckTags.includes("manufacturing repeatability") || bottleneckTags.includes("quality-control challenge")
      ? "Manufacturing readiness"
      : bottleneckTags.includes("energy penalty") || bottleneckTags.includes("cost curve problem")
        ? "Process economics"
        : "Reliability at scale";
  return { trl, mrl, irl, biggestGap };
}

const rawTechnologies = technologies.map((tech) => ({ ...tech }));
let enrichedTechnologies = technologies.map((tech) => {
  const id = slugifyAtlas(tech.name);
  const sector = sectorFor(tech);
  const chemicals = inferChemicals(tech);
  const materials = inferMaterials(tech, chemicals);
  const unitOperations = inferUnitOperations(tech);
  const bottleneckTags = inferBottleneckTags(tech);
  const criticalParameters = inferCriticalParameters(tech);
  return {
    id,
    name: tech.name,
    category: sector,
    originalCategory: tech.category,
    subcategory: tech.category,
    sciFiPromise: tech.promise,
    promise: tech.promise,
    realisticPathway: tech.realisticPathway,
    pfdSteps: tech.pfdSteps,
    inputs: tech.inputs,
    outputs: tech.outputs,
    chemicals,
    materials,
    unitOperations,
    criticalParameters,
    bottlenecks: tech.bottlenecks,
    bottleneckTags,
    readiness: inferReadiness(tech, sector, bottleneckTags),
    readinessGap: tech.readinessGap,
    scaleCondition: tech.scaleCondition,
    processQuestion: tech.processQuestion,
    relatedTechnologies: [],
    featured: FEATURED_CASE_IDS.includes(id)
  };
});

enrichedTechnologies = enrichedTechnologies.map((tech) => ({
  ...tech,
  relatedTechnologies: enrichedTechnologies
    .filter((candidate) => candidate.id !== tech.id && (candidate.category === tech.category || candidate.unitOperations.some((opName) => tech.unitOperations.includes(opName))))
    .slice(0, 4)
    .map((candidate) => candidate.id)
}));


const SOURCE_BANK = [
  {
    key: "nasem_chemeng_2022",
    group: "Overall thesis",
    tier: "Tier 1",
    type: "National Academies consensus report",
    citation: "National Academies of Sciences, Engineering, and Medicine. 2022. New Directions for Chemical Engineering.",
    url: "https://www.nationalacademies.org/read/26342/chapter/2",
    supports: "Chemical engineering has a central role in scaling processes, distributed manufacturing, and large-scale systems needed for energy, materials, health, and sustainability.",
    limitation: "Supports the process-engineering worldview broadly; it does not validate every speculative technology card."
  },
  {
    key: "nasem_deep_decarbonization_2020",
    group: "Overall thesis",
    tier: "Tier 1",
    type: "National Academies consensus report",
    citation: "National Academies of Sciences, Engineering, and Medicine. 2020. Deployment of Deep Decarbonization Technologies.",
    url: "https://www.nationalacademies.org/read/25656/chapter/6",
    supports: "Deep decarbonization depends on technology deployment, industrial process changes, electrification, carbon capture, and infrastructure rather than invention alone.",
    limitation: "Focused on decarbonization, not all atlas domains."
  },
  {
    key: "rapid_process_intensification",
    group: "Overall thesis",
    tier: "Tier 1",
    type: "DOE/Manufacturing USA institute",
    citation: "RAPID Manufacturing Institute / AIChE. Rapid Advancement in Process Intensification Deployment.",
    url: "https://rapid.aiche.org/",
    supports: "Modular process intensification and deployable chemical-process hardware are recognized manufacturing priorities.",
    limitation: "Programmatic source; use as context, not as proof for a specific card."
  },
  {
    key: "nasa_trl",
    group: "Readiness frameworks",
    tier: "Tier 1",
    type: "NASA framework page",
    citation: "NASA. 2023. Technology Readiness Levels.",
    url: "https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/",
    supports: "TRL is a nine-level framework for assessing technical maturity from basic principles to operational use.",
    limitation: "TRL alone does not measure manufacturability or integration maturity."
  },
  {
    key: "gao_tra_2020",
    group: "Readiness frameworks",
    tier: "Tier 1",
    type: "GAO assessment guide",
    citation: "U.S. Government Accountability Office. 2020. Technology Readiness Assessment Guide, GAO-20-48G.",
    url: "https://www.gao.gov/assets/gao-20-48g.pdf",
    supports: "Technology readiness assessment uses evidence of demonstrated capability and identifies maturity risk before acquisition or deployment.",
    limitation: "Acquisition-focused; translate carefully for civilian/process technologies."
  },
  {
    key: "dod_mrl_2016",
    group: "Readiness frameworks",
    tier: "Tier 1",
    type: "DoD manufacturing-readiness guide",
    citation: "U.S. Department of Defense. 2016. Manufacturing Readiness Level Deskbook, version 2.5.",
    url: "https://dodmrl.com/workshop2016/MRL_Deskbook_V2.5%20September%202016.pdf",
    supports: "MRLs assess production maturity, manufacturing risk, quality systems, supply-chain readiness, and cost maturity beyond TRL.",
    limitation: "Defense-acquisition framing; still useful as a disciplined manufacturability lens."
  },
  {
    key: "fernandez_readiness_2010",
    group: "Readiness frameworks",
    tier: "Tier 1",
    type: "National lab / OSTI report",
    citation: "Fernandez, J. A. 2010. Contextual Role of TRLs and MRLs in Technology Management. Sandia National Laboratories / OSTI.",
    url: "https://www.osti.gov/servlets/purl/1002093",
    supports: "TRL, MRL, IRL, and system-readiness concepts complement one another when assessing transition risk.",
    limitation: "Framework source; not a technical validation of individual process routes."
  },
  {
    key: "sauser_irl_2009",
    group: "Readiness frameworks",
    tier: "Tier 1",
    type: "Systems-engineering paper",
    citation: "Sauser, B., et al. 2009. Defining an Integration Readiness Level for Defense Acquisition. INCOSE / Systems Engineering context.",
    url: "https://web.mst.edu/lib-circ/files/special%20collections/INCOSE/Defining%20an%20Integration%20Readiness%20Level%20for%20Defense%20Aquisition.pdf",
    supports: "IRL measures maturity, compatibility, and readiness of interfaces between technologies.",
    limitation: "Older defense-systems source; use for concept framing."
  },
  {
    key: "iea_hydrogen_2024",
    group: "Chemical spine",
    tier: "Tier 1",
    type: "IEA annual report",
    citation: "International Energy Agency. 2024. Global Hydrogen Review 2024.",
    url: "https://www.iea.org/reports/global-hydrogen-review-2024",
    supports: "Hydrogen demand, low-emission hydrogen deployment, infrastructure, trade, policy, and investment gaps.",
    limitation: "Energy-system focus; specific project costs change quickly."
  },
  {
    key: "iea_hydrogen_2025",
    group: "Chemical spine",
    tier: "Tier 1",
    type: "IEA annual report",
    citation: "International Energy Agency. 2025. Global Hydrogen Review 2025.",
    url: "https://www.iea.org/reports/global-hydrogen-review-2025",
    supports: "Current hydrogen production/demand trends and persistent low-emissions hydrogen deployment challenges.",
    limitation: "Use for current status; check again before quoting numbers on a live site."
  },
  {
    key: "iea_ammonia_2021",
    group: "Chemical spine",
    tier: "Tier 1",
    type: "IEA technology roadmap",
    citation: "International Energy Agency. 2021. Ammonia Technology Roadmap: Towards more sustainable nitrogen fertiliser production.",
    url: "https://www.iea.org/reports/ammonia-technology-roadmap",
    supports: "Ammonia production depends on hydrogen feedstock, Haber-Bosch synthesis, energy inputs, and decarbonization pathways.",
    limitation: "Roadmap is about fertilizer ammonia; fuel uses need additional safety and end-use sources."
  },
  {
    key: "iea_critical_minerals_2025",
    group: "Chemical spine",
    tier: "Tier 1",
    type: "IEA outlook",
    citation: "International Energy Agency. 2025. Global Critical Minerals Outlook 2025.",
    url: "https://www.iea.org/reports/global-critical-minerals-outlook-2025",
    supports: "Copper, lithium, nickel, cobalt, graphite, and rare earth supply chains are strategic constraints for clean-energy and electrified systems.",
    limitation: "Supply and demand projections are scenario-dependent."
  },
  {
    key: "usgs_mcs_2025",
    group: "Chemical spine",
    tier: "Tier 1",
    type: "USGS commodity reference",
    citation: "U.S. Geological Survey. 2025. Mineral Commodity Summaries 2025.",
    url: "https://pubs.usgs.gov/publication/mcs2025",
    supports: "Authoritative production, reserves, import reliance, and supply-chain context for minerals such as lithium, copper, silicon, sulfur, rare earths, graphite, nickel, and cobalt.",
    limitation: "Commodity-level source; does not directly assess future-system design choices."
  },
  {
    key: "iea_ccus_2024",
    group: "Carbon systems",
    tier: "Tier 1",
    type: "IEA technology page",
    citation: "International Energy Agency. 2024. Carbon Capture, Utilisation and Storage.",
    url: "https://www.iea.org/energy-system/carbon-capture-utilisation-and-storage",
    supports: "CO2 capture, compression, transport, storage, and utilization are infrastructure-heavy systems; high capture rates and deployment scale matter.",
    limitation: "Sector overview; use detailed reports for project-specific economics."
  },
  {
    key: "iea_ccus_2020",
    group: "Carbon systems",
    tier: "Tier 1",
    type: "IEA report",
    citation: "International Energy Agency. 2020. CCUS in Clean Energy Transitions.",
    url: "https://www.iea.org/reports/ccus-in-clean-energy-transitions",
    supports: "CCUS can address hard-to-abate industrial emissions, low-carbon hydrogen, existing infrastructure, and carbon removals.",
    limitation: "Role of CCUS varies strongly by scenario and policy assumptions."
  },
  {
    key: "sholl_lively_2016",
    group: "Unit operations",
    tier: "Tier 1",
    type: "Peer-reviewed perspective",
    citation: "Sholl, D. S.; Lively, R. P. 2016. Seven chemical separations to change the world. Nature 532, 435–437. DOI: 10.1038/532435a.",
    url: "https://www.nature.com/articles/532435a",
    supports: "Industrial separations are major energy users; lower-energy separations are high-leverage process targets.",
    limitation: "Perspective article; use alongside process-specific papers for detailed design."
  },
  {
    key: "doe_chemical_bandwidth_2015",
    group: "Unit operations",
    tier: "Tier 1",
    type: "DOE bandwidth study",
    citation: "U.S. Department of Energy. 2015. Bandwidth Study on Energy Use and Potential Energy Saving Opportunities in U.S. Chemical Manufacturing.",
    url: "https://www.energy.gov/cmei/ito/articles/bandwidth-study-us-chemical-manufacturing",
    supports: "Chemical manufacturing energy intensity, process heat, separations, and R&D energy-saving opportunities.",
    limitation: "U.S. industrial baseline; not specific to speculative systems."
  },
  {
    key: "nist_chips_metrology_2023",
    group: "Manufacturing / QA",
    tier: "Tier 1",
    type: "NIST CHIPS program source",
    citation: "National Institute of Standards and Technology. 2023. CHIPS Metrology Program.",
    url: "https://www.nist.gov/chips/research-development-programs/metrology-program",
    supports: "Advanced microelectronics require fit-for-purpose metrology, measurement science, standards, and process characterization.",
    limitation: "Program overview; use NIST PDF for detailed gaps."
  },
  {
    key: "nist_chips_gaps_2023",
    group: "Manufacturing / QA",
    tier: "Tier 1",
    type: "NIST roadmap/gap report",
    citation: "National Institute of Standards and Technology. 2023. Metrology Gaps in the Semiconductor Ecosystem.",
    url: "https://www.nist.gov/system/files/documents/2023/06/05/CHIPS_Metrology-Gaps-in-the-Semi-Ecosystem_0.pdf",
    supports: "Semiconductor process scale-up depends on measurement gaps, advanced characterization, materials metrology, and ecosystem standards.",
    limitation: "Semiconductor-focused; analogous relevance to other precision manufacturing should be labeled inference."
  },
  {
    key: "itrs_yield_2015",
    group: "Manufacturing / QA",
    tier: "Tier 1",
    type: "Semiconductor roadmap",
    citation: "International Technology Roadmap for Semiconductors. 2015. Yield Enhancement.",
    url: "https://www.semiconductors.org/wp-content/uploads/2018/06/5_2015-ITRS-2.0-Yield-Enhancement.pdf",
    supports: "Yield, contamination control, statistical process control, and materials purity are central to semiconductor manufacturing.",
    limitation: "Older roadmap; still useful for manufacturing principles and terminology."
  },
  {
    key: "awh_ahrestani_2023",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Ahrestani, Z., et al. 2023. An overview of atmospheric water harvesting methods. PMC / peer-reviewed review.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10073925/",
    supports: "AWH includes condensation, adsorption/desorption, fog/dew collection, system comparisons, and energy considerations.",
    limitation: "Review-level evidence; device performance depends on local climate and system architecture."
  },
  {
    key: "awh_hanikel_2020",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Hanikel, N., Prévot, M. S., and Yaghi, O. M. 2020. MOF water harvesters. Nature Nanotechnology review context.",
    url: "https://yaghi.berkeley.edu/pdfPublications/20MOFWaterHarvester.pdf",
    supports: "MOFs can be designed for water uptake/release and integrated into atmospheric water harvesters.",
    limitation: "MOF potential is not the same as low-cost commercial water supply."
  },
  {
    key: "awh_kim_2018",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed demonstration",
    citation: "Kim, H., et al. 2018. Adsorption-based atmospheric water harvesting device for arid climates. Nature Communications.",
    url: "https://dspace.mit.edu/bitstreams/033e5912-c0bc-4914-abff-85923f31635e/download",
    supports: "A solar-thermal, MOF-801 water-harvesting device was demonstrated under arid conditions.",
    limitation: "Lab/prototype demonstration; not evidence of municipal-scale economics."
  },
  {
    key: "awh_ejeian_2021",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Ejeian, M., et al. 2021. Adsorption-based atmospheric water harvesting. Joule.",
    url: "https://www.cell.com/joule/fulltext/S2542-4351(21)00178-1",
    supports: "Adsorption-based AWH couples water capture, thermal regeneration, condensation, and system-level energy/productivity tradeoffs.",
    limitation: "Review; detailed claims need device-specific data."
  },
  {
    key: "awh_chu_2024",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Chu, W., et al. 2024. Advancements in atmospheric water harvesting. Communications Engineering.",
    url: "https://www.nature.com/articles/s44172-024-00324-y",
    supports: "AWH spans fog collection, vapor condensation, and sorption-based approaches; system design must address capture, release, and collection.",
    limitation: "Recent review; not a project-specific commercialization assessment."
  },
  {
    key: "awh_wang_2023",
    group: "Atmospheric water harvesting",
    tier: "Tier 1",
    type: "Peer-reviewed modeling study",
    citation: "Wang, J., et al. 2023. Global water yield strategy for metal-organic-framework-based atmospheric water harvesting. Cell Reports Physical Science.",
    url: "https://www.sciencedirect.com/science/article/pii/S2666386423005878",
    supports: "MOF-AWH performance depends on humidity, climate, adsorption thermodynamics, and energy consumption; low humidity increases energy difficulty.",
    limitation: "Modeling study; assumptions about materials and climate matter."
  },
  {
    key: "fusion_nasem_2019",
    group: "Fusion",
    tier: "Tier 1",
    type: "National Academies consensus report",
    citation: "National Academies of Sciences, Engineering, and Medicine. 2019. A Strategic Plan for U.S. Burning Plasma Research.",
    url: "https://www.nationalacademies.org/read/25331/chapter/6",
    supports: "Fusion pilot-plant progress depends on materials, high-field magnets, tritium processing, and power-plant engineering.",
    limitation: "Strategic plan; does not prove commercial economics."
  },
  {
    key: "fusion_fesac_2020",
    group: "Fusion",
    tier: "Tier 1",
    type: "DOE advisory report",
    citation: "Fusion Energy Sciences Advisory Committee. 2020. Powering the Future: Fusion & Plasmas.",
    url: "https://science.osti.gov/-/media/fes/fesac/pdf/2020/202012/FESAC_Report_2020_Powering_the_Future.pdf",
    supports: "Fusion R&D priorities include burning plasma, extreme-environment materials, fuel breeding, and electricity generation for pilot plants.",
    limitation: "Roadmap; expected timelines and funding can change."
  },
  {
    key: "fusion_gao_2025",
    group: "Fusion",
    tier: "Tier 1",
    type: "GAO report",
    citation: "U.S. Government Accountability Office. 2025. Fusion Energy: Additional Planning Would Strengthen DOE's Efforts to Advance Commercialization.",
    url: "https://www.gao.gov/assets/880/875618.pdf",
    supports: "Commercial fusion still faces planning and technology gaps, including large-scale tritium-breeding blanket demonstration.",
    limitation: "U.S. policy/program focus; private-sector claims require separate review."
  },
  {
    key: "fusion_epri_blankets_2024",
    group: "Fusion",
    tier: "Tier 1",
    type: "DOE/EPRI technical report page",
    citation: "EPRI / U.S. Department of Energy. 2024. Fusion Blankets Research Objectives.",
    url: "https://www.energy.gov/articles/epri-fusion-blankets-report-2024",
    supports: "Fusion blankets must breed tritium, manage heat, shield neutrons, and operate with robust materials.",
    limitation: "Technical planning source; not a solved design."
  },
  {
    key: "saf_nrel_2024",
    group: "Synthetic fuels",
    tier: "Tier 1",
    type: "NREL / DOE report",
    citation: "Calderon, O. R., et al. 2024. Sustainable Aviation Fuel State-of-Industry Report. NREL.",
    url: "https://docs.nrel.gov/docs/fy24osti/87802.pdf",
    supports: "SAF scale-up requires feedstock logistics, conversion pathways, fuel certification, cost reduction, and major production expansion.",
    limitation: "Primarily U.S. aviation fuel context."
  },
  {
    key: "saf_afdc",
    group: "Synthetic fuels",
    tier: "Tier 1",
    type: "DOE technical pathway page",
    citation: "U.S. Department of Energy Alternative Fuels Data Center. Sustainable Aviation Fuel.",
    url: "https://afdc.energy.gov/fuels/sustainable-aviation-fuel",
    supports: "SAF pathways must meet ASTM fuel standards and pathway-specific feedstock/conversion requirements.",
    limitation: "Overview page; detailed LCA and economics require pathway studies."
  },
  {
    key: "saf_ozkan_2024",
    group: "Synthetic fuels",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Ozkan, M., et al. 2024. Forging a sustainable sky: aviation e-fuels review. PMC / peer-reviewed review.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10960063/",
    supports: "E-kerosene routes can combine CO2 capture, electrolytic hydrogen, and Fischer-Tropsch or related synthesis; scale is limited by energy, cost, and certification.",
    limitation: "Review; process yields and economics vary by route."
  },
  {
    key: "cement_iea_2024",
    group: "Carbon-negative concrete",
    tier: "Tier 1",
    type: "IEA sector page",
    citation: "International Energy Agency. 2024. Cement.",
    url: "https://www.iea.org/energy-system/industry/cement",
    supports: "Cement decarbonization requires efficiency, clinker substitution, alternative fuels, carbon capture/storage infrastructure, and policy support.",
    limitation: "Sector overview; not proof that any specific concrete is carbon-negative."
  },
  {
    key: "cement_iea_roadmap_2018",
    group: "Carbon-negative concrete",
    tier: "Tier 1",
    type: "IEA technology roadmap",
    citation: "International Energy Agency and Cement Sustainability Initiative. 2018. Technology Roadmap: Low-Carbon Transition in the Cement Industry.",
    url: "https://www.iea.org/reports/technology-roadmap-low-carbon-transition-in-the-cement-industry",
    supports: "Low-carbon cement pathways include energy efficiency, alternative fuels, clinker-ratio reduction, and carbon capture.",
    limitation: "Roadmap is older; pair with current sources for deployment status."
  },
  {
    key: "cement_driver_2024",
    group: "Carbon-negative concrete",
    tier: "Tier 1",
    type: "Peer-reviewed study",
    citation: "Driver, J. G., et al. 2024. Global decarbonization potential of CO2 mineralization in concrete materials. Nature Communications / PMC.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11260098/",
    supports: "CO2 mineralization in concrete can store carbon, but claims about large carbon-negative impact require careful boundaries and scale assumptions.",
    limitation: "Supports caution: not every mineralized-concrete pathway is carbon-negative on a full life-cycle basis."
  },
  {
    key: "vertical_usda_2024",
    group: "Vertical farming",
    tier: "Tier 1",
    type: "USDA Economic Research Service report",
    citation: "Dohlman, E., et al. 2024. Trends, Insights, and Future Prospects for Production in Controlled Environment Agriculture and Agrivoltaics. USDA ERS.",
    url: "https://www.ers.usda.gov/sites/default/files/_laserfiche/publications/108221/EIB-264.pdf?v=46165",
    supports: "Controlled-environment agriculture includes vertical farming and depends on lighting, HVAC, water/nutrient systems, automation, economics, and crop selection.",
    limitation: "Agricultural economics focus; specific farm performance varies."
  },
  {
    key: "vertical_engler_2021",
    group: "Vertical farming",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Engler, N. and Krarti, M. 2021. Review of energy efficiency in controlled environment agriculture. Renewable and Sustainable Energy Reviews.",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1364032121000812",
    supports: "CEA sustainability and profitability are strongly affected by lighting, HVAC, environmental control, and energy efficiency.",
    limitation: "Abstract/source page may be paywalled; use as reviewed reference, not for exact quoted detail unless full text is checked."
  },
  {
    key: "vertical_mills_2025",
    group: "Vertical farming",
    tier: "Tier 1",
    type: "Peer-reviewed meta-analysis",
    citation: "Mills, E., et al. 2025. The emergence of indoor agriculture as a driver of global energy demand. Nature Food.",
    url: "https://www.nature.com/articles/s44264-025-00091-z",
    supports: "Indoor agriculture can offer control benefits but may impose substantial energy demand if scaled broadly.",
    limitation: "Energy-demand estimates depend on geography, crop mix, grid, and facility design."
  },
  {
    key: "aam_faa_2023",
    group: "Advanced air mobility",
    tier: "Tier 1",
    type: "FAA implementation plan",
    citation: "Federal Aviation Administration. 2023. Advanced Air Mobility Implementation Plan: Innovate28.",
    url: "https://www.faa.gov/sites/faa.gov/files/AAM-I28-Implementation-Plan.pdf",
    supports: "AAM deployment depends on aircraft certification, operating rules, pilots, airspace integration, vertiports, and safety regulation.",
    limitation: "Implementation-plan source; not an endorsement of commercial timelines."
  },
  {
    key: "aam_dot_2025",
    group: "Advanced air mobility",
    tier: "Tier 1",
    type: "U.S. DOT national strategy",
    citation: "U.S. Department of Transportation. 2025. Advanced Air Mobility National Strategy.",
    url: "https://www.transportation.gov/sites/dot.gov/files/2025-12/AAM%20National%20Strategy%202025.pdf",
    supports: "AAM needs new operations, accessible vertiport infrastructure, public/private coordination, and integration into transportation networks.",
    limitation: "Strategy document with forward-looking assumptions."
  },
  {
    key: "aam_cohen_2024",
    group: "Advanced air mobility",
    tier: "Tier 1",
    type: "USDOT/BTS white paper",
    citation: "Cohen, A., et al. 2024. Advanced Air Mobility: Opportunities, Challenges, and Research Needs. National Transportation Library.",
    url: "https://rosap.ntl.bts.gov/view/dot/74300/dot_74300_DS1.pdf",
    supports: "AAM risks include safety, regulation, airspace/traffic management, security, infrastructure, multimodal integration, weather, workforce, and public acceptance.",
    limitation: "White paper; market forecasts should be treated cautiously."
  },
  {
    key: "tissue_mccorry_2022",
    group: "Biomanufacturing / tissue engineering",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "McCorry, M. C., et al. 2022. Sensor technologies for quality control in engineered tissue manufacturing. PMC.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10283157/",
    supports: "Tissue-engineering manufacturing needs in-process sensing and quality attributes to make engineered tissues reproducible and releasable.",
    limitation: "Quality-control focus; not a full artificial-organ commercialization map."
  },
  {
    key: "tissue_zuncheddu_2021",
    group: "Biomanufacturing / tissue engineering",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Zuncheddu, D., et al. 2021. Quality control methods in musculoskeletal tissue engineering. Bone Research.",
    url: "https://www.nature.com/articles/s41413-021-00167-9",
    supports: "Engineered tissues require QC for viability, morphology, matrix deposition, structure, and function.",
    limitation: "Musculoskeletal focus; extrapolate carefully to other organs."
  },
  {
    key: "nasa_isru_2023",
    group: "Space systems",
    tier: "Tier 1",
    type: "NASA program page",
    citation: "NASA. 2023. In-Situ Resource Utilization overview.",
    url: "https://www.nasa.gov/overview-in-situ-resource-utilization/",
    supports: "ISRU aims to use lunar or planetary resources to produce water, fuel, oxygen, construction materials, and other supplies.",
    limitation: "Program overview; not a demonstrated production plant."
  },
  {
    key: "nasa_eclss_2025",
    group: "Space systems",
    tier: "Tier 1",
    type: "NASA reference page",
    citation: "NASA. 2025. Environmental Control and Life Support Systems (ECLSS).",
    url: "https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/",
    supports: "Space habitats require water recovery, air revitalization, oxygen generation, waste management, and safety systems.",
    limitation: "ISS/current system framing; Mars/lunar habitat extrapolation needs mission-specific evidence."
  },
  {
    key: "nasa_mars_isru_2012",
    group: "Space systems",
    tier: "Tier 1",
    type: "NASA technical report",
    citation: "Muscatello, A. C., et al. 2012. Mars In Situ Resource Utilization Technology Evaluation. NASA NTRS.",
    url: "https://ntrs.nasa.gov/api/citations/20120001775/downloads/20120001775.pdf",
    supports: "Mars propellant production concepts combine CO2 collection, Sabatier or RWGS processing, electrolysis, and oxygen/methane handling.",
    limitation: "Older technical evaluation; current architectures may differ."
  },
  {
    key: "esa_melissa",
    group: "Space systems",
    tier: "Tier 1",
    type: "ESA program page",
    citation: "European Space Agency. Life support and MELiSSA regenerative loop program.",
    url: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Life_support",
    supports: "Regenerative space life-support aims to close loops for water, oxygen, waste, and food and reduce resupply dependence.",
    limitation: "Program page; pair with technical papers for detailed performance."
  },
  {
    key: "nasem_life_support_1997",
    group: "Space systems",
    tier: "Tier 1",
    type: "National Academies report",
    citation: "National Research Council. 1997. Advanced Technology for Human Support in Space.",
    url: "https://www.nationalacademies.org/read/5826/chapter/4",
    supports: "Closed-loop life support processes CO2, urine, wastewater, and wastes into reusable oxygen, water, and other resources.",
    limitation: "Older source; fundamentals are useful but technology state has advanced."
  },
  {
    key: "printed_roelkens_2024",
    group: "Printed / heterogeneous electronics",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Roelkens, G., et al. 2024. Present and future of micro-transfer printing for heterogeneous integration. APL Photonics.",
    url: "https://pubs.aip.org/aip/app/article/9/1/010901/2932278/Present-and-future-of-micro-transfer-printing-for",
    supports: "Micro-transfer printing can enable heterogeneous integration but must address placement, yield, interconnect, and manufacturability constraints.",
    limitation: "Photonic-integration focus; not identical to every micromodular electronics concept."
  },
  {
    key: "printed_transfer_corbett_2017",
    group: "Printed / heterogeneous electronics",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Corbett, B., et al. 2017. Transfer print techniques for heterogeneous integration of photonic components. Progress in Quantum Electronics.",
    url: "https://www.sciencedirect.com/science/article/pii/S0079672717300010",
    supports: "Transfer printing enables integration of components on non-native substrates and at wafer scale, with substrate flatness and alignment constraints.",
    limitation: "Photonic-components focus; use as related manufacturing precedent."
  },
  {
    key: "printed_inks_2024",
    group: "Printed / heterogeneous electronics",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Recent advances in conductive materials for printed electronics. 2024. Polymer Advanced Technologies.",
    url: "https://onlinelibrary.wiley.com/doi/10.1002/pat.6581",
    supports: "Printed electronics rely on conductive fillers, ink formulation, processing, substrate compatibility, and post-processing for conductivity and reliability.",
    limitation: "Review source; exact material system requires primary experiments."
  },
  {
    key: "lights_out_factory_2024",
    group: "Manufacturing / QA",
    tier: "Tier 1",
    type: "Peer-reviewed review",
    citation: "Wang, R., et al. 2024. Lights-out factories: review and prospect. Journal publication indexed by Beijing Institute of Technology.",
    url: "https://pure.bit.edu.cn/en/publications/lights-out-factories-review-and-prospect/",
    supports: "Lights-out factories depend on automation, reliability, data systems, process control, and high capital/technology readiness.",
    limitation: "General manufacturing review; semiconductor fabs need semiconductor-specific sources too."
  },
  {
    "key": "nasa_sbsp_2024",
    "group": "Space-based solar power",
    "tier": "Tier 1",
    "type": "NASA technical report",
    "citation": "NASA Office of Technology, Policy, and Strategy. 2024. Space-Based Solar Power.",
    "url": "https://www.nasa.gov/wp-content/uploads/2024/01/otps-sbsp-report-final-tagged-approved-1-8-24-tagged-v2.pdf",
    "supports": "Space-based solar power requires orbital collection, power conversion, wireless transmission, rectenna capture, launch/assembly, safety, and cost comparisons against terrestrial alternatives.",
    "limitation": "NASA found major cost and capability gaps; use to support feasibility questions and caveats, not inevitability."
  },
  {
    "key": "nasa_sbsp_article_2024",
    "group": "Space-based solar power",
    "tier": "Tier 1",
    "type": "NASA summary article",
    "citation": "NASA. 2024. New Study Updates NASA on Space-Based Solar Power.",
    "url": "https://www.nasa.gov/organizations/otps/space-based-solar-power-report/",
    "supports": "Summarizes NASA's 2024 SBSP assessment and highlights cost, launch, assembly, and capability gaps.",
    "limitation": "Summary source; pair with full NASA report for technical details."
  },
  {
    "key": "esa_solaris_2024",
    "group": "Space-based solar power",
    "tier": "Tier 1",
    "type": "Space-agency program page",
    "citation": "European Space Agency. 2024. ESA accelerates the race towards clean energy from space.",
    "url": "https://www.esa.int/Space_in_Member_States/United_Kingdom/ESA_accelerates_the_race_towards_clean_energy_from_space",
    "supports": "SOLARIS frames SBSP as a preparatory programme requiring feasibility assessment, orbital infrastructure, transmission, and systems-level planning.",
    "limitation": "Agency program communication; less technical than NASA OTPS report."
  },
  {
    "key": "iea_dac_2024",
    "group": "Carbon systems",
    "tier": "Tier 1",
    "type": "IEA technology page/report",
    "citation": "International Energy Agency. 2024. Direct Air Capture.",
    "url": "https://www.iea.org/energy-system/carbon-capture-utilisation-and-storage/direct-air-capture",
    "supports": "DAC scaling depends on capture modules, energy supply, cost reduction, storage/utilization, siting, and policy support.",
    "limitation": "Deployment and cost status changes quickly; recheck before publishing numerical claims."
  },
  {
    "key": "nasem_negative_emissions_dac_2019",
    "group": "Carbon systems",
    "tier": "Tier 1",
    "type": "National Academies consensus report chapter",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2019. Negative Emissions Technologies and Reliable Sequestration: Direct Air Capture chapter.",
    "url": "https://www.nationalacademies.org/read/25259/chapter/7",
    "supports": "DAC requires air contactors, sorbents/solvents, regeneration energy, compression, storage, and careful assessment of cost and energy needs.",
    "limitation": "2019 status; supplement with IEA or current project data for current deployment."
  },
  {
    "key": "doe_industrial_decarb_2022",
    "group": "Industrial decarbonization",
    "tier": "Tier 1",
    "type": "U.S. DOE roadmap",
    "citation": "U.S. Department of Energy. 2022. Industrial Decarbonization Roadmap.",
    "url": "https://www.osti.gov/biblio/1961393",
    "supports": "Industrial decarbonization requires energy efficiency, electrification, low-carbon fuels/feedstocks, carbon capture, and integrated process/system analysis across energy-intensive sectors.",
    "limitation": "Roadmap-level source; sector-specific claims still need sector-specific citations."
  },
  {
    "key": "iea_steel_2020",
    "group": "Industrial decarbonization",
    "tier": "Tier 1",
    "type": "IEA roadmap",
    "citation": "International Energy Agency. 2020. Iron and Steel Technology Roadmap.",
    "url": "https://www.iea.org/reports/iron-and-steel-technology-roadmap",
    "supports": "Steel decarbonization pathways include hydrogen-based DRI, electrification, CCUS, efficiency, reuse, and recycling, with economics and feedstock quality constraints.",
    "limitation": "Global scenarios; individual projects and costs need current project-level evidence."
  },
  {
    "key": "nasem_desalination_2008",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "National Academies consensus report",
    "citation": "National Research Council. 2008. Desalination: A National Perspective.",
    "url": "https://nap.nationalacademies.org/resource/12184/desal_final.pdf",
    "supports": "Desalination systems depend on membrane or thermal separation, pretreatment, brine management, energy use, environmental controls, and cost constraints.",
    "limitation": "Older but authoritative; use current sources for market/deployment numbers."
  },
  {
    "key": "usgs_desalination_2019",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "USGS technical explainer",
    "citation": "U.S. Geological Survey. 2019. Desalination.",
    "url": "https://www.usgs.gov/water-science-school/science/desalination",
    "supports": "Explains desalination as removal of salts/minerals from seawater or impaired waters and distinguishes distillation and membrane approaches.",
    "limitation": "Introductory source; pair with NASEM/technical papers for design limits."
  },
  {
    "key": "doe_desal_basics_2026",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "U.S. DOE technical explainer",
    "citation": "U.S. Department of Energy. 2026. Desalination Basics.",
    "url": "https://www.energy.gov/cmei/ito/desalination-basics",
    "supports": "Supports the PFD framing of desalination as mineral/salt separation using thermal or membrane processes for potable, irrigation, or industrial water.",
    "limitation": "Educational page; not enough for cost/performance claims."
  },
  {
    "key": "nrel_lithium_brines_2021",
    "group": "Critical minerals and brines",
    "tier": "Tier 1",
    "type": "NREL techno-economic report",
    "citation": "Warren, I. 2021. Techno-Economic Analysis of Lithium Extraction from Geothermal Brines. National Renewable Energy Laboratory.",
    "url": "https://docs.nrel.gov/docs/fy21osti/79178.pdf",
    "supports": "Direct lithium extraction from brines depends on selectivity, sorbents/extractants, geothermal integration, reinjection, product purification, economics, water use, and carbon intensity.",
    "limitation": "Focused on geothermal brines; other brines require separate evidence."
  },
  {
    "key": "epa_pfas_guidance_2024",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "EPA guidance",
    "citation": "U.S. Environmental Protection Agency. 2024. Interim Guidance on the Destruction and Disposal of PFAS and Materials Containing PFAS.",
    "url": "https://www.epa.gov/system/files/documents/2024-04/2024-interim-guidance-on-pfas-destruction-and-disposal.pdf",
    "supports": "PFAS destruction/disposal requires technology evaluation, multiple lines of evidence, thermal or emerging treatment, containment, and uncertainty management.",
    "limitation": "Guidance is non-binding and explicitly notes data gaps; avoid claiming mature universal destruction."
  },
  {
    "key": "epa_water_reuse_2026",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "EPA program page",
    "citation": "U.S. Environmental Protection Agency. 2026. Water Reuse and Recycling / National Water Reuse Action Plan.",
    "url": "https://www.epa.gov/waterreuse",
    "supports": "Water reuse is a recognized strategy for agriculture, industry, communities, resilience, and reducing freshwater demand.",
    "limitation": "Programmatic source; individual treatment trains need engineering evidence."
  },
  {
    "key": "nasem_water_reuse_2012",
    "group": "Future water systems",
    "tier": "Tier 1",
    "type": "National Academies consensus report",
    "citation": "National Research Council. 2012. Water Reuse: Potential for Expanding the Nation's Water Supply Through Reuse of Municipal Wastewater.",
    "url": "https://www.nationalacademies.org/read/13303",
    "supports": "Municipal wastewater reuse can expand supply when treatment, risk assessment, monitoring, public-health protection, and regulatory systems are in place.",
    "limitation": "National-level analysis; local projects need site-specific water-quality and public-health data."
  },
  {
    "key": "doe_ldes_liftoff_2023",
    "group": "Energy storage",
    "tier": "Tier 1",
    "type": "U.S. DOE commercialization report",
    "citation": "U.S. Department of Energy. 2023. Pathways to Commercial Liftoff: Long Duration Energy Storage.",
    "url": "https://www.energy.gov/sites/default/files/2023-09/Pathways%20to%20Commercial%20Liftoff%20Long%20Duration%20Energy%20Storage%20Opportunities_508.pdf",
    "supports": "Long-duration storage includes thermal storage, flow batteries, metal-anode systems, and other technologies whose commercialization depends on cost, reliability, duration, and market design.",
    "limitation": "Commercialization framing; specific chemistries need technical sources."
  },
  {
    "key": "doe_ldes_2030_2024",
    "group": "Energy storage",
    "tier": "Tier 1",
    "type": "U.S. DOE technical report",
    "citation": "U.S. Department of Energy. 2024. Achieving the Promise of Low-Cost Long Duration Energy Storage.",
    "url": "https://www.energy.gov/sites/default/files/2024-08/Achieving%20the%20Promise%20of%20Low-Cost%20Long%20Duration%20Energy%20Storage_FINAL_08052024.pdf",
    "supports": "Cost-down for long-duration storage depends on technology-specific innovation portfolios, materials, manufacturing, and system integration.",
    "limitation": "Model-based analysis; performance claims require technology-specific validation."
  },
  {
    "key": "doe_electrochromic_windows_2023",
    "group": "Smart buildings",
    "tier": "Tier 1",
    "type": "U.S. DOE report",
    "citation": "U.S. Department of Energy Building Technologies Office. 2023. Better Windows, Better Outcomes: How Electrochromics Improve Health, Productivity, and Efficiency.",
    "url": "https://www.energy.gov/sites/default/files/2023-12/bto-electrochromic-window-report-121123.pdf",
    "supports": "Electrochromic smart windows use dynamic glazing to modulate daylight and solar heat gain, affecting HVAC, lighting, comfort, controls, and market adoption.",
    "limitation": "Electrochromics are one smart-glass family; other smart-glass chemistries need separate sources."
  },
  {
    "key": "usda_cea_2024",
    "group": "Vertical farming and controlled environments",
    "tier": "Tier 1",
    "type": "USDA Economic Research Service report",
    "citation": "Dohlman, E., C. Weber, and Y. Lee. 2024. Trends, Insights, and Future Prospects for Production in Controlled Environment Agriculture and Agrivoltaics. USDA ERS.",
    "url": "https://ers.usda.gov/sites/default/files/_laserfiche/publications/108221/EIB-264.pdf",
    "supports": "CEA includes enclosed hydroponic/vertical systems and depends on capital, lighting, energy, water, crop selection, and market economics.",
    "limitation": "U.S.-focused; does not prove all vertical-farming business models are viable."
  },
  {
    "key": "usda_vertical_2025",
    "group": "Vertical farming and controlled environments",
    "tier": "Tier 1",
    "type": "USDA ARS article",
    "citation": "U.S. Department of Agriculture Agricultural Research Service. 2025. Vertical Farming — No Longer a Futuristic Concept.",
    "url": "https://www.ars.usda.gov/oc/utm/vertical-farming-no-longer-a-futuristic-concept/",
    "supports": "Vertical farming uses stacked indoor production, hydroponics/aquaponics/soilless systems, controlled environments, and intensive resource management.",
    "limitation": "Educational/interview source; use ERS or peer-reviewed sources for economics."
  },
  {
    "key": "faa_aam_i28_2023",
    "group": "Advanced air mobility",
    "tier": "Tier 1",
    "type": "FAA implementation plan",
    "citation": "Federal Aviation Administration. 2023. Advanced Air Mobility Implementation Plan: Innovate28.",
    "url": "https://www.faa.gov/sites/faa.gov/files/AAM-I28-Implementation-Plan.pdf",
    "supports": "AAM/eVTOL deployment requires vehicle certification, vertiport siting, charging/cooling, maintenance, airspace integration, security, safety, and operations planning.",
    "limitation": "Implementation plan, not proof of economic viability."
  },
  {
    "key": "nasa_aam_2026",
    "group": "Advanced air mobility",
    "tier": "Tier 1",
    "type": "NASA mission page",
    "citation": "NASA. 2026. Advanced Air Mobility Mission.",
    "url": "https://www.nasa.gov/mission/advanced-air-mobility/",
    "supports": "NASA frames AAM as an airspace, vehicle, safety, and urban-integration challenge rather than just an aircraft-design challenge.",
    "limitation": "Mission overview; technical details should use FAA/NASA reports."
  },
  {
    "key": "nasem_aam_2020",
    "group": "Advanced air mobility",
    "tier": "Tier 1",
    "type": "National Academies report chapter",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2020. Advancing Aerial Mobility: A National Blueprint, chapter 2.",
    "url": "https://www.nationalacademies.org/read/25646/chapter/4",
    "supports": "Advanced aerial mobility requires infrastructure, financing, battery/hybrid propulsion limitations, and charging integration beyond aircraft prototypes.",
    "limitation": "Strategic framing; vehicle-specific performance needs direct OEM/regulatory data."
  },
  {
    "key": "nasa_eap_oig_2023",
    "group": "Electric and hydrogen aviation",
    "tier": "Tier 1",
    "type": "NASA Inspector General report",
    "citation": "NASA Office of Inspector General. 2023. NASA's Electrified Aircraft Propulsion Research and Development Efforts.",
    "url": "https://oig.nasa.gov/wp-content/uploads/2023/12/ig-23-014.pdf",
    "supports": "Electrified aircraft propulsion depends on batteries, thermal management, reliability, failure detection, and ground/flight demonstration progress.",
    "limitation": "NASA program oversight, not a comprehensive market forecast."
  },
  {
    "key": "nasa_eap_2026",
    "group": "Electric and hydrogen aviation",
    "tier": "Tier 1",
    "type": "NASA program page",
    "citation": "NASA. 2026. Electrified Aircraft Propulsion.",
    "url": "https://www.nasa.gov/mission/eap/",
    "supports": "EAP offers fuel/emissions reduction potential but requires propulsion integration, demonstrations, and mid-term technology maturation.",
    "limitation": "Program page; avoid strong technical performance claims without reports."
  },
  {
    "key": "nist_smart_manufacturing_2024",
    "group": "Smart manufacturing",
    "tier": "Tier 1",
    "type": "NIST program page",
    "citation": "National Institute of Standards and Technology. 2024. Smart Manufacturing.",
    "url": "https://www.nist.gov/smart-manufacturing",
    "supports": "Smart manufacturing requires measurement methods, computing/communication technologies, trust, standards, best practices, and deployment confidence.",
    "limitation": "Programmatic; use technical publications for particular architectures."
  },
  {
    "key": "nasem_smart_manufacturing_2024",
    "group": "Smart manufacturing",
    "tier": "Tier 1",
    "type": "National Academies consensus report",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2024. Options for a National Plan for Smart Manufacturing.",
    "url": "https://www.nationalacademies.org/publications/27260",
    "supports": "Smart manufacturing deployment depends on sensors, computing, standards, workforce, productivity, energy efficiency, sustainability, and coordinated national planning.",
    "limitation": "High-level consensus report; not a detailed design guide for every factory card."
  },
  {
    "key": "nist_sms_testbed_2020",
    "group": "Smart manufacturing",
    "tier": "Tier 1",
    "type": "NIST technical publication",
    "citation": "Helu, M. M., et al. 2020. Connecting, Deploying, and Using the Smart Manufacturing Systems Test Bed. NIST.",
    "url": "https://www.nist.gov/publications/connecting-deploying-and-using-smart-manufacturing-systems-test-bed",
    "supports": "Smart manufacturing test beds integrate equipment data, protocols, automation, and information systems to improve production-system performance.",
    "limitation": "Test-bed scope; translate cautiously to full autonomous factories."
  },
  {
    "key": "nist_digital_twins_2024",
    "group": "Digital twins and process control",
    "tier": "Tier 1",
    "type": "NIST project page",
    "citation": "National Institute of Standards and Technology. 2024. Digital Twins for Advanced Manufacturing.",
    "url": "https://www.nist.gov/programs-projects/digital-twins-advanced-manufacturing",
    "supports": "Manufacturing digital twins need requirements, data collection, model validation, maintenance, analysis, and actionable recommendations.",
    "limitation": "Project page; pair with NASEM digital-twin report for limitations."
  },
  {
    "key": "nasem_digital_twins_2023",
    "group": "Digital twins and process control",
    "tier": "Tier 1",
    "type": "National Academies consensus report",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2023. Foundational Research Gaps and Future Directions for Digital Twins.",
    "url": "https://www.nationalacademies.org/projects/DEPS-BMSA-21-03/publication/26894",
    "supports": "Digital twins require verification, validation, uncertainty quantification, model/data integration, and domain-specific credibility before deployment.",
    "limitation": "Framework report; not evidence that every city or factory twin is ready."
  },
  {
    "key": "ostp_advanced_manufacturing_2022",
    "group": "Smart manufacturing",
    "tier": "Tier 1",
    "type": "U.S. national strategy",
    "citation": "White House / National Science and Technology Council. 2022. National Strategy for Advanced Manufacturing.",
    "url": "https://www.energy.gov/sites/default/files/2024-03/National-Strategy-for-Advanced-Manufacturing-10072022.pdf",
    "supports": "Advanced manufacturing priorities include digital twins, AI, sensors, materials, supply-chain resilience, and process-modeling infrastructure.",
    "limitation": "Strategy document; individual technology readiness still needs specific evidence."
  },
  {
    "key": "fda_etp_2026",
    "group": "Pharmaceutical and medical manufacturing",
    "tier": "Tier 1",
    "type": "FDA program page",
    "citation": "U.S. Food and Drug Administration. 2026. Emerging Technology Program.",
    "url": "https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/emerging-technology-program-etp",
    "supports": "Advanced pharmaceutical manufacturing must pass regulatory review while maintaining high-quality, safe, and effective medicines.",
    "limitation": "Regulatory program source; not technical proof of on-demand manufacturing performance."
  },
  {
    "key": "fda_amt_2025",
    "group": "Pharmaceutical and medical manufacturing",
    "tier": "Tier 1",
    "type": "FDA guidance",
    "citation": "U.S. Food and Drug Administration. 2025. Advanced Manufacturing Technologies Designation Program Guidance.",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/advanced-manufacturing-technologies-designation-program",
    "supports": "FDA recognizes advanced manufacturing technologies for drugs through a designation program tied to regulatory development and quality expectations.",
    "limitation": "Regulatory pathway; does not imply every technology is approved or scalable."
  },
  {
    "key": "fda_emerging_examples_2025",
    "group": "Pharmaceutical and medical manufacturing",
    "tier": "Tier 1",
    "type": "FDA examples page",
    "citation": "U.S. Food and Drug Administration. 2025. Examples of Accepted Emerging Technologies.",
    "url": "https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/examples-accepted-emerging-technologies",
    "supports": "Accepted emerging drug-manufacturing technologies include continuous drug substance/product manufacturing, model-based control strategies, aseptic spray drying, and 3D printing.",
    "limitation": "Examples list; not exhaustive and not a blanket approval."
  },
  {
    "key": "nist_biomanufacturing_2023",
    "group": "Biomanufacturing",
    "tier": "Tier 1",
    "type": "NIST technical report",
    "citation": "Thomas, D. 2023. The U.S. Biomanufacturing Economy: Value Added, Supply Chains, Cost, Sustainability, and Efficiency. NIST AMS 100-52.",
    "url": "https://www.nist.gov/publications/us-biomanufacturing-economy-value-added-supply-chains-cost-sustainability-and",
    "supports": "Biomanufacturing has supply-chain, cost, sustainability, efficiency, data-gap, maintenance, feedstock, and lost-batch considerations.",
    "limitation": "Economic measurement report; not an engineering design source for every bioreactor."
  },
  {
    "key": "nasem_biomanufacturing_2023",
    "group": "Biomanufacturing",
    "tier": "Tier 1",
    "type": "National Academies workshop summary",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2023. Successes and Challenges in Biomanufacturing.",
    "url": "https://www.nationalacademies.org/units/DELS-BLS-23-06/publication/26846",
    "supports": "Biomanufacturing scale-up faces technical, workforce, supply-chain, standardization, and platform-development challenges.",
    "limitation": "Workshop summary; use primary process papers for specific products."
  },
  {
    "key": "barda_vaccines_on_demand",
    "group": "Biomanufacturing",
    "tier": "Tier 1",
    "type": "BARDA program page",
    "citation": "BARDA DRIVe. Vaccines on Demand Program.",
    "url": "https://drive.hhs.gov/on-demand.html",
    "supports": "Decentralized, point-of-service vaccine manufacturing is a real preparedness target requiring rapid and flexible manufacturing technologies.",
    "limitation": "Programmatic; does not validate a specific portable biomanufacturing design."
  },
  {
    "key": "fda_organs_on_chips_2019",
    "group": "Tissue engineering and organ chips",
    "tier": "Tier 1",
    "type": "FDA research page",
    "citation": "U.S. Food and Drug Administration. 2019. Organs-On-Chips for Radiation Countermeasures.",
    "url": "https://www.fda.gov/emergency-preparedness-and-response/preparedness-research/organs-chips-radiation-countermeasures",
    "supports": "Organ-on-chip systems are being evaluated for regulatory science and medical countermeasure testing, with attention to model validity and human-relevant responses.",
    "limitation": "Specific completed project; not proof of universal replacement of animal studies."
  },
  {
    "key": "tissue_ikada_2006",
    "group": "Tissue engineering and organ chips",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Ikada, Y. 2006. Challenges in tissue engineering. Journal of the Royal Society Interface.",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1664655/",
    "supports": "Tissue engineering depends on cells, scaffolds, biomaterials, vascularization, growth factors, and integration with host tissue.",
    "limitation": "Older review; use for fundamentals, not current commercialization status."
  },
  {
    "key": "organ_chip_ma_2020",
    "group": "Tissue engineering and organ chips",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Ma, C., et al. 2020. Organ-on-a-Chip: A new paradigm for drug development. Trends in Pharmacological Sciences / PMC.",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7990030/",
    "supports": "Organ-on-chip platforms emulate physiological environments for disease modeling, toxicity testing, and drug development, while standardization and validation remain challenges.",
    "limitation": "Review source; individual organ-chip claims require system-specific evidence."
  },
  {
    "key": "graphene_go_membranes_2024",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Tiwary, S. K., et al. 2024. Graphene oxide-based membranes for water desalination: progress and challenges. npj Clean Water.",
    "url": "https://www.nature.com/articles/s41699-024-00462-z",
    "supports": "Graphene-based membranes have promising selectivity/permeability properties but face scale-up, defect, fouling, stability, and reproducibility challenges.",
    "limitation": "Review source; not evidence of broad commercial deployment."
  },
  {
    "key": "graphene_membranes_liu_2015",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed tutorial review",
    "citation": "Liu, G., W. Jin, and N. Xu. 2015. Graphene-based membranes. Chemical Society Reviews.",
    "url": "https://pubs.rsc.org/en/content/articlelanding/2015/cs/c4cs00423j",
    "supports": "Graphene membranes are studied for molecular separation, water purification, gas separation, and membrane design/fabrication limits.",
    "limitation": "Foundational older review; newer sources needed for latest scale-up status."
  },
  {
    "key": "cnt_space_elevator_popescu_2018",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed paper",
    "citation": "Popescu, D. M., and S. A. Edwards. 2018. Building the space elevator: lessons from biological design. Journal of the Royal Society Interface.",
    "url": "https://royalsocietypublishing.org/doi/10.1098/rsif.2018.0086",
    "supports": "Space-elevator tether concepts are constrained by material specific strength, defect tolerance, scaling, and biological/nanomaterial design limits.",
    "limitation": "Speculative application; supports caution more than feasibility."
  },
  {
    "key": "self_healing_polymer_wang_2020",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Wang, S., and M. W. Urban. 2020. Self-healing polymers. Nature Reviews Materials.",
    "url": "https://ui.adsabs.harvard.edu/abs/2020NatRM...5..562W/abstract",
    "supports": "Self-healing polymers use physical and chemical mechanisms such as diffusion, reversible bonds, supramolecular interactions, and microencapsulation.",
    "limitation": "Many demonstrations are material-level; infrastructure deployment needs durability and cost evidence."
  },
  {
    "key": "radiative_cooling_huang_2024",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed paper",
    "citation": "Huang, G., et al. 2024. Radiative cooling and indoor light management enabled by a transparent, haze-free metafilm. Nature Communications.",
    "url": "https://www.nature.com/articles/s41467-024-48150-2",
    "supports": "Passive radiative cooling requires high solar reflectance/low absorption and high mid-infrared emissivity in the atmospheric window.",
    "limitation": "Specific material demonstration; city-scale claims need building-stock and durability evidence."
  },
  {
    "key": "aerogel_insulation_lu_2024",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Lu, L., et al. 2024. A state-of-the-art review of novel aerogel insulation materials for building applications. Energy Sources, Part A.",
    "url": "https://www.tandfonline.com/doi/full/10.1080/15567036.2024.2424915",
    "supports": "Aerogel insulation is attractive for buildings because of very low thermal conductivity, but cost, durability, handling, and application constraints matter.",
    "limitation": "Review source; source may be paywalled in parts."
  },
  {
    "key": "anti_icing_huang_2022",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Huang, W., et al. 2022. Icephobic/anti-icing properties of superhydrophobic surfaces. Advances in Colloid and Interface Science.",
    "url": "https://www.sciencedirect.com/science/article/abs/pii/S0001868622000604",
    "supports": "Anti-icing surfaces use wettability, micro/nano texture, ice-adhesion reduction, and durability tradeoffs.",
    "limitation": "Review source; field deployment requires long-term outdoor validation."
  },
  {
    "key": "anti_icing_mao_2024",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed paper",
    "citation": "Mao, M., et al. 2024. Scalable robust photothermal superhydrophobic coatings. Nature Communications.",
    "url": "https://www.nature.com/articles/s41467-024-54058-8",
    "supports": "Large-area anti-icing/de-icing coating concepts can combine superhydrophobicity, photothermal behavior, and durability testing.",
    "limitation": "Specific coating family; not evidence that all anti-icing materials are infrastructure-ready."
  },
  {
    "key": "acoustic_metamaterials_aydin_2024",
    "group": "Advanced membranes and materials",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Aydın, G., et al. 2024. Breaking the limits of acoustic science: A review of acoustic metamaterials. Materials Science and Engineering: R.",
    "url": "https://www.sciencedirect.com/science/article/abs/pii/S0921510724002137",
    "supports": "Acoustic metamaterials manipulate sound through geometry and structure, with practical limits from manufacturing, scale, frequency range, and durability.",
    "limitation": "Review source; product-specific noise-control performance needs testing."
  },
  {
    "key": "nasem_quantum_2019",
    "group": "Computing and semiconductors",
    "tier": "Tier 1",
    "type": "National Academies consensus report",
    "citation": "National Academies of Sciences, Engineering, and Medicine. 2019. Quantum Computing: Progress and Prospects.",
    "url": "https://www.nationalacademies.org/publications/25196",
    "supports": "Quantum computing has long-term promise but requires hardware progress, error correction, algorithms, fabrication, measurement, and cryogenic/control infrastructure.",
    "limitation": "2019 status; current hardware progress needs newer sources."
  },
  {
    "key": "nist_quantum_2025",
    "group": "Computing and semiconductors",
    "tier": "Tier 1",
    "type": "NIST explainer",
    "citation": "National Institute of Standards and Technology. 2025. Quantum Computing Explained.",
    "url": "https://www.nist.gov/quantum-information-science/quantum-computing-explained",
    "supports": "Current quantum computers are rudimentary/error-prone while future systems may solve classes of problems beyond classical machines.",
    "limitation": "Educational source; not enough for vendor-specific claims."
  },
  {
    "key": "iea_data_centres_2023",
    "group": "Computing and semiconductors",
    "tier": "Tier 1",
    "type": "IEA technology page",
    "citation": "International Energy Agency. 2023. Data Centres and Data Transmission Networks.",
    "url": "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks",
    "supports": "Digital infrastructure depends on electricity demand, servers, cooling, networks, efficiency, and grid integration.",
    "limitation": "Fast-changing sector; recheck current demand and AI-load data."
  },
  {
    "key": "iea_ai_energy_2025",
    "group": "Computing and semiconductors",
    "tier": "Tier 1",
    "type": "IEA analysis",
    "citation": "International Energy Agency. 2025. Energy demand from AI.",
    "url": "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
    "supports": "AI infrastructure energy demand is strongly affected by servers, accelerators, data-centre design, utilization, and power/cooling systems.",
    "limitation": "Scenario-sensitive; use cautiously for forecasts."
  },
  {
    "key": "doe_solar_fuels_2026",
    "group": "Clean fuels and artificial photosynthesis",
    "tier": "Tier 1",
    "type": "DOE Office of Science explainer",
    "citation": "U.S. Department of Energy Office of Science. 2026. DOE Explains... Solar Fuels.",
    "url": "https://www.energy.gov/science/doe-explainssolar-fuels",
    "supports": "Solar fuels include using solar energy for water splitting, CO2 reduction to fuels/alcohols, and nitrogen reduction, but commercial systems still face selectivity, lifetime, and integration questions.",
    "limitation": "Educational source; pair with peer-reviewed artificial-photosynthesis reviews for detailed claims."
  },
  {
    "key": "artificial_photosynthesis_machin_2023",
    "group": "Clean fuels and artificial photosynthesis",
    "tier": "Tier 1",
    "type": "Peer-reviewed review",
    "citation": "Machín, A., et al. 2023. Artificial Photosynthesis: Current Advancements and Future Prospects. Catalysts / PMC.",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10807655/",
    "supports": "Artificial photosynthesis requires light absorption, catalytic water oxidation/reduction or CO2 conversion, charge separation, materials stability, and system integration.",
    "limitation": "Review source; not evidence of commercial deployment."
  },
{
  "key": "waste_farre_2023",
  "group": "Future cities / waste systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Farr\u00e9, J. A. 2023. Pneumatic Urban Waste Collection Systems: A Review. Applied Sciences 13(2), 877.",
  "url": "https://www.mdpi.com/2076-3417/13/2/877",
  "supports": "Reviews pneumatic urban waste collection systems, including vacuum pipe transport, urban use cases, and comparison with conventional truck collection.",
  "limitation": "Supports the existence and engineering concept; site-specific economics and emissions depend on local waste streams, density, and energy mix."
},
{
  "key": "waste_nakou_2014",
  "group": "Future cities / waste systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed case-study article",
  "citation": "Nakou, D., Benardos, A., and Kaliampakos, D. 2014. Assessing the financial and environmental performance of underground automated vacuum waste collection systems. Tunnelling and Underground Space Technology.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0886779813002101",
  "supports": "Evaluates underground automated vacuum waste collection as an alternative to conventional collection and discusses capital, operating, and environmental factors.",
  "limitation": "Abstract-level source checked; specific numerical results require full-text verification before quoting."
},
{
  "key": "epa_smm_2026",
  "group": "Future cities / waste systems",
  "tier": "Tier 1",
  "type": "EPA program page",
  "citation": "U.S. Environmental Protection Agency. Sustainable Materials Management.",
  "url": "https://www.epa.gov/smm",
  "supports": "Provides authoritative context for waste reduction, materials management, reuse, recycling, and system-level waste infrastructure.",
  "limitation": "Not specific to pneumatic collection; use for the waste-system framing only."
},
{
  "key": "underground_logistics_hu_2025",
  "group": "Future cities / logistics",
  "tier": "Tier 1",
  "type": "Peer-reviewed systematic review",
  "citation": "Hu, W., et al. 2025. A state-of-the-art review of underground logistics systems. Tunnelling and Underground Space Technology.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0886779825002792",
  "supports": "Synthesizes concepts, prototypes, and methodologies for underground logistics systems as a way to move freight below congested urban surfaces.",
  "limitation": "Abstract-level source checked; implementation economics and permitting claims require full text or project-specific sources."
},
{
  "key": "underground_logistics_milinkovic_2015",
  "group": "Future cities / logistics",
  "tier": "Tier 1",
  "type": "Conference paper",
  "citation": "Milinkovi\u0107, L., and Panteli\u0107, J. 2015. Underground Systems in Service of City Logistics. LOGIC.",
  "url": "https://logic.sf.bg.ac.rs/wp-content/uploads/LOGIC_2015_ID_52.pdf",
  "supports": "Discusses underground logistic systems for urban freight and their potential role in shifting logistics activity away from surface streets.",
  "limitation": "Conference source; use as supporting rather than primary evidence for deployment readiness."
},
{
  "key": "tube_freight_soumaya_2026",
  "group": "Future cities / logistics",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Soumaya, F., et al. 2026. Smart Urban Logistics and Tube-Based Freight Systems. Smart Cities 9(3), 52.",
  "url": "https://www.mdpi.com/2624-6511/9/3/52",
  "supports": "Frames tube-based freight systems as automated carriers moving goods through enclosed guided corridors, often underground.",
  "limitation": "Recent review/context source; claims about commercial viability still need project-level data."
},
{
  "key": "modular_wbdg_offsite",
  "group": "Future cities / modular construction",
  "tier": "Tier 1",
  "type": "Whole Building Design Guide technical resource",
  "citation": "National Institute of Building Sciences / WBDG. Off-Site and Modular Construction Explained.",
  "url": "https://www.wbdg.org/resources/site-and-modular-construction-explained",
  "supports": "Explains off-site modular construction as a factory-based sequence with distinct manufacturing and assembly logic.",
  "limitation": "General building guidance; not proof that megastructure-scale modular cities are feasible."
},
{
  "key": "modular_nibs_aia_guide",
  "group": "Future cities / modular construction",
  "tier": "Tier 1",
  "type": "AIA/NIBS technical guide",
  "citation": "American Institute of Architects and National Institute of Building Sciences. Modular and Off-Site Construction Guide.",
  "url": "https://nibs.org/wp-content/uploads/2025/04/NIBS_OSCC_AIA_Modular-and-Off-Site-Construction-Guide.pdf",
  "supports": "Documents modular/off-site construction workflows, quality-control considerations, schedule effects, and coordination issues.",
  "limitation": "Building-sector guide; use cautiously for extrapolated megastructure claims."
},
{
  "key": "modular_zohourian_2025",
  "group": "Future cities / modular construction",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Zohourian, M., et al. 2025. Modular Construction: A Comprehensive Review. Buildings 15(12), 2020.",
  "url": "https://www.mdpi.com/2075-5309/15/12/2020",
  "supports": "Reviews modular construction benefits, process structure, environmental claims, and adoption constraints.",
  "limitation": "Broad review; numerical cost/schedule claims vary widely by region and project."
},
{
  "key": "modular_li_2023",
  "group": "Future cities / modular construction",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Li, M., et al. 2023. Investigation of the Severity of Modular Construction Barriers. Journal of Construction Engineering and Management context.",
  "url": "https://www.sciencedirect.com/org/science/article/pii/S1526149223004228",
  "supports": "Identifies barriers that limit uptake of modular construction despite off-site production advantages.",
  "limitation": "Abstract-level source checked; do not quote detailed barrier rankings without full text."
},
{
  "key": "cool_walkability_litman_2025",
  "group": "Future cities / pedestrian climate systems",
  "tier": "Tier 1",
  "type": "Technical report",
  "citation": "Litman, T. 2025. Cool Walkability Planning: Providing Pedestrian Thermal Comfort in Hot Climate Cities. Victoria Transport Policy Institute.",
  "url": "https://www.vtpi.org/cwi.pdf",
  "supports": "Defines pedestrian thermal-comfort planning needs and discusses shaded sidewalks, shadeways, and climate-controlled pedways.",
  "limitation": "Planning report, not peer-reviewed engineering demonstration."
},
{
  "key": "cool_corridor_iroz_2024",
  "group": "Future cities / pedestrian climate systems",
  "tier": "Tier 1",
  "type": "Transportation research report",
  "citation": "Iroz-Elardo, N., et al. 2024. Assessing Cool Corridor Heat Resilience Strategies for Human-Scale Transportation.",
  "url": "https://rosap.ntl.bts.gov/view/dot/73298/dot_73298_DS1.pdf",
  "supports": "Evaluates corridor-scale heat resilience strategies for pedestrians and cyclists using thermal-comfort measurements.",
  "limitation": "Focused on natural/urban heat-mitigation corridors, not fully enclosed pedestrian tubes."
},
{
  "key": "city_heat_negev_2020",
  "group": "Future cities / pedestrian climate systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Negev, M., et al. 2020. City design for health and resilience in hot and dry climates. BMJ / PMC.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7667523/",
  "supports": "Supports the role of shade, urban design, and heat-resilience planning in hot-climate cities.",
  "limitation": "Public-health and urban-design framing; not a detailed HVAC/process design source."
},
{
  "key": "pedestrian_path_melnikov_2022",
  "group": "Future cities / pedestrian climate systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Melnikov, V. R., et al. 2022. Behavioural thermal regulation explains pedestrian path choice in a hot urban environment. Scientific Reports.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8844002/",
  "supports": "Shows that thermal conditions influence pedestrian behavior, supporting the need for climate-aware pedestrian infrastructure.",
  "limitation": "Behavioral evidence, not an engineering design standard."
},
{
  "key": "hyperloop_volpe_2016",
  "group": "Transportation / hyperloop",
  "tier": "Tier 1",
  "type": "U.S. DOT / Volpe feasibility analysis",
  "citation": "Hyde, D. J. 2016. Hyperloop Commercial Feasibility Analysis. U.S. Department of Transportation / Volpe National Transportation Systems Center.",
  "url": "https://rosap.ntl.bts.gov/view/dot/12308/dot_12308_DS1.pdf",
  "supports": "Assesses hyperloop as an emerging automated guideway technology and highlights feasibility, safety, regulatory, and cost issues.",
  "limitation": "Older feasibility analysis; many company-specific assumptions have changed."
},
{
  "key": "hyperloop_morpc_2020",
  "group": "Transportation / hyperloop",
  "tier": "Tier 1",
  "type": "Regional feasibility study",
  "citation": "Mid-Ohio Regional Planning Commission. 2020. Hyperloop Feasibility Study.",
  "url": "https://www.morpc.org/wp-content/uploads/2023/03/HYPERLOOP-FEASIBILITY-STUDY.pdf",
  "supports": "Discusses safety regulation, infrastructure approvals, and corridor-level feasibility considerations for hyperloop-style transport.",
  "limitation": "Regional planning study; use as contextual evidence, not proof of commercial maturity."
},
{
  "key": "maglev_fra_2005",
  "group": "Transportation / maglev",
  "tier": "Tier 1",
  "type": "Federal Railroad Administration report to Congress",
  "citation": "Federal Railroad Administration. 2005. Report to Congress: Costs and Benefits of Magnetic Levitation.",
  "url": "https://railroads.dot.gov/sites/fra.dot.gov/files/fra_net/1176/maglev-sep05.pdf",
  "supports": "Compares maglev cost, infrastructure, and benefit considerations against high-speed rail alternatives.",
  "limitation": "Older report; technology and project costs need current checks before numerical claims."
},
{
  "key": "maglev_huang_2024",
  "group": "Transportation / maglev",
  "tier": "Tier 1",
  "type": "Technical review chapter",
  "citation": "Huang, H. 2024. Development and Challenges of Maglev Transportation. IntechOpen.",
  "url": "https://www.intechopen.com/chapters/1206683",
  "supports": "Reviews electromagnetic and electrodynamic maglev principles, suspension types, and engineering challenges.",
  "limitation": "Book-chapter review; use with project-specific sources for deployment status."
},
{
  "key": "autonomous_shuttle_fta_2025",
  "group": "Transportation / autonomous transit",
  "tier": "Tier 1",
  "type": "Federal Transit Administration research plan",
  "citation": "Federal Transit Administration. 2025. Strategic Transit Automation Research Plan 2.0: 2023\u20132028.",
  "url": "https://www.transit.dot.gov/sites/fta.dot.gov/files/2025-02/FTA-Report-0264-STAR2.0.pdf",
  "supports": "Discusses low-speed automated shuttle pilots, uncertain business cases, and transit automation research needs.",
  "limitation": "Policy/research plan rather than detailed hardware validation."
},
{
  "key": "autonomous_shuttle_iclodean_2020",
  "group": "Transportation / autonomous transit",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Iclodean, C., et al. 2020. Autonomous Shuttle Bus for Public Transportation: A Review. Energies 13(11), 2917.",
  "url": "https://www.mdpi.com/1996-1073/13/11/2917",
  "supports": "Reviews autonomous shuttle technologies, public-transport implications, legal issues, and component systems.",
  "limitation": "Review source; autonomous-pod economics remain deployment-specific."
},
{
  "key": "low_speed_shuttles_volpe_2018",
  "group": "Transportation / autonomous transit",
  "tier": "Tier 1",
  "type": "U.S. DOT state-of-practice report",
  "citation": "Cregger, J., et al. 2018. Low-Speed Automated Shuttles: State of the Practice. U.S. DOT / Volpe.",
  "url": "https://rosap.ntl.bts.gov/view/dot/37060/dot_37060_DS1.pdf",
  "supports": "Summarizes low-speed automated shuttle deployments, operating domains, and implementation issues.",
  "limitation": "State-of-practice report; needs updates for current vehicle capability."
},
{
  "key": "fhwa_av_infrastructure_2021",
  "group": "Transportation / smart highways",
  "tier": "Tier 1",
  "type": "FHWA research report",
  "citation": "Gopalakrishna, D., et al. 2021. Impacts of Automated Vehicles on Highway Infrastructure. Federal Highway Administration.",
  "url": "https://www.fhwa.dot.gov/publications/research/operations/21015/21015.pdf",
  "supports": "Explores how automated vehicles may affect highway infrastructure, maintenance, operations, and design requirements.",
  "limitation": "Scenario-based; does not prescribe one universal smart-highway architecture."
},
{
  "key": "nchrp_cav_maintenance_2024",
  "group": "Transportation / smart highways",
  "tier": "Tier 1",
  "type": "National Academies / NCHRP report",
  "citation": "National Academies of Sciences, Engineering, and Medicine. 2024. Connected and Autonomous Vehicle Technology: Determining the Impact on State DOT Maintenance Programs. NCHRP Research Report 1084.",
  "url": "https://www.nationalacademies.org/read/27625",
  "supports": "Connects CAV deployment to state DOT maintenance, infrastructure readiness, signs, markings, and operational responsibilities.",
  "limitation": "Road-maintenance focus; not a full smart-highway feasibility analysis."
},
{
  "key": "smart_roads_trubia_2020",
  "group": "Transportation / smart highways",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Trubia, S., et al. 2020. Smart Roads: An Overview of What Future Mobility Will Look Like. Infrastructures.",
  "url": "https://www.iris.unict.it/retrieve/dfe4d22e-2622-bb0a-e053-d805fe0a78d9/infrastructures-smart%20roads05-00107.pdf",
  "supports": "Reviews smart-road concepts involving sensing, communications, and connected/autonomous vehicles.",
  "limitation": "Conceptual review; implementation costs and standards require local transport-agency sources."
},
{
  "key": "self_healing_asphalt_anupam_2022",
  "group": "Materials / roads",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Anupam, B. R., et al. 2022. A methodological review on self-healing asphalt pavements. Construction and Building Materials.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0950061822000897",
  "supports": "Reviews self-healing asphalt mechanisms including healing agents, induction heating, microwave heating, nanomaterials, and polymers.",
  "limitation": "Abstract-level source checked; do not quote detailed performance values without full text."
},
{
  "key": "self_healing_asphalt_abejon_2021",
  "group": "Materials / roads",
  "tier": "Tier 1",
  "type": "Peer-reviewed bibliometric review",
  "citation": "Abej\u00f3n, R. 2021. Self-Healing Asphalt: A Systematic Bibliometric Analysis. Materials.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7865384/",
  "supports": "Provides review context for self-healing asphalt and microwave/induction-assisted healing strategies.",
  "limitation": "Bibliometric source; mechanism details should be paired with technical reviews."
},
{
  "key": "self_healing_asphalt_jwaida_2024",
  "group": "Materials / roads",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Jwaida, Z., et al. 2024. The self-healing performance of asphalt binder and mixtures. Innovative Infrastructure Solutions.",
  "url": "https://link.springer.com/article/10.1007/s41062-024-01547-w",
  "supports": "Reviews self-healing asphalt technologies, additives, and factors affecting healing such as humidity, diffusion, temperature, and time.",
  "limitation": "Review article; field longevity claims need road-trial evidence."
},
{
  "key": "construction_robotics_melenbrink_2020",
  "group": "Robotics / construction",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Melenbrink, N., Werfel, J., and Menges, A. 2020. On-site autonomous construction robots: Toward unsupervised building. Automation in Construction.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0926580520301746",
  "supports": "Reviews construction automation research and notes the difficulty of fully autonomous construction in unstructured jobsite environments.",
  "limitation": "Abstract-level source checked; detailed task taxonomy requires full-text review."
},
{
  "key": "construction_robotics_parascho_2023",
  "group": "Robotics / construction",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Parascho, S. 2023. Construction Robotics: From Automation to Collaboration. Annual Review of Control, Robotics, and Autonomous Systems.",
  "url": "https://www.annualreviews.org/content/journals/10.1146/annurev-control-080122-090049",
  "supports": "Reviews robotics in the built environment and highlights safety, robustness, control, and human-robot collaboration challenges.",
  "limitation": "Review source; not a deployment-readiness standard."
},
{
  "key": "niosh_construction_robotics_2024",
  "group": "Robotics / construction",
  "tier": "Tier 1",
  "type": "NIOSH technical bulletin",
  "citation": "NIOSH. 2024. Transforming Construction: Automation and Robotics for a Safer Future.",
  "url": "https://www.cdc.gov/niosh/bulletin/2024/construction-robotics.html",
  "supports": "Discusses construction robot benefits and safety concerns for labor-intensive and repetitive construction tasks.",
  "limitation": "Safety and occupational-health framing; not a manufacturing-process proof."
},
{
  "key": "self_replicating_nasa_1982",
  "group": "Speculative manufacturing / self-replication",
  "tier": "Tier 1",
  "type": "NASA technical report",
  "citation": "Freitas, R. A., and Gilbreath, W. P., eds. 1982. Advanced Automation for Space Missions. NASA Conference Publication 2255.",
  "url": "https://ntrs.nasa.gov/citations/19820045716",
  "supports": "NASA/ASEE study examined automated space manufacturing facilities and a self-replicating growing lunar factory concept.",
  "limitation": "Historical concept study; not evidence of current technical readiness."
},
{
  "key": "self_replicating_ellery_2016",
  "group": "Speculative manufacturing / self-replication",
  "tier": "Tier 1",
  "type": "Peer-reviewed article/preprint copy",
  "citation": "Ellery, A. 2016. Are Self-Replicating Machines Feasible?",
  "url": "https://carleton.ca/ceser/wp-content/uploads/Are-self-replicating-machines-feasible.pdf",
  "supports": "Analyzes feasibility constraints for self-replicating 3D-printer/manufacturing systems, including difficulty of producing motors, sensors, and electronics.",
  "limitation": "Conceptual engineering analysis; real-world self-replicating factories remain speculative."
},
{
  "key": "self_replicating_modular_abdelrahman_2022",
  "group": "Speculative manufacturing / self-replication",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Abdel-Rahman, A., et al. 2022. Self-replicating hierarchical modular robotic swarms. Communications Engineering.",
  "url": "https://www.nature.com/articles/s44172-022-00034-3",
  "supports": "Demonstrates recursive assembly ideas in modular robotic/material systems, relevant to limited self-replication and assembly scaling.",
  "limitation": "Does not prove full autonomous industrial self-replication."
},
{
  "key": "molecular_assembler_engwerda_2020",
  "group": "Speculative manufacturing / molecular assembly",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Engwerda, A. H. J., et al. 2020. A molecular assembler that produces polymers. Nature Communications.",
  "url": "https://www.nature.com/articles/s41467-020-17814-0",
  "supports": "Reports a rudimentary synthetic molecular assembler that produces polymers, grounding the phrase in molecular-machine chemistry.",
  "limitation": "Molecular-scale polymerization demonstration; not a general-purpose nanofactory."
},
{
  "key": "apm_pitters_2024",
  "group": "Speculative manufacturing / atomically precise manufacturing",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Pitters, J., et al. 2024. Atomically Precise Manufacturing of Silicon Electronics. ACS / PMC.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10919096/",
  "supports": "Defines atomically precise manufacturing and reviews direct atom-control approaches for silicon electronics.",
  "limitation": "Semiconductor-scale APM source; not proof of molecular assemblers for arbitrary products."
},
{
  "key": "apm_umbrello_2018",
  "group": "Speculative manufacturing / atomically precise manufacturing",
  "tier": "Tier 1",
  "type": "Peer-reviewed assessment",
  "citation": "Umbrello, S. 2018. Evaluating future nanotechnology: The net societal impacts of atomically precise manufacturing. Futures.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0016328717301908",
  "supports": "States that atomically precise manufacturing does not currently exist and may or may not be feasible, supporting cautious wording.",
  "limitation": "Scenario/impact analysis rather than laboratory evidence."
},
{
  "key": "programmable_matter_goldstein",
  "group": "Materials / programmable matter",
  "tier": "Tier 1",
  "type": "Academic paper",
  "citation": "Goldstein, S. C., et al. Claytronics: A Scalable Basis for Future Robots. Carnegie Mellon University.",
  "url": "https://kilthub.cmu.edu/articles/journal_contribution/Claytronics_A_Scalable_Basis_For_Future_Robots/6604088",
  "supports": "Defines claytronics as programmable matter based on many coordinated modular robotic units.",
  "limitation": "Research vision/prototype context; not commercial programmable matter."
},
{
  "key": "shape_metamaterial_hwang_2022",
  "group": "Materials / programmable matter",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Hwang, D., et al. 2022. Shape morphing mechanical metamaterials through reversible plasticity. Science Robotics.",
  "url": "https://www.science.org/doi/10.1126/scirobotics.abg2171",
  "supports": "Shows mechanical-metamaterial routes toward reversible, programmable shape morphing.",
  "limitation": "Material demonstration; not room-scale programmable matter."
},
{
  "key": "shape_metamaterial_aip_2022",
  "group": "Materials / programmable matter",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Programmable shape-morphing of rose-shaped mechanical metamaterials. 2022. APL Materials.",
  "url": "https://pubs.aip.org/aip/apm/article/10/8/080701/2834994/Programmable-shape-morphing-of-rose-shaped",
  "supports": "Discusses mechanical metamaterial design for programmable shape morphing in applications such as grippers, stents, and wearable electronics.",
  "limitation": "Specific metamaterial architecture; does not support universal shape-changing rooms by itself."
},
{
  "key": "cloaking_khan_2024",
  "group": "Materials / metamaterials",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Khan, M. S., et al. 2024. A focused review on techniques for achieving cloaking using metamaterials. Optik.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0030402623010732",
  "supports": "Reviews metamaterial cloaking principles and techniques for manipulating electromagnetic waves.",
  "limitation": "Abstract-level source checked; popular invisibility claims need strong caveats."
},
{
  "key": "cloaking_vellucci_2021",
  "group": "Materials / metamaterials",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Vellucci, S., et al. 2021. From invisibility to intelligent antennas: A review of electromagnetic cloaking. EPJ Applied Metamaterials.",
  "url": "https://epjam.edp-open.org/articles/epjam/full_html/2021/01/epjam200028/epjam200028.html",
  "supports": "Reviews electromagnetic invisibility/cloaking concepts and applications such as antennas.",
  "limitation": "Cloaking is typically constrained by bandwidth, losses, geometry, and wavelength; do not imply consumer invisibility cloaks."
},
{
  "key": "self_cleaning_xue_2024",
  "group": "Materials / self-cleaning surfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Xue, S., et al. 2024. A comprehensive review on self-cleaning glass surfaces. Materials.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11514727/",
  "supports": "Reviews photocatalytic self-cleaning glass surfaces and mechanisms for contaminant breakdown.",
  "limitation": "Glass-focused; field durability depends on surface wear, fouling chemistry, and environment."
},
{
  "key": "self_cleaning_sherin_2025",
  "group": "Materials / self-cleaning surfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Sherin, T., et al. 2025. A comprehensive review on realization of self-cleaning surfaces. Discover Materials.",
  "url": "https://link.springer.com/article/10.1007/s40964-024-00734-6",
  "supports": "Reviews superhydrophobic, superhydrophilic, and photocatalytic pathways for self-cleaning surfaces.",
  "limitation": "Review source; not proof of maintenance-free buildings or roads."
},
{
  "key": "self_cleaning_zhang_2023",
  "group": "Materials / self-cleaning surfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Zhang, C., et al. 2023. Superior self-cleaning surfaces via the synergy of superhydrophobicity and photocatalysis. Journal of Cleaner Production.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S0959652623035886",
  "supports": "Identifies superhydrophobicity, photocatalytic activity, and durability as key properties for dual self-cleaning surfaces.",
  "limitation": "Abstract-level source checked; detailed performance metrics need full text."
},
{
  "key": "transparent_oled_planar_2020",
  "group": "Displays / transparent interfaces",
  "tier": "Tier 2",
  "type": "Industry technical guide",
  "citation": "Planar. 2020. Transparent OLED: 8 Things You Need to Know About Transparent OLED Technology.",
  "url": "https://www.planar.com/media/438854/ebook-transparent-oled.pdf",
  "supports": "Explains transparent OLED display structure, self-emitting behavior, transparency, and installation constraints.",
  "limitation": "Industry source; use for display-component context, not broad market claims."
},
{
  "key": "oled_info_transparent_2025",
  "group": "Displays / transparent interfaces",
  "tier": "Tier 2",
  "type": "Industry technology explainer",
  "citation": "OLED-Info. 2025. Transparent OLEDs: Introduction and Market Status.",
  "url": "https://www.oled-info.com/transparent-oleds",
  "supports": "Provides current context for transparent OLED technology and market status.",
  "limitation": "Specialized industry source; confirm with manufacturers for product-specific claims."
},
{
  "key": "ar_hmd_cheng_2021",
  "group": "Displays / AR-VR interfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Cheng, D., et al. 2021. Design and manufacture of AR head-mounted displays: A review. Light: Advanced Manufacturing.",
  "url": "https://www.light-am.com/fileGXJZZ/journal/article/xjzz/2021/3/PDF/LAM2020120035.pdf",
  "supports": "Reviews AR-HMD optical combiners, macro/micro/nano-optical manufacturing processes, bottlenecks, and development trends.",
  "limitation": "Head-mounted display focus; not transparent displays embedded everywhere."
},
{
  "key": "holographic_chang_2020",
  "group": "Displays / holography",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Chang, C., et al. 2020. Toward the next-generation VR/AR optics: A review of holographic near-eye displays from a human-centric perspective. Optica.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8208705/",
  "supports": "Reviews holographic near-eye display optics, human visual constraints, and VR/AR display tradeoffs.",
  "limitation": "Near-eye display source; does not prove room-scale free-space holograms."
},
{
  "key": "holographic_park_2022",
  "group": "Displays / holography",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Park, J.-H. 2022. Holographic techniques for augmented reality and virtual reality near-eye displays. Light: Advanced Manufacturing.",
  "url": "https://www.light-am.com/en/article/doi/10.37188/lam.2022.009",
  "supports": "Reviews holographic optical components and dynamic holographic display devices for AR/VR near-eye displays.",
  "limitation": "Focused on near-eye displays; room-scale holographic interfaces require additional evidence."
},
{
  "key": "waveguide_ar_ding_2023",
  "group": "Displays / AR-VR interfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Ding, Y., et al. 2023. Waveguide-based augmented reality displays. Light: Science & Applications.",
  "url": "https://link.springer.com/article/10.1186/s43593-023-00057-z",
  "supports": "Reviews waveguide structures, exit-pupil expansion, uniform eyebox design, and optical constraints for AR displays.",
  "limitation": "AR headset optics; not proof that city-scale AR layers are deployed."
},
{
  "key": "vr_haptics_shi_2024",
  "group": "Displays / AR-VR interfaces",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Shi, Y., et al. 2024. Haptic Sensing and Feedback Techniques toward Virtual Reality. Advanced Science / PMC.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10964227/",
  "supports": "Reviews haptic sensing and feedback hardware needed for more immersive VR systems.",
  "limitation": "Hardware review; full immersion also needs displays, tracking, content, ergonomics, and safety."
},
{
  "key": "rt_superconductors_sun_2024",
  "group": "Materials / superconductors",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Sun, Y., et al. 2024. Clathrate metal superhydrides under high-pressure conditions. National Science Review.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11173197/",
  "supports": "Reviews hydrogen-rich high-temperature superconductors stabilized under high pressure.",
  "limitation": "Supports high-pressure hydride research, not ambient-pressure room-temperature superconductors."
},
{
  "key": "rt_superconductors_hirsch_2024",
  "group": "Materials / superconductors",
  "tier": "Tier 1",
  "type": "Peer-reviewed critical analysis",
  "citation": "Hirsch, J. E. 2024. Are hydrides under high-pressure\u2013high-temperature superconductors? National Science Review.",
  "url": "https://academic.oup.com/nsr/article/11/7/nwad174/7202350",
  "supports": "Represents a skeptical view that existing high-pressure hydride evidence is not yet compelling enough for some claims.",
  "limitation": "Minority/critical view; should be presented as part of an active scientific dispute."
},
{
  "key": "rt_superconductors_science_retraction_2022",
  "group": "Materials / superconductors",
  "tier": "Tier 2",
  "type": "Science news / retraction coverage",
  "citation": "Science. 2022. Room-temperature superconductivity study retracted.",
  "url": "https://www.science.org/content/article/something-seriously-wrong-room-temperature-superconductivity-study-retracted",
  "supports": "Documents problems and retractions in room-temperature superconductivity claims, supporting cautious treatment of extraordinary claims.",
  "limitation": "News article; use as context alongside primary literature."
},
{
  "key": "rt_superconductors_roadblocks_2025",
  "group": "Materials / superconductors",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Roadblocks to ambient-pressure room-temperature superconductivity. 2025. Journal of Applied Physics.",
  "url": "https://pubs.aip.org/aip/jap/article/137/9/093903/3338176/Roadblocks-to-ambient-pressure-room-temperature",
  "supports": "Discusses why ambient-pressure room-temperature superconductivity remains a major challenge.",
  "limitation": "Field-level constraint source; verify exact claims before quoting."
},
{
  "key": "neural_fda_bci_2021",
  "group": "Medical / neural interfaces",
  "tier": "Tier 1",
  "type": "FDA guidance",
  "citation": "U.S. Food and Drug Administration. 2021. Implanted Brain-Computer Interface Devices for Patients with Paralysis or Amputation: Non-clinical Testing and Clinical Considerations.",
  "url": "https://www.fda.gov/media/120362/download",
  "supports": "Defines FDA considerations for implanted BCI devices interfacing with the nervous system for motor/sensory restoration.",
  "limitation": "Regulatory guidance, not proof of clinical adoption at scale."
},
{
  "key": "neural_gao_2025",
  "group": "Medical / neural interfaces",
  "tier": "Tier 1",
  "type": "GAO technology assessment",
  "citation": "U.S. Government Accountability Office. 2025. Science & Tech Spotlight: Brain-Computer Interfaces.",
  "url": "https://www.gao.gov/products/gao-25-107549",
  "supports": "Provides current public-sector context for BCI capabilities, applications, benefits, and policy issues.",
  "limitation": "High-level assessment; pair with FDA and clinical literature for device-specific claims."
},
{
  "key": "prosthetic_sensory_sensinger_2020",
  "group": "Medical / prosthetics",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Sensinger, J. W., and Dosen, S. 2020. A Review of Sensory Feedback in Upper-Limb Prostheses From the Perspective of Human Motor Control. Frontiers in Neuroscience.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7324654/",
  "supports": "Reviews sensory-feedback approaches for upper-limb prostheses and their relevance to control and embodiment.",
  "limitation": "Review source; clinical benefit depends on device, patient, and task."
},
{
  "key": "prosthetic_haptics_abd_2022",
  "group": "Medical / prosthetics",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Abd, M. A., et al. 2022. Multichannel haptic feedback unlocks prosthetic hand dexterity. Scientific Reports.",
  "url": "https://www.nature.com/articles/s41598-022-04953-1",
  "supports": "Supports the role of multichannel haptic feedback in improving prosthetic-hand function and embodiment-related outcomes.",
  "limitation": "Experimental context; not universal proof for all artificial limbs."
},
{
  "key": "senolytics_kirkland_2020",
  "group": "Medical / anti-aging",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Kirkland, J. L., and Tchkonia, T. 2020. Senolytic drugs: from discovery to translation. Journal of Internal Medicine.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32686219/",
  "supports": "Reviews senolytic drug discovery, early human pilot trials, and translation challenges.",
  "limitation": "Supports age-related disease research, not generalized human life-extension claims."
},
{
  "key": "senolytics_lelarge_2024",
  "group": "Medical / anti-aging",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Lelarge, V., et al. 2024. Senolytics: from pharmacological inhibitors to immunotherapies, a promising future? npj Aging.",
  "url": "https://www.nature.com/articles/s41514-024-00138-4",
  "supports": "Reviews senolytic classes, limitations, and clinical-development issues.",
  "limitation": "Field is early; do not imply approved broad anti-aging therapy."
},
{
  "key": "senolytics_clinicaltrials_nct04313634",
  "group": "Medical / anti-aging",
  "tier": "Tier 1",
  "type": "ClinicalTrials.gov record",
  "citation": "ClinicalTrials.gov. NCT04313634. Targeting Cellular Senescence With Senolytics to Improve Skeletal Health in Older Humans.",
  "url": "https://clinicaltrials.gov/study/NCT04313634",
  "supports": "Shows clinical testing of senolytic drugs for age-related biological outcomes in humans.",
  "limitation": "Trial record, not necessarily evidence of efficacy or approval."
},
{
  "key": "synthetic_blood_fda_2024",
  "group": "Medical / artificial blood",
  "tier": "Tier 1",
  "type": "FDA research page",
  "citation": "U.S. Food and Drug Administration. 2024. Evaluating the Safety and Efficacy of Hemoglobin-Based Blood Substitutes.",
  "url": "https://www.fda.gov/vaccines-blood-biologics/science-research-biologics/evaluating-safety-and-efficacy-hemoglobin-based-blood-substitutes",
  "supports": "Defines hemoglobin-based oxygen carriers and the safety/efficacy problem for artificial blood substitutes.",
  "limitation": "Regulatory/science context; not evidence of widely approved artificial blood."
},
{
  "key": "hbo_chens_2023",
  "group": "Medical / artificial blood",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Chen, L., et al. 2023. Hemoglobin-Based Oxygen Carriers: Where Are We Now in 2023? International Journal of Molecular Sciences.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9962799/",
  "supports": "Reviews failed and active hemoglobin-based oxygen-carrier products and translation issues.",
  "limitation": "Review source; artificial blood remains constrained by safety, regulation, and clinical-performance issues."
},
{
  "key": "nanomedicine_hua_2018",
  "group": "Medical / nanomedicine",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Hua, S., et al. 2018. Current Trends and Challenges in the Clinical Translation of Nanoparticulate Nanomedicines. Frontiers in Pharmacology.",
  "url": "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2018.00790/full",
  "supports": "Reviews nanoparticulate nanomedicine delivery mechanisms, passive/active targeting, triggered release, and translation barriers.",
  "limitation": "Nanomedicine source, not evidence of autonomous medical nanobots."
},
{
  "key": "nanobots_anto_2025",
  "group": "Medical / nanorobotics",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Anto, M., et al. 2025. Nano bio-robots: a new frontier in targeted therapeutic delivery. Frontiers / PMC.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12631375/",
  "supports": "Reviews nano/bio-robot concepts for targeted therapeutic delivery and notes actuation/control challenges.",
  "limitation": "Early-stage review; clinical autonomous nanorobots remain speculative."
},
{
  "key": "speech_translation_papi_2025",
  "group": "Computing / translation",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Papi, S., et al. 2025. How \u201cReal\u201d is Your Real-Time Simultaneous Speech-to-Text Translation? Transactions of the Association for Computational Linguistics.",
  "url": "https://aclanthology.org/2025.tacl-1.14.pdf",
  "supports": "Explains the quality-latency tradeoff in simultaneous speech translation and critiques unrealistic real-time assumptions.",
  "limitation": "Speech-to-text focus; speech-to-speech adds additional latency and voice synthesis constraints."
},
{
  "key": "speech_translation_liu_2024",
  "group": "Computing / translation",
  "tier": "Tier 1",
  "type": "Peer-reviewed conference review",
  "citation": "Liu, X., et al. 2024. Recent Advances in End-to-End Simultaneous Speech Translation. IJCAI.",
  "url": "https://www.ijcai.org/proceedings/2024/0900.pdf",
  "supports": "Reviews simultaneous speech translation challenges including long/continuous speech, quality-latency tradeoffs, and model architectures.",
  "limitation": "Research-review source; not evidence of universal translation across all languages and contexts."
},
{
  "key": "s2st_google_2025",
  "group": "Computing / translation",
  "tier": "Tier 2",
  "type": "Company research blog",
  "citation": "Google Research. 2025. Real-time speech-to-speech translation.",
  "url": "https://research.google/blog/real-time-speech-to-speech-translation/",
  "supports": "Describes current industry research on end-to-end real-time speech-to-speech translation and deployment-oriented latency constraints.",
  "limitation": "Company source for its own research; claims need peer-reviewed support before broad generalization."
},
{
  "key": "whole_brain_emulation_sandberg_2008",
  "group": "Computing / mind archives",
  "tier": "Tier 1",
  "type": "Oxford Future of Humanity Institute technical report",
  "citation": "Sandberg, A., and Bostrom, N. 2008. Whole Brain Emulation: A Roadmap. Future of Humanity Institute, University of Oxford.",
  "url": "https://ora.ox.ac.uk/objects/uuid:a6880196-34c7-47a0-80f1-74d32ab98788",
  "supports": "Defines whole-brain emulation requirements and technical roadmapping concepts for digital-mind discussions.",
  "limitation": "Speculative technical report; not evidence that personal identity transfer or digital immortality is achievable."
},
{
  "key": "wbe_mandelbaum_2022",
  "group": "Computing / mind archives",
  "tier": "Tier 1",
  "type": "Peer-reviewed philosophical/technical assessment",
  "citation": "Mandelbaum, E. 2022. The Prospects of Whole Brain Emulation within the Next Half-Century. PhilArchive copy.",
  "url": "https://philarchive.org/archive/MANEAM-4",
  "supports": "Assesses brain scanning, model translation, computation, and embodiment as required capabilities for whole-brain emulation.",
  "limitation": "Philosophical/forecasting source; identity and consciousness claims remain unresolved."
},
{
  "key": "home_robot_trust_2025",
  "group": "Consumer robotics",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "A Review on Human\u2013Robot Trust in Home Service Robots. 2025. ACM Computing Surveys.",
  "url": "https://dl.acm.org/doi/10.1145/3737893",
  "supports": "Reviews trust as a critical factor for adoption of home service robots in domestic environments.",
  "limitation": "Human-robot interaction source; not proof of general-purpose home robot readiness."
},
{
  "key": "domestic_robot_ethics_2019",
  "group": "Consumer robotics",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Responsible domestic robotics: exploring ethical implications of robots in the home. 2019. Journal of Information, Communication and Ethics in Society.",
  "url": "https://www.emerald.com/jices/article/17/2/246/214831/Responsible-domestic-robotics-exploring-ethical",
  "supports": "Identifies privacy, security, trust, identity, and user-autonomy issues for domestic robots.",
  "limitation": "Ethics and adoption framing; not hardware performance evidence."
},
{
  "key": "drone_delivery_review_2023",
  "group": "Consumer robotics / drones",
  "tier": "Tier 1",
  "type": "Peer-reviewed systematic review",
  "citation": "Drones in last-mile delivery: A systematic review on efficiency, accessibility, and sustainability. 2023. Transportation Research Part D.",
  "url": "https://www.sciencedirect.com/science/article/abs/pii/S1361920923002286",
  "supports": "Reviews drone delivery use cases, cost/emissions conditions, accessibility, and comparison with other delivery modes.",
  "limitation": "Abstract-level source checked; operational rules and performance depend on jurisdiction and route."
},
{
  "key": "faa_drone_delivery_part135",
  "group": "Consumer robotics / drones",
  "tier": "Tier 1",
  "type": "FAA regulatory page",
  "citation": "Federal Aviation Administration. Package Delivery by Drone, Part 135.",
  "url": "https://www.faa.gov/uas/advanced_operations/package_delivery_drone",
  "supports": "Documents FAA framework for drone package-delivery operations and integration into the national airspace.",
  "limitation": "Regulatory page; not a technology-performance source."
},
{
  "key": "distributed_recycling_kassab_2023",
  "group": "Consumer fabrication / recycling",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Kassab, A., et al. 2023. Advancing Plastic Recycling: Challenges and Opportunities in Distributed Recycling by Additive Manufacturing. Polymers.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10575100/",
  "supports": "Reviews distributed recycling by additive manufacturing and the process-chain challenges for converting waste into printer feedstocks.",
  "limitation": "Additive-manufacturing recycling focus; does not prove fully automated household recycling appliances."
},
{
  "key": "dram_sanchez_2020",
  "group": "Consumer fabrication / recycling",
  "tier": "Tier 1",
  "type": "Peer-reviewed systematic review",
  "citation": "Cruz Sanchez, F. A., et al. 2020. Plastic recycling in additive manufacturing: A systematic literature review and opportunities for the circular economy. Journal of Cleaner Production.",
  "url": "https://www.sciencedirect.com/science/article/pii/S0959652620316498",
  "supports": "Reviews distributed recycling via additive manufacturing and stages such as recovery, preparation, compounding, feedstock, printing, and quality.",
  "limitation": "Mostly thermoplastic/AM context; household universal recycling requires more separations and QA evidence."
},
{
  "key": "personal_fabrication_mit",
  "group": "Consumer fabrication / personal manufacturing",
  "tier": "Tier 1",
  "type": "Academic research survey page",
  "citation": "Baudisch, P., and Mueller, S. Personal Fabrication Research in HCI and Graphics. MIT CSAIL / HCI Engineering Group.",
  "url": "https://hcie.csail.mit.edu/fabpub/",
  "supports": "Surveys personal fabrication research and the path from prototyping tools toward broader consumer-scale fabrication.",
  "limitation": "Research-roadmap context, not evidence that universal fabrication appliances are mature."
},
{
  "key": "smart_mirror_miotto_2018",
  "group": "Medical / smart health rooms",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Miotto, R., et al. 2018. Reflecting health: smart mirrors for personalized medicine. npj Digital Medicine.",
  "url": "https://www.nature.com/articles/s41746-018-0068-7",
  "supports": "Discusses smart mirrors as proof-of-concept platforms for noninvasive monitoring, emotional-state detection, and personalized medicine.",
  "limitation": "Proof-of-concept framing; not a validated diagnostic replacement."
},
{
  "key": "smart_mirror_iom_2024",
  "group": "Medical / smart health rooms",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Fatima, H., et al. 2024. Internet-of-Mirrors for connected healthcare and beauty. Internet of Things and Cyber-Physical Systems.",
  "url": "https://www.sciencedirect.com/science/article/pii/S2542660524003561",
  "supports": "Proposes smart mirrors as connected visual dashboards with sensing/communication for health and beauty services.",
  "limitation": "Concept/system proposal; clinical validation is limited."
},
{
  "key": "wearable_air_purifier_bergmann_2024",
  "group": "Personal environmental systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed clinical/allergen study",
  "citation": "Bergmann, K. C., et al. 2024. Individual wearable air purifier protects against pollen, house dust mite, and cat allergens. Allergy, Asthma & Clinical Immunology.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10975740/",
  "supports": "Tests a wearable air purifier against allergen exposure, relevant to personal filtration concepts.",
  "limitation": "Specific device and exposure conditions; not proof of protective personal air bubbles."
},
{
  "key": "consumer_reports_air_purifiers_2025",
  "group": "Personal environmental systems",
  "tier": "Tier 2",
  "type": "Testing/consumer technical guide",
  "citation": "Consumer Reports. 2025. Air Purifier Buying Guide.",
  "url": "https://www.consumerreports.org/appliances/air-purifiers/buying-guide/",
  "supports": "Explains CADR and HEPA filter performance concepts for air-cleaning devices.",
  "limitation": "Room purifier guide; wearable/personal filtration requires separate aerodynamic and exposure evidence."
},
{
  "key": "personal_cooling_ren_2022",
  "group": "Personal environmental systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Ren, S., et al. 2022. Personal Cooling Garments: A Review. Polymers.",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9785808/",
  "supports": "Reviews personal cooling garments, mechanisms, heat-stress reduction, and design constraints.",
  "limitation": "Cooling garments only; active heating/cooling clothing and energy storage require additional sources."
},
{
  "key": "wearable_cooling_raza_2025",
  "group": "Personal environmental systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Raza, W., et al. 2025. Enhancing thermal comfort: a comprehensive review of wearable cooling systems. Next Energy.",
  "url": "https://www.sciencedirect.com/science/article/pii/S2949822825002801",
  "supports": "Reviews wearable cooling systems as localized alternatives to whole-space conditioning and discusses operating principles and testing.",
  "limitation": "Abstract-level source checked; claims about energy savings should be verified in full text."
},
{
  "key": "smart_adaptive_homes_goessler_2023",
  "group": "Consumer spaces / adaptive rooms",
  "tier": "Tier 1",
  "type": "Peer-reviewed article",
  "citation": "Goessler, T., et al. 2023. Smart Adaptive Homes and Their Potential to Improve Space Efficiency and Personalisation. Buildings.",
  "url": "https://www.mdpi.com/2075-5309/13/5/1132",
  "supports": "Connects smart technologies, adaptive homes, flexibility, and space efficiency in small urban dwellings.",
  "limitation": "Housing/adaptive-home analysis; not proof of robotic shape-changing furniture at scale."
},
{
  "key": "adaptive_furniture_transform_mit",
  "group": "Consumer spaces / adaptive rooms",
  "tier": "Tier 2",
  "type": "MIT Media Lab project page",
  "citation": "MIT Media Lab / Tangible Media Group. TRANSFORM: Dynamic and Adaptive Furniture.",
  "url": "https://virj.io/-transform-adaptive-furniture",
  "supports": "Demonstrates shape-display concepts applied to dynamic/adaptive furniture and interactive physical surfaces.",
  "limitation": "Research/prototype project; not commercial readiness evidence."
},
{
  "key": "swarm_robotics_dorigo_2021",
  "group": "Robotics / swarm systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Dorigo, M., et al. 2021. Swarm Robotics: Past, Present, and Future. Proceedings of the IEEE.",
  "url": "https://crca.cbi-toulouse.fr/wp-content/uploads/2022/04/123.pdf",
  "supports": "Reviews the development of swarm robotics and the engineering challenge of deploying useful robot swarms in real environments.",
  "limitation": "Field-level review; not proof of city-scale maintenance swarms."
},
{
  "key": "swarm_robotics_shahzad_2023",
  "group": "Robotics / swarm systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Shahzad, M. M., et al. 2023. A Review of Swarm Robotics in a Nutshell. Drones 7(4), 269.",
  "url": "https://www.mdpi.com/2504-446X/7/4/269",
  "supports": "Defines swarm robotics as coordination of multiple robots for collective tasks and reviews applications and challenges.",
  "limitation": "Review source; most large-scale applications remain research-stage."
},
{
  "key": "swarm_robotics_dias_2021",
  "group": "Robotics / swarm systems",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Dias, P. G. F., et al. 2021. Swarm Robotics: A Perspective on the Latest Reviewed Concepts and Applications. Sensors.",
  "url": "https://pure.hw.ac.uk/ws/portalfiles/portal/44447821/sensors_21_02062.pdf",
  "supports": "Reviews swarm robotics applications including inspection, maintenance, medicine, agriculture, and manufacturing systems.",
  "limitation": "Review source; emphasizes that real applications are still limited."
},
{
  "key": "exoskeleton_ralfs_2023",
  "group": "Robotics / exoskeletons",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Ralfs, L., et al. 2023. Insights into evaluating and using industrial exoskeletons. International Journal of Industrial Ergonomics.",
  "url": "https://www.sciencedirect.com/science/article/pii/S0169814123000860",
  "supports": "Reviews industrial exoskeleton evaluation, ergonomics, and workplace application considerations.",
  "limitation": "Abstract-level source checked; device-specific performance requires lab/field data."
},
{
  "key": "exoskeleton_nasr_2025",
  "group": "Robotics / exoskeletons",
  "tier": "Tier 1",
  "type": "Peer-reviewed review",
  "citation": "Nasr, A., et al. 2025. Safety in Wearable Robotic Exoskeletons: Design, Control, and Regulatory Considerations. ASME Journal of Mechanisms and Robotics.",
  "url": "https://asmedigitalcollection.asme.org/mechanismsrobotics/article/17/5/050801/1207334/Safety-in-Wearable-Robotic-Exoskeletons-Design",
  "supports": "Reviews mechanical, control, regulatory, and ethical safety challenges for exoskeleton technologies.",
  "limitation": "Review source; not proof of broad adoption."
},
{
  "key": "exoskeleton_pote_2023",
  "group": "Robotics / exoskeletons",
  "tier": "Tier 1",
  "type": "Peer-reviewed ethics/safety paper",
  "citation": "Pote, T. R., Asbeck, N. V., and Asbeck, A. T. 2023. The Ethics of Mandatory Exoskeleton Use in Commercial and Industrial Settings. IEEE Transactions on Technology and Society.",
  "url": "https://vtechworks.lib.vt.edu/bitstreams/ad217288-a819-4fac-80ea-90cc64119de3/download",
  "supports": "Discusses industrial exoskeleton benefits, risks, worker autonomy, and potential mandates.",
  "limitation": "Ethics-focused; not detailed actuation or manufacturing evidence."
},
{
  "key": "neural_bci_gao_2025",
  "group": "Medical / neural interfaces",
  "tier": "Tier 1",
  "type": "GAO technology assessment",
  "citation": "U.S. Government Accountability Office. 2025. Brain-Computer Interfaces: Benefits and Policy Issues.",
  "url": "https://www.gao.gov/products/gao-25-107549",
  "supports": "Provides government overview of BCI applications and policy concerns.",
  "limitation": "High-level assessment; not a device-level clinical source."
},
{
  "key": "cultivated_meat_fao_who_2023",
  "group": "Biomanufacturing / food systems",
  "tier": "Tier 1",
  "type": "FAO/WHO technical report",
  "citation": "FAO and WHO. 2023. Food Safety Aspects of Cell-Based Food.",
  "url": "https://www.fao.org/3/cc4855en/cc4855en.pdf",
  "supports": "Reviews production, safety, and regulatory issues for cultivated/cell-based food.",
  "limitation": "Safety/regulatory source; not proof of replicator-like consumer machines."
}
];

const GLOBAL_SOURCE_KEYS = ["nasem_chemeng_2022", "nasa_trl", "gao_tra_2020", "dod_mrl_2016", "fernandez_readiness_2010"];

const CATEGORY_SOURCE_KEYS = {
  "Clean Energy Civilization": ["nasem_deep_decarbonization_2020", "iea_hydrogen_2024", "doe_ldes_liftoff_2023", "doe_ldes_2030_2024", "doe_solar_fuels_2026"],
  "Carbon and Atmospheric Engineering": ["nasem_deep_decarbonization_2020", "iea_ccus_2024", "iea_dac_2024", "nasem_negative_emissions_dac_2019", "doe_industrial_decarb_2022"],
  "Future Water Systems": ["nasem_desalination_2008", "nasem_water_reuse_2012", "epa_water_reuse_2026", "sholl_lively_2016", "epa_pfas_guidance_2024"],
  "Future Materials and Smart Surfaces": ["iea_critical_minerals_2025", "usgs_mcs_2025", "graphene_go_membranes_2024", "self_healing_polymer_wang_2020", "radiative_cooling_huang_2024"],
  "Advanced Manufacturing and Microfactories": ["nasem_smart_manufacturing_2024", "nist_smart_manufacturing_2024", "nist_sms_testbed_2020", "nist_digital_twins_2024", "ostp_advanced_manufacturing_2022"],
  "Future Cities and Built Environments": ["nasem_deep_decarbonization_2020", "doe_electrochromic_windows_2023", "usda_cea_2024", "epa_water_reuse_2026", "nasem_digital_twins_2023"],
  "Transportation and Mobility": ["faa_aam_i28_2023", "nasa_aam_2026", "nasem_aam_2020", "nasa_eap_oig_2023", "nasa_eap_2026"],
  "Biomanufacturing, Medicine, and Human Augmentation": ["nist_biomanufacturing_2023", "nasem_biomanufacturing_2023", "fda_etp_2026", "fda_organs_on_chips_2019", "organ_chip_ma_2020"],
  "Computing, Semiconductors, and Ambient Intelligence": ["nist_chips_metrology_2023", "nist_chips_gaps_2023", "nasem_quantum_2019", "iea_data_centres_2023", "iea_ai_energy_2025"],
  "Space and Off-World Industry": ["nasa_isru_2023", "nasa_eclss_2025", "esa_melissa", "nasem_life_support_1997", "nasa_sbsp_2024"]
};

const TECHNOLOGY_SOURCE_OVERRIDES = {
  "fusion-power-plants": ["fusion_nasem_2019", "fusion_fesac_2020", "fusion_gao_2025", "fusion_epri_blankets_2024"],
  "space-based-solar-power": ["nasa_sbsp_2024", "nasa_sbsp_article_2024", "esa_solaris_2024", "nasem_deep_decarbonization_2020"],
  "direct-air-capture-cities": ["iea_dac_2024", "nasem_negative_emissions_dac_2019", "iea_ccus_2024", "iea_ccus_2020", "sholl_lively_2016"],
  "synthetic-fuel-from-air-and-water": ["saf_nrel_2024", "saf_afdc", "saf_ozkan_2024", "iea_hydrogen_2024", "iea_dac_2024"],
  "green-hydrogen-cities": ["iea_hydrogen_2024", "iea_hydrogen_2025", "doe_chemical_bandwidth_2015", "nasem_deep_decarbonization_2020"],
  "green-ammonia-fuel": ["iea_ammonia_2021", "iea_hydrogen_2024", "iea_hydrogen_2025", "doe_industrial_decarb_2022"],
  "carbon-negative-concrete": ["cement_iea_2024", "cement_iea_roadmap_2018", "cement_driver_2024", "iea_ccus_2024"],
  "low-carbon-steel": ["iea_steel_2020", "doe_industrial_decarb_2022", "nasem_deep_decarbonization_2020", "iea_hydrogen_2024"],
  "carbon-negative-plastics": ["iea_ccus_2024", "nasem_negative_emissions_dac_2019", "doe_chemical_bandwidth_2015", "saf_ozkan_2024"],
  "industrial-waste-heat-networks": ["doe_industrial_decarb_2022", "nasem_deep_decarbonization_2020", "doe_chemical_bandwidth_2015", "sholl_lively_2016"],
  "artificial-photosynthesis": ["doe_solar_fuels_2026", "artificial_photosynthesis_machin_2023", "iea_hydrogen_2024", "saf_ozkan_2024"],
  "thermal-batteries": ["doe_ldes_liftoff_2023", "doe_ldes_2030_2024", "doe_industrial_decarb_2022", "nasem_deep_decarbonization_2020"],
  "grid-scale-flow-batteries": ["doe_ldes_liftoff_2023", "doe_ldes_2030_2024", "iea_critical_minerals_2025", "sholl_lively_2016"],
  "ambient-geothermal-networks": ["doe_industrial_decarb_2022", "nasem_deep_decarbonization_2020", "doe_chemical_bandwidth_2015", "sholl_lively_2016"],
  "methane-pyrolysis-for-clean-hydrogen": ["iea_hydrogen_2024", "iea_hydrogen_2025", "doe_industrial_decarb_2022", "doe_chemical_bandwidth_2015"],
  "atmospheric-water-harvesting": ["awh_ahrestani_2023", "awh_hanikel_2020", "awh_kim_2018", "awh_ejeian_2021", "awh_chu_2024", "awh_wang_2023"],
  "desalination-megastructures": ["nasem_desalination_2008", "usgs_desalination_2019", "doe_desal_basics_2026", "sholl_lively_2016"],
  "brine-mining": ["nrel_lithium_brines_2021", "iea_critical_minerals_2025", "usgs_mcs_2025", "sholl_lively_2016"],
  "self-cleaning-city-water-systems": ["epa_water_reuse_2026", "nasem_water_reuse_2012", "sholl_lively_2016", "epa_pfas_guidance_2024"],
  "pfas-destruction-systems": ["epa_pfas_guidance_2024", "sholl_lively_2016", "nasem_water_reuse_2012", "doe_chemical_bandwidth_2015"],
  "wastewater-to-drinking-water-systems": ["nasem_water_reuse_2012", "epa_water_reuse_2026", "sholl_lively_2016", "nasem_desalination_2008"],
  "city-scale-nutrient-recovery": ["epa_water_reuse_2026", "nasem_water_reuse_2012", "iea_ammonia_2021", "sholl_lively_2016"],
  "smart-stormwater-infrastructure": ["epa_water_reuse_2026", "nasem_water_reuse_2012", "sholl_lively_2016", "usgs_desalination_2019"],
  "modular-emergency-water-units": ["epa_water_reuse_2026", "nasem_water_reuse_2012", "nasem_desalination_2008", "sholl_lively_2016"],
  "closed-loop-building-water": ["epa_water_reuse_2026", "nasem_water_reuse_2012", "sholl_lively_2016", "usgs_desalination_2019"],
  "smart-glass-buildings": ["doe_electrochromic_windows_2023", "nasem_deep_decarbonization_2020", "nist_chips_metrology_2023", "doe_chemical_bandwidth_2015"],
  "self-healing-concrete": ["cement_iea_2024", "cement_iea_roadmap_2018", "cement_driver_2024", "self_healing_polymer_wang_2020"],
  "adaptive-building-skins": ["doe_electrochromic_windows_2023", "radiative_cooling_huang_2024", "doe_industrial_decarb_2022", "doe_chemical_bandwidth_2015"],
  "radiative-cooling-materials": ["radiative_cooling_huang_2024", "aerogel_insulation_lu_2024", "doe_electrochromic_windows_2023", "nasem_deep_decarbonization_2020"],
  "transparent-solar-windows": ["doe_electrochromic_windows_2023", "nist_chips_metrology_2023", "usgs_mcs_2025", "iea_critical_minerals_2025"],
  "3d-printed-buildings": ["cement_iea_2024", "cement_driver_2024", "doe_industrial_decarb_2022", "nasem_smart_manufacturing_2024"],
  "living-buildings": ["usda_cea_2024", "epa_water_reuse_2026", "nasem_water_reuse_2012", "doe_electrochromic_windows_2023"],
  "urban-vertical-farms": ["usda_cea_2024", "usda_vertical_2025", "vertical_engler_2021", "vertical_mills_2025"],
  "autonomous-waste-sorting-facilities": ["nasem_smart_manufacturing_2024", "nist_smart_manufacturing_2024", "nist_sms_testbed_2020", "ostp_advanced_manufacturing_2022"],
  "city-scale-digital-twins": ["nasem_digital_twins_2023", "nist_digital_twins_2024", "nasem_smart_manufacturing_2024", "iea_data_centres_2023"],
  "urban-heat-island-reversal-systems": ["radiative_cooling_huang_2024", "doe_electrochromic_windows_2023", "nasem_deep_decarbonization_2020", "usda_cea_2024"],
  "flying-cars-evtol-air-taxis": ["faa_aam_i28_2023", "nasa_aam_2026", "nasem_aam_2020", "aam_dot_2025"],
  "hydrogen-aircraft": ["nasa_eap_oig_2023", "nasa_eap_2026", "iea_hydrogen_2024", "saf_nrel_2024"],
  "electric-aviation": ["nasa_eap_oig_2023", "nasa_eap_2026", "faa_aam_i28_2023", "nasem_aam_2020"],
  "wireless-road-charging": ["iea_critical_minerals_2025", "usgs_mcs_2025", "nasem_deep_decarbonization_2020", "doe_ldes_liftoff_2023"],
  "autonomous-factories": ["nasem_smart_manufacturing_2024", "nist_smart_manufacturing_2024", "nist_sms_testbed_2020", "nist_digital_twins_2024"],
  "factory-in-a-box": ["rapid_process_intensification", "nasem_smart_manufacturing_2024", "nist_sms_testbed_2020", "ostp_advanced_manufacturing_2022"],
  "additive-manufacturing-of-metal-parts": ["nasem_smart_manufacturing_2024", "nist_smart_manufacturing_2024", "nist_digital_twins_2024", "ostp_advanced_manufacturing_2022"],
  "roll-to-roll-printed-electronics": ["printed_inks_2024", "printed_transfer_corbett_2017", "doe_chemical_bandwidth_2015", "nist_smart_manufacturing_2024"],
  "micromodular-printed-electronics": ["printed_roelkens_2024", "printed_transfer_corbett_2017", "printed_inks_2024", "nist_chips_metrology_2023"],
  "ai-guided-process-development": ["nasem_digital_twins_2023", "nist_digital_twins_2024", "nasem_smart_manufacturing_2024", "ostp_advanced_manufacturing_2022"],
  "lights-out-semiconductor-fabs": ["nist_chips_metrology_2023", "nist_chips_gaps_2023", "itrs_yield_2015", "lights_out_factory_2024"],
  "on-demand-pharmaceutical-factories": ["fda_etp_2026", "fda_amt_2025", "fda_emerging_examples_2025", "barda_vaccines_on_demand"],
  "modular-biomanufacturing": ["nist_biomanufacturing_2023", "nasem_biomanufacturing_2023", "barda_vaccines_on_demand", "ostp_advanced_manufacturing_2022"],
  "self-optimizing-chemical-plants": ["nasem_smart_manufacturing_2024", "nist_digital_twins_2024", "nasem_digital_twins_2023", "rapid_process_intensification"],
  "graphene-membranes": ["graphene_go_membranes_2024", "graphene_membranes_liu_2015", "sholl_lively_2016", "nasem_desalination_2008"],
  "carbon-nanotube-elevators-cables": ["cnt_space_elevator_popescu_2018", "usgs_mcs_2025", "iea_critical_minerals_2025", "doe_chemical_bandwidth_2015"],
  "smart-clothing": ["radiative_cooling_huang_2024", "printed_inks_2024", "self_healing_polymer_wang_2020", "iea_critical_minerals_2025"],
  "anti-icing-materials": ["anti_icing_huang_2022", "anti_icing_mao_2024", "doe_chemical_bandwidth_2015", "self_healing_polymer_wang_2020"],
  "aerogel-insulation-cities": ["aerogel_insulation_lu_2024", "radiative_cooling_huang_2024", "doe_electrochromic_windows_2023", "nasem_deep_decarbonization_2020"],
  "self-healing-polymers": ["self_healing_polymer_wang_2020", "doe_chemical_bandwidth_2015", "printed_inks_2024", "iea_critical_minerals_2025"],
  "metamaterial-sound-control": ["acoustic_metamaterials_aydin_2024", "nasem_smart_manufacturing_2024", "nist_smart_manufacturing_2024", "ostp_advanced_manufacturing_2022"],
  "lab-grown-organs": ["tissue_ikada_2006", "tissue_mccorry_2022", "tissue_zuncheddu_2021", "fda_organs_on_chips_2019"],
  "cultivated-meat": ["nist_biomanufacturing_2023", "nasem_biomanufacturing_2023", "usda_cea_2024", "doe_chemical_bandwidth_2015"],
  "personalized-medicine-factories": ["fda_etp_2026", "fda_amt_2025", "fda_emerging_examples_2025", "nist_biomanufacturing_2023"],
  "organ-on-chip-drug-testing": ["fda_organs_on_chips_2019", "organ_chip_ma_2020", "tissue_mccorry_2022", "tissue_zuncheddu_2021"],
  "quantum-computers": ["nasem_quantum_2019", "nist_quantum_2025", "nist_chips_metrology_2023", "nist_chips_gaps_2023"],
  "neuromorphic-computing": ["nist_chips_metrology_2023", "nist_chips_gaps_2023", "nasem_smart_manufacturing_2024", "iea_data_centres_2023"],
  "ai-assistants-embedded-everywhere": ["iea_ai_energy_2025", "iea_data_centres_2023", "nist_chips_metrology_2023", "nasem_smart_manufacturing_2024"],
  "autonomous-scientific-discovery": ["nasem_digital_twins_2023", "nist_digital_twins_2024", "nasem_smart_manufacturing_2024", "artificial_photosynthesis_machin_2023"],
  "lunar-oxygen-production": ["nasa_isru_2023", "nasa_eclss_2025", "nasa_mars_isru_2012", "nasem_life_support_1997"],
  "mars-fuel-production": ["nasa_isru_2023", "nasa_mars_isru_2012", "nasa_eclss_2025", "iea_hydrogen_2024"],
  "closed-loop-life-support": ["nasa_eclss_2025", "esa_melissa", "nasem_life_support_1997", "nasem_water_reuse_2012"],
  "space-habitats": ["nasa_eclss_2025", "esa_melissa", "nasem_life_support_1997", "nasa_isru_2023"],
  "asteroid-mining": ["nasa_isru_2023", "usgs_mcs_2025", "iea_critical_minerals_2025", "nasem_life_support_1997"],
  "orbital-manufacturing": ["nasa_isru_2023", "rapid_process_intensification", "nasem_smart_manufacturing_2024", "nasa_sbsp_2024"],
  "space-elevators": ["cnt_space_elevator_popescu_2018", "nasa_isru_2023", "usgs_mcs_2025", "iea_critical_minerals_2025"],
  "terraforming-concepts": ["nasa_eclss_2025", "nasem_life_support_1997", "nasa_isru_2023", "nasem_negative_emissions_dac_2019"],
  "pneumatic-waste-networks": ["waste_farre_2023", "waste_nakou_2014", "epa_smm_2026", "nasem_smart_manufacturing_2024"],
  "underground-logistics-networks": ["underground_logistics_hu_2025", "underground_logistics_milinkovic_2015", "tube_freight_soumaya_2026", "nasem_smart_manufacturing_2024"],
  "modular-megastructure-cities": ["modular_wbdg_offsite", "modular_nibs_aia_guide", "modular_zohourian_2025", "modular_li_2023"],
  "climate-controlled-pedestrian-corridors": ["cool_walkability_litman_2025", "cool_corridor_iroz_2024", "city_heat_negev_2020", "pedestrian_path_melnikov_2022"],
  "hyperloop-style-transport": ["hyperloop_volpe_2016", "hyperloop_morpc_2020", "gao_tra_2020", "nasa_trl"],
  "autonomous-electric-transit-pods": ["autonomous_shuttle_fta_2025", "autonomous_shuttle_iclodean_2020", "low_speed_shuttles_volpe_2018", "nchrp_cav_maintenance_2024"],
  "maglev-trains": ["maglev_fra_2005", "maglev_huang_2024", "usgs_mcs_2025", "nchrp_cav_maintenance_2024"],
  "self-healing-roads": ["self_healing_asphalt_anupam_2022", "self_healing_asphalt_abejon_2021", "self_healing_asphalt_jwaida_2024", "self_healing_polymer_wang_2020"],
  "robotic-construction-fleets": ["construction_robotics_melenbrink_2020", "construction_robotics_parascho_2023", "niosh_construction_robotics_2024", "nasem_smart_manufacturing_2024"],
  "smart-highways": ["fhwa_av_infrastructure_2021", "nchrp_cav_maintenance_2024", "smart_roads_trubia_2020", "autonomous_shuttle_fta_2025"],
  "self-replicating-manufacturing-systems": ["self_replicating_nasa_1982", "self_replicating_ellery_2016", "self_replicating_modular_abdelrahman_2022", "rapid_process_intensification"],
  "molecular-assemblers": ["molecular_assembler_engwerda_2020", "apm_pitters_2024", "apm_umbrello_2018", "self_replicating_ellery_2016"],
  "programmable-matter": ["programmable_matter_goldstein", "shape_metamaterial_hwang_2022", "shape_metamaterial_aip_2022", "self_replicating_modular_abdelrahman_2022"],
  "swarm-robotics": ["swarm_robotics_dorigo_2021", "swarm_robotics_shahzad_2023", "swarm_robotics_dias_2021", "nasem_smart_manufacturing_2024"],
  "robotic-maintenance-cities": ["construction_robotics_melenbrink_2020", "swarm_robotics_dias_2021", "niosh_construction_robotics_2024", "nchrp_cav_maintenance_2024"],
  "exoskeleton-suits": ["exoskeleton_ralfs_2023", "exoskeleton_nasr_2025", "exoskeleton_pote_2023", "niosh_construction_robotics_2024"],
  "cloaking-materials": ["cloaking_khan_2024", "cloaking_vellucci_2021", "acoustic_metamaterials_aydin_2024", "radiative_cooling_huang_2024"],
  "self-cleaning-surfaces": ["self_cleaning_xue_2024", "self_cleaning_sherin_2025", "self_cleaning_zhang_2023", "anti_icing_mao_2024"],
  "shape-shifting-materials": ["shape_metamaterial_hwang_2022", "shape_metamaterial_aip_2022", "self_healing_polymer_wang_2020", "programmable_matter_goldstein"],
  "transparent-displays-everywhere": ["transparent_oled_planar_2020", "oled_info_transparent_2025", "ar_hmd_cheng_2021", "waveguide_ar_ding_2023"],
  "holographic-interfaces": ["holographic_chang_2020", "holographic_park_2022", "waveguide_ar_ding_2023", "ar_hmd_cheng_2021"],
  "room-temperature-superconductors": ["rt_superconductors_sun_2024", "rt_superconductors_hirsch_2024", "rt_superconductors_science_retraction_2022", "rt_superconductors_roadblocks_2025"],
  "bio-inspired-structural-materials": ["self_healing_polymer_wang_2020", "shape_metamaterial_hwang_2022", "aerogel_insulation_lu_2024", "modular_zohourian_2025"],
  "neural-interfaces": ["neural_fda_bci_2021", "neural_gao_2025", "neural_bci_gao_2025", "fda_organs_on_chips_2019"],
  "artificial-limbs-with-touch-feedback": ["prosthetic_sensory_sensinger_2020", "prosthetic_haptics_abd_2022", "neural_fda_bci_2021", "tissue_mccorry_2022"],
  "anti-aging-therapies": ["senolytics_kirkland_2020", "senolytics_lelarge_2024", "senolytics_clinicaltrials_nct04313634", "fda_etp_2026"],
  "synthetic-blood": ["synthetic_blood_fda_2024", "hbo_chens_2023", "fda_emerging_examples_2025", "tissue_mccorry_2022"],
  "medical-nanobots": ["nanomedicine_hua_2018", "nanobots_anto_2025", "neural_fda_bci_2021", "fda_amt_2025"],
  "cybernetic-implants": ["neural_fda_bci_2021", "neural_gao_2025", "prosthetic_sensory_sensinger_2020", "prosthetic_haptics_abd_2022"],
  "fully-immersive-vr-worlds": ["holographic_chang_2020", "holographic_park_2022", "vr_haptics_shi_2024", "iea_data_centres_2023"],
  "augmented-reality-cities": ["waveguide_ar_ding_2023", "ar_hmd_cheng_2021", "holographic_park_2022", "smart_roads_trubia_2020"],
  "universal-real-time-translation": ["speech_translation_papi_2025", "speech_translation_liu_2024", "s2st_google_2025", "iea_ai_energy_2025"],
  "digital-immortality-mind-archives": ["whole_brain_emulation_sandberg_2008", "wbe_mandelbaum_2022", "neural_gao_2025", "iea_data_centres_2023"],
  "replicator-like-food-machines": ["distributed_recycling_kassab_2023", "dram_sanchez_2020", "cultivated_meat_fao_who_2023", "usda_cea_2024"],
  "household-recycling-machines": ["distributed_recycling_kassab_2023", "dram_sanchez_2020", "epa_smm_2026", "nasem_smart_manufacturing_2024"],
  "smart-mirrors-health-rooms": ["smart_mirror_miotto_2018", "smart_mirror_iom_2024", "fda_amt_2025", "neural_fda_bci_2021"],
  "personal-air-filtration-bubbles": ["wearable_air_purifier_bergmann_2024", "consumer_reports_air_purifiers_2025", "epa_pfas_guidance_2024", "nasem_water_reuse_2012"],
  "home-robots": ["home_robot_trust_2025", "domestic_robot_ethics_2019", "nasem_smart_manufacturing_2024", "nist_digital_twins_2024"],
  "universal-fabrication-appliances": ["personal_fabrication_mit", "distributed_recycling_kassab_2023", "dram_sanchez_2020", "nasem_smart_manufacturing_2024"],
  "personal-climate-control-clothing": ["personal_cooling_ren_2022", "wearable_cooling_raza_2025", "radiative_cooling_huang_2024", "printed_inks_2024"],
  "adaptive-furniture-shape-changing-rooms": ["smart_adaptive_homes_goessler_2023", "adaptive_furniture_transform_mit", "shape_metamaterial_hwang_2022", "programmable_matter_goldstein"],
  "personal-drone-assistants": ["drone_delivery_review_2023", "faa_drone_delivery_part135", "swarm_robotics_dias_2021", "consumer_reports_air_purifiers_2025"]
};

const CHEMICAL_SOURCE_KEYS = {
  Hydrogen: ["iea_hydrogen_2024", "iea_hydrogen_2025", "doe_chemical_bandwidth_2015"],
  "Carbon dioxide": ["iea_ccus_2024", "iea_ccus_2020", "cement_driver_2024"],
  Ammonia: ["iea_ammonia_2021", "iea_hydrogen_2024"],
  Methanol: ["saf_ozkan_2024", "doe_chemical_bandwidth_2015"],
  Methane: ["nasa_mars_isru_2012", "doe_chemical_bandwidth_2015"],
  Syngas: ["saf_nrel_2024", "saf_ozkan_2024"],
  Oxygen: ["nasa_eclss_2025", "nasa_mars_isru_2012", "nasa_isru_2023"],
  Nitrogen: ["iea_ammonia_2021", "doe_chemical_bandwidth_2015"],
  Water: ["awh_ahrestani_2023", "nasa_eclss_2025", "sholl_lively_2016"],
  "Sulfuric acid": ["usgs_mcs_2025", "doe_chemical_bandwidth_2015"],
  "Sodium hydroxide": ["doe_chemical_bandwidth_2015", "sholl_lively_2016"],
  Chlorine: ["doe_chemical_bandwidth_2015", "sholl_lively_2016"],
  Silicon: ["usgs_mcs_2025", "nist_chips_metrology_2023"],
  Lithium: ["iea_critical_minerals_2025", "usgs_mcs_2025", "fusion_epri_blankets_2024"],
  Sodium: ["usgs_mcs_2025", "doe_chemical_bandwidth_2015"],
  Nickel: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  Cobalt: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  Manganese: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  Copper: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  Aluminum: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  "Rare earth elements": ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  Graphite: ["iea_critical_minerals_2025", "usgs_mcs_2025"],
  "Cement/concrete chemistries": ["cement_iea_2024", "cement_iea_roadmap_2018", "cement_driver_2024"],
  Polymers: ["doe_chemical_bandwidth_2015", "printed_inks_2024", "self_healing_polymer_wang_2020"],
  "Conductive inks": ["printed_inks_2024", "printed_roelkens_2024"],
  Photoresists: ["nist_chips_metrology_2023", "nist_chips_gaps_2023", "itrs_yield_2015"],
  Solvents: ["doe_chemical_bandwidth_2015", "sholl_lively_2016"],
  Electrolytes: ["iea_critical_minerals_2025", "iea_hydrogen_2024"],
  Sorbents: ["awh_hanikel_2020", "awh_ejeian_2021", "iea_ccus_2024"],
  Membranes: ["sholl_lively_2016", "awh_ahrestani_2023", "graphene_go_membranes_2024", "graphene_membranes_liu_2015"],
  Catalysts: ["doe_chemical_bandwidth_2015", "iea_hydrogen_2024", "saf_ozkan_2024", "artificial_photosynthesis_machin_2023"],
  "Biomass-derived feedstocks": ["saf_nrel_2024", "vertical_usda_2024"]
};

const UNIT_OPERATION_SOURCE_KEYS = {
  Electrolysis: ["iea_hydrogen_2024", "iea_hydrogen_2025", "nasa_eclss_2025"],
  Catalysis: ["doe_chemical_bandwidth_2015", "saf_ozkan_2024", "iea_ammonia_2021"],
  Adsorption: ["awh_ejeian_2021", "awh_hanikel_2020", "sholl_lively_2016"],
  Absorption: ["iea_ccus_2024", "sholl_lively_2016"],
  Distillation: ["sholl_lively_2016", "doe_chemical_bandwidth_2015"],
  Crystallization: ["sholl_lively_2016", "usgs_mcs_2025"],
  "Membrane separation": ["sholl_lively_2016", "awh_ahrestani_2023", "graphene_go_membranes_2024", "graphene_membranes_liu_2015"],
  Filtration: ["awh_ahrestani_2023", "sholl_lively_2016", "epa_water_reuse_2026", "nasem_water_reuse_2012"],
  Drying: ["doe_chemical_bandwidth_2015", "vertical_usda_2024"],
  Calcination: ["cement_iea_2024", "cement_iea_roadmap_2018"],
  Pyrolysis: ["iea_hydrogen_2024", "doe_chemical_bandwidth_2015"],
  Gasification: ["saf_nrel_2024", "saf_ozkan_2024"],
  Fermentation: ["tissue_mccorry_2022", "saf_nrel_2024"],
  Polymerization: ["doe_chemical_bandwidth_2015", "printed_inks_2024"],
  Lithography: ["nist_chips_metrology_2023", "nist_chips_gaps_2023", "itrs_yield_2015"],
  "Chemical vapor deposition": ["nist_chips_metrology_2023", "nist_chips_gaps_2023"],
  "Physical vapor deposition": ["nist_chips_metrology_2023", "nist_chips_gaps_2023"],
  "Atomic layer deposition": ["nist_chips_metrology_2023", "nist_chips_gaps_2023"],
  Coating: ["printed_inks_2024", "cement_driver_2024", "doe_electrochromic_windows_2023", "anti_icing_mao_2024"],
  Curing: ["cement_driver_2024", "printed_inks_2024"],
  Sintering: ["usgs_mcs_2025", "doe_chemical_bandwidth_2015"],
  Annealing: ["nist_chips_metrology_2023", "doe_chemical_bandwidth_2015"],
  Extrusion: ["doe_chemical_bandwidth_2015", "printed_inks_2024"],
  Compression: ["iea_ccus_2024", "nasa_mars_isru_2012"],
  Liquefaction: ["nasa_mars_isru_2012", "saf_nrel_2024"],
  "Heat exchange": ["doe_chemical_bandwidth_2015", "fusion_epri_blankets_2024", "doe_ldes_liftoff_2023", "doe_industrial_decarb_2022"],
  Combustion: ["iea_ammonia_2021", "cement_iea_2024"],
  "Plasma processing": ["fusion_fesac_2020", "nist_chips_metrology_2023"],
  Sterilization: ["tissue_mccorry_2022", "tissue_zuncheddu_2021"],
  "Solvent recovery": ["sholl_lively_2016", "doe_chemical_bandwidth_2015"],
  "Wastewater treatment": ["sholl_lively_2016", "nasem_life_support_1997", "nasem_water_reuse_2012", "epa_water_reuse_2026"],
  "Air separation": ["sholl_lively_2016", "doe_chemical_bandwidth_2015"],
  "Ion exchange": ["sholl_lively_2016", "awh_ahrestani_2023"],
  Precipitation: ["usgs_mcs_2025", "cement_driver_2024"],
  Leaching: ["usgs_mcs_2025", "iea_critical_minerals_2025"],
  Hydrometallurgy: ["usgs_mcs_2025", "iea_critical_minerals_2025"],
  "Electrochemical separation": ["iea_hydrogen_2024", "sholl_lively_2016"]
};

const SECTION_SOURCE_KEYS = {
  thesis: ["nasem_chemeng_2022", "nasem_deep_decarbonization_2020", "rapid_process_intensification", "doe_industrial_decarb_2022", "nasem_smart_manufacturing_2024"],
  readiness: ["nasa_trl", "gao_tra_2020", "dod_mrl_2016", "fernandez_readiness_2010", "sauser_irl_2009"],
  chemicals: ["iea_hydrogen_2024", "iea_critical_minerals_2025", "usgs_mcs_2025", "iea_ccus_2024", "doe_chemical_bandwidth_2015", "iea_ammonia_2021"],
  unitOperations: ["sholl_lively_2016", "doe_chemical_bandwidth_2015", "nist_chips_metrology_2023", "itrs_yield_2015", "nasem_smart_manufacturing_2024", "nist_sms_testbed_2020"],
  atmosphericWater: ["awh_ahrestani_2023", "awh_hanikel_2020", "awh_kim_2018", "awh_ejeian_2021", "awh_chu_2024", "awh_wang_2023"],
  hiddenSystems: ["faa_aam_i28_2023", "doe_electrochromic_windows_2023", "fusion_fesac_2020", "usda_cea_2024", "tissue_ikada_2006", "nasa_eclss_2025"],
  pathways: ["nasem_deep_decarbonization_2020", "rapid_process_intensification", "iea_critical_minerals_2025", "nist_chips_metrology_2023", "sholl_lively_2016", "doe_industrial_decarb_2022", "nasem_smart_manufacturing_2024"]
};

function uniqueKeys(keys) {
  return [...new Set(keys.filter(Boolean))];
}

function sourceRecords(keys) {
  const map = new Map(SOURCE_BANK.map((source) => [source.key, source]));
  return uniqueKeys(keys).map((key) => map.get(key)).filter(Boolean);
}

const SPECULATIVE_ANALOGUE_TECH_IDS = new Set([
  "self-replicating-manufacturing-systems",
  "molecular-assemblers",
  "programmable-matter",
  "cloaking-materials",
  "room-temperature-superconductors",
  "medical-nanobots",
  "digital-immortality-mind-archives",
  "replicator-like-food-machines",
  "universal-fabrication-appliances",
  "space-elevators",
  "terraforming-concepts",
  "carbon-nanotube-elevators-cables",
  "shape-shifting-materials"
]);

const ROADMAP_OR_EARLY_STAGE_TECH_IDS = new Set([
  "fusion-power-plants",
  "space-based-solar-power",
  "artificial-photosynthesis",
  "hydrogen-aircraft",
  "hyperloop-style-transport",
  "asteroid-mining",
  "orbital-manufacturing",
  "autonomous-scientific-discovery",
  "lunar-oxygen-production",
  "mars-fuel-production",
  "closed-loop-life-support",
  "space-habitats",
  "lab-grown-organs",
  "anti-aging-therapies",
  "synthetic-blood",
  "cybernetic-implants",
  "quantum-computers",
  "graphene-membranes",
  "transparent-solar-windows"
]);

function sourceKeysForTech(tech) {
  const keys = [
    ...(TECHNOLOGY_SOURCE_OVERRIDES[tech.id] || []),
    ...(CATEGORY_SOURCE_KEYS[tech.category] || [])
  ];
  tech.chemicals.forEach((chemical) => keys.push(...(CHEMICAL_SOURCE_KEYS[chemical] || [])));
  tech.materials.forEach((material) => keys.push(...(CHEMICAL_SOURCE_KEYS[material] || [])));
  tech.unitOperations.forEach((operation) => keys.push(...(UNIT_OPERATION_SOURCE_KEYS[operation] || [])));
  keys.push(...GLOBAL_SOURCE_KEYS.slice(0, 3));
  return uniqueKeys(keys).slice(0, 12);
}

function evidenceStatusForTech(tech) {
  const direct = TECHNOLOGY_SOURCE_OVERRIDES[tech.id]?.length || 0;
  if (SPECULATIVE_ANALOGUE_TECH_IDS.has(tech.id)) return "Speculative / analogue-sourced";
  if (ROADMAP_OR_EARLY_STAGE_TECH_IDS.has(tech.id)) return "Roadmap / early-stage sourced";
  if (direct >= 4) return "Direct starter set";
  if (direct >= 2 || tech.featured) return "Partially sourced";
  return "Framework sourced";
}

function evidenceNoteForTech(tech) {
  const direct = TECHNOLOGY_SOURCE_OVERRIDES[tech.id]?.length || 0;
  if (SPECULATIVE_ANALOGUE_TECH_IDS.has(tech.id)) {
    return "Sources support adjacent mechanisms, component technologies, or roadmap analogues; they do not verify the full sci-fi system. Keep this card explicitly hypothetical and avoid performance, cost, or deployment claims.";
  }
  if (ROADMAP_OR_EARLY_STAGE_TECH_IDS.has(tech.id)) {
    return "Sources support active research, demonstrations, agency roadmaps, or early deployment pathways. Scale, economics, reliability, and infrastructure remain major unresolved gates.";
  }
  if (direct >= 4) {
    return "This card has direct starter citations for the process route, bottlenecks, and readiness caveats. Claims still need claim-level checking before publication.";
  }
  if (direct >= 2 || tech.featured) {
    return "This card has domain-level sources and some direct citations. Avoid numerical performance, cost, or timeline claims until primary evidence is added.";
  }
  return "This card is supported mainly by cross-cutting framework sources. Treat the PFD as an engineering hypothesis, not a verified technology route.";
}

enrichedTechnologies = enrichedTechnologies.map((tech) => ({
  ...tech,
  sourceKeys: sourceKeysForTech(tech),
  evidenceStatus: evidenceStatusForTech(tech),
  evidenceNote: evidenceNoteForTech(tech)
}));

const enrichedChemicals = CHEMICAL_SPINE.map((chemical) => ({
  ...chemical,
  sourceKeys: CHEMICAL_SOURCE_KEYS[chemical.name] || SECTION_SOURCE_KEYS.chemicals,
  evidenceStatus: (CHEMICAL_SOURCE_KEYS[chemical.name] || []).length >= 2 ? "Starter sourced" : "Needs source expansion",
  relatedTechnologies: enrichedTechnologies
    .filter((tech) => tech.chemicals.includes(chemical.name))
    .slice(0, 8)
    .map((tech) => tech.id)
}));

const enrichedUnitOperations = UNIT_OPERATIONS.map((operation) => ({
  ...operation,
  sourceKeys: UNIT_OPERATION_SOURCE_KEYS[operation.name] || SECTION_SOURCE_KEYS.unitOperations,
  evidenceStatus: (UNIT_OPERATION_SOURCE_KEYS[operation.name] || []).length >= 2 ? "Starter sourced" : "Needs source expansion",
  appearsIn: enrichedTechnologies
    .filter((tech) => tech.unitOperations.includes(operation.name))
    .slice(0, 10)
    .map((tech) => tech.id)
}));

window.FUTURE_SYSTEMS_ATLAS = {
  categoryMeta: CATEGORY_META,
  sectors: SECTOR_META,
  processPathways: PROCESS_PATHWAYS,
  masterStack: MASTER_STACK,
  chemicals: enrichedChemicals,
  unitOperations: enrichedUnitOperations,
  bottleneckTaxonomy: BOTTLENECK_TAXONOMY,
  sourceBank: SOURCE_BANK,
  sectionSourceKeys: SECTION_SOURCE_KEYS,
  sourceRecords,
  featuredCaseIds: FEATURED_CASE_IDS,
  rawTechnologies,
  technologies: enrichedTechnologies
};

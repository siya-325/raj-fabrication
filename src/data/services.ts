export interface ServiceItem {
  id: string
  title: string
  category: ServiceCategory
  tag: string
  type?: string
  targetAudience?: string
  material?: string
  customDesign?: string
  turnaroundTime?: string
  leadTime?: string
  industryApplication?: string
  qualityAssurance?: string
  area?: string
  price?: string
  description: string
  fullDescription: string
  image: string
}

export const serviceCategories = [
  'All Services',
  'Industrial Sheds',
  'Structural MS Work',
  'Gates & Railings',
  'Grills & Partitions',
  'Welding & Custom Work',
] as const

export type ServiceCategory = (typeof serviceCategories)[number]

export const allServices: ServiceItem[] = [
  // ==========================================
  // 1. Industrial Sheds (3 Core Services)
  // ==========================================
  {
    id: 'industrial-factory-sheds',
    title: 'Industrial Factory Sheds',
    category: 'Industrial Sheds',
    tag: 'Factory Construction',
    type: 'Turnkey Structural Fabrication',
    targetAudience: 'Manufacturing Units & Industrial Parks',
    material: 'ISMB Heavy Columns, Tubular Trusses & Color-Coated Sheets',
    leadTime: '3 – 6 Weeks depending on area',
    qualityAssurance: 'Weld Penetration Testing & Deflection Verification',
    price: 'Custom Estimate on Specifications',
    description: 'Turnkey factory shed design, heavy steel column erection, and high-span weather-resistant roofing engineered for manufacturing operations.',
    fullDescription: 'We design, fabricate, and erect heavy-duty industrial factory sheds tailored for manufacturing and production units across Ahmedabad and Gujarat industrial belts. Every structure is engineered with ISMB columns, custom steel trusses, and durable color-coated profile sheets designed to support overhead cranes, natural ridge ventilation, and industrial wind loads.',
    image: '/images/services/industrial-shed-developers.webp',
  },
  {
    id: 'warehouse-storage-sheds',
    title: 'Warehouse & Storage Sheds',
    category: 'Industrial Sheds',
    tag: 'Warehousing & Logistics',
    type: 'Large-Span Shed Construction',
    targetAudience: 'Logistics Hubs & Commercial Storage',
    material: 'High-Tensile MS Sections, Galvanized Purlins & Insulated Roofing',
    leadTime: '4 – 7 Weeks',
    qualityAssurance: 'Weather-Tight Seal & Structural Load Certification',
    price: 'Custom Estimate on Specifications',
    description: 'Column-free large-span warehouse sheds offering unobstructed floor area for high-volume inventory storage, forklift movement, and logistics.',
    fullDescription: 'Specialized warehouse shed fabrication offering expansive, column-free interior spans designed for high-density pallet racking and efficient material handling equipment. Built with corrosion-resistant galvanized purlins, polycarbonate natural light panels, insulated roofing options, and industrial rainwater drainage gutters.',
    image: '/images/services/commercial-warehouse-developers.webp',
  },
  {
    id: 'canopy-parking-sheds',
    title: 'Industrial Canopy & Parking Sheds',
    category: 'Industrial Sheds',
    tag: 'Canopies & Carports',
    type: 'Cantilever & Arch Metal Structures',
    targetAudience: 'Commercial Complexes & Factory Yards',
    material: 'Heavy MS Hollow Pipes, Polycarbonate Sheets & Tensile Fabric',
    leadTime: '1 – 2 Weeks',
    qualityAssurance: 'High-Wind Stability & Anti-Corrosion Primer',
    price: 'Custom Estimate on Specifications',
    description: 'Heavy-duty cantilever vehicle parking sheds and covered loading dock canopies protecting equipment and transit bays from harsh weather.',
    fullDescription: 'Custom-engineered metal canopy structures and cantilever vehicle sheds for factory loading docks, commercial office buildings, and residential societies. Fabricated using high-strength curved tubular frames, durable polycarbonate or profile sheets, and multi-coat anti-rust epoxy paint.',
    image: '/images/services/logistics-shed-developers.webp',
  },

  // ==========================================
  // 2. Structural MS Work (3 Core Services)
  // ==========================================
  {
    id: 'ms-structural-fabrication',
    title: 'MS Structural Steel Fabrication',
    category: 'Structural MS Work',
    tag: 'Heavy Steelwork',
    type: 'Engineering Fabrication & Erection',
    targetAudience: 'Industrial Contractors & Infrastructure Builders',
    material: 'ISMC Channels, ISMB Beams & Heavy Mild Steel Plates',
    leadTime: '2 – 4 Weeks',
    qualityAssurance: 'Precision Fitment & Alignment Inspection',
    price: 'Custom Estimate on Specifications',
    description: 'Heavy-gauge steel columns, gantry beams, cross-bracings, and building frameworks fabricated strictly to structural engineering drawings.',
    fullDescription: 'Comprehensive mild steel structural fabrication services complying with stringent structural load and safety standards. From precision plasma/gas cutting and beveling to full-penetration welding and site erection, we fabricate primary columns, roof trusses, gantry supports, and baseplate anchor assemblies for industrial plants.',
    image: '/images/services/ms-structural-fabricators.webp',
  },
  {
    id: 'industrial-mezzanine-floors',
    title: 'Industrial Mezzanine Floors',
    category: 'Structural MS Work',
    tag: 'Vertical Space Expansion',
    type: 'Modular Floor Framework Fabrication',
    targetAudience: 'Warehouses, Workshops & Retail Facilities',
    material: 'MS Structural Sections, Heavy Joists & Chequered Steel Plates',
    leadTime: '2 – 3 Weeks',
    qualityAssurance: 'Point & Distributed Load Calculations',
    price: 'Custom Estimate on Specifications',
    description: 'Heavy-duty steel mezzanine platforms and multi-tier floor expansions designed to double usable space in warehouses and production shops.',
    fullDescription: 'Custom structural steel mezzanine floor systems engineered to maximize vertical headroom without altering building footprint. Complete with heavy column baseplates, primary and secondary steel joists, anti-skid chequered plate or wooden decking, perimeter safety toe-boards, handrails, and industrial access stairs.',
    image: '/images/projects/custom-industrial-mezzanine-framework.webp',
  },
  {
    id: 'heavy-storage-racks',
    title: 'Heavy-Duty Industrial Storage Racks',
    category: 'Structural MS Work',
    tag: 'Storage Systems',
    type: 'Custom Storage Fabrication',
    targetAudience: 'Factories, Raw Material Stores & Distribution Centers',
    material: 'Heavy-Gauge MS Angles, Hollow Pipes & Welded Steel Shelves',
    leadTime: '1 – 2 Weeks',
    qualityAssurance: 'Static Weight Load Testing',
    price: 'Custom Estimate on Specifications',
    description: 'Robust pallet racks, cantilever racking systems, and material-handling shelving units built to withstand heavy mechanical loading.',
    fullDescription: 'Engineered heavy-duty industrial storage racks built for industrial plants, logistics warehouses, and hardware stores. Designed with reinforced base gussets, adjustable crossbeams, and high load capacity shelves to safely accommodate dies, raw steel bundles, pallets, and heavy tooling inventory.',
    image: '/images/projects/industrial-heavy-duty-storage-racks.webp',
  },

  // ==========================================
  // 3. Gates & Railings (3 Core Services)
  // ==========================================
  {
    id: 'entrance-sliding-gates',
    title: 'Main Entrance & Sliding Gates',
    category: 'Gates & Railings',
    tag: 'Entrance Security',
    type: 'Architectural Gate Fabrication',
    targetAudience: 'Residential Bungalows, Societies & Industrial Units',
    material: 'Heavy MS Square Box Sections, Laser-Cut Panels & Heavy Bearings',
    leadTime: '1 – 3 Weeks',
    qualityAssurance: 'Smooth Track Alignment & Anti-Sag Guarantee',
    price: 'Custom Estimate on Specifications',
    description: 'Custom automated and manual cantilever sliding gates, folding gates, and modern main entrance gates with clean anti-sag engineering.',
    fullDescription: 'Precision-fabricated entrance gates combining physical security with architectural street presence. We craft top-hung sliding gates, ground-track cantilever gates, bi-folding designs, and heavy swing gates equipped with heavy-duty sealed bearing rollers, laser-cut decorative inserts, and anti-corrosion zinc primer basecoats.',
    image: '/images/projects/custom-architectural-entrance-gate.webp',
  },
  {
    id: 'modern-balcony-railings',
    title: 'Modern Balcony Railings',
    category: 'Gates & Railings',
    tag: 'Architectural Metalwork',
    type: 'Custom Railing Fabrication',
    targetAudience: 'Architects, Homeowners & Residential Builders',
    material: 'MS Rectangular Tubes, Stainless Steel Accents & Glass Brackets',
    leadTime: '1 – 2 Weeks',
    qualityAssurance: 'Uniform Weld Finishing & Weather-Resistant Coating',
    price: 'Custom Estimate on Specifications',
    description: 'Minimalist contemporary mild steel balcony railings, terrace safety parapets, and exterior architectural safety barriers.',
    fullDescription: 'Architectural balcony railings built to enhance building elevation while meeting safety codes. Crafted with clean mitered joints, seamless TIG/MIG welds, and durable exterior powder coating or PU paint finishes that resist rust, sun exposure, and seasonal rain.',
    image: '/images/projects/modern-mild-steel-balcony-railing.webp',
  },
  {
    id: 'staircase-handrails',
    title: 'Staircase Handrails & Railings',
    category: 'Gates & Railings',
    tag: 'Safety Railings',
    type: 'Internal & External Railing Works',
    targetAudience: 'Villas, Commercial Complexes & Duplex Residences',
    material: 'MS Hollow Profiles, Solid Flats & Ergonomic Grip Bars',
    leadTime: '1 – 2 Weeks',
    qualityAssurance: 'Firm Anchor Testing & Smooth Touch-Points',
    price: 'Custom Estimate on Specifications',
    description: 'Sturdy, ergonomic safety handrails and continuous balustrades for internal residential staircases and external access stairs.',
    fullDescription: 'Custom staircase balustrades and handrail systems tailored to exact stair tread pitch and angles. Features seamless joints, sturdy floor-anchor baseplates, child-safe spacing, and refined finishes that feel solid and ergonomic to the touch.',
    image: '/images/services/steel-metalwork-contractors-ms.webp',
  },

  // ==========================================
  // 4. Grills & Partitions (3 Core Services)
  // ==========================================
  {
    id: 'window-safety-grills',
    title: 'Window Safety Grills',
    category: 'Grills & Partitions',
    tag: 'Home Safety',
    type: 'Residential Safety Fabrication',
    targetAudience: 'Homeowners, Builders & Residential Societies',
    material: 'Solid MS Square Bars, Flats & Heavy Box Pipes',
    leadTime: '5 – 10 Days',
    qualityAssurance: 'Secure Masonry Anchor Depth & Rust-Proof Primer',
    price: 'Custom Estimate on Specifications',
    description: 'High-security solid mild steel window grills, box security grills, and exterior AC compressor safety cages with neat welded joinery.',
    fullDescription: 'Robust window safety grills fabricated with solid 10mm to 16mm square rods, heavy flat bars, or modern geometric layout grids. Measured precisely to window openings, deeply anchored into masonry, and coated with protective primer to protect homes and apartments.',
    image: '/images/projects/residential-window-safety-grills.webp',
  },
  {
    id: 'steel-glass-partitions',
    title: 'Steel & Glass Partitions',
    category: 'Grills & Partitions',
    tag: 'Interior Architecture',
    type: 'Custom Internal Partitioning',
    targetAudience: 'Interior Designers, Modern Homes & Boutique Offices',
    material: 'Slim-Gauge MS Profiles, T-Sections & Toughened Glass Channels',
    leadTime: '1 – 3 Weeks',
    qualityAssurance: 'Aesthetic Line Alignment & Sound-Damped Seals',
    price: 'Custom Estimate on Specifications',
    description: 'Slim-profile black metal French doors, loft-style partition walls, and office cabin glass enclosures with timeless industrial character.',
    fullDescription: 'Contemporary industrial-style internal partition frames crafted from slimline steel sections with tempered glass inserts. Designed for open-plan living rooms, dining dividers, and office conference rooms wanting acoustic separation while preserving seamless visual openness and light flow.',
    image: '/images/projects/internal-glass-steel-partition-frame.webp',
  },
  {
    id: 'laser-cut-jali-screens',
    title: 'Laser-Cut Decorative Jali & Screens',
    category: 'Grills & Partitions',
    tag: 'Elevation & Screens',
    type: 'CNC Fiber Laser Sheet Metal Fabrication',
    targetAudience: 'Architects, Bungalow Owners & Commercial Elevations',
    material: 'MS Sheets (2mm – 6mm), Stainless Steel & Powder Coat Finish',
    leadTime: '1 – 2 Weeks',
    qualityAssurance: 'Precision CNC Edge Deburring & Powder Coat Adhesion',
    price: 'Custom Estimate on Specifications',
    description: 'Precision CNC laser-cut metal elevation jali, boundary privacy screens, decorative balcony panels, and ventilation screens.',
    fullDescription: 'State-of-the-art decorative metal jali and facade panels cut on high-precision CNC fiber lasers. We fabricate and mount custom geometric, floral, Islamic, and contemporary parametric screen patterns for exterior elevation accents, duct covers, boundary walls, and sun pergolas.',
    image: '/images/projects/custom-laser-cut-decorative-grills.webp',
  },

  // ==========================================
  // 5. Welding & Custom Work (3 Core Services)
  // ==========================================
  {
    id: 'welding-repair-works',
    title: 'Precision Welding & Repair Works',
    category: 'Welding & Custom Work',
    tag: 'Welding & Repairs',
    type: 'Certified Job Work & On-Site Welding',
    targetAudience: 'Industrial Plants, Contractors & Vehicle Owners',
    material: 'Mild Steel, Carbon Steel & Structural Alloys',
    leadTime: 'Same-Day to 3 Days',
    qualityAssurance: 'Deep Weld Penetration & Slag-Free Finishing',
    price: 'Custom Estimate on Specifications',
    description: 'Certified MIG, TIG, and arc welding services for structural joinery, machinery bracket modifications, and emergency on-site welding.',
    fullDescription: 'Expert welding job works covering structural metal joinery, crack repairs, on-site reinforcement, and component restoration. Equipped with high-amperage MIG, TIG, and inverter arc welders to produce high-penetration, defect-free welds for heavy industrial equipment and structural frameworks.',
    image: '/images/services/welding-job-works.webp',
  },
  {
    id: 'custom-metal-staircases',
    title: 'Custom Metal Staircases',
    category: 'Welding & Custom Work',
    tag: 'Metal Staircases',
    type: 'Architectural & Industrial Metalwork',
    targetAudience: 'Bungalows, Commercial Units & Industrial Facilities',
    material: 'MS Heavy Stringer Channels, Chequered Steps & Pipe Railings',
    leadTime: '2 – 3 Weeks',
    qualityAssurance: 'Deflection Resistance & Non-Skid Safety Checks',
    price: 'Custom Estimate on Specifications',
    description: 'Space-saving spiral staircases, industrial fire exit stairs, central spine staircases, and terrace metal steps built to safe ergonomic rise-and-run.',
    fullDescription: 'Custom-engineered architectural and industrial metal staircases fabricated for interior lofts, terrace access, emergency fire escapes, and multi-level factories. Features precision tread spacing, anti-skid chequered steps, strong stringer beams, and sturdy integrated handrails.',
    image: '/images/projects/minimalist-steel-internal-staircase.webp',
  },
  {
    id: 'bespoke-custom-metalwork',
    title: 'Bespoke Custom Metalwork',
    category: 'Welding & Custom Work',
    tag: 'Custom Metalwork',
    type: 'Custom Job Work Fabrication',
    targetAudience: 'Engineers, Architects & Specialized Industry Clients',
    material: 'Custom Mild Steel Profiles, Solid Plates & Heavy Tubes',
    leadTime: '1 – 3 Weeks',
    qualityAssurance: 'Dimension Tolerance Matching to Client Drawings',
    price: 'Custom Estimate on Specifications',
    description: 'Custom fabrication for unique architectural concepts, machine foundation frames, equipment mounts, and specialty steel assemblies.',
    fullDescription: 'Custom metal fabrication for non-standard specifications and special architectural or industrial needs. From heavy machinery foundation frames and pump bases to decorative metal furniture frames, planter stands, and compound features—we fabricate to your exact drawings and measurements.',
    image: '/images/services/custom-metalwork-contractors.webp',
  },
]

export const featuredServices: ServiceItem[] = [
  allServices.find((s) => s.id === 'industrial-factory-sheds') || allServices[0],
  allServices.find((s) => s.id === 'ms-structural-fabrication') || allServices[3],
  allServices.find((s) => s.id === 'entrance-sliding-gates') || allServices[6],
]

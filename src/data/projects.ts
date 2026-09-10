export const projectCategories = [
  'All Projects',
  'Industrial Fabrication',
  'Architectural Metalwork',
  'Made to Measure',
  'Residential',
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export interface ProjectItem {
  id: string
  title: string
  category: Exclude<ProjectCategory, 'All Projects'>
  image: string
  description?: string
  featured?: boolean
}

export const portfolioProjects: ProjectItem[] = [
  // 1. Industrial Fabrication
  {
    id: 'proj-1',
    title: 'Structural Steel Roof Trusses',
    category: 'Industrial Fabrication',
    image: '/images/services/industrial-shed-developers.webp',
    featured: true,
    description: 'Engineered heavy-duty structural steel roof trusses for industrial factories and commercial warehouses.',
  },
  {
    id: 'proj-2',
    title: 'Industrial Heavy-Duty Storage Racks',
    category: 'Industrial Fabrication',
    image: '/images/projects/industrial-heavy-duty-storage-racks.webp',
    featured: true,
    description: 'Custom multi-tier structural steel warehouse pallet racking systems designed for maximum load capacity.',
  },
  {
    id: 'proj-3',
    title: 'Heavy PEB Factory Column Assembly',
    category: 'Industrial Fabrication',
    image: '/images/projects/heavy-peb-factory-column-assembly.webp',
    featured: true,
    description: 'Precision tapered pre-engineered building (PEB) columns and portal frame assembly bolted on concrete footings.',
  },

  // 2. Architectural Metalwork
  {
    id: 'proj-4',
    title: 'Custom Architectural Entrance Gate',
    category: 'Architectural Metalwork',
    image: '/images/projects/custom-architectural-entrance-gate.webp',
    featured: true,
    description: 'Bespoke modern driveway entrance gate fabricated with powder-coated black steel, teak wood slats, and ambient lighting.',
  },
  {
    id: 'proj-5',
    title: 'Custom Laser-Cut Decorative Grills',
    category: 'Architectural Metalwork',
    image: '/images/projects/custom-laser-cut-decorative-grills.webp',
    featured: true,
    description: 'CNC laser-cut geometric architectural metal privacy screens and decorative jali partitions casting intricate shadows.',
  },
  {
    id: 'proj-6',
    title: 'Perforated Metal Facade Panels',
    category: 'Architectural Metalwork',
    image: '/images/projects/perforated-metal-facade-panels.webp',
    featured: false,
    description: 'Precision circular-pattern perforated metal cladding panels for modern commercial and residential exterior facades.',
  },

  // 3. Made to Measure
  {
    id: 'proj-7',
    title: 'Internal Glass & Steel Partition Frame',
    category: 'Made to Measure',
    image: '/images/projects/internal-glass-steel-partition-frame.webp',
    featured: true,
    description: 'Crittall-style matte black mild steel and glass French doors and interior partitions creating refined spatial divisions.',
  },
  {
    id: 'proj-8',
    title: 'Custom Industrial Mezzanine Framework',
    category: 'Made to Measure',
    image: '/images/projects/custom-industrial-mezzanine-framework.webp',
    featured: true,
    description: 'Structural steel I-beam mezzanine platform with safety cage railings and staircase inside an active manufacturing plant.',
  },
  {
    id: 'proj-9',
    title: 'Precision Metal Equipment Mounts',
    category: 'Made to Measure',
    image: '/images/projects/precision-metal-equipment-mounts.webp',
    featured: false,
    description: 'CNC cut, formed, and welded dark graphite structural steel machinery mounts and heavy-duty vibration isolators.',
  },

  // 4. Residential
  {
    id: 'proj-10',
    title: 'Modern Mild Steel Balcony Railing',
    category: 'Residential',
    image: '/images/projects/modern-mild-steel-balcony-railing.webp',
    featured: true,
    description: 'Sleek horizontal matte black mild steel balustrades and slim top handrail on a luxury residential terrace.',
  },
  {
    id: 'proj-11',
    title: 'Minimalist Steel Internal Staircase',
    category: 'Residential',
    image: '/images/projects/minimalist-steel-internal-staircase.webp',
    featured: true,
    description: 'Open-riser floating interior staircase featuring a black steel mono-stringer spine, floating solid oak treads, and vertical rods.',
  },
  {
    id: 'proj-12',
    title: 'Residential Window Safety Grills',
    category: 'Residential',
    image: '/images/projects/residential-window-safety-grills.webp',
    featured: false,
    description: 'Clean architectural mild steel safety grills fabricated in modern asymmetric geometric patterns for home casement windows.',
  },
]

/**
 * Curated flagship projects across all four disciplines for the home page carousel
 */
export const featuredProjects: ProjectItem[] = portfolioProjects.filter(
  (p) => p.featured
)

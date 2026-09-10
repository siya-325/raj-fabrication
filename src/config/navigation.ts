export interface NavItem {
  label: string
  href: string
  description?: string
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/', description: 'Workshop overview, hero showcase, and selected work' },
  { label: 'About', href: '/about', description: 'Our story, craft, and workshop in Ahmedabad' },
  { label: 'Services', href: '/services', description: 'MS fabrication, welding, and custom metalwork' },
  { label: 'Our work', href: '/projects', description: 'Selected residential, commercial, and industrial projects' },
  { label: 'Contact', href: '/contact', description: 'Get a quote, visit our workshop, or talk to us' },
]

export const footerServiceItems: NavItem[] = [
  { label: 'Metal fabrication', href: '/services#metal-fabrication' },
  { label: 'MS fabrication', href: '/services#ms-fabrication' },
  { label: 'Welding services', href: '/services#welding' },
  { label: 'Custom work', href: '/services#custom-work' },
]

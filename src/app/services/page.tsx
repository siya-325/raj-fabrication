import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicesGrid } from '@/components/sections/services/ServicesGrid'
import { ServicesCTA } from '@/components/sections/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Fabrication Services | Raj Fabrication Ahmedabad',
  description: 'Explore custom metalwork, MS fabrication, precision welding, and structural steel solutions from Raj Fabrication in Satellite, Ahmedabad.',
}

export default function ServicesPage() {
  return (
    <PageShell navVariant="transparent">
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
    </PageShell>
  )
}

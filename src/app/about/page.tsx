import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { CompanyIntro } from '@/components/sections/about/CompanyIntro'
import { ExperienceOverview } from '@/components/sections/about/ExperienceOverview'
import { Craftsmanship } from '@/components/sections/about/Craftsmanship'
import { AboutCTA } from '@/components/sections/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Us | Raj Fabrication Ahmedabad',
  description: 'Learn about Raj Fabrication, established in 2012 in Satellite, Ahmedabad. Dedicated to durable, practical, and made-to-measure metal fabrication.',
}

export default function AboutPage() {
  return (
    <PageShell navVariant="transparent">
      <AboutHero />
      <CompanyIntro />
      <ExperienceOverview />
      <Craftsmanship />
      <AboutCTA />
    </PageShell>
  )
}


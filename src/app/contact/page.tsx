import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactDetails } from '@/components/sections/contact/ContactDetails'
import { WorkshopMap } from '@/components/sections/contact/WorkshopMap'

export const metadata: Metadata = {
  title: 'Contact Us | Raj Fabrication Ahmedabad',
  description: 'Get in touch with Raj Fabrication for metal fabrication and welding quotes in Satellite, Ahmedabad. Visit our workshop or request an estimate.',
}

export default function ContactPage() {
  return (
    <PageShell navVariant="transparent">
      <ContactHero />
      <ContactDetails />
      <WorkshopMap />
    </PageShell>
  )
}

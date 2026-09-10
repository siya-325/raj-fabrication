import { site } from '@/data/site'
import { CTASection } from '@/components/sections/CTASection'

export function ContactCTA() {
  return (
    <CTASection
      eyebrow="Workshop Visits"
      title="Prefer to discuss in person?"
      description="Visit our fabrication yard in Satellite or request an on-site dimension measurement in Ahmedabad."
      buttonLabel="Locate on Google Maps"
      buttonHref={site.maps}
      buttonTarget="_blank"
    />
  )
}

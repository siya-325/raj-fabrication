import { site } from '@/data/site'
import { CTASection } from '@/components/sections/CTASection'

export function FinalCTA() {
  return (
    <CTASection
      id="contact"
      eyebrow="Start a conversation"
      title="Have a fabrication requirement?"
      description="Tell us what you need made. We'll help you take the next step."
      buttonLabel="Contact us in Ahmedabad"
      buttonHref="/contact"
    />
  )
}

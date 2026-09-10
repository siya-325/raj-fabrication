import { PageHero } from '@/components/sections/PageHero'
import { site } from '@/data/site'

export function ContactHero() {
  return (
    <PageHero
      badge="Get in Touch"
      title={
        <>
          Start a conversation
          <br />
          <span className="text-white/65">about your build.</span>
        </>
      }
      description="Visit our workshop on Ramdevnagar Road in Satellite, Ahmedabad, or request a quick estimate and site visit."
      imageSrc="/images/contact/contact-hero.webp"
      imageAlt="Contact Raj Fabrication in Satellite Ahmedabad for steel fabrication and site visits"
    />
  )
}

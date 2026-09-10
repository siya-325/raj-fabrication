import { PageHero } from '@/components/sections/PageHero'
import { site } from '@/data/site'

export function AboutHero() {
  return (
    <PageHero
      badge="Our Story & Craft"
      title={
        <>
          Practical metalwork,
          <br />
          <span className="text-white/65">shaped with care.</span>
        </>
      }
      description={`Founded in ${site.established} in Satellite, Ahmedabad. Dedicated to turning client drawings into robust, precise fabrication built to fit.`}
      imageSrc="/images/home/workshop-fabrication-yard.webp"
      imageAlt="Raj Fabrication workshop and assembly yard, Ahmedabad"
    />
  )
}

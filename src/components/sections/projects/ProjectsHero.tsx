import { PageHero } from '@/components/sections/PageHero'
import { site } from '@/data/site'

export function ProjectsHero() {
  return (
    <PageHero
      badge="Selected Portfolio"
      title={
        <>
          Proven work,
          <br />
          <span className="text-white/65">built for longevity.</span>
        </>
      }
      description="Architectural gates, modern railings, industrial purlins, and bespoke metalwork fabricated across Ahmedabad."
      imageSrc="/images/projects/projects-hero.webp"
      imageAlt="Raj Fabrication completed architectural steel and metalwork portfolio projects"
    />
  )
}

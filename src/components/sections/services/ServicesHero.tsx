import { PageHero } from '@/components/sections/PageHero'
import { site } from '@/data/site'

export function ServicesHero() {
  return (
    <PageHero
      badge="Fabrication Capabilities"
      title={
        <>
          Engineered for strength.
          <br />
          <span className="text-white/65">Finished with precision.</span>
        </>
      }
      description="Mild steel fabrication, certified on-site welding, architectural metalwork, and structural steel frames across Ahmedabad."
      imageAlt="Raj Fabrication metalwork and welding services"
    />
  )
}

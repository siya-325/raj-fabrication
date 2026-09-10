import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

const values = [
  {
    title: 'Precise Measurement',
    description: 'Every job begins on-site with accurate dimensioning to ensure seamless fit and hassle-free installation.',
  },
  {
    title: 'Material Honesty',
    description: 'We use genuine grades of mild steel, structural sections, and hardware suited specifically for longevity.',
  },
  {
    title: 'Strong Joint Integrity',
    description: 'Welds are executed with full penetration, clean beads, and proper grinding for structural stability.',
  },
  {
    title: 'Clean Architectural Finish',
    description: 'Primer coatings, anti-rust treatments, and smooth paint finishes prepared for the Ahmedabad climate.',
  },
]

export function Craftsmanship() {
  return (
    <section className="section-space border-t border-line bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            label="Fabrication Standards"
            labelTone="copper"
            title="Built for the demands of the real world."
            description="Metal fabrication requires more than cutting and welding — it demands thorough attention to structural balance, load capacities, and neat finishes."
            className="max-w-3xl"
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val) => (
            <StaggerItem key={val.title}>
              <Card variant="default" className="p-6 sm:p-7 h-full flex flex-col justify-between shadow-xs">
                <div>
                  <CheckCircle2 size={24} className="text-copper mb-4" />
                  <h3 className="text-xl font-medium text-charcoal">{val.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
                    {val.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

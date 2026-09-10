import { ShieldCheck, Ruler, Clock, Award } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

const reasons = [
  {
    icon: Ruler,
    title: 'Precise Fit & Finish',
    description: 'We measure on-site and fabricate to exact millimeter tolerance so assemblies fit seamlessly.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Weld Strength',
    description: 'Deep penetration welding using genuine mild steel and structural tubes built to withstand load and vibration.',
  },
  {
    icon: Award,
    title: '14+ Years in Ahmedabad',
    description: 'Serving residential and commercial customers with consistent accountability since 2012.',
  },
  {
    icon: Clock,
    title: 'Direct Timelines',
    description: 'Clear fabrication schedules and transparent updates from workshop cut to final installation.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-space border-t border-line bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            label="Why Raj Fabrication"
            labelTone="steel-blue"
            title="Dependable metalwork you don't have to second-guess."
            description="Our focus is on durable fabrication: accurate measurements, honest steel thickness, and clean welds designed for long-term service."
            className="max-w-5xl"
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <Card variant="default" className="p-7 flex flex-col justify-between h-full shadow-xs">
                  <div>
                    <div className="flex size-11 items-center justify-center rounded-lg bg-steel-blue text-white mb-5 shadow-xs">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}

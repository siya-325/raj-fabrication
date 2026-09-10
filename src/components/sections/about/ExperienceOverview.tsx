import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  {
    value: '14+',
    label: 'Years Experience',
  },
  {
    value: '52K',
    label: 'Project Complete',
  },
  {
    value: '95%',
    label: 'Like Our Project',
  },
]

export function ExperienceOverview() {
  return (
    <section className="section-space border-t border-line/60 bg-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Overlapping Images matching screenshot */}
          <Reveal direction="left">
            <div className="relative mx-auto max-w-[520px] lg:max-w-none pb-16 pr-8 sm:pb-20 sm:pr-14 lg:pb-24 lg:pr-16">
              {/* Primary Top-Left Image */}
              <div className="relative aspect-[4/3] w-[82%] sm:w-[80%] overflow-hidden rounded-lg border border-line bg-surface shadow-md">
                <Image
                  src="/images/about/installation-work.jpg"
                  alt="Metal fabricator installing window frame"
                  fill
                  sizes="(max-width: 1024px) 75vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Secondary Overlapping Bottom-Right Image */}
              <div className="absolute right-0 bottom-0 aspect-[4/3] w-[62%] sm:w-[60%] overflow-hidden rounded-lg border-4 sm:border-8 border-background bg-surface shadow-2xl">
                <Image
                  src="/images/about/architectural-space.jpg"
                  alt="Modern architectural interior with steel frame windows"
                  fill
                  sizes="(max-width: 1024px) 55vw, 30vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          {/* Right Column: Content & Stats matching screenshot */}
          <Reveal delay={0.15} direction="right">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-charcoal leading-[1.18]">
                Recognize Further About <br className="hidden sm:inline" />
                Us To Get Offer Info
              </h2>

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted">
                <p>
                  At Raj Fabrication, every structure is measured and built to exact on-site dimensions. From custom window frameworks and decorative ironwork to heavy-duty structural framing, we focus on material purity and structural strength.
                </p>
                <p>
                  We collaborate directly with architects, homeowners, and commercial builders across Ahmedabad to provide transparent specifications, durable anti-corrosion finishes, and dependable installations backed by years of field experience.
                </p>
              </div>

              {/* Stats Row */}
              <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 pt-2">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-steel-blue">
                      {stat.value}
                    </span>
                    <span className="mt-2 text-xs sm:text-sm font-semibold text-charcoal/85">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

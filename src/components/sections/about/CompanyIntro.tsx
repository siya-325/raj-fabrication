import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/data/site'

export function CompanyIntro() {
  return (
    <section className="section-space">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <SectionHeading
                label="Workshop Origins"
                labelTone="steel-blue"
                title="Fourteen years of hands-on steelwork in Ahmedabad."
                titleSize="xl"
              />
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted">
                Since {site.established}, Raj Fabrication has operated as a dedicated custom fabrication workshop on Ramdevnagar Road in Satellite, Ahmedabad.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
                We work directly with homeowners, builders, architects, and industrial plant heads who value direct communication, precise fitment, and steel that stands up to weather and wear.
              </p>
              <div className="mt-8">
                <Button
                  variant="outline"
                  size="md"
                  href="/contact"
                  rightIcon={<ArrowUpRight size={16} />}
                >
                  Locate workshop on map
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-charcoal shadow-sm group">
              <Image
                src="/images/about/workshop-welding-craft.webp"
                alt="Precision steel welding and custom fabrication in Raj Fabrication workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between text-xs font-mono text-white/85 uppercase tracking-[0.14em]">
                <span>Ramdevnagar Road, Satellite</span>
                <span>Ahmedabad – 380015</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

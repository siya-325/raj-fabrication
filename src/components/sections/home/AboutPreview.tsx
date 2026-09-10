import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export function AboutPreview() {
  return (
    <section id="about" className="section-space">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <SectionLabel tone="muted">About Raj Fabrication</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="display-heading max-w-4xl">
                Practical metalwork, made with care.
              </h2>
              <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <p className="max-w-xl text-lg leading-8 text-muted">
                  Since 2012, Raj Fabrication has helped customers across Ahmedabad turn requirements into durable, useful, and well-finished fabrication.
                </p>
                <Button
                  variant="link"
                  href="/contact"
                  rightIcon={<ArrowUpRight size={15} />}
                  className="hidden lg:inline-flex self-end text-charcoal font-mono uppercase tracking-[0.14em] text-xs shrink-0"
                >
                  Talk to us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Editorial photographic presentation */}
        <div className="mt-16">
          <Reveal delay={0.15} direction="up" distance={24}>
            <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-line bg-charcoal shadow-sm group">
              <Image
                src="/images/home/workshop-fabrication-yard.webp"
                alt="Raj Fabrication steel fabrication workshop and industrial yard, Ahmedabad"
                fill
                sizes="(max-width: 1280px) 100vw, 84rem"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/90">
                <span className="font-mono uppercase tracking-[0.14em]">Workshop & Fabrication Yard</span>
                <span className="font-mono uppercase tracking-[0.14em] hidden sm:inline">Satellite, Ahmedabad</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Center bottom action button (Mobile & Tablet only) */}
        <div className="mt-10 flex lg:hidden justify-center">
          <Reveal delay={0.2}>
            <Button
              variant="outline"
              size="md"
              href="/contact"
              rightIcon={<ArrowUpRight size={15} />}
            >
              Talk to us
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

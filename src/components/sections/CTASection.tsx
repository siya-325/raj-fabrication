import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export interface CTASectionProps {
  id?: string
  eyebrow?: string
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
  buttonTarget?: string
  className?: string
}

/**
 * Reusable CTASection component used across all pages.
 * Eliminates repeated DOM & styling while allowing page-specific content props.
 */
export function CTASection({
  id,
  eyebrow = 'Start a conversation',
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonTarget,
  className,
}: CTASectionProps) {
  return (
    <section id={id} className={cn('section-space', className)}>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-steel-blue px-7 py-16 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:py-20 xl:py-24 shadow-lg">
            {/* Subtle background industrial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10">
              <SectionLabel tone="white" indicator>
                {eyebrow}
              </SectionLabel>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-6xl">
                {title}
              </h2>
            </div>

            <div className="relative z-10 mt-10 lg:mt-0 lg:max-w-xs">
              <p className="leading-relaxed text-white/85 text-base sm:text-lg">
                {description}
              </p>
              <div className="mt-6 pt-1">
                <Button
                  variant="white"
                  size="lg"
                  href={buttonHref}
                  target={buttonTarget}
                  rightIcon={<ArrowUpRight size={17} />}
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

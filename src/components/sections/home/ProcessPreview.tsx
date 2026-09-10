import { processSteps } from '@/data/site'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ProcessPreview() {
  return (
    <section className="section-space">
      <Container>
        <Reveal>
          <SectionHeading
            label="How we work"
            title="Clear from the first conversation to the final finish."
            className="max-w-5xl"
          />
        </Reveal>

        <Stagger className="mt-14 grid border-t border-line md:grid-cols-3">
          {processSteps.map((step) => (
            <StaggerItem key={step.number}>
              <article className="border-b border-line py-8 sm:py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <SectionLabel tone="steel-blue" className="text-xl">
                  {step.number}
                </SectionLabel>
                <h3 className="mt-8 text-3xl font-medium tracking-tight text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xs text-base leading-relaxed text-muted">
                  {step.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

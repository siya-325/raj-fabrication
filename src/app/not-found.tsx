import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { mainNavItems } from '@/config/navigation'

export default function NotFound() {
  return (
    <PageShell
      navVariant="solid"
      mainClassName="flex items-center justify-center pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <SectionLabel tone="copper" indicator className="mx-auto">
              [404 · Out of Blueprint]
            </SectionLabel>

            <h1 className="display-heading mt-6 text-charcoal">
              This piece isn&apos;t on the workshop floor.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto">
              The page you requested may have been relocated, redesigned, or hasn&apos;t been fabricated yet.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="copper"
                size="lg"
                href="/"
                leftIcon={<ArrowLeft size={17} />}
                className="font-semibold"
              >
                Return to home
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/services"
                rightIcon={<ArrowUpRight size={17} />}
              >
                Browse services
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Quick route suggestions */}
        <Reveal delay={0.15}>
          <div className="mt-16 border-t border-line pt-10">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-muted mb-6">
              Or jump directly to:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {mainNavItems.map((item) => (
                <Card
                  key={item.href}
                  variant="surface"
                  className="p-4 transition-all duration-200 hover:border-charcoal/30 hover:bg-background"
                >
                  <Button
                    variant="link"
                    href={item.href}
                    rightIcon={<ArrowUpRight size={15} />}
                    className="w-full justify-between text-charcoal font-medium"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted font-normal font-sans">
                      {item.description}
                    </span>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </PageShell>
  )
}

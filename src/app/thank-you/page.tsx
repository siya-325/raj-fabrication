import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/data/site'
import { getWhatsAppUrl } from '@/lib/helpers'

export const metadata: Metadata = {
  title: 'Thank You for Reaching Out | Raj Fabrication Ahmedabad',
  description:
    'Thank you for contacting Raj Fabrication in Satellite, Ahmedabad. We have received your fabrication inquiry and will call you back shortly.',
  alternates: {
    canonical: 'https://rajfabrication.in/thank-you',
  },
  openGraph: {
    title: 'Thank You for Reaching Out | Raj Fabrication Ahmedabad',
    description:
      'We have received your requirement. A representative from Raj Fabrication will call you back shortly.',
    url: 'https://rajfabrication.in/thank-you',
    type: 'website',
  },
}

export default function ThankYouPage() {
  const whatsAppUrl = getWhatsAppUrl({
    text: 'Hello Raj Fabrication, I just submitted an inquiry on your website and would like to discuss my requirement.',
  })

  return (
    <PageShell
      navVariant="solid"
      mainClassName="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-background"
    >
      <Container size="default">
        {/* Top Hero Confirmation */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-copper/10 text-copper ring-8 ring-copper/5">
              <CheckCircle2 size={36} />
            </div>

            <SectionLabel tone="copper" indicator className="mx-auto">
              [Inquiry Confirmed · Raj Fabrication]
            </SectionLabel>

            <h1 className="display-heading mt-6 text-charcoal">
              Thank you for reaching out!
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto">
              We have received your requirement. A representative from{' '}
              <strong className="font-semibold text-charcoal">{site.name}</strong> will review your
              details and call you back shortly.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="copper"
                size="lg"
                href={whatsAppUrl}
                target="_blank"
                rightIcon={<MessageCircle size={17} />}
                className="font-semibold"
              >
                Chat on WhatsApp
              </Button>
              <Button
                variant="white"
                size="lg"
                href={`tel:${site.phone}`}
                leftIcon={<Phone size={17} />}
              >
                Call {site.phone}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={site.maps}
                target="_blank"
                rightIcon={<ArrowUpRight size={17} />}
              >
                Visit workshop
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Process Overview: What happens next? */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <div className="text-center mb-8">
              <p className="text-xs font-mono uppercase tracking-widest text-muted">
                Process Overview
              </p>
              <h2 className="mt-2 text-xl sm:text-2xl font-medium text-charcoal">
                What happens next?
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            <Reveal delay={0.15}>
              <Card variant="surface" className="h-full p-6 border-line">
                <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-line text-copper font-mono text-sm font-semibold">
                  01
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  Requirement Review
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Our fabrication experts examine your specified dimensions, load needs, and material preferences (MS, GI, or custom steel).
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.2}>
              <Card variant="surface" className="h-full p-6 border-line">
                <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-line text-copper font-mono text-sm font-semibold">
                  02
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  Transparent Estimate
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  We discuss exact site requirements, provide a clear timeline, and share competitive pricing with no hidden costs.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.25}>
              <Card variant="surface" className="h-full p-6 border-line">
                <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-line text-copper font-mono text-sm font-semibold">
                  03
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  Precision Fabrication
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Upon approval, metal cutting, welding, anti-rust priming, and structural fabrication proceed at our workshop in Satellite.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>

        {/* Workshop Information & Working Hours Bar */}
        <Reveal delay={0.3}>
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-background border border-line text-copper">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted">
                    Working Hours
                  </p>
                  <p className="mt-1 text-sm font-medium text-charcoal">
                    {site.hours}
                  </p>
                  <p className="text-xs text-muted">Open all 7 days</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-background border border-line text-copper">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted">
                    Workshop Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-charcoal leading-snug">
                    {site.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:col-span-2 lg:col-span-1">
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-background border border-line text-copper">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted">
                    Direct Assistance
                  </p>
                  <a
                    href={`tel:${site.phone}`}
                    className="mt-1 block text-sm font-medium text-charcoal hover:text-copper transition-colors"
                  >
                    {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-xs text-muted hover:text-copper transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Navigation Return Links */}
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted hover:text-charcoal font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Return to Home
            </Link>
            <span className="text-line">•</span>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-muted hover:text-charcoal font-medium transition-colors"
            >
              Browse Services
              <ArrowUpRight size={15} />
            </Link>
            <span className="text-line">•</span>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-muted hover:text-charcoal font-medium transition-colors"
            >
              View Our Work
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </PageShell>
  )
}

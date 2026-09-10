import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  FileCode,
  FolderKanban,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { mainNavItems, footerServiceItems } from '@/config/navigation'
import { allServices, serviceCategories } from '@/data/services'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'HTML Sitemap | Raj Fabrication Ahmedabad',
  description:
    'Complete HTML sitemap for Raj Fabrication. Easily navigate all pages, fabrication services, industrial shed solutions, gates, railings, and workshop contact channels.',
  alternates: {
    canonical: 'https://rajfabrication.in/sitemap.html',
  },
  openGraph: {
    title: 'HTML Sitemap | Raj Fabrication Ahmedabad',
    description:
      'Explore all pages, fabrication categories, and contact resources for Raj Fabrication in Satellite, Ahmedabad.',
    url: 'https://rajfabrication.in/sitemap.html',
    type: 'website',
  },
}

export default function SitemapHtmlPage() {
  const categoriesList = serviceCategories.filter((cat) => cat !== 'All Services')

  return (
    <PageShell
      navVariant="solid"
      mainClassName="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-background"
    >
      <Container size="default">
        {/* Page Header */}
        <Reveal>
          <div className="max-w-3xl">
            <SectionLabel tone="copper" indicator>
              [Site Architecture · rajfabrication.in]
            </SectionLabel>

            <h1 className="display-heading mt-4 text-charcoal">
              HTML Sitemap
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              An overview of all pages, service categories, fabricated metalwork offerings, and
              direct communication channels at Raj Fabrication in Satellite, Ahmedabad.
            </p>
          </div>
        </Reveal>

        {/* Section 1: Main Pages */}
        <div className="mt-14">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2.5 mb-6">
              <FolderKanban className="size-5 text-copper" />
              <h2 className="text-xl sm:text-2xl font-medium text-charcoal">
                Main Pages
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mainNavItems.map((item) => (
                <Card
                  key={item.href}
                  variant="surface"
                  className="p-5 transition-all duration-200 hover:border-charcoal/30 hover:bg-background"
                >
                  <Link
                    href={item.href}
                    className="group flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-charcoal group-hover:text-copper transition-colors">
                          {item.label}
                        </span>
                        <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper" />
                      </div>
                      <p className="mt-2 text-xs text-muted leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                    <span className="mt-4 font-mono text-[11px] text-muted/70">
                      {item.href}
                    </span>
                  </Link>
                </Card>
              ))}

              <Card
                variant="surface"
                className="p-5 transition-all duration-200 hover:border-charcoal/30 hover:bg-background"
              >
                <Link
                  href="/thank-you"
                  className="group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-charcoal group-hover:text-copper transition-colors">
                        Thank You Page
                      </span>
                      <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper" />
                    </div>
                    <p className="mt-2 text-xs text-muted leading-relaxed font-sans">
                      Inquiry confirmation page with next steps and direct contact channels.
                    </p>
                  </div>
                  <span className="mt-4 font-mono text-[11px] text-muted/70">
                    /thank-you
                  </span>
                </Link>
              </Card>
            </div>
          </Reveal>
        </div>

        {/* Section 2: Service Categories */}
        <div className="mt-16">
          <Reveal delay={0.15}>
            <div className="flex items-center gap-2.5 mb-6">
              <Layers className="size-5 text-copper" />
              <h2 className="text-xl sm:text-2xl font-medium text-charcoal">
                Service Categories
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {footerServiceItems.map((cat) => (
                <Card
                  key={cat.href}
                  variant="surface"
                  className="p-5 transition-all duration-200 hover:border-charcoal/30 hover:bg-background"
                >
                  <Link
                    href={cat.href}
                    className="group flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-charcoal group-hover:text-copper transition-colors">
                        {cat.label}
                      </span>
                      <p className="mt-1 font-mono text-[11px] text-muted/70">
                        {cat.href}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper" />
                  </Link>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Section 3: All Fabrication Services */}
        <div className="mt-16">
          <Reveal delay={0.2}>
            <div className="flex items-center gap-2.5 mb-6">
              <Wrench className="size-5 text-copper" />
              <h2 className="text-xl sm:text-2xl font-medium text-charcoal">
                Fabrication Services Directory
              </h2>
            </div>

            <div className="space-y-8">
              {categoriesList.map((category) => {
                const categoryServices = allServices.filter(
                  (service) => service.category === category
                )
                const categoryUrl = `/services?category=${encodeURIComponent(category)}`

                return (
                  <div
                    key={category}
                    className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4 mb-5">
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal">
                          {category}
                        </h3>
                        <p className="text-xs text-muted font-mono">
                          {categoryServices.length} Specialized Fabrication Services
                        </p>
                      </div>
                      <Link
                        href={categoryUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper hover:text-copper/80 transition-colors"
                      >
                        View in Services Page
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryServices.map((service) => (
                        <div
                          key={service.id}
                          className="rounded-xl border border-line/60 bg-background p-4 flex flex-col justify-between"
                        >
                          <div>
                            <span className="inline-block rounded-md bg-copper/10 px-2 py-0.5 text-[10px] font-medium font-mono text-copper mb-2">
                              {service.tag}
                            </span>
                            <h4 className="text-sm font-semibold text-charcoal">
                              {service.title}
                            </h4>
                            <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                              {service.description}
                            </p>
                          </div>
                          <Link
                            href={categoryUrl}
                            className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-charcoal/80 hover:text-copper transition-colors"
                          >
                            Explore service details
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Section 4: Workshop & Location Channels */}
        <div className="mt-16">
          <Reveal delay={0.25}>
            <div className="flex items-center gap-2.5 mb-6">
              <Building2 className="size-5 text-copper" />
              <h2 className="text-xl sm:text-2xl font-medium text-charcoal">
                Contact & Workshop Access
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card variant="surface" className="p-5 border-line">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Workshop Address
                </p>
                <p className="mt-2 text-sm font-medium text-charcoal leading-relaxed">
                  {site.address}
                </p>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-copper hover:underline underline-offset-4"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </a>
              </Card>

              <Card variant="surface" className="p-5 border-line">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Phone & WhatsApp
                </p>
                <p className="mt-2 text-sm font-medium text-charcoal">
                  Direct Line: {site.phone}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-copper hover:underline underline-offset-4"
                  >
                    Call Now
                    <Phone size={13} />
                  </a>
                  <span className="text-line">•</span>
                  <a
                    href={`https://wa.me/91${site.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-copper hover:underline underline-offset-4"
                  >
                    WhatsApp
                    <MessageCircle size={13} />
                  </a>
                </div>
              </Card>

              <Card variant="surface" className="p-5 border-line">
                <p className="text-xs font-mono uppercase tracking-wider text-muted">
                  Business Hours & Verification
                </p>
                <p className="mt-2 text-sm font-medium text-charcoal">
                  {site.hours}
                </p>
                <p className="mt-1 text-xs text-muted">Open all 7 days of the week</p>
                <a
                  href={site.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-copper hover:underline underline-offset-4"
                >
                  Verified on Justdial
                  <ArrowUpRight size={14} />
                </a>
              </Card>
            </div>
          </Reveal>
        </div>

        {/* Section 5: Machine-readable XML Sitemap notice */}
        <Reveal delay={0.3}>
          <div className="mt-16 rounded-2xl border border-line bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background border border-line text-copper">
                <FileCode size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">
                  Looking for the XML Sitemap?
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Our machine-readable XML sitemap is maintained dynamically for search engine crawlers at{' '}
                  <code className="font-mono text-charcoal">/sitemap.xml</code>.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              href="/sitemap.xml"
              target="_blank"
              rightIcon={<ArrowUpRight size={15} />}
              className="shrink-0"
            >
              View XML Sitemap
            </Button>
          </div>
        </Reveal>
      </Container>
    </PageShell>
  )
}

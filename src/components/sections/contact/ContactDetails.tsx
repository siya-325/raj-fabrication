import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/data/site'
import { getWhatsAppUrl } from '@/lib/helpers'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function ContactDetails() {
  const whatsAppUrl = getWhatsAppUrl({
    text: 'Hello Raj Fabrication, I would like to inquire about your fabrication services.',
  })

  return (
    <section className="section-space">
      <Container>
        {/* Mobile & Tablet Heading (Above the form) */}
        <div className="lg:hidden mb-8 sm:mb-10">
          <Reveal>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-charcoal leading-[1.08]">
                Send an inquiry
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-charcoal/85 max-w-lg">
                Fill out the form with your dimensions or project description, and we&apos;ll follow up promptly.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
          {/* Details Column: Address + Working Hours + Social Media (order-2 on mobile/tab, order-1 on lg) */}
          <div className="order-2 lg:order-1">
            <Reveal delay={0.1}>
              <div className="space-y-8">
                {/* Desktop Heading (hidden on mobile/tablet) */}
                <div className="hidden lg:block lg:pb-8">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-charcoal leading-[1.08]">
                    Send an inquiry
                  </h2>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-charcoal/85 max-w-lg">
                    Fill out the form with your dimensions or project description, and we&apos;ll follow up promptly.
                  </p>
                </div>

                {/* Workshop Address & Working Hours (Side-by-side ONLY on tablet view) */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                  {/* Workshop Address */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-charcoal tracking-tight mb-2">
                      <MapPin size={18} className="text-copper shrink-0" />
                      <span>Workshop Address</span>
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed max-w-sm">
                      {site.address}
                    </p>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-charcoal tracking-tight mb-2">
                      <Clock size={18} className="text-copper shrink-0" />
                      <span>Working Hours</span>
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/80 font-medium">
                      Monday – Saturday: 9:00 AM – 8:00 PM
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-muted">
                      Sunday: On prior appointment
                    </p>
                  </div>
                </div>

                {/* Social Media: Just icons at the bottom */}
                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white"
                    >
                      <InstagramIcon size={18} />
                    </a>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white"
                    >
                      <MessageCircle size={18} />
                    </a>
                    <a
                      href={site.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Google Maps"
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white"
                    >
                      <MapPin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Inquiry Form Column (order-1 on mobile/tab, order-2 on lg) */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

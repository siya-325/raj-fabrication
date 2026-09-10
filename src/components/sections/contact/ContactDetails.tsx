import { MapPin, Clock, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/data/site'
import { InstagramIcon, GoogleIcon, JustdialIcon } from '@/components/ui/SocialIcons'

export function ContactDetails() {

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

                {/* Workshop Address, Phone & Working Hours */}
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

                  {/* Phone & WhatsApp */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-charcoal tracking-tight mb-2">
                      <Phone size={18} className="text-copper shrink-0" />
                      <span>Phone / WhatsApp</span>
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/80 font-medium">
                      <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-copper">
                        {site.phone}
                      </a>
                    </p>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-charcoal tracking-tight mb-2">
                      <Clock size={18} className="text-copper shrink-0" />
                      <span>Working Hours</span>
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/80 font-medium">
                      Monday – Sunday: 9:00 AM – 9:00 PM
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-muted">
                      Open all 7 days
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
                      href={site.googleProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Google Profile"
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white"
                    >
                      <GoogleIcon size={17} />
                    </a>
                    <a
                      href={site.justdial}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Justdial Profile"
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white"
                    >
                      <JustdialIcon size={18} />
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

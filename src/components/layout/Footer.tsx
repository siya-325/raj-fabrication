import Link from 'next/link'
import { MessageCircle, MapPin, Mail, Phone, Clock } from 'lucide-react'
import { Logo } from './Logo'
import { mainNavItems, footerServiceItems } from '@/config/navigation'
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

export function Footer() {
  const whatsAppUrl = getWhatsAppUrl({
    text: 'Hello Raj Fabrication, I would like to inquire about your fabrication services.',
  })

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-white">
      <div className="flex flex-col gap-12 py-14 md:py-20">
        {/* Main upper content area with reduced side padding/margins */}
        <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 items-start sm:gap-x-16 sm:gap-y-12 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-x-12 xl:gap-x-16 lg:gap-y-0">
            {/* Logo block */}
            <div className="col-span-2 max-w-md sm:col-span-1 sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-1">
              <Logo isDark size="lg" />
              <p className="mt-6 max-w-sm text-sm leading-6 text-background/65">
                Practical, durable, and custom fabrication work for homes, businesses, and industrial requirements across Ahmedabad.
              </p>

              {/* Social media icons directly under the description */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-background/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <InstagramIcon size={17} />
                </a>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-background/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <MessageCircle size={17} />
                </a>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-background/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <MapPin size={17} />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div className="col-span-1 sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-background/45 font-mono">
                Explore
              </p>
              <div className="flex flex-col gap-3 text-sm text-background/75">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="col-span-1 sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-background/45 font-mono">
                Services
              </p>
              <div className="flex flex-col gap-3 text-sm text-background/75">
                {footerServiceItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact us */}
            <div className="col-span-2 max-w-sm sm:col-span-1 sm:col-start-2 sm:row-start-2 lg:col-start-4 lg:row-start-1 lg:max-w-xs">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-background/45 font-mono">
                Contact us
              </p>
              <div className="flex flex-col gap-3.5 text-sm text-background/75">
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 leading-relaxed transition-colors hover:text-white"
                >
                  <MapPin size={16} className="mt-1 shrink-0 text-background/60 transition-colors group-hover:text-white" />
                  <span>{site.address}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail size={16} className="shrink-0 text-background/60 transition-colors group-hover:text-white" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone size={16} className="shrink-0 text-background/60 transition-colors group-hover:text-white" />
                  <span>{site.phone}</span>
                </a>
                <div className="flex items-start gap-2.5 leading-relaxed text-background/60">
                  <Clock size={16} className="mt-1 shrink-0 text-background/50" />
                  <span>{site.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between font-mono">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p>
              Designed and Developed by{' '}
              <a
                href="https://gandhimediasolution.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-200 hover:underline underline-offset-4 decoration-white/70 hover:decoration-white"
              >
                Gandhi Media Solution
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

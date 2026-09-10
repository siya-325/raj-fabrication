'use client'

import { Phone } from 'lucide-react'
import { site } from '@/data/site'
import { getWhatsAppUrl } from '@/lib/helpers'

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export function FloatingContact() {
  const whatsAppUrl = getWhatsAppUrl({
    text: 'Hello Raj Fabrication, I would like to inquire about your fabrication services.',
  })
  const phoneHref = `tel:${site.phone.replace(/\s+/g, '')}`

  return (
    <div
      aria-label="Quick contact options"
      className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 flex flex-col gap-2.5 sm:gap-3 items-center"
    >
      {/* Phone Call Button with Continuous Ping Animation */}
      <div className="relative flex items-center justify-center">
        {/* Continuous Radar Ping Rings (staggered waves) */}
        <span
          className="absolute inset-0 rounded-full bg-steel-blue/35 animate-ping pointer-events-none"
          style={{ animationDuration: '2.4s' }}
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full bg-steel-blue/20 animate-ping pointer-events-none"
          style={{ animationDuration: '2.4s', animationDelay: '1.2s' }}
          aria-hidden="true"
        />

        <a
          href={phoneHref}
          aria-label={`Call Raj Fabrication at ${site.phone}`}
          title={`Call ${site.phone}`}
          className="relative z-10 group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-charcoal shadow-md hover:shadow-lg border border-line hover:border-charcoal/30 hover:bg-surface hover:text-steel-blue transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue focus-visible:ring-offset-2 cursor-pointer"
        >
          <Phone size={19} className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />

          {/* Hover tooltip for desktop */}
          <span className="pointer-events-none absolute left-full ml-3 hidden rounded-md bg-charcoal px-2.5 py-1 text-xs font-medium text-white shadow-md transition-opacity duration-150 group-hover:block whitespace-nowrap">
            Call {site.phone}
          </span>
        </a>
      </div>

      {/* WhatsApp Chat Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Raj Fabrication on WhatsApp"
        title="Chat on WhatsApp"
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:shadow-lg hover:bg-[#20ba59] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 cursor-pointer"
      >
        <WhatsAppIcon className="transition-transform duration-200 group-hover:scale-110 text-white" />

        {/* Hover tooltip for desktop */}
        <span className="pointer-events-none absolute left-full ml-3 hidden rounded-md bg-charcoal px-2.5 py-1 text-xs font-medium text-white shadow-md transition-opacity duration-150 group-hover:block whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  )
}

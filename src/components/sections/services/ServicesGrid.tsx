'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, X, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { getWhatsAppUrl } from '@/lib/helpers'

import {
  type ServiceItem,
  type ServiceCategory,
  serviceCategories,
  allServices,
} from '@/data/services'

// Re-export for any modules that import from ServicesGrid
export type { ServiceItem, ServiceCategory }
export { serviceCategories, allServices }


export function ServiceCard({
  item,
  priority = false,
  onSelect,
}: {
  item: ServiceItem
  priority?: boolean
  onSelect: (item: ServiceItem) => void
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-line shadow-xs transition-shadow duration-300 hover:shadow-md">
      {/* Top Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel/10">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Category Tag with Dot */}
        <div className="flex items-center gap-2 text-steel-blue font-mono text-xs uppercase tracking-[0.14em] font-medium">
          <span className="w-2 h-2 rounded-full bg-steel-blue shrink-0" />
          <span>{item.tag}</span>
        </div>

        {/* Title */}
        <h3 className="mt-3.5 text-xl sm:text-2xl font-semibold tracking-tight text-charcoal leading-snug">
          {item.title}
        </h3>

        {/* Concise Description */}
        <p className="mt-3 text-muted text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Action Link: Triggers modal box */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="group/btn inline-flex items-center gap-1.5 text-charcoal font-medium text-base border-b border-charcoal/40 pb-0.5 transition-colors duration-200 hover:border-charcoal hover:text-steel-blue cursor-pointer"
          >
            <span>Learn more</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ServiceModal({
  item,
  onClose,
}: {
  item: ServiceItem | null
  onClose: () => void
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!item) return
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalStyle
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  const whatsAppMessage = `Hello Raj Fabrication, I would like to inquire about ${item.title}.`
  const whatsAppUrl = getWhatsAppUrl({ text: whatsAppMessage })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/75 backdrop-blur-sm"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white shadow-2xl border border-line z-10 my-auto overflow-hidden"
      >
        {/* Pinned Close Button - Always visible, never scrolls away */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-30 flex size-11 items-center justify-center rounded-full bg-white text-charcoal shadow-lg border border-line/80 transition-all hover:bg-surface hover:scale-105 active:scale-95 cursor-pointer"
        >
          <X size={20} className="stroke-[2.5]" />
        </button>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 pt-6 sm:pt-8">
          {/* Modal Header Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-steel/10 mb-6 shadow-xs">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

        {/* Category & Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-2 text-steel-blue font-mono text-xs uppercase tracking-[0.14em] font-medium">
            <span className="w-2 h-2 rounded-full bg-steel-blue shrink-0" />
            <span>{item.tag}</span>
          </div>
          <span className="text-muted text-xs">•</span>
          <span className="text-xs text-muted font-mono uppercase tracking-[0.1em]">
            {item.category}
          </span>
        </div>

        {/* Modal Title */}
        <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal leading-snug mb-4">
          {item.title}
        </h2>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface/80 border border-line mb-6 text-xs">
          <div>
            <span className="block text-muted uppercase tracking-wider font-mono text-[10px]">
              {item.category === 'Welding Services'
                ? 'Quality Assurance'
                : item.category === 'Fabrication Services'
                ? 'Lead Time'
                : item.category === 'Fabricators'
                ? 'Material'
                : 'Type'}
            </span>
            <span className="font-semibold text-charcoal mt-0.5 block">
              {item.category === 'Welding Services'
                ? item.qualityAssurance
                : item.category === 'Fabrication Services'
                ? item.leadTime
                : item.category === 'Fabricators'
                ? item.material
                : item.type || 'Construction Services'}
            </span>
          </div>
          <div>
            <span className="block text-muted uppercase tracking-wider font-mono text-[10px]">
              {item.category === 'Welding Services'
                ? 'Area'
                : item.category === 'Fabrication Services'
                ? 'Industry Application'
                : item.category === 'Metal Services'
                ? 'Material'
                : item.category === 'Fabrication Contractors'
                ? 'Turnaround Time'
                : item.category === 'Fabricators'
                ? 'Custom Design'
                : item.category === 'Ms Fabricators'
                ? 'Industry'
                : 'Target Audience'}
            </span>
            <span className="font-semibold text-charcoal mt-0.5 block">
              {item.category === 'Welding Services'
                ? item.area
                : item.category === 'Fabrication Services'
                ? item.industryApplication
                : item.category === 'Metal Services'
                ? item.material
                : item.turnaroundTime || item.customDesign || item.targetAudience || 'Manufacturing Sector'}
            </span>
          </div>
          <div>
            <span className="block text-muted uppercase tracking-wider font-mono text-[10px]">Pricing</span>
            <span className="font-semibold text-steel-blue mt-0.5 block font-mono">{item.price || 'Request for Price'}</span>
          </div>
        </div>

        {/* Full Info Description */}
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-[0.16em] font-mono text-muted mb-2 font-semibold">
            Overview & Specifications
          </h4>
          <p className="text-charcoal/85 text-sm sm:text-base leading-relaxed">
            {item.fullDescription}
          </p>
        </div>
      </div>

      {/* Pinned Bottom Action Footer - Always visible without scrolling */}
      <div className="shrink-0 bg-white border-t border-line/80 px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-3 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        <Link
          href={`/contact?service=${encodeURIComponent(item.title)}`}
          onClick={onClose}
          className="w-full sm:w-auto flex-1 text-center py-3.5 px-6 rounded-full bg-charcoal text-white font-mono text-xs uppercase tracking-[0.14em] font-semibold transition-colors hover:bg-steel-blue cursor-pointer shadow-sm"
        >
          Request a Quote
        </Link>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-surface border border-line text-charcoal font-mono text-xs uppercase tracking-[0.14em] font-semibold transition-colors hover:bg-line cursor-pointer"
        >
          <MessageCircle size={15} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
      </motion.div>
    </div>
  )
}

export function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Industrial Shed Developers')
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  const filteredServices = allServices.filter(
    (service) => service.category === activeCategory
  )

  return (
    <section className="section-space">
      <Container>
        {/* Category filters - centered and accessible single-row horizontal scroll */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="no-scrollbar flex overflow-x-auto pb-2 gap-2.5 scroll-smooth max-w-full">
            {serviceCategories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    setActiveCategory(cat)
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    })
                  }}
                  className={cn(
                    'shrink-0 inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue',
                    isActive
                      ? 'bg-steel-blue text-white shadow-sm border border-steel-blue'
                      : 'bg-surface text-charcoal/85 border border-line hover:border-charcoal/30 hover:bg-surface/80'
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Gallery grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ServiceCard
                  item={item}
                  priority={idx < 3}
                  onSelect={(service) => setSelectedService(service)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Modal Popup Box with Full Info */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            item={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

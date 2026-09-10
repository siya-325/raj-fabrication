'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    quote: 'Raj Fabrication made our main entrance gate and balcony railings. The alignment, finish, and locking mechanism were completed cleanly on schedule.',
    author: 'Amit Shah',
    role: 'Homeowner, Satellite, Ahmedabad',
  },
  {
    quote: 'Very reliable Mild Steel fabrication workshop. They took precise site measurements and fabricated our warehouse storage platform without any fitting hassles.',
    author: 'Prashant Patel',
    role: 'Warehouse Operations, Changodar',
  },
  {
    quote: 'We collaborated with Raj Fabrication on custom decorative steel partitions for an interior project. Excellent attention to grinding, welding lines, and matte paint finish.',
    author: 'Kavita Dave',
    role: 'Interior Designer, Vastrapur',
  },
  {
    quote: 'Engaged them for heavy structural steel roof trusses and canopy framing. Honest gauge thickness, certified weld strength, and seamless on-site assembly.',
    author: 'Rajesh Mehta',
    role: 'Industrial Contractor, Sanand GIDC',
  },
]

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="section-space">
      <Container>
        <Reveal>
          <SectionHeading
            layout="split"
            label="Client Feedback"
            labelTone="steel-blue"
            title="Trusted across Ahmedabad since 2012."
            description="What property owners and contractors say about our fabrication quality and on-site delivery."
            action={
              <div className="hidden lg:flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous review"
                  className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 cursor-pointer hover:bg-charcoal hover:text-white hover:border-charcoal active:scale-95 shadow-xs"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next review"
                  className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition-all duration-200 cursor-pointer hover:bg-charcoal hover:text-white hover:border-charcoal active:scale-95 shadow-xs"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            }
          />
        </Reveal>

        {/* Embla Carousel Viewport */}
        <div className="mt-12 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="-ml-4 sm:-ml-6 flex items-stretch">
            {testimonials.map((review, index) => (
              <div
                key={`${review.author}-${index}`}
                className="pl-4 sm:pl-6 flex-[0_0_calc(100%/1.1)] sm:flex-[0_0_calc(100%/1.5)] lg:flex-[0_0_calc(100%/2.5)] min-w-0 select-none flex flex-col"
              >
                <Card variant="surface" className="p-7 sm:p-8 flex flex-col justify-between h-full border border-line">
                  <div>
                    <div className="flex items-center gap-1 text-[#F59E0B] mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={24} className="text-muted/30 mb-3" />
                    <p className="text-base sm:text-lg leading-relaxed text-charcoal/90 italic font-sans">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 border-t border-line/70 pt-5">
                    <p className="font-semibold text-charcoal">{review.author}</p>
                    <p className="text-xs font-mono text-muted uppercase tracking-wider mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots (Mobile & Tablet only) */}
        <div className="mt-8 flex lg:hidden items-center justify-center">
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to review ${index + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                  selectedIndex === index
                    ? 'w-8 bg-charcoal'
                    : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

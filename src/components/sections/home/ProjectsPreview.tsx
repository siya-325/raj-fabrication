'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/sections/projects/ProjectCard'
import { featuredProjects } from '@/data/projects'
import { cn } from '@/lib/utils'


export function ProjectsPreview() {
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
    <section
      id="work"
      className="py-14 sm:py-20 lg:py-20 xl:py-20 bg-[#5C5C5C] text-white border-y border-white/10"
    >
      <Container>
        <Reveal>
          <SectionHeading
            theme="dark"
            layout="split"
            label="Selected work"
            labelTone="white"
            title="Made for the real world."
            titleSize="xl"
            action={
              <Button
                variant="link"
                href="/projects"
                rightIcon={<ArrowUpRight size={15} />}
                className="text-white/80 hover:text-white font-mono uppercase tracking-[0.14em] text-xs"
              >
                See all work
              </Button>
            }
          />
        </Reveal>

        {/* Embla Carousel Viewport */}
        <div className="mt-8 sm:mt-12 lg:mt-6 xl:mt-7 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="-ml-3 sm:-ml-6 lg:-ml-6 flex">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="pl-3 sm:pl-6 lg:pl-6 flex-[0_0_calc(100%/1.1)] sm:flex-[0_0_calc(100%/1.5)] lg:flex-[0_0_calc(100%/2.5)] min-w-0 select-none"
              >
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  labelTone="white"
                  aspectRatio="aspect-[16/10] sm:aspect-[25/12] lg:aspect-[16/10] w-full"
                  titleClassName="text-sm sm:text-base md:text-xl lg:text-base xl:text-lg font-medium"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls: Dots on Mobile/Tablet, Arrow Buttons on Laptop/Desktop */}
        <div className="mt-6 sm:mt-10 lg:mt-5 flex items-center justify-center lg:justify-end">
          {/* Slide Indicator Dots (Mobile & Tablet) */}
          <div className="flex lg:hidden items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                  selectedIndex === index
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/25 hover:bg-white/50'
                )}
              />
            ))}
          </div>

          {/* Bottom-Right Navigation Controls (Laptop & Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hover:bg-white hover:text-charcoal hover:border-white active:scale-95 shadow-sm"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hover:bg-white hover:text-charcoal hover:border-white active:scale-95 shadow-sm"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { site } from '@/data/site'
import { SectionLabel } from '@/components/ui/SectionLabel'

export interface PageHeroProps {
  badge: string
  badgeTone?: 'white' | 'copper' | 'steel' | 'steel-blue'
  title: ReactNode
  description: string
  imageSrc?: string
  imageAlt?: string
  priority?: boolean
  className?: string
}

/**
 * Universal PageHero component for all inner pages.
 * Enforces unrounded 75vh full-bleed presentation, consistent typography,
 * and atmospheric gradients.
 */
export function PageHero({
  badge,
  badgeTone = 'white',
  title,
  description,
  imageSrc = '/images/home/raj-fabrication-hero.png',
  imageAlt = `${site.name} workshop and custom fabrication`,
  priority = true,
  className,
}: PageHeroProps) {
  return (
    <section className={`relative min-h-[75vh] overflow-hidden bg-charcoal text-white ${className ?? ''}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover object-center brightness-[0.85] contrast-[1.05]"
      />
      {/* Editorial layered atmospheric gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,22,.88),rgba(12,18,22,.4)_65%,rgba(12,18,22,.2))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-black/25" />

      <div className="relative z-10 flex min-h-[75vh] flex-col px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pt-32">
        <div className="mt-auto grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="mb-4">
              <SectionLabel tone={badgeTone} indicator>
                {badge}
              </SectionLabel>
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
            className="max-w-sm lg:justify-self-end"
          >
            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-normal">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { site } from '@/data/site'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { IconButton } from '@/components/ui/IconButton'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal text-white">
      <Image
        src="/images/home/raj-fabrication-hero.webp"
        alt="Monumental structural steel portal frames and architectural steel trusses fabricated by Raj Fabrication in Ahmedabad"
        fill
        priority
        className="object-cover object-center brightness-[0.86] contrast-[1.02]"
      />
      {/* Editorial layered atmospheric gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,22,.86),rgba(12,18,22,.32)_65%,rgba(12,18,22,.15))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-screen flex-col px-5 pb-7 pt-5 sm:px-8 lg:px-12 lg:pb-10 lg:pt-7">
        <div className="mt-auto grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="mb-5">
              <SectionLabel tone="white" indicator>
                {site.name} · {site.location}
              </SectionLabel>
            </div>
            <h1 className="max-w-3xl text-balance text-5xl font-medium leading-[.96] tracking-[-0.06em] sm:text-7xl lg:text-[7.25rem]">
              Built to fit.
              <br />
              <span className="text-white/65">Made to last.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="max-w-sm lg:justify-self-end"
          >
            <p className="mb-6 text-base leading-7 text-white/80 font-normal">
              Custom fabrication, welding, and practical metalwork for homes, businesses, and industrial requirements across Ahmedabad.
            </p>
            <Link
              href="#services"
              className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
            >
              <span>Explore services</span>
              <IconButton
                variant="copper"
                size="md"
                rotateOnHover
                aria-label="Explore services"
              >
                <ArrowRight size={17} />
              </IconButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

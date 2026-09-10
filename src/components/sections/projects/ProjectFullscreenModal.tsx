'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { ProjectItem } from '@/data/projects'

export interface ProjectFullscreenModalProps {
  projects: ProjectItem[]
  currentIndex: number
  onClose: () => void
  onSelectIndex: (index: number) => void
}

export function ProjectFullscreenModal({
  projects,
  currentIndex,
  onClose,
  onSelectIndex,
}: ProjectFullscreenModalProps) {
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false)
  const currentProject = projects[currentIndex]

  // Track native browser fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleBrowserFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.()
      } else {
        await document.exitFullscreen?.()
      }
    } catch {
      // Fullscreen API may be blocked by browser policy
    }
  }, [])

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + projects.length) % projects.length)
  }, [currentIndex, projects.length, onSelectIndex])

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % projects.length)
  }, [currentIndex, projects.length, onSelectIndex])

  // Body scroll lock & Keyboard shortcuts
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, handlePrev, handleNext])

  if (!currentProject) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentProject.title} fullscreen viewer`}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-xl text-white select-none overflow-hidden"
    >
      {/* Top Controls Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 border-b border-white/10 bg-black/40 backdrop-blur-md">
        {/* Left: Category & Title snippet */}
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <SectionLabel
            tone="steel"
            indicator
            className="text-[0.625rem] sm:text-xs tracking-[0.15em] shrink-0"
          >
            {currentProject.category}
          </SectionLabel>
          <span className="hidden sm:inline text-white/30 font-light">|</span>
          <h2 className="hidden sm:inline text-sm md:text-base font-medium text-white truncate max-w-md">
            {currentProject.title}
          </h2>
        </div>

        {/* Right: Counter & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Index Counter */}
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/80 font-mono tracking-wider">
            <span>{currentIndex + 1}</span>
            <span className="mx-1 text-white/40">/</span>
            <span>{projects.length}</span>
          </div>

          {/* Native Browser Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleBrowserFullscreen}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title={isBrowserFullscreen ? 'Exit native fullscreen' : 'Enter native fullscreen'}
            aria-label={isBrowserFullscreen ? 'Exit native fullscreen' : 'Enter native fullscreen'}
          >
            {isBrowserFullscreen ? (
              <Minimize className="size-4 sm:size-5" />
            ) : (
              <Maximize className="size-4 sm:size-5" />
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-charcoal border border-white/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white font-medium text-xs sm:text-sm"
            title="Close (Esc)"
            aria-label="Close fullscreen view"
          >
            <X className="size-4 sm:size-[18px]" />
            <span className="hidden xs:inline">Close</span>
            <span className="hidden md:inline text-[0.625rem] opacity-60 font-mono bg-white/20 group-hover:bg-charcoal/20 px-1.5 py-0.5 rounded ml-0.5">
              ESC
            </span>
          </button>
        </div>
      </div>

      {/* Main Viewport with Image & Nav Buttons */}
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden">
        {/* Background Click to Close (Outside image) */}
        <div
          onClick={onClose}
          className="absolute inset-0 z-0 cursor-zoom-out"
          aria-hidden="true"
        />

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-2 sm:left-6 z-10 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-charcoal border border-white/20 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          title="Previous (Left Arrow)"
          aria-label="Previous project"
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>

        {/* Fullscreen Image Container with Smooth Animation */}
        <div className="relative z-10 max-h-[72vh] sm:max-h-[76vh] md:max-h-[80vh] w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            >
              <div className="relative w-full h-full max-h-[72vh] sm:max-h-[76vh] md:max-h-[80vh] flex items-center justify-center">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  width={1400}
                  height={1050}
                  priority
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-2 sm:right-6 z-10 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-charcoal border border-white/20 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          title="Next (Right Arrow)"
          aria-label="Next project"
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>
      </div>

      {/* Bottom Info & Inquire CTA */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-8 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="text-center sm:text-left">
          <p className="text-xs text-white/50 tracking-wider uppercase font-mono">
            {currentProject.category}
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight">
            {currentProject.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/contact?project=${encodeURIComponent(currentProject.title)}`}
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen?.().catch(() => {})
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-steel-blue hover:bg-steel-blue/90 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>Inquire About Project</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

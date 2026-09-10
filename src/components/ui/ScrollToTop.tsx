'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 280)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll to top of page"
          title="Back to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-charcoal shadow-md hover:shadow-lg border border-line hover:border-charcoal/30 hover:bg-surface transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue focus-visible:ring-offset-2 cursor-pointer"
        >
          <ArrowUp
            size={20}
            className="text-charcoal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-steel-blue"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

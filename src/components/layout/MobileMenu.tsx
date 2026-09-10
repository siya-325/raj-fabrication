'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { mainNavItems } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from 'lucide-react'

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-charcoal px-6 pb-10 pt-28 text-white md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Mobile navigation"
        >
          <motion.nav
            className="flex flex-col gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
            }}
          >
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between border-b border-white/10 pb-4 text-3xl font-medium tracking-tight transition-all ${
                      isActive ? 'text-white font-semibold' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <span className="size-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                      )}
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight
                      size={22}
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'text-white translate-x-0.5 -translate-y-0.5'
                          : 'text-white/25 group-hover:text-white/75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>

          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="white"
              size="lg"
              href="/contact"
              onClick={onClose}
              className="w-full shadow-lg"
            >
              Get a quote
            </Button>
            <p className="text-center font-mono text-xs uppercase tracking-widest text-white/50">
              Satellite, Ahmedabad · Est. 2012
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

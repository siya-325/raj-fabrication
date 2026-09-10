'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { mainNavItems } from '@/config/navigation'
import { servicesDropdownData } from '@/data/services'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [isServicesExpanded, setIsServicesExpanded] = useState(false)

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
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-charcoal px-6 pb-10 pt-28 text-white lg:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Mobile navigation"
        >
          <motion.nav
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
            }}
          >
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.label === 'Services' && pathname.startsWith('/services'))
              const isServices = item.label === 'Services'

              if (isServices) {
                return (
                  <motion.div
                    key={item.href}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    className="border-b border-white/10 pb-3"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`text-2xl sm:text-3xl font-medium tracking-tight transition-all ${
                          isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <span className="size-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                          )}
                          <span>{item.label}</span>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                        aria-label={isServicesExpanded ? 'Collapse services menu' : 'Expand services menu'}
                        className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-transform duration-200"
                      >
                        <ChevronDown
                          size={18}
                          className={cn(
                            'transition-transform duration-200',
                            isServicesExpanded && 'rotate-180 text-steel-blue'
                          )}
                        />
                      </button>
                    </div>

                    {/* Expandable Services Categories Only (No individual sub-services) */}
                    <AnimatePresence initial={false}>
                      {isServicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden pt-3 pb-1 space-y-1 pl-3"
                        >
                          {servicesDropdownData.map((group, idx) => (
                            <Link
                              key={group.category}
                              href={group.href}
                              onClick={onClose}
                              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-xs text-steel-blue font-semibold">0{idx + 1}</span>
                                <span className="text-base font-medium text-white/90">{group.category}</span>
                              </div>
                              <ArrowUpRight size={15} className="text-steel-blue shrink-0" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between border-b border-white/10 pb-4 text-2xl sm:text-3xl font-medium tracking-tight transition-all ${
                      isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <span className="size-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                      )}
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight
                      size={20}
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

'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react'
import { mainNavItems } from '@/config/navigation'
import { servicesDropdownData } from '@/data/services'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export type NavbarVariant = 'transparent' | 'solid' | 'dark'

export interface NavbarProps {
  variant?: NavbarVariant
}

export function Navbar({ variant }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isNearTop, setIsNearTop] = useState(true)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const resolvedVariant: NavbarVariant = variant ?? (pathname === '/' ? 'transparent' : 'solid')
  const isTransparentVariant = resolvedVariant === 'transparent'
  const isDarkTone = true // Always high-contrast white & copper on dark hero and dark charcoal sticky bar

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsServicesOpen(true)
  }

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 180)
  }

  // Cleanup timeout on unmount and close dropdown on page navigation
  useEffect(() => {
    setIsServicesOpen(false)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)
      const diff = currentScrollY - lastScrollY

      // Check if near top of the page (within top 140px)
      const nearTop = currentScrollY <= 140
      setIsNearTop(nearTop)

      if (currentScrollY <= 25) {
        // At the very top: always visible and transparent
        setIsVisible(true)
      } else {
        // Scrolling DOWN past 80px: hide navbar smoothly
        if (diff > 8 && currentScrollY > 80) {
          setIsVisible(false)
          setIsServicesOpen(false)
        }
        // Scrolling UP anywhere on screen: reveal navbar smoothly
        else if (diff < -6) {
          setIsVisible(true)
        }
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    // Initial check on mount
    updateScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep navbar visible if near top or if mobile menu is open
  const shouldShowNavbar = isVisible || isMenuOpen || isNearTop

  // When near top on transparent pages, fade background to transparent for seamless transition
  const isTransparent = isTransparentVariant && isNearTop

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 px-5 sm:px-8 lg:px-12 py-6 sm:py-7 text-white transition-[background-color,border-color,box-shadow] duration-500 ease-out',
          isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-charcoal/95 backdrop-blur-md border-b border-white/10 shadow-xl'
        )}
        initial={false}
        animate={{
          y: shouldShowNavbar ? '0%' : '-100%',
        }}
        transition={{
          duration: 0.32,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative mx-auto flex max-w-[84rem] items-center justify-between">
          {/* Logo / Brand */}
          <Logo isDark={isDarkTone} priority size="md" />

          {/* Desktop Navigation (Laptops & Desktops) */}
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Primary navigation">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.label === 'Services' && pathname.startsWith('/services'))
              const isServices = item.label === 'Services'

              if (isServices) {
                return (
                  <div
                    key={item.href}
                    className="relative py-1"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'relative py-1 transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer select-none',
                        isActive || isServicesOpen
                          ? 'text-white font-semibold'
                          : 'text-white/80 hover:text-white'
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200 opacity-70',
                          isServicesOpen && 'rotate-180 opacity-100 text-steel-blue'
                        )}
                      />
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-white"
                        />
                      )}
                    </Link>
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-1 transition-all duration-200',
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-white"
                    />
                  )}
                </Link>
              )
            })}

            <Button
              variant="white"
              size="sm"
              href="/contact"
              className="shadow-xs"
            >
              Get a quote
            </Button>
          </nav>

          {/* Services Mega-Dropdown Panel (Architectural Editorial Design) */}
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
                className="absolute left-0 right-0 top-full mt-3.5 w-full rounded-2xl bg-white border border-line shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] z-50 text-charcoal overflow-hidden"
              >
                {/* Invisible hover bridge to prevent cursor gap drop */}
                <div className="absolute -top-4 inset-x-0 h-4" />

                {/* 3-Column, 2-Row Layout (Category as Head, Services without Bullets) */}
                <div className="grid grid-cols-3 gap-x-12 gap-y-7 px-8 py-8">
                  {servicesDropdownData.map((group) => (
                    <div key={group.category} className="space-y-2">
                      {/* Category Head */}
                      <div>
                        <Link
                          href={group.href}
                          onClick={() => setIsServicesOpen(false)}
                          className="group/cat inline-flex items-center gap-1.5 text-[15px] font-bold text-charcoal hover:text-steel-blue transition-colors"
                        >
                          <span className="tracking-tight">{group.category}</span>
                          <ArrowUpRight
                            size={14}
                            className="text-steel-blue opacity-70 group-hover/cat:opacity-100 group-hover/cat:translate-x-0.5 group-hover/cat:-translate-y-0.5 transition-all"
                          />
                        </Link>
                      </div>

                      {/* Services List - Without any bullet points */}
                      <ul className="space-y-1.5">
                        {group.services.map((serviceTitle) => (
                          <li
                            key={serviceTitle}
                            className="text-[13.5px] text-[#475569] font-normal leading-relaxed select-none hover:text-charcoal transition-colors"
                          >
                            {serviceTitle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* 6th Slot: View All Services Button */}
                  <div className="flex items-center">
                    <Link
                      href="/services"
                      onClick={() => setIsServicesOpen(false)}
                      className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-steel-blue text-white text-sm font-semibold hover:bg-steel-blue/90 transition-all shadow-sm"
                    >
                      <span>View all services</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            type="button"
            className="relative z-50 flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors lg:hidden cursor-pointer"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <motion.span
                className="h-px w-full bg-current"
                animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="h-px w-full bg-current"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="h-px w-full bg-current"
                animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <div id="mobile-navigation">
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

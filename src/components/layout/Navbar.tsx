'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { mainNavItems } from '@/config/navigation'
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
  const pathname = usePathname()

  const resolvedVariant: NavbarVariant = variant ?? (pathname === '/' ? 'transparent' : 'solid')
  const isTransparentVariant = resolvedVariant === 'transparent'
  const isDarkTone = true // Always high-contrast white & copper on dark hero and dark charcoal sticky bar

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
        <div className="mx-auto flex max-w-[84rem] items-center justify-between">
          {/* Logo / Brand */}
          <Logo isDark={isDarkTone} priority size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary navigation">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href
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

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="relative z-50 flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors md:hidden cursor-pointer"
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

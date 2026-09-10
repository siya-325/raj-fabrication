import type { ReactNode } from 'react'
import { Navbar, type NavbarVariant } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FloatingContact } from '@/components/ui/FloatingContact'
import { cn } from '@/lib/utils'

export interface PageShellProps {
  children: ReactNode
  navVariant?: NavbarVariant
  mainClassName?: string
  hideNavbar?: boolean
  hideFooter?: boolean
  hideScrollToTop?: boolean
  hideFloatingContact?: boolean
}

/**
 * Universal PageShell for all routes in src/app.
 * Provides unified navigation routing, header variants, accessible skip link, footer, quick contacts, and back-to-top.
 */
export function PageShell({
  children,
  navVariant,
  mainClassName,
  hideNavbar = false,
  hideFooter = false,
  hideScrollToTop = false,
  hideFloatingContact = false,
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-charcoal">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {!hideNavbar && <Navbar variant={navVariant} />}

      <main id="main-content" className={cn('flex-1', mainClassName)}>
        {children}
      </main>

      {!hideFooter && <Footer />}

      {!hideFloatingContact && <FloatingContact />}

      {!hideScrollToTop && <ScrollToTop />}
    </div>
  )
}

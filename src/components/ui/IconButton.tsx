import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonVariant = 'copper' | 'outline' | 'solid' | 'white' | 'glass' | 'ghost'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  href?: string
  target?: string
  rel?: string
  rotateOnHover?: boolean
  'aria-label': string
  children: ReactNode
}

export function IconButton({
  variant = 'outline',
  size = 'md',
  href,
  target,
  rel,
  rotateOnHover = false,
  className,
  children,
  ...props
}: IconButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full transition-all duration-200 select-none shrink-0 cursor-pointer',
    size === 'sm' && 'size-8 text-xs',
    size === 'md' && 'size-10 text-sm',
    size === 'lg' && 'size-12 text-base',
    variant === 'copper' && 'bg-copper text-white shadow-sm hover:bg-copper/90',
    variant === 'outline' && 'border border-line text-charcoal hover:border-charcoal hover:bg-surface/60',
    variant === 'solid' && 'bg-charcoal text-white hover:bg-charcoal/85 shadow-sm',
    variant === 'white' && 'bg-white text-charcoal hover:bg-white/90 shadow-sm',
    variant === 'glass' && 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
    variant === 'ghost' && 'text-current hover:bg-black/5 active:bg-black/10',
    rotateOnHover && 'hover:rotate-45',
    className
  )

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={baseClasses}
          aria-label={props['aria-label']}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={baseClasses} aria-label={props['aria-label']}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={baseClasses} {...props}>
      {children}
    </button>
  )
}

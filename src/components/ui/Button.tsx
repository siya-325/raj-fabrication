import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'copper' | 'white' | 'outline' | 'secondary' | 'ghost' | 'link' | 'steel-blue'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  target?: string
  rel?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const isLinkVariant = variant === 'link'

  const baseClasses = cn(
    'inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer',
    !isLinkVariant && 'font-mono uppercase tracking-[0.14em]',
    isLinkVariant && 'font-medium',
    // Size styles (unless it's an inline link)
    !isLinkVariant && {
      'text-[0.72rem] px-4 py-2 rounded-full gap-1.5': size === 'sm',
      'text-xs px-5 py-2.5 rounded-full gap-2': size === 'md',
      'text-xs sm:text-sm px-6 py-3.5 rounded-full gap-2.5': size === 'lg',
    },
    // Variant styles
    variant === 'primary' && 'bg-charcoal text-white hover:bg-charcoal/85 active:scale-[0.98] shadow-sm',
    variant === 'copper' && 'bg-copper text-white hover:bg-copper/90 active:scale-[0.98] shadow-sm',
    variant === 'steel-blue' && 'bg-steel-blue text-white hover:bg-steel-blue/90 active:scale-[0.98] shadow-sm',
    variant === 'white' && 'bg-white text-charcoal hover:bg-white/90 active:scale-[0.98] shadow-sm',
    variant === 'outline' && 'border border-line text-charcoal hover:border-charcoal hover:bg-surface/50 active:scale-[0.98]',
    variant === 'secondary' && 'bg-surface border border-line/70 text-charcoal hover:bg-line/40 active:scale-[0.98]',
    variant === 'ghost' && 'text-charcoal hover:bg-charcoal/5 active:bg-charcoal/10 rounded-full',
    variant === 'link' && 'p-0 text-current border-b border-current pb-0.5 hover:opacity-75 transition-opacity gap-1.5',
    className
  )

  const content = (
    <>
      {leftIcon && <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </>
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
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={baseClasses} {...props}>
      {content}
    </button>
  )
}

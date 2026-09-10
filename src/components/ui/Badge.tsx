import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'default' | 'active' | 'copper' | 'steel' | 'dark' | 'outline'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  asButton?: boolean
  selected?: boolean
  children?: ReactNode
}

export function Badge({
  variant = 'default',
  size = 'md',
  asButton = false,
  selected = false,
  className,
  children,
  onClick,
  ...props
}: BadgeProps) {
  const isInteractive = asButton || Boolean(onClick)
  const resolvedVariant = selected ? 'active' : variant

  const classes = cn(
    'inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-all duration-200 select-none',
    size === 'sm' && 'text-xs px-3 py-1',
    size === 'md' && 'text-sm px-4 py-2',
    // Variants
    resolvedVariant === 'default' && 'border border-line text-muted bg-transparent',
    resolvedVariant === 'active' && 'border-steel-blue bg-steel-blue text-white shadow-xs',
    resolvedVariant === 'copper' && 'border border-copper/30 bg-copper/10 text-copper',
    resolvedVariant === 'steel' && 'border border-steel/30 bg-steel/10 text-steel',
    resolvedVariant === 'dark' && 'border border-white/20 bg-white/10 text-white/90',
    resolvedVariant === 'outline' && 'border border-charcoal/30 text-charcoal',
    // Interactive hover
    isInteractive && resolvedVariant !== 'active' && 'hover:border-charcoal/40 hover:text-charcoal cursor-pointer',
    className
  )

  if (isInteractive) {
    return (
      <button type="button" onClick={onClick} className={classes} {...props}>
        {children}
      </button>
    )
  }

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

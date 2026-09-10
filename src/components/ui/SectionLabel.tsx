import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface SectionLabelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  tone?: 'muted' | 'copper' | 'steel' | 'steel-blue' | 'white' | 'current'
  indicator?: boolean
  children?: ReactNode
}

export function SectionLabel({
  as: Component = 'p',
  tone = 'muted',
  indicator = false,
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <Component
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-none',
        tone === 'muted' && 'text-muted',
        tone === 'copper' && 'text-copper',
        tone === 'steel' && 'text-steel',
        tone === 'steel-blue' && 'text-steel-blue',
        tone === 'white' && 'text-white/70',
        tone === 'current' && 'text-current',
        className
      )}
      {...props}
    >
      {indicator && (
        <span
          aria-hidden="true"
          className={cn(
            'inline-block size-1.5 rounded-full',
            tone === 'copper' ? 'bg-copper' : tone === 'steel-blue' ? 'bg-steel-blue' : 'bg-current'
          )}
        />
      )}
      {children}
    </Component>
  )
}

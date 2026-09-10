import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  tone?: 'line' | 'dark' | 'light'
  children?: ReactNode
}

export function Divider({
  orientation = 'horizontal',
  tone = 'line',
  children,
  className,
  ...props
}: DividerProps) {
  const toneClasses = cn(
    tone === 'line' && 'border-line',
    tone === 'dark' && 'border-charcoal/15',
    tone === 'light' && 'border-white/20'
  )

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-px border-r', toneClasses, className)}
        {...props}
      />
    )
  }

  if (children) {
    return (
      <div
        role="separator"
        className={cn('relative my-8 flex items-center justify-center', className)}
        {...props}
      >
        <div className={cn('w-full border-t', toneClasses)} />
        <span className="absolute bg-background px-4 font-mono text-xs uppercase tracking-widest text-muted">
          {children}
        </span>
      </div>
    )
  }

  return (
    <hr
      className={cn('w-full border-0 border-t my-6', toneClasses, className)}
      {...props}
    />
  )
}

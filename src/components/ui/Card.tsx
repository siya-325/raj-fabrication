import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: 'default' | 'surface' | 'dark' | 'ghost'
  interactive?: boolean
  children?: ReactNode
}

export function Card({
  as: Component = 'div',
  variant = 'default',
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg transition-all duration-300',
        variant === 'default' && 'bg-background border border-line',
        variant === 'surface' && 'bg-surface border border-line',
        variant === 'dark' && 'bg-charcoal text-white border border-white/10',
        variant === 'ghost' && 'bg-transparent',
        interactive && 'hover:-translate-y-1 hover:border-steel/40 hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  as: Component = 'h3',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: ElementType }) {
  return (
    <Component className={cn('text-xl sm:text-2xl font-medium tracking-tight', className)} {...props}>
      {children}
    </Component>
  )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm sm:text-base leading-relaxed text-muted', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  )
}

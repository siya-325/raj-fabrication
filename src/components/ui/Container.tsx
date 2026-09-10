import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  size?: 'default' | 'narrow' | 'wide' | 'full'
  children?: ReactNode
}

export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto px-5 sm:px-8 lg:px-12',
        size === 'default' && 'w-full max-w-[84rem]',
        size === 'narrow' && 'w-full max-w-4xl',
        size === 'wide' && 'w-full max-w-[92rem]',
        size === 'full' && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

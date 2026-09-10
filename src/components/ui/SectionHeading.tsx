import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { SectionLabel, type SectionLabelProps } from './SectionLabel'

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  label?: string | ReactNode
  labelTone?: SectionLabelProps['tone']
  title?: string | ReactNode
  asTitle?: ElementType
  titleSize?: 'display' | 'xl' | 'lg' | 'md' | 'sm'
  description?: string | ReactNode
  action?: ReactNode
  layout?: 'stacked' | 'split' | 'simple'
  theme?: 'light' | 'dark'
  children?: ReactNode
}

export function SectionHeading({
  label,
  labelTone,
  title,
  asTitle: TitleTag = 'h2',
  titleSize = 'display',
  description,
  action,
  layout = 'stacked',
  theme = 'light',
  className,
  children,
  ...props
}: SectionHeadingProps) {
  const isDark = theme === 'dark'
  const resolvedLabelTone = labelTone ?? (isDark ? 'copper' : 'muted')

  const titleClasses = cn(
    'font-medium tracking-tight text-balance',
    titleSize === 'display' && 'display-heading',
    titleSize === 'xl' && 'text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] leading-[1.05]',
    titleSize === 'lg' && 'text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight',
    titleSize === 'md' && 'text-xl sm:text-2xl tracking-tight leading-snug',
    titleSize === 'sm' && 'text-lg sm:text-xl tracking-tight',
    isDark ? 'text-white' : 'text-charcoal'
  )

  const descriptionClasses = cn(
    'text-base sm:text-lg leading-relaxed max-w-2xl',
    isDark ? 'text-white/75' : 'text-muted'
  )

  if (layout === 'split') {
    return (
      <div className={cn('flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between', className)} {...props}>
        <div className="space-y-3">
          {label && (
            <div>
              {typeof label === 'string' ? (
                <SectionLabel tone={resolvedLabelTone}>{label}</SectionLabel>
              ) : (
                label
              )}
            </div>
          )}
          {title && <TitleTag className={titleClasses}>{title}</TitleTag>}
          {description && <p className={descriptionClasses}>{description}</p>}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {label && (
        <div>
          {typeof label === 'string' ? (
            <SectionLabel tone={resolvedLabelTone}>{label}</SectionLabel>
          ) : (
            label
          )}
        </div>
      )}
      {title && <TitleTag className={titleClasses}>{title}</TitleTag>}
      {description && <p className={descriptionClasses}>{description}</p>}
      {action && <div className="pt-2">{action}</div>}
      {children}
    </div>
  )
}

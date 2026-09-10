import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { site } from '@/data/site'

export interface LogoProps {
  href?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  isDark?: boolean
  priority?: boolean
  className?: string
  imageClassName?: string
  textClassName?: string
}

/**
 * Reusable Logo component rendering the official rectangular brand logo (/logo/logo.png).
 * Natural aspect ratio is ~3.95:1 (8221 x 2079 px).
 * The logo image contains both the RF welder mark and "Raj fabrication" lettering.
 */
export function Logo({
  href = '/',
  showText = false,
  size = 'md',
  isDark = false,
  priority = false,
  className,
  imageClassName,
  textClassName,
}: LogoProps) {
  const sizeMap = {
    sm: { height: 36, width: 142, heightClass: 'h-9' },
    md: { height: 46, width: 182, heightClass: 'h-10 sm:h-11 md:h-12' },
    lg: { height: 56, width: 221, heightClass: 'h-12 sm:h-14' },
  }

  const currentSize = sizeMap[size]

  const content = (
    <div className={cn('relative inline-flex items-center shrink-0', className)}>
      <Image
        src="/logo/logo.png"
        alt={site.name}
        width={currentSize.width}
        height={currentSize.height}
        priority={priority}
        className={cn(
          'w-auto object-contain transition-opacity',
          currentSize.heightClass,
          imageClassName
        )}
      />
      {showText && (
        <span
          className={cn(
            'ml-3 font-semibold uppercase select-none tracking-[0.16em]',
            isDark ? 'text-white' : 'text-charcoal',
            textClassName
          )}
        >
          {site.name}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'relative z-50 inline-flex items-center transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm',
          className
        )}
        aria-label={`${site.name} home`}
      >
        {content}
      </Link>
    )
  }

  return content
}


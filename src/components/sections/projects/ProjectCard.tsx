import Image from 'next/image'
import Link from 'next/link'
import { Maximize2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

export interface ProjectCardProps {
  title: string
  category: string
  image?: string
  href?: string
  onClick?: () => void
  showFullscreenButton?: boolean
  aspectRatio?: string
  priority?: boolean
  className?: string
  labelTone?: 'white' | 'copper' | 'steel' | 'steel-blue'
  titleClassName?: string
}

export function ProjectCard({
  title,
  category,
  image = '/images/home/raj-fabrication-hero.png',
  href,
  onClick,
  showFullscreenButton,
  aspectRatio = 'aspect-[4/5]',
  priority = false,
  className = '',
  labelTone = 'white',
  titleClassName,
}: ProjectCardProps) {
  const displayFullscreenButton = showFullscreenButton ?? Boolean(onClick)

  const cardContent = (
    <div className={`relative ${aspectRatio} overflow-hidden rounded-lg bg-[#2a3137] border border-white/15 shadow-md transition-all duration-500 group-hover:border-white/35`}>
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] brightness-[0.92]"
      />
      {/* Deep layered editorial gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1b2024]/90 via-[#1b2024]/35 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-75" />

      {/* Fullscreen indicator */}
      {displayFullscreenButton && (
        <div
          className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 z-10 flex size-6 sm:size-8 md:size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:text-charcoal group-hover:shadow-md"
          title="View full screen"
          aria-label="View full screen"
        >
          <Maximize2 className="size-3 sm:size-4 md:size-[17px]" />
        </div>
      )}

      {/* Bottom content info */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 md:p-6 lg:p-5 xl:p-6 z-10">
        <SectionLabel
          tone={labelTone}
          indicator
          className="text-[0.5625rem] sm:text-[0.6875rem] md:text-[0.75rem] tracking-[0.12em] sm:tracking-[0.18em]"
        >
          {category}
        </SectionLabel>
        <h3
          className={cn(
            'mt-0.5 sm:mt-1.5 text-[0.8125rem] sm:text-[1.125rem] md:text-[1.5rem] lg:text-[1.625rem] font-medium text-white tracking-tight leading-snug sm:leading-tight line-clamp-2 max-w-xl',
            titleClassName
          )}
        >
          {title}
        </h3>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        className={`group block text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg select-none ${className}`}
        aria-label={`Open ${title} in full screen`}
      >
        {cardContent}
      </div>
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg ${className}`}
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={`group block select-none ${className}`}>
      {cardContent}
    </div>
  )
}


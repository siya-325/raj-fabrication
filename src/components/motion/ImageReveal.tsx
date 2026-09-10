'use client'

import { motion } from 'motion/react'
import type { HTMLAttributes, ReactNode } from 'react'
import { EASE_ARCHITECTURAL } from '@/lib/constants'

export type ImageRevealEffect = 'curtain' | 'scale-fade' | 'clip'

type SafeHTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>

export interface ImageRevealProps extends SafeHTMLProps {
  children: ReactNode
  effect?: ImageRevealEffect
  curtainColor?: string
  delay?: number
  duration?: number
  scaleFrom?: number
  once?: boolean
  className?: string
}

export function ImageReveal({
  children,
  effect = 'scale-fade',
  curtainColor = '#172126',
  delay = 0,
  duration = 0.85,
  scaleFrom = 1.1,
  once = true,
  className = '',
  ...props
}: ImageRevealProps) {
  if (effect === 'curtain') {
    return (
      <div className={`relative overflow-hidden ${className}`} {...props}>
        {/* Child Image / Media */}
        <motion.div
          initial={{ opacity: 0, scale: scaleFrom }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once, amount: 0.2 }}
          transition={{ duration, delay: delay + 0.1, ease: EASE_ARCHITECTURAL }}
          className="size-full"
        >
          {children}
        </motion.div>

        {/* Sliding curtain wipe */}
        <motion.div
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once, amount: 0.2 }}
          transition={{ duration: duration * 0.9, delay, ease: EASE_ARCHITECTURAL }}
          style={{ backgroundColor: curtainColor, transformOrigin: 'top' }}
          className="pointer-events-none absolute inset-0 z-20"
        />
      </div>
    )
  }

  if (effect === 'clip') {
    return (
      <div className={`overflow-hidden ${className}`} {...props}>
        <motion.div
          initial={{ opacity: 0, scale: scaleFrom }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once, amount: 0.1 }}
          transition={{ duration, delay, ease: EASE_ARCHITECTURAL }}
          className="size-full"
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // Default: scale-fade
  return (
    <div className={`overflow-hidden ${className}`} {...props}>
      <motion.div
        initial={{ opacity: 0, scale: scaleFrom }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once, amount: 0.2 }}
        transition={{ duration, delay, ease: EASE_ARCHITECTURAL }}
        className="size-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

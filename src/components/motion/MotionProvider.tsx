'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

export interface MotionProviderProps {
  children: ReactNode
}

/**
 * Global MotionProvider configuring framer-motion defaults,
 * respecting user accessibility preferences (prefers-reduced-motion).
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}

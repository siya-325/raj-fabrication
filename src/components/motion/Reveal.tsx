'use client'

import { motion, type Transition } from 'motion/react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { EASE_ARCHITECTURAL } from '@/lib/constants'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

type SafeHTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>

export interface RevealProps extends SafeHTMLProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: RevealDirection
  distance?: number
  scale?: number
  amount?: number | 'some' | 'all'
  once?: boolean
  as?: ElementType
  className?: string
}

// Cache motion components to ensure stable identities across re-renders
const motionComponentCache = new Map<ElementType, any>([
  ['div', motion.div],
  ['section', motion.section],
  ['article', motion.article],
  ['header', motion.header],
  ['footer', motion.footer],
  ['span', motion.span],
  ['p', motion.p],
  ['h1', motion.h1],
  ['h2', motion.h2],
  ['h3', motion.h3],
])

function getMotionComponent(component: ElementType) {
  let cached = motionComponentCache.get(component)
  if (!cached) {
    cached = motion.create(component as keyof HTMLElementTagNameMap)
    motionComponentCache.set(component, cached)
  }
  return cached
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 24,
  scale = 1,
  amount = 0.15,
  once = true,
  as: Component = 'div',
  className = '',
  ...props
}: RevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 }
      case 'down':
        return { y: -distance, x: 0 }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
      case 'none':
      default:
        return { x: 0, y: 0 }
    }
  }

  const offset = getInitialPosition()
  const MotionComponent = getMotionComponent(Component)

  const transition: Transition = {
    duration,
    delay,
    ease: EASE_ARCHITECTURAL,
  }

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

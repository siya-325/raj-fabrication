'use client'

import { motion, type Variants } from 'motion/react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { EASE_ARCHITECTURAL } from '@/lib/constants'

type SafeHTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>

export interface StaggerProps extends SafeHTMLProps {
  children: ReactNode
  stagger?: number
  delay?: number
  as?: ElementType
  once?: boolean
  amount?: number | 'some' | 'all'
  className?: string
}

export function Stagger({
  children,
  stagger = 0.09,
  delay = 0,
  as: Component = 'div',
  once = true,
  amount = 0.15,
  className = '',
  ...props
}: StaggerProps) {
  const MotionComponent = motion.create(Component as keyof HTMLElementTagNameMap)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export interface StaggerItemProps extends SafeHTMLProps {
  children: ReactNode
  as?: ElementType
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  className?: string
}

export function StaggerItem({
  children,
  as: Component = 'div',
  direction = 'up',
  distance = 24,
  duration = 0.65,
  className = '',
  ...props
}: StaggerItemProps) {
  const MotionComponent = motion.create(Component as keyof HTMLElementTagNameMap)

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

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: EASE_ARCHITECTURAL,
      },
    },
  }

  return (
    <MotionComponent
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

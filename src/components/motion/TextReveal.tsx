'use client'

import { motion } from 'motion/react'
import type { ElementType, HTMLAttributes } from 'react'
import { EASE_ARCHITECTURAL } from '@/lib/constants'

type SafeHTMLProps = Omit<HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>

export interface TextRevealProps extends SafeHTMLProps {
  text: string
  as?: ElementType
  mode?: 'words' | 'characters'
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
  className?: string
  innerClassName?: string
}

export function TextReveal({
  text,
  as: Component = 'span',
  mode = 'words',
  delay = 0,
  stagger = 0.035,
  duration = 0.65,
  once = true,
  className = '',
  innerClassName = '',
  ...props
}: TextRevealProps) {
  const items = mode === 'words' ? text.split(' ') : text.split('')

  const MotionWrapper = motion.create(Component as keyof HTMLElementTagNameMap)

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        duration,
        ease: EASE_ARCHITECTURAL,
      },
    },
  }

  return (
    <MotionWrapper
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={containerVariants}
      className={`inline-block ${className}`}
      {...props}
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-block overflow-hidden align-top leading-none pb-[0.1em]"
        >
          <motion.span
            variants={itemVariants}
            className={`inline-block ${innerClassName}`}
          >
            {item}
            {mode === 'words' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </MotionWrapper>
  )
}

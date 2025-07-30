"use client"

import React from 'react'
import { motion, Variants } from 'motion/react'

interface TextEffectProps {
  children: React.ReactNode
  className?: string
  preset?: 'fade-in-blur' | 'slide-up' | 'scale-in'
  speedSegment?: number
  delay?: number
  per?: 'word' | 'line' | 'character'
  as?: keyof JSX.IntrinsicElements
}

const presets: Record<string, Variants> = {
  'fade-in-blur': {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
  'slide-up': {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1,
      },
    },
  },
  'scale-in': {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1,
      },
    },
  },
}

export function TextEffect({
  children,
  className = '',
  preset = 'fade-in-blur',
  speedSegment = 0.3,
  delay = 0,
  per = 'word',
  as: Component = 'div',
}: TextEffectProps) {
  const variants = presets[preset]

  if (per === 'character') {
    return (
      <Component className={className}>
        {typeof children === 'string' &&
          children.split('').map((char, index) => (
            <motion.span
              key={index}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{
                delay: delay + index * speedSegment,
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
      </Component>
    )
  }

  if (per === 'word') {
    return (
      <Component className={className}>
        {typeof children === 'string' &&
          children.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{
                delay: delay + index * speedSegment,
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
      </Component>
    )
  }

  return (
    <motion.div
      as={Component}
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
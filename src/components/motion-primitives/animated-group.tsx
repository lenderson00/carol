"use client"

import React from 'react'
import { motion, Variants } from 'motion/react'

interface AnimatedGroupProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delayChildren?: number
  staggerChildren?: number
}

export function AnimatedGroup({
  children,
  className = '',
  variants,
  delayChildren = 0,
  staggerChildren = 0.1,
}: AnimatedGroupProps) {
  const defaultVariants: Variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren,
          staggerChildren,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 20,
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
  }

  const finalVariants = variants || defaultVariants

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={finalVariants}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: index,
            variants: finalVariants.item,
          })
        }
        return child
      })}
    </motion.div>
  )
}
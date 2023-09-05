'use client'

import { useEffect, useState } from 'react'
import styles from './DarkModeSwitch.module.scss'
import { Transition, motion } from 'framer-motion'
import Stars from '@public/switch/switch-stars.svg'
import Clouds from '@public/switch/switch-clouds.svg'
import { useTheme } from 'next-themes'

export const DarkModeSwitch = () => {
  const [active, setActive] = useState(false)
  const { setTheme } = useTheme()

  const transition: Transition = {
    duration: 0.5,
    ease: 'easeInOut'
  }

  useEffect(
    () => {
      if (active) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    },
    [active, setTheme]
  )

  return (
    <motion.div
      className={styles.switch}
      data-active={active}
      onClick={() => setActive(value => !value)}
    >
      <motion.div className={styles.clouds} layout transition={transition}>
        <Clouds />
      </motion.div>
      <motion.div className={styles.stars} layout transition={transition}>
        <Stars />
      </motion.div>
      <motion.div
        className={styles.handleWrapper}
        layout
        transition={transition}
      >
        <motion.div className={`${styles.aura} ${styles.auraSm}`} />
        <motion.div className={`${styles.aura} ${styles.auraMd}`} />
        <motion.div className={`${styles.aura} ${styles.auraLg}`} />
        <motion.div
          className={styles.handle}
          layout
          transition={transition}
        >
          <motion.div
            className={styles.handleDark}
            layout
            transition={transition}
          >
            <div className={`${styles.crater} w-2 h-2 top-1 left-3`} />
            <div className={`${styles.crater} w-3.5 h-3.5 top-3.5 left-1`} />
            <div className={`${styles.crater} w-2 h-2 bottom-1 right-1`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


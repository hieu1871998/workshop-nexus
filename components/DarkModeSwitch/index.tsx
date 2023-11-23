'use client'

import { useEffect, useState } from 'react'
import Clouds from '@public/switch/switch-clouds.svg'
import Stars from '@public/switch/switch-stars.svg'
import { motion, Transition } from 'framer-motion'
import { useTheme } from 'next-themes'

import styles from './DarkModeSwitch.module.scss'

export const DarkModeSwitch = () => {
	const [active, setActive] = useState(false)
	const { setTheme } = useTheme()

	const transition: Transition = {
		duration: 0.5,
		ease: 'easeInOut',
	}

	useEffect(() => {
		if (active) {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}, [active, setTheme])

	return (
		<motion.div
			className={styles.switch}
			data-active={active}
			onClick={() => setActive(value => !value)}
		>
			<motion.div
				className={styles.clouds}
				layout
				transition={transition}
			>
				<Clouds />
			</motion.div>
			<motion.div
				className={styles.stars}
				layout
				transition={transition}
			>
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
						<div className={`${styles.crater} left-3 top-1 h-2 w-2`} />
						<div className={`${styles.crater} left-1 top-3.5 h-3.5 w-3.5`} />
						<div className={`${styles.crater} bottom-1 right-1 h-2 w-2`} />
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

'use client'

import { useEffect, useState } from 'react'
import Clouds from '@public/switch/switch-clouds.svg'
import Stars from '@public/switch/switch-stars.svg'
import { m, Transition } from 'framer-motion'
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
		<m.div
			className={styles.switch}
			data-active={active}
			onClick={() => setActive(value => !value)}
		>
			<m.div
				className={styles.clouds}
				layout
				transition={transition}
			>
				<Clouds />
			</m.div>
			<m.div
				className={styles.stars}
				layout
				transition={transition}
			>
				<Stars />
			</m.div>
			<m.div
				className={styles.handleWrapper}
				layout
				transition={transition}
			>
				<m.div className={`${styles.aura} ${styles.auraSm}`} />
				<m.div className={`${styles.aura} ${styles.auraMd}`} />
				<m.div className={`${styles.aura} ${styles.auraLg}`} />
				<m.div
					className={styles.handle}
					layout
					transition={transition}
				>
					<m.div
						className={styles.handleDark}
						layout
						transition={transition}
					>
						<div className={`${styles.crater} left-3 top-1 h-2 w-2`} />
						<div className={`${styles.crater} left-1 top-3.5 h-3.5 w-3.5`} />
						<div className={`${styles.crater} bottom-1 right-1 h-2 w-2`} />
					</m.div>
				</m.div>
			</m.div>
		</m.div>
	)
}

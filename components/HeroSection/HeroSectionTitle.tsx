'use client'

import { calSans } from '@theme/fonts/calsans'
import { fadeInDownMotion } from '@utils'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const HeroSectionTitle = () => {
	const t = useTranslations('home')

	return (
		<div className='flex flex-col items-center'>
			<motion.h1
				className={`text-5xl ${calSans.className} text-left font-bold sm:text-center`}
				{...fadeInDownMotion}
				transition={{ duration: 1 }}
			>
				{t('heroTitle')}
			</motion.h1>
			<motion.p
				className='mt-4 text-left text-3xl font-medium text-gray-700 sm:text-center sm:text-4xl'
				{...fadeInDownMotion}
				transition={{ duration: 1, delay: 0.5 }}
			>
				{t('heroSubtitle')}
			</motion.p>
		</div>
	)
}

'use client'

import { calSans } from '@theme/fonts/calsans'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const ApplyPageTitleSection = () => {
	const t = useTranslations('apply')

	return (
		<motion.section className='col-span-1 mb-10 flex flex-col justify-center pt-28 sm:mb-0 sm:min-h-screen sm:pt-0'>
			<motion.h1
				className={`text-4xl font-semibold ${calSans.className}`}
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1 }}
			>
				{t('title')}
			</motion.h1>
			<motion.p
				className='mt-4 text-lg text-gray-900'
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				{t('subtitle')}
			</motion.p>
		</motion.section>
	)
}

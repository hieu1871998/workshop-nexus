'use client'

import { calSans } from '@theme/fonts/calsans'
import { m } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const ApplyPageTitleSection = () => {
	const t = useTranslations('apply')

	return (
		<m.section className='col-span-1 mb-10 flex flex-col pt-28 sm:mb-0 sm:pt-36'>
			<m.h1
				className={`text-4xl font-semibold ${calSans.className}`}
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1 }}
			>
				{t('title')}
			</m.h1>
			<m.p
				className='mt-4 text-lg text-gray-900'
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				{t('subtitle')}
			</m.p>
		</m.section>
	)
}

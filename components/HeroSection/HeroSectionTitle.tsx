'use client'

import { calSans } from '@theme/fonts/calsans'
import { fadeInDownMotion } from '@utils/motion'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const HeroSectionTitle = () => {
  const t = useTranslations('home')

  return (
    <div className='flex flex-col items-center'>
      <motion.h1
        className={`text-5xl ${calSans.className} font-bold text-left sm:text-center`}
        {...fadeInDownMotion}
        transition={{ duration: 1 }}
      >
        {t('heroTitle')}
      </motion.h1>
      <motion.p
        className='text-3xl sm:text-4xl text-gray-700 text-left sm:text-center font-medium mt-4'
        {...fadeInDownMotion}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t('heroSubtitle')}
      </motion.p>
    </div>
  )
}

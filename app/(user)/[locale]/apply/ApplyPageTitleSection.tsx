'use client'

import { calSans } from '@theme/fonts/calsans'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const ApplyPageTitleSection = () => {
  const t = useTranslations('apply')

  return (
    <motion.section
      className='flex flex-col col-span-1 pt-28 sm:pt-0 mb-10 sm:mb-0 sm:min-h-screen justify-center'
    >
      <motion.h1
        className={`text-4xl font-semibold ${calSans.className}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {t('title')}
      </motion.h1>
      <motion.p
        className='text-lg text-gray-900 mt-4'
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t('subtitle')}
      </motion.p>
    </motion.section>
  )
}

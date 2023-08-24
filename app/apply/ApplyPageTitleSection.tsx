'use client'

import { motion } from 'framer-motion'

export const ApplyPageTitleSection = () => {
  return (
    <motion.section
      className='flex flex-col col-span-1 pt-28 sm:pt-0 mb-10 sm:mb-0 sm:min-h-screen justify-center'
    >
      <motion.h1
        className='text-4xl font-bold text-gray-900'
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Apply to hold your own workshop session
      </motion.h1>
      <motion.p
        className='text-lg text-gray-700 mt-4'
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* eslint-disable-next-line max-len */}
        We&apos;re excited that you&apos;re interested in sharing your expertise and leading a workshop. This is your opportunity to create a transformative learning experience, fostering collaboration and growth within our company.
      </motion.p>
    </motion.section>
  )
}

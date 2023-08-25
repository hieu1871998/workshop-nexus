'use client'

import { fadeInDownMotion } from '@utils/motion'
import { motion } from 'framer-motion'

export const HeroSectionTitle = () => {
  return (
    <div className='flex flex-col items-center'>
      <motion.h1
        className='text-5xl font-bold text-left sm:text-center'
        {...fadeInDownMotion}
        transition={{ duration: 1 }}
      >
        Empowering growth and innovation
      </motion.h1>
      <motion.p
        className='text-3xl sm:text-4xl text-gray-700 text-left sm:text-center font-medium mt-4'
        {...fadeInDownMotion}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Where curiosity meets expertise: Dive into engaging workshops and collaborative learning
      </motion.p>
    </div>
  )
}

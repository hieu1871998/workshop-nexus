'use client'

import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/button'
import { Session } from 'next-auth'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInDownMotion } from '@utils/motion'

export const UserSection = ({ session }: { session: Session | null }) => {
  const user = session?.user

  return (
    <motion.div
      {...fadeInDownMotion}
      transition={{ duration: 1, delay: 1 }}
    >
      {user ? (
        <Link href='/apply'>
          <Button
            className='px-10'
            color='primary'
            startContent={<ArrowRightIcon className='w-4 h-4 text-white' />}
          >
            Start sharing your knowlegde
          </Button>
        </Link>
      ) : (
        <Link href='/signin'>
          <Button
            className='px-10'
            color='primary'
            startContent={<UserIcon className='w-4 h-4 text-white' />}
          >
            Sign in and start exploring
          </Button>
        </Link>
      )}
    </motion.div>
  )
}

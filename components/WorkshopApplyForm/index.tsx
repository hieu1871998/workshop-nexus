'use client'

import { Logo } from '@components/icons/Logo'
import { Input, Textarea } from '@nextui-org/react'
import { Session, User } from 'next-auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { fadeInDownMotion, fadeInMotion } from '@utils/motion'

const MotionTextarea = motion(Textarea)

interface WorkshopApplyForm {
  session: Session | null;
}

export const WorkshopApplyForm = ({ session }: WorkshopApplyForm) => {
  const { handleSubmit } = useForm<User>()

  const onSubmit: SubmitHandler<User> = () => {

  }

  return (
    <motion.div
      className='sm:shadow-2xl rounded-2xl'
      {...fadeInDownMotion}
      transition={{ duration: 1 }}
      layout
    >
      <div className='flex flex-col items-center p-5 border-b'>
        <motion.div
          className='w-16 h-16 mb-5'
          {...fadeInDownMotion}
          transition={{ duration: 1 }}
        >
          <Logo className='w-16 h-16 mb-5' />
        </motion.div>
        <motion.p
          className='text-gray-700'
          {...fadeInMotion}
          transition={{ duration: 1, delay: 0.5 }}
        >
          You&apos;re applying as <span className='text-gray-900 font-semibold'>{session?.user?.name}</span>
        </motion.p>
      </div>
      <motion.form
        className='flex flex-col gap-5 p-5'
        onSubmit={() => void handleSubmit(onSubmit)}
        layout
      >
        <Input
          label='Email'
          value={session?.user?.email ?? ''}
          readOnly
        />
        <Input
          label='Topic'
          placeholder='What is your workshop topic?'
        />
        <MotionTextarea
          label='Description'
          placeholder='A little summary about your workshop'
          minRows={2}
          maxRows={10}
          layout
        />
      </motion.form>
    </motion.div>
  )
}

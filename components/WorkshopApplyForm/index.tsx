'use client'

import { Logo } from '@components/icons/Logo'
import { Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react'
import { Session } from 'next-auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { fadeInDownMotion, fadeInMotion } from '@utils/motion'
import { useGetWorkshopCategories } from '@network/queries'
import { useTranslations } from 'next-intl'
import { WorkshopApplyPayload } from '@types'

const MotionTextarea = motion(Textarea)

interface WorkshopApplyFormProps {
  session: Session | null
}

const required = {
  value: true,
  message: 'This field is required.',
}

export const WorkshopApplyForm = ({ session }: WorkshopApplyFormProps) => {
  const t = useTranslations('apply')
  const { register, handleSubmit, formState: { errors } } = useForm<WorkshopApplyPayload>()

  const onSubmit: SubmitHandler<WorkshopApplyPayload> = async (data, event) => {
    event?.preventDefault()

    const resp = await fetch(
      '/api/workshop/apply',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    )

    console.log('resp: ', resp)
  }

  const { data: categoriesResp } = useGetWorkshopCategories()

  const categoryItems = categoriesResp?.map(
    category => ({
      value: category.id,
      label: category.label
    })
  ) ?? []

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
          className='text-gray-900'
          {...fadeInMotion}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t.rich('applyingAs', {
            user: () => (
              <span className='text-black font-semibold'>
                {session?.user?.name}
              </span>
            ),
          })}
        </motion.p>
      </div>
      <form
        className='flex flex-col gap-5 p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id='email'
          label='Email'
          {...register('email', { required })}
          value={session?.user?.email ?? ''}
          readOnly
        />
        <Input
          id='topic'
          label='Topic'
          {...register('topic', { required })}
          placeholder='What is your workshop topic?'
          validationState={errors.topic ? 'invalid' : 'valid'}
          errorMessage={errors.topic?.message}
        />
        <MotionTextarea
          id='description'
          {...register('description', { required })}
          label='Description'
          placeholder='A little summary about your workshop'
          validationState={errors.description ? 'invalid' : 'valid'}
          errorMessage={errors.description?.message}
          minRows={2}
          maxRows={10}
          layout
        />
        <Select
          items={categoryItems}
          label='Category'
          placeholder='Select a category'
          {...register('categoryId', { required })}
          validationState={errors.categoryId ? 'invalid' : 'valid'}
          errorMessage={errors.categoryId?.message}
        >
          {category => (
            <SelectItem
              key={category.value}
            >
              {category.label}
            </SelectItem>
          )}
        </Select>
        <Button className='bg-black text-white' type='submit'>
          Submit
        </Button>
      </form>
    </motion.div>
  )
}

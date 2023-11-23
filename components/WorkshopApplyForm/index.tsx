'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { applyWorkshop } from '@app/(user)/[locale]/apply/action'
import { Logo } from '@components/icons/Logo'
import { LoadingDots } from '@components/LoadingDots'
import { useGetWorkshopCategories } from '@network/queries'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { WorkshopApplyPayload } from '@types'
import { fadeInDownMotion, fadeInMotion } from '@utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

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
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<WorkshopApplyPayload>()

	const onSubmit: SubmitHandler<WorkshopApplyPayload> = async (data, event) => {
		event?.preventDefault()

		const promise = applyWorkshop(data)

		await toast.promise(
			promise,
			{
				loading: 'Sending your application...',
				success: data => (
					<div>
						<p>
							Your <span className='font-semibold'>{data?.topic}</span> workshop application is successful!
						</p>
						<p className='text-sx underline'>
							<Link href={`/user/${session?.user.id}`}>View your workshops</Link>
						</p>
					</div>
				),
				error: 'Error',
			},
			{
				style: { minWidth: '400px' },
				success: { duration: 10000 },
			}
		)

		reset()
	}

	const { data: categoriesResp, isLoading } = useGetWorkshopCategories()

	const categoryItems =
		categoriesResp?.map(category => ({
			value: category.id,
			label: category.label,
		})) ?? []

	return (
		<motion.div
			className='rounded-2xl border sm:shadow-2xl'
			{...fadeInDownMotion}
			transition={{ duration: 1 }}
			layout
		>
			<div className='flex flex-col items-center border-b p-5'>
				<motion.div
					className='mb-5 h-16 w-16'
					{...fadeInDownMotion}
					transition={{ duration: 1 }}
				>
					<Logo className='mb-5 h-16 w-16' />
				</motion.div>
				<motion.p
					className='text-gray-900'
					{...fadeInMotion}
					transition={{ duration: 1, delay: 0.5 }}
				>
					{t.rich('applyingAs', {
						user: () => <span className='font-semibold text-black'>{session?.user?.name}</span>,
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
					isLoading={isLoading}
				>
					{category => <SelectItem key={category.value}>{category.label}</SelectItem>}
				</Select>
				<div className='flex flex-row gap-5'>
					<Input
						id='maxParticipants'
						label='Max participants'
						{...register('maxParticipants', { required, min: 1, valueAsNumber: true })}
						defaultValue='1'
						type='number'
						placeholder='Estimated max participants'
						validationState={errors.maxParticipants ? 'invalid' : 'valid'}
						errorMessage={errors.maxParticipants?.message}
					/>
					<Input
						id='presentationDate'
						label='Presentation date'
						type='date'
						{...register('presentationDate', { required, valueAsDate: true })}
						placeholder='When can you hold your workshop?'
						validationState={errors.presentationDate ? 'invalid' : 'valid'}
						errorMessage={errors.presentationDate?.message}
					/>
				</div>
				<Button
					className='bg-black text-white'
					type='submit'
				>
					{isSubmitting ? <LoadingDots color='#fff' /> : <span>{t('apply')}</span>}
				</Button>
			</form>
		</motion.div>
	)
}

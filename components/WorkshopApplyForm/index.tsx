'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { applyWorkshop } from '@app/[locale]/(user)/apply/action'
import { Logo } from '@components/icons/Logo'
import { LoadingDots } from '@components/LoadingDots'
import { CameraIcon } from '@heroicons/react/24/outline'
import { useGetWorkshopCategories } from '@network/queries'
import { Avatar, Button, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { WorkshopThumbnail } from '@prisma/client'
import { WorkshopApplyPayload } from '@types'
import { fadeInDownMotion, fadeInMotion } from '@utils'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import Upload from 'rc-upload'

const MotionTextarea = m(Textarea)

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

	const [blob, setBlob] = useState<WorkshopThumbnail>()
	const [thumbnail, setThumbnail] = useState<{ image: string | null }>({ image: null })

	const onSubmit: SubmitHandler<WorkshopApplyPayload> = async (data, event) => {
		event?.preventDefault()

		const promise = applyWorkshop({
			...data,
			thumbnailId: blob?.id ?? '',
		})

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

	const { data: categoriesResp, isLoading, refetch } = useGetWorkshopCategories()

	const categoryItems =
		categoriesResp?.map(category => ({
			value: category.id,
			label: category.label,
		})) ?? []

	return (
		<m.div
			className='rounded-2xl border sm:shadow-2xl'
			{...fadeInDownMotion}
			transition={{ duration: 1 }}
			layout
		>
			<div className='flex flex-col items-center border-b p-5'>
				<m.div
					className='mb-5 h-16 w-16'
					{...fadeInDownMotion}
					transition={{ duration: 1 }}
				>
					<Logo className='mb-5 h-16 w-16' />
				</m.div>
				<m.p
					className='text-gray-900'
					{...fadeInMotion}
					transition={{ duration: 1, delay: 0.5 }}
				>
					{t.rich('applyingAs', {
						user: () => <span className='font-semibold text-black'>{session?.user?.name}</span>,
					})}
				</m.p>
			</div>
			<form
				className='flex flex-col gap-5 p-5'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
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
					isInvalid={!!errors.topic}
					errorMessage={errors.topic?.message}
				/>
				<MotionTextarea
					id='description'
					{...register('description', { required })}
					label='Description'
					placeholder='A little summary about your workshop'
					isInvalid={!!errors.description}
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
					isInvalid={!!errors.categoryId}
					errorMessage={errors.categoryId?.message}
					isLoading={isLoading}
					onFocus={() => void refetch()}
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
						isInvalid={!!errors.maxParticipants}
						errorMessage={errors.maxParticipants?.message}
					/>
					<Input
						id='presentationDate'
						label='Presentation date'
						type='date'
						{...register('presentationDate', { required, valueAsDate: true })}
						placeholder='When can you hold your workshop?'
						isInvalid={!!errors.presentationDate}
						errorMessage={errors.presentationDate?.message}
					/>
				</div>
				<Upload
					className='aspect-16/9 w-full'
					accept='images/*'
					onStart={file => {
						const reader = new FileReader()

						reader.onload = event => {
							setThumbnail(prev => ({ ...prev, image: event.target?.result as string }))
						}

						reader.readAsDataURL(file)
					}}
					onSuccess={res => {
						setBlob(res as unknown as WorkshopThumbnail)
					}}
					onError={err => {
						console.error('Error uploading file', err)
					}}
					onProgress={({ percent }) => {
						console.log('onProgress', `${percent}%`)
					}}
					action={file => {
						return `/api/upload/thumbnail?filename=${file.name}`
					}}
				>
					{thumbnail.image ? (
						<Image
							className='h-full w-full object-cover object-center'
							src={thumbnail.image}
							alt='Thumbnail'
						/>
					) : (
						<Avatar
							className='h-full w-full bg-gray-50'
							showFallback={!blob}
							radius='md'
							src=''
							fallback={<CameraIcon className='h-10 w-10 text-gray-700' />}
						/>
					)}
				</Upload>
				<Button
					className='bg-black text-white'
					type='submit'
				>
					{isSubmitting ? <LoadingDots color='#fff' /> : <span>{t('apply')}</span>}
				</Button>
			</form>
		</m.div>
	)
}

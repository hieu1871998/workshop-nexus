'use client'

import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { applyWorkshop } from '@app/[locale]/(user)/apply/action'
import { Logo } from '@components/icons/Logo'
import { ArrowUpIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Autocomplete, Button, Group, Input, NumberInput, rem, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm as useMantineForm } from '@mantine/form'
import { useGetWorkshopCategories } from '@network/queries'
import { WorkshopThumbnail } from '@prisma/client'
import { WorkshopApplyPayload } from '@types'
import { fadeInDownMotion, fadeInMotion } from '@utils'
import { m } from 'framer-motion'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

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

	const form = useMantineForm<WorkshopApplyPayload>({
		name: 'workshop-apply',
		validate: {
			topic: value => (isEmpty(value) ? 'Looks like the topic field is empty—please fill it in.' : null),
			description: value =>
				isEmpty(value) ? "The description field can't be left blank—please provide a description." : null,
			categoryId: value => (isEmpty(value) ? 'Please select a category from the list provided.' : null),
			maxParticipants: value => (value < 1 ? 'Maximum participants must be a valid number greater than zero.' : null),
			presentationDate: value => (isEmpty(value) ? 'Please choose a valid date for the presentation.' : null),
		},
	})

	const [loading, setLoading] = useState(false)
	const [blob, setBlob] = useState<WorkshopThumbnail>()
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [thumbnail, setThumbnail] = useState<{ image: string | null }>({ image: null })

	const onSubmit: SubmitHandler<WorkshopApplyPayload> = async (data, event) => {
		try {
			setLoading(true)
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

			setLoading(false)
			form.reset()
		} catch (error) {
			console.error('Error submitting: ', error)
			setLoading(false)
		}
	}

	const { data: categoriesResp, refetch } = useGetWorkshopCategories()

	const categoryItems =
		categoriesResp?.map(category => ({
			value: category.id,
			label: category.label,
		})) ?? []

	const previewUrl = useMemo(() => (isEmpty(files) ? undefined : URL.createObjectURL(files[0])), [files])

	return (
		<m.div
			className='rounded-2xl border bg-white sm:shadow-2xl'
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
				onSubmit={form.onSubmit(onSubmit, validationErrors => {
					console.error('validationErrors: ', validationErrors)
				})}
			>
				<TextInput
					label='Email'
					{...form.getInputProps('email')}
					description='Your email, primed and ready'
					value={session?.user?.email ?? ''}
					disabled
				/>
				<TextInput
					{...form.getInputProps('topic')}
					label='Topic'
					withAsterisk
					description='What is your workshop about?'
					placeholder='Input workshop topic'
				/>
				<MotionTextarea
					{...form.getInputProps('description')}
					label='Description'
					description='A little summary about your workshop'
					placeholder='Input workshop summary'
					withAsterisk
					autosize
					minRows={4}
					maxRows={8}
					layout
				/>
				<Autocomplete
					{...form.getInputProps('categoryId')}
					data={categoryItems}
					label='Category'
					description="Choose your workshop's flavor!"
					placeholder='Select a category'
					withAsterisk
					onFocus={() => void refetch()}
				/>
				<div className='grid grid-cols-2 gap-5'>
					<div className='col-span-1'>
						<NumberInput
							{...form.getInputProps('maxParticipants')}
							label='Max participants'
							defaultValue={1}
							min={1}
							description='Estimated max participants'
							placeholder='Input max participants'
							withAsterisk
							isAllowed={value => !isEmpty(value)}
						/>
					</div>
					<div className='col-span-1'>
						<DatePickerInput
							{...form.getInputProps('presentationDate')}
							label='Presentation date'
							description='When can you hold your workshop?'
							placeholder='Input presentation date'
							withAsterisk
						/>
					</div>
				</div>
				{/* <Upload
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
							radius={0}
							src=''
							fallback={<CameraIcon className='h-10 w-10 text-gray-700' />}
						/>
					)}
				</Upload> */}
				<Stack gap={5}>
					<div>
						<Input.Label required>Thumbnail</Input.Label>
						<Input.Description>Sprinkle charm onto your content with a captivating thumbnail upload!</Input.Description>
					</div>
					<Dropzone
						classNames={{ root: 'p-0' }}
						onDrop={setFiles}
						onReject={files => console.log('rejected files', files)}
						maxSize={3 * 1024 ** 2}
						accept={IMAGE_MIME_TYPE}
						multiple={false}
					>
						<Group
							className='relative'
							justify='center'
							gap='xl'
							mih={220}
							style={{ pointerEvents: 'none' }}
						>
							<Dropzone.Accept>
								<ArrowUpIcon style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-blue-6)' }} />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<XMarkIcon style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-red-6)' }} />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<CameraIcon style={{ width: rem(40), height: rem(40), color: 'var(--mantine-color-dimmed)' }} />
							</Dropzone.Idle>
							{previewUrl ? (
								<Image
									className='h-full w-full object-cover object-center'
									src={previewUrl}
									alt='Thumbnail preview'
									fill
								/>
							) : (
								<div>
									<Text
										size='lg'
										inline
									>
										Drag images here or click to select files
									</Text>
									<Text
										size='sm'
										c='dimmed'
										inline
										mt={7}
									>
										File should not exceed 5mb
									</Text>
								</div>
							)}
						</Group>
					</Dropzone>
				</Stack>
				<Button
					type='submit'
					loaderProps={{ type: 'dots' }}
					fullWidth
					loading={loading}
				>
					{t('apply')}
				</Button>
			</form>
		</m.div>
	)
}

'use client'

import { useMemo, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { applyWorkshop } from '@app/[locale]/(user)/workshop/apply/action'
import { revalidateAllPath } from '@app/action'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { Logo } from '@components/icons/Logo'
import { ArrowUpIcon, BackspaceIcon, CameraIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
	ActionIcon,
	Button,
	FileInput,
	Group,
	Image,
	Input,
	MultiSelect,
	NumberInput,
	rem,
	Select,
	SimpleGrid,
	Text,
	Textarea,
	TextInput,
	Tooltip,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { uploadWorkshopThumbnail } from '@network/fetchers'
import { WorkshopApplyPayload } from '@types'
import { fadeInDownMotion, fadeInMotion } from '@utils'
import dayjs from 'dayjs'
import { m } from 'framer-motion'
import { isEmpty } from 'lodash'
import NextImage from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

interface WorkshopApplyFormProps {
	session: Session | null
	metadata?: WorkshopMetadata
}

export const WorkshopApplyForm = ({ session, metadata }: WorkshopApplyFormProps) => {
	const t = useTranslations('apply')

	const form = useForm<WorkshopApplyPayload>({
		name: 'workshop-apply',
		initialValues: {
			email: session?.user.email ?? '',
			topic: '',
			description: '',
			categoryId: '',
			maxParticipants: 1,
			presentationDate: dayjs().add(7, 'day').toDate(),
			workshopThumbnailId: '',
			requirement: '',
			expectedOutcome: '',
			duration: 30,
		},
		validate: {
			topic: value => (isEmpty(value) ? 'Looks like the topic field is empty—please fill it in.' : null),
			description: value =>
				isEmpty(value) ? "The description field can't be left blank—please provide a description." : null,
			categoryId: value => (isEmpty(value) ? 'Please select a category from the list provided.' : null),
			maxParticipants: value => (value < 1 ? 'Maximum participants must be a valid number greater than zero.' : null),
			presentationDate: value => (!value ? 'Please choose a valid date for the presentation.' : null),
			workshopThumbnailId: value => (isEmpty(value) ? 'Please upload a thumbnail.' : null),
			duration: value => (value < 30 ? 'Duration must be at least 30 minutes' : null),
		},
	})

	const [loading, setLoading] = useState(false)
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [uploading, setUploading] = useState(false)

	const onSubmit: SubmitHandler<WorkshopApplyPayload> = async (data, event) => {
		try {
			setLoading(true)
			event?.preventDefault()
			setLoading(true)
			event?.preventDefault()

			notifications.show({
				id: 'apply-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await applyWorkshop(data)

			revalidateAllPath()

			notifications.update({
				id: 'apply-notification',
				title: 'Apply to hold workshop successfully!',
				message: `You have applied to hold ${data?.topic} workshop`,
				color: 'green',
				loading: false,
				autoClose: 3000,
			})

			setLoading(false)
			form.reset()
		} catch (error) {
			notifications.update({
				id: 'apply-notification',
				title: 'Apply to hold your workshop failed',
				message: 'Please try again',
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
			console.error('Error submitting: ', error)
			setLoading(false)
		}
	}

	const categoryItems =
		metadata?.categories?.map(category => ({
			value: category.id,
			label: category.label,
		})) ?? []

	const tagItems = metadata?.tags?.map(tag => ({
		value: tag.id,
		label: tag.label,
	}))

	const previewUrl = useMemo(() => (isEmpty(files) ? undefined : URL.createObjectURL(files[0])), [files])

	const handleUpload = async (file: FileWithPath) => {
		try {
			setUploading(true)
			const response = await uploadWorkshopThumbnail(file)

			if (response) {
				form.setFieldValue('workshopThumbnailId', response.id)
				form.setFieldValue('thumbnailId', undefined)
			}

			setUploading(false)
		} catch (error) {
			console.error('Error uploading thumbnail: ', error)
			setFiles([])
			setLoading(false)
		}
	}

	return (
		<m.div
			className='rounded-2xl border bg-white'
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
				onSubmit={form.onSubmit(onSubmit, validationErrors => {
					console.error('validationErrors: ', validationErrors)
				})}
			>
				<TextInput
					label='Email'
					description='Your email, primed and ready.'
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
				<Textarea
					{...form.getInputProps('description')}
					label='Description'
					description='A little summary about your workshop.'
					placeholder='Input workshop summary'
					withAsterisk
					autosize
					minRows={4}
					maxRows={8}
				/>
				<Textarea
					{...form.getInputProps('requirement')}
					label='Requirements'
					description='What should your participants bring?'
					placeholder='Input workshop requirements'
					withAsterisk
					autosize
					minRows={4}
					maxRows={8}
				/>
				<Textarea
					{...form.getInputProps('expectedOutcome')}
					label='Expected outcomes'
					description='Tell your participants what they will gain.'
					placeholder='Input expected outcomes'
					withAsterisk
					autosize
					minRows={4}
					maxRows={8}
				/>
				<SimpleGrid cols={2}>
					<Select
						{...form.getInputProps('categoryId')}
						data={categoryItems}
						label='Category'
						description="Choose your workshop's flavor!"
						placeholder='Select a category'
						searchable
						withAsterisk
						checkIconPosition='right'
					/>
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
				</SimpleGrid>
				<SimpleGrid cols={2}>
					<MultiSelect
						{...form.getInputProps('tagIds')}
						data={tagItems}
						label='Tag'
						description="Choose your workshop's tag!"
						placeholder='Select tags'
						searchable
						withAsterisk
						checkIconPosition='right'
					/>
				</SimpleGrid>
				<SimpleGrid cols={2}>
					<DateTimePicker
						{...form.getInputProps('presentationDate')}
						label='Presentation date'
						description='When can you hold your workshop?'
						withAsterisk
						minDate={dayjs().add(7, 'day').toDate()}
						valueFormat='YYYY, DD MMM - HH:mm'
					/>
					<NumberInput
						{...form.getInputProps('duration')}
						label='Duration'
						defaultValue={30}
						min={30}
						description='Estimated duration'
						placeholder='Input duration'
						withAsterisk
						isAllowed={value => !isEmpty(value)}
						leftSection={<ClockIcon className='h-4 w-4' />}
						suffix=' minutes'
					/>
				</SimpleGrid>
				<Input.Wrapper
					label='Thumbnail'
					description='Sprinkle charm onto your content with a captivating thumbnail upload!'
					withAsterisk
					{...form.getInputProps('workshopThumbnailId')}
				>
					<Dropzone
						classNames={{ root: 'p-0 my-1.5 border-red' }}
						onDrop={files => {
							setFiles(files)

							const file = files[0]

							void handleUpload(file)
						}}
						onReject={files => console.log('rejected files', files)}
						maxSize={3 * 1024 ** 2}
						accept={IMAGE_MIME_TYPE}
						multiple={false}
						loading={uploading}
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
									radius='md'
									src={previewUrl}
									alt='Thumbnail preview'
									fill
									fit='cover'
									component={NextImage}
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
				</Input.Wrapper>
				<FileInput
					label='Attachments'
					description='Additional files like documents, presentation, etc...'
					placeholder='Upload files'
				/>
				<div className='flex gap-2'>
					<Button
						type='submit'
						loaderProps={{ type: 'dots' }}
						loading={loading || uploading}
						fullWidth
					>
						{t('apply')}
					</Button>
					<Tooltip label='Reset'>
						<ActionIcon
							type='reset'
							variant='default'
							size='lg'
							aria-label='Reset'
							onClick={() => {
								form.reset()
								setFiles([])
							}}
						>
							<BackspaceIcon className='h-5 w-5' />
						</ActionIcon>
					</Tooltip>
				</div>
			</form>
		</m.div>
	)
}

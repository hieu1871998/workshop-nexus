'use client'

import { useMemo, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { WorkshopDetail } from '@app/api/workshop/[slug]/route'
import { ArrowUpIcon, BackspaceIcon, CameraIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
	ActionIcon,
	Button,
	FileInput,
	Group,
	Image,
	Input,
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
import { ContextModalProps } from '@mantine/modals'
import { updateWorkshop, uploadWorkshopThumbnail } from '@network/fetchers'
import { useGetWorkshopCategories } from '@network/queries'
import { User } from '@prisma/client'
import { WorkshopUpdatePayload } from '@types'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import NextImage from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface WorkshopUpdateModal {
	workshop: WorkshopDetail
	user: User
}

export const WorkshopUpdateModal = ({ innerProps }: ContextModalProps<WorkshopUpdateModal>) => {
	const { workshop, user } = innerProps
	const t = useTranslations('workshopDetailpage.updateModal')

	const form = useForm<WorkshopUpdatePayload>({
		name: 'workshop-apply',
		initialValues: {
			id: workshop?.id ?? '',
			email: '',
			topic: workshop?.topic ?? '',
			description: workshop?.description ?? '',
			categoryId: workshop?.categoryId ?? '',
			maxParticipants: workshop?.maxParticipants ?? 1,
			presentationDate: dayjs(workshop?.presentationDate).toDate() ?? dayjs().add(7, 'day').toDate(),
			thumbnailId: workshop?.workshopThumbnailId ?? '',
			requirement: workshop?.requirement ?? '',
			expectedOutcome: workshop?.expectedOutcome ?? '',
			duration: workshop?.duration ?? 30,
		},
		validate: {
			topic: value => (isEmpty(value) ? 'Looks like the topic field is empty—please fill it in.' : null),
			description: value =>
				isEmpty(value) ? "The description field can't be left blank—please provide a description." : null,
			categoryId: value => (isEmpty(value) ? 'Please select a category from the list provided.' : null),
			maxParticipants: value => (value < 1 ? 'Maximum participants must be a valid number greater than zero.' : null),
			presentationDate: value => (!value ? 'Please choose a valid date for the presentation.' : null),
			thumbnailId: value => (isEmpty(value) ? 'Please upload a thumbnail.' : null),
			duration: value => (value > 0 ? 'Please provide a valid duration' : null),
		},
	})

	const [loading, setLoading] = useState(false)
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [uploading, setUploading] = useState(false)

	const onSubmit: SubmitHandler<WorkshopUpdatePayload> = async (data, event) => {
		try {
			setLoading(true)
			event?.preventDefault()

			const promise = updateWorkshop(data)

			await toast.promise(
				promise,
				{
					loading: 'Updating your workshop...',
					success: data => (
						<div>
							<p>
								Your <span className='font-semibold'>{data?.topic}</span> workshop is updated!
							</p>
							<p className='text-sx underline'>
								<Link href={`/user/${user.id}`}>View your workshops</Link>
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

	const handleUpload = async (file: FileWithPath) => {
		try {
			setUploading(true)
			const response = await uploadWorkshopThumbnail(file)

			if (response) {
				form.setFieldValue('thumbnailId', response.id)
			}

			setUploading(false)
		} catch (error) {
			console.error('Error uploading thumbnail: ', error)
			setFiles([])
			setLoading(false)
		}
	}

	return (
		<form
			className='flex flex-col gap-5 p-5'
			onSubmit={form.onSubmit(onSubmit, validationErrors => {
				console.error('validationErrors: ', validationErrors)
			})}
		>
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
					onFocus={() => void refetch()}
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
				<DateTimePicker
					{...form.getInputProps('presentationDate')}
					label='Presentation date'
					description='When can you hold your workshop?'
					placeholder='Input presentation date'
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
				{...form.getInputProps('thumbnailId')}
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
						{previewUrl || workshop?.workshopThumbnail ? (
							<Image
								classNames={{ root: 'aspect-16/9' }}
								radius='md'
								src={previewUrl ?? workshop?.workshopThumbnail.url}
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
					{t('submitLabel')}
				</Button>
				<Tooltip label={t('resetLabel')}>
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
	)
}

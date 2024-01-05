'use client'

import { revalidateAllPath } from '@app/action'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { Banner, WorkshopItem, WorkshopUpdateModal } from '@components'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import {
	approveWorkshop,
	cancelWorkshop,
	completeWorkshop,
	draftWorkshop,
	publishWorkshop,
	startWorkshop,
} from '@network/fetchers'
import { user } from '@nextui-org/react'
import { User } from '@prisma/client'
import { IconCircleCaretRight, IconCircleCheck, IconNotes, IconShare2 } from '@tabler/icons-react'
import { getBadgeColor } from '@utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

import { WorkshopDetailLeftSection } from './WorkshopDetailLeftSection'

interface WorkshopDetailProps {
	session: Session | null
	workshop: WorkshopWithAllFields
	otherWorkshops?: WorkshopWithAllFields[]
}

export const WorkshopDetailSection = ({ session, workshop, otherWorkshops }: WorkshopDetailProps) => {
	const t = useTranslations('workshopDetailpage')
	const router = useRouter()

	const isOwnWorkshop = session?.user.id === workshop?.hostId
	const isAdmin = session?.user.role === 'ADMIN'

	const openEditModal = () =>
		modals.open({
			title: <Text fw={600}>{t('updateModal.title')}</Text>,
			size: 'xl',
			children: (
				<WorkshopUpdateModal
					workshop={workshop}
					user={user as unknown as User}
				/>
			),
		})

	const handlePublish = async () => {
		try {
			notifications.show({
				id: 'publish-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await publishWorkshop({ id: workshop?.id })
			revalidateAllPath()

			notifications.update({
				id: 'publish-notification',
				title: 'Publish successfully!',
				message: (
					<span>
						You have published <b>{workshop?.topic}</b> workshop and awaiting for admin approval
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'publish-notification',
				title: 'Publish failed!',
				message: `${workshop?.topic} workshop failed to publish`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const handleCancel = async () => {
		try {
			notifications.show({
				id: 'publish-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await cancelWorkshop({ id: workshop?.id })
			revalidateAllPath()

			notifications.update({
				id: 'publish-notification',
				title: 'Cancel successfully!',
				message: (
					<span>
						You have canceled <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'publish-notification',
				title: 'Publish failed!',
				message: `Cancel ${workshop?.topic} workshop failed`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const handleDraft = async () => {
		try {
			notifications.show({
				id: 'publish-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await draftWorkshop({ id: workshop?.id })
			revalidateAllPath()

			notifications.update({
				id: 'publish-notification',
				title: 'Draft successfully!',
				message: (
					<span>
						You have drafted <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'publish-notification',
				title: 'Publish failed!',
				message: `Cancel ${workshop?.topic} workshop failed`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const handleApprove = async () => {
		try {
			notifications.show({
				id: 'publish-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await approveWorkshop(workshop?.id ?? '')
			revalidateAllPath()

			notifications.update({
				id: 'publish-notification',
				title: 'Approve successfully!',
				message: (
					<span>
						You have approved <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'publish-notification',
				title: 'Publish failed!',
				message: `Cancel ${workshop?.topic} workshop failed`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const handleStart = async () => {
		try {
			notifications.show({
				id: 'start-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await startWorkshop(workshop?.id ?? '')
			revalidateAllPath()

			notifications.update({
				id: 'publish-notification',
				title: 'Start successfully!',
				message: (
					<span>
						You have started <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'start-notification',
				title: 'Start failed!',
				message: `Cancel ${workshop?.topic} workshop failed`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const handleComplete = async () => {
		try {
			notifications.show({
				id: 'complete-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await completeWorkshop(workshop?.id ?? '')
			revalidateAllPath()

			notifications.update({
				id: 'complete-notification',
				title: 'Complete successfully!',
				message: (
					<span>
						You have completed <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.update({
				id: 'publish-notification',
				title: 'Publish failed!',
				message: `Cancel ${workshop?.topic} workshop failed`,
				color: 'red',
				loading: false,
				autoClose: 3000,
			})
		}
	}

	const showCancel = isAdmin || isOwnWorkshop
	const disableCancel =
		workshop?.status !== 'PENDING' && workshop?.status !== 'DRAFT' && workshop?.status !== 'APPROVED'
	const showEdit = isAdmin || isOwnWorkshop
	const disableEdit = workshop?.status === 'COMPLETED'
	const showDraft = workshop?.status !== 'DRAFT'
	const disableDraft = !isOwnWorkshop || workshop?.status === 'ONGOING' || workshop?.status === 'COMPLETED'
	const showStart = workshop?.status === 'APPROVED'
	const showComplete = workshop?.status === 'ONGOING'

	return (
		<div>
			<div className='flex justify-between'>
				<Button
					variant='subtle'
					leftSection={<ArrowLeftIcon className='h-4 w-4' />}
					onClick={() => router.back()}
				>
					Back
				</Button>
				<Group>
					{showCancel && (
						<Button.Group>
							<Button
								onClick={() => {
									modals.openConfirmModal({
										title: 'Are you sure you want to cancel this workshop?',
										labels: { cancel: 'No', confirm: 'Yes' },
										onConfirm: () => void handleCancel(),
									})
								}}
								disabled={disableCancel}
								color='red'
							>
								Cancel
							</Button>
							{showStart && (
								<Button
									onClick={() => {
										modals.openConfirmModal({
											title: 'Are you sure you want to cancel this workshop?',
											labels: { cancel: 'No', confirm: 'Yes' },
											onConfirm: () => void handleStart(),
										})
									}}
									rightSection={<IconCircleCaretRight className='h-4 w-4' />}
								>
									Start
								</Button>
							)}
							{showComplete && (
								<Button
									onClick={() => {
										modals.openConfirmModal({
											title: 'Are you sure you want to cancel this workshop?',
											labels: { cancel: 'No', confirm: 'Yes' },
											onConfirm: () => void handleComplete(),
										})
									}}
								>
									Complete
								</Button>
							)}
						</Button.Group>
					)}
					<Button.Group>
						{showEdit && (
							<Button
								variant='default'
								onClick={openEditModal}
								disabled={disableEdit}
							>
								Edit
							</Button>
						)}
						{showDraft ? (
							<Button
								onClick={() => {
									modals.openConfirmModal({
										title: 'Are you sure you want to publish this workshop?',
										labels: { cancel: 'No', confirm: 'Yes' },
										onConfirm: () => void handleDraft(),
									})
								}}
								disabled={disableDraft}
								rightSection={<IconNotes className='h-4 w-4' />}
							>
								Draft
							</Button>
						) : (
							<Button
								onClick={() => {
									modals.openConfirmModal({
										title: 'Are you sure you want to publish this workshop?',
										labels: { cancel: 'No', confirm: 'Yes' },
										onConfirm: () => void handlePublish(),
									})
								}}
								disabled={!isOwnWorkshop}
								rightSection={<IconShare2 className='h-4 w-4' />}
							>
								Publish
							</Button>
						)}
						{isAdmin && (
							<Button
								onClick={() => {
									modals.openConfirmModal({
										title: 'Are you sure you want to approve this workshop?',
										labels: { cancel: 'No', confirm: 'Yes' },
										onConfirm: () => void handleApprove(),
									})
								}}
								disabled={workshop?.status !== 'PENDING'}
								rightSection={<IconCircleCheck className='h-4 w-4' />}
							>
								Approve
							</Button>
						)}
					</Button.Group>
				</Group>
			</div>
			<div className='mt-5 grid grid-cols-12 gap-5'>
				<div className='col-span-3'>
					<WorkshopDetailLeftSection
						workshop={workshop}
						isOwnWorkshop={isOwnWorkshop}
						session={session}
					/>
				</div>
				<div className='col-span-6'>
					<Card
						withBorder
						padding='lg'
					>
						<Card.Section>
							<Image
								className='aspect-16/9 w-full object-cover object-center'
								src={workshop?.workshopThumbnail.url ?? ''}
								alt={workshop?.topic ?? ''}
								width={400}
								height={400}
							/>
							{(isOwnWorkshop || isAdmin || workshop?.status === 'COMPLETED') && (
								<div className='absolute left-5 top-5'>
									<Badge
										className='shadow'
										variant='dot'
										size='lg'
										color={getBadgeColor(workshop?.status ?? 'DRAFT')}
									>
										{workshop?.status}
									</Badge>
								</div>
							)}
						</Card.Section>
						<div className='mt-5'>
							<Badge
								color={workshop?.category?.color}
								variant={workshop?.category?.variant}
								mb={8}
							>
								{workshop?.category?.label}
							</Badge>
							<Title order={1}>{workshop?.topic}</Title>
							<Text mt={20}>{workshop?.description}</Text>
							<Text className='mt-5 text-xl font-medium'>Requirements</Text>
							<Text>{workshop?.requirement ? workshop.requirement : 'No requirements'}</Text>
							<Text className='mt-5 text-xl font-medium'>Expected outcomes</Text>
							<Text>{workshop?.requirement ? workshop.requirement : 'No expected outcomes'}</Text>
							<Group
								gap={4}
								mt={20}
							>
								{workshop?.tags.map(tag => (
									<Badge
										key={tag.id}
										color={tag.color}
										variant={tag.variant}
									>
										{tag.label}
									</Badge>
								))}
							</Group>
						</div>
					</Card>
				</div>
				<div className='col-span-3'>
					<Stack gap={20}>
						{otherWorkshops?.map(workshop => (
							<WorkshopItem
								key={workshop?.id}
								workshop={workshop}
							/>
						))}
					</Stack>
				</div>
			</div>
			<Banner />
		</div>
	)
}

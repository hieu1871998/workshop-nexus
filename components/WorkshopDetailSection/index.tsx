'use client'

import { WorkshopDetail as WorkshopDetailType } from '@app/api/workshop/[slug]/route'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { Banner, UserHoverCard, WorkshopItem, WorkshopUpdateModal } from '@components'
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge, Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { fetcher } from '@network/utils/fetcher'
import { user } from '@nextui-org/react'
import { User } from '@prisma/client'
import { IconCheck } from '@tabler/icons-react'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

interface WorkshopDetailProps {
	session: Session | null
	workshop: WorkshopWithAllFields
	otherWorkshops?: WorkshopWithAllFields[]
}

export const WorkshopDetailSection = ({ session, workshop, otherWorkshops }: WorkshopDetailProps) => {
	const t = useTranslations('workshopDetailpage')
	const router = useRouter()

	const isOwnWorkshop = session?.user.id === workshop?.hostId

	const handleAttend = async () => {
		try {
			notifications.show({
				id: 'attend-notification',
				title: 'Please wait a moment',
				message: `Communicating with server...`,
				loading: true,
				autoClose: false,
			})

			await fetcher('/api/workshop/attend', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: workshop?.id }),
			})

			notifications.update({
				id: 'attend-notification',
				title: 'Attend successfully!',
				message: `You have attended ${workshop?.topic} workshop`,
				color: 'green',
				icon: <IconCheck className='h-5 w-5' />,
				loading: false,
				autoClose: 3000,
			})
		} catch (error) {
			notifications.clean()
			console.error('error attending: ', error)
		}
	}

	const openAttendModal = () =>
		modals.openConfirmModal({
			title: (
				<span className='leading-relaxed'>
					{' '}
					{t.rich('attendModal.title', {
						bold: chunks => <span className='font-bold'>{chunks}</span>,
						topic: workshop?.topic,
					})}
				</span>
			),
			labels: { confirm: t('attendModal.confirm'), cancel: t('attendModal.cancel') },
			onConfirm: () => void handleAttend(),
		})

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
				{isOwnWorkshop && (
					<Group>
						<Button
							variant='default'
							onClick={openEditModal}
						>
							Edit
						</Button>
						<Button>Publish</Button>
					</Group>
				)}
			</div>
			<div className='mt-5 grid grid-cols-12 gap-5'>
				<div className='col-span-3 flex flex-col gap-4'>
					{!isOwnWorkshop && (
						<Button
							px={80}
							size='lg'
							onClick={openAttendModal}
							disabled={isOwnWorkshop}
						>
							{t('attendButtonTitle')}
						</Button>
					)}
					<Paper
						withBorder
						component={Link}
						href={`/user/${workshop?.host.id}`}
						classNames={{ root: 'hover:shadow-lg transition-all' }}
					>
						<div className='flex flex-col gap-3 p-5'>
							<div className='flex items-center gap-2'>
								<Avatar
									src={workshop?.host.image}
									size='xl'
								/>
								<div className='flex flex-col'>
									<Text size='xl'>
										<span className='font-semibold'>{isOwnWorkshop ? 'You' : workshop?.host.name}</span>
									</Text>
									<Text c='dimmed'>{workshop?.host.email}</Text>
								</div>
							</div>
						</div>
					</Paper>
					<Paper
						withBorder
						p={20}
					>
						<Text
							fw={600}
							size='lg'
						>
							Who&apos;s participating?
						</Text>
						<Group mt={12}>
							{isEmpty(workshop?.participants) ? (
								<Text>No participants yet</Text>
							) : (
								workshop?.participants.map(participant => (
									<UserHoverCard
										key={participant.id}
										user={participant}
									/>
								))
							)}
						</Group>
					</Paper>
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
							{isOwnWorkshop && (
								<div className='absolute left-5 top-5'>
									<Badge
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
							<Badge color={workshop?.category.color}>{workshop?.category.label}</Badge>
							<Title order={1}>{workshop?.topic}</Title>
							<div className='flex items-center gap-2'>
								<CalendarDaysIcon className='h-5 w-5' />
								<span className='text-xl font-medium leading-5'>
									{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY - HH:mm')}
								</span>
							</div>
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

'use client'

import { WorkshopDetail as WorkshopDetailType } from '@app/api/workshop/[slug]/route'
import { UserHoverCard } from '@components/UserHoverCard'
import { WorkshopItem } from '@components/WorkshopItem'
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge, Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { fetcher } from '@network/utils/fetcher'
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
	workshop?: WorkshopDetailType
	otherWorkshops?: WorkshopDetailType[]
}

export const WorkshopDetail = ({ session, workshop, otherWorkshops }: WorkshopDetailProps) => {
	const t = useTranslations('workshopDetailpage')
	const router = useRouter()

	const isOwnWorkshop = session?.user.id === workshop?.hostId

	const handleAttend = async () => {
		try {
			const attended = await fetcher('/api/workshop/attend', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: workshop?.id }),
			})

			console.log('attended: ', attended)
		} catch (error) {
			console.error('error attending: ', error)
		}
	}

	const openAttendModal = () =>
		modals.openConfirmModal({
			title: t('attendModal.title'),
			labels: { confirm: t('attendModal.confirm'), cancel: t('attendModal.cancel') },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => void handleAttend(),
		})

	const openEditModal = () =>
		modals.openContextModal({
			modal: 'workshopUpdate',
			title: <Text fw={600}>{t('updateModal.title')}</Text>,
			size: 'xl',
			innerProps: {
				workshop,
				user: session?.user,
			},
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
		</div>
	)
}

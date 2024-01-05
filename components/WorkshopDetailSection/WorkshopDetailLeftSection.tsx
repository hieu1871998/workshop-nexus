'use client'

import { useState } from 'react'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { UserHoverCard } from '@components/UserHoverCard'
import { Avatar, Button, Divider, Group, Paper, Popover, Stack, Text } from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { fetcher } from '@network/utils/fetcher'
import { IconCalendar, IconClock, IconLogin, IconUsers } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'use-intl'

interface WorkshopDetailLeftSection {
	workshop?: WorkshopWithAllFields
	isOwnWorkshop: boolean
	session: Session | null
}

export const WorkshopDetailLeftSection = ({ workshop, isOwnWorkshop, session }: WorkshopDetailLeftSection) => {
	const t = useTranslations('workshopDetailpage')

	const [opened, setOpened] = useState(false)

	const handleAttend = async () => {
		setOpened(false)

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
				message: (
					<span>
						You have attended <b>{workshop?.topic}</b> workshop
					</span>
				),
				color: 'green',
				loading: false,
				autoClose: 5000,
			})
		} catch (error) {
			notifications.clean()
			console.error('error attending: ', error)
		}
	}

	const isAttended = workshop?.participants.find(participant => participant.id === session?.user.id)

	return (
		<div className='flex flex-col gap-4'>
			{!isOwnWorkshop && (
				<Popover
					width='target'
					shadow='lg'
					withArrow
					opened={opened}
					onChange={setOpened}
				>
					<Popover.Target>
						<Button
							px={80}
							size='lg'
							onClick={() => setOpened(o => !o)}
							disabled={!!isAttended}
						>
							{isAttended ? (
								<Text
									size='md'
									fw={600}
								>
									Already signed up to attend
								</Text>
							) : (
								t('attendButtonTitle')
							)}
						</Button>
					</Popover.Target>
					<Popover.Dropdown>
						{session ? (
							<Stack>
								<Text ta='center'>Are you sure you want to attend this workshop?</Text>
								<Group
									gap={8}
									justify='flex-end'
								>
									<Button
										variant='default'
										size='xs'
										onClick={() => setOpened(false)}
									>
										No
									</Button>
									<Button
										size='xs'
										onClick={() => void handleAttend()}
									>
										Yes
									</Button>
								</Group>
							</Stack>
						) : (
							<Stack>
								<Text ta='center'>You must be signed in to attend a workshop</Text>
								<Button
									rightSection={<IconLogin className='h-4 w-4' />}
									component={Link}
									href='/signin'
								>
									Sign in
								</Button>
							</Stack>
						)}
					</Popover.Dropdown>
				</Popover>
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
				<Stack>
					<Stack gap={4}>
						<Group>
							<IconCalendar className='h-5 w-5' />
							<Text
								fw={600}
								size='lg'
							>
								Presentation date
							</Text>
						</Group>
						<Stack
							align='center'
							gap={4}
						>
							<DatePicker
								date={dayjs(workshop?.presentationDate).toDate()}
								value={dayjs(workshop?.presentationDate).toDate()}
								maxLevel='month'
							/>
							<TimeInput
								leftSection={<IconClock className='h-4 w-4' />}
								value={dayjs(workshop?.presentationDate).format('HH:mm')}
								readOnly
							/>
						</Stack>
					</Stack>
					<Divider />
					<Stack gap={4}>
						<Group>
							<IconClock className='h-5 w-5' />
							<Text
								fw={600}
								size='lg'
							>
								Duration
							</Text>
						</Group>
						<Text ml={36}>{workshop?.duration} minutes</Text>
					</Stack>
					<Divider />
					<Stack gap={4}>
						<Group>
							<IconUsers className='h-5 w-5' />
							<Text
								fw={600}
								size='lg'
							>
								Who&apos;s participating?
							</Text>
						</Group>
						<Group ml={36}>
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
					</Stack>
				</Stack>
			</Paper>
		</div>
	)
}

'use client'

import { useState } from 'react'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { UserHoverCard } from '@components/UserHoverCard'
import { Avatar, Button, Group, Paper, Popover, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { fetcher } from '@network/utils/fetcher'
import { IconLogin } from '@tabler/icons-react'
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
	)
}

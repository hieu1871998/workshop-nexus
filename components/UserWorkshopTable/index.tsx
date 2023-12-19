'use client'

import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { WorkshopUpdateModal } from '@components/WorkshopUpdateModal'
import { ActionIcon, Anchor, Badge, Group, Paper, Table, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconBan, IconPencil, IconShare2 } from '@tabler/icons-react'
import { UserWithProfile } from '@types'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

interface UserWorkshopTableProps {
	workshops: WorkshopWithAllFields[]
	user: UserWithProfile
	session: Session | null
}

export const UserWorkshopTable = ({ workshops, user, session }: UserWorkshopTableProps) => {
	const isOwnProfile = user.id === session?.user.id

	const t = useTranslations('workshopDetailpage')

	const openEditModal = (workshop: WorkshopWithAllFields) =>
		modals.open({
			title: <Text fw={600}>{t('updateModal.title')}</Text>,
			size: 'xl',
			children: (
				<WorkshopUpdateModal
					workshop={workshop}
					user={user}
				/>
			),
		})

	const rows = workshops.map(workshop => (
		<Table.Tr key={workshop?.id}>
			<Table.Td>
				<Text c='blue'>
					<Anchor
						href={`/workshop/${workshop?.slug}`}
						className='flex items-center gap-1'
						component={Link}
						c='blue'
						fw={600}
						size='sm'
					>
						{workshop?.topic}
					</Anchor>
				</Text>
			</Table.Td>
			<Table.Td maw={360}>
				<Text size='sm'>{workshop?.description}</Text>
			</Table.Td>
			{isOwnProfile && (
				<Table.Td>
					<div className='flex items-center justify-center'>
						<Badge
							variant='dot'
							color={getBadgeColor(workshop?.status ?? 'DRAFT')}
						>
							{workshop?.status}
						</Badge>
					</div>
				</Table.Td>
			)}
			<Table.Td>
				<Text
					size='sm'
					ta='center'
				>
					{dayjs(workshop?.presentationDate).format('HH:mm')}
				</Text>
				<Text
					size='sm'
					ta='center'
				>
					{dayjs(workshop?.presentationDate).format('YYYY, DD MMM')}
				</Text>
			</Table.Td>
			<Table.Td>
				<Group
					gap={8}
					justify='center'
				>
					<Tooltip label='Publish'>
						<ActionIcon
							variant='subtle'
							color='blue'
							onClick={() => openEditModal(workshop)}
						>
							<IconShare2 className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Update'>
						<ActionIcon
							variant='subtle'
							onClick={() => openEditModal(workshop)}
						>
							<IconPencil className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Cancel'>
						<ActionIcon
							variant='subtle'
							color='red'
						>
							<IconBan className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Paper
				withBorder
				p={20}
			>
				<Table
					stickyHeader
					highlightOnHover
					captionSide='top'
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>
								<Text
									ta='center'
									fw={600}
								>
									Topic
								</Text>
							</Table.Th>
							<Table.Th>
								<Text
									ta='center'
									fw={600}
								>
									Description
								</Text>
							</Table.Th>
							{isOwnProfile && (
								<Table.Th>
									<Text
										ta='center'
										fw={600}
									>
										Status
									</Text>
								</Table.Th>
							)}
							<Table.Th>
								<Text
									ta='center'
									fw={600}
								>
									Start
								</Text>
							</Table.Th>
							<Table.Th>
								<Text
									ta='center'
									fw={600}
								>
									Action
								</Text>
							</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Paper>
		</>
	)
}

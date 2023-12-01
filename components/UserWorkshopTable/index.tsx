'use client'

import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Badge, Group, Paper, Table, Text, Tooltip } from '@mantine/core'
import { UserWithProfile, WorkshopWithCategoryAndTags } from '@types'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'
import Link from 'next/link'

interface UserWorkshopTableProps {
	workshops: WorkshopWithCategoryAndTags[]
	user: UserWithProfile
}

export const UserWorkshopTable = ({ workshops }: UserWorkshopTableProps) => {
	const rows = workshops.map(workshop => (
		<Table.Tr key={workshop.id}>
			<Table.Td>
				<Text c='blue'>
					<Link
						href={`/workshop/${workshop.slug}`}
						className='flex items-center gap-1 hover:underline'
					>
						<Text
							size='sm'
							fw={500}
						>
							{workshop.topic}
						</Text>
						<ArrowRightIcon className='h-4 w-4' />
					</Link>
				</Text>
			</Table.Td>
			<Table.Td maw={360}>
				<Text size='sm'>{workshop.description}</Text>
			</Table.Td>
			<Table.Td>
				<div className='flex items-center justify-center'>
					<Badge
						variant='dot'
						color={getBadgeColor(workshop.status)}
					>
						{workshop.status}
					</Badge>
				</div>
			</Table.Td>
			<Table.Td>
				<Text
					size='sm'
					ta='center'
				>
					{dayjs(workshop.presentationDate).format('HH:mm')}
				</Text>
				<Text
					size='sm'
					ta='center'
				>
					{dayjs(workshop.presentationDate).format('YYYY, DD MMM')}
				</Text>
			</Table.Td>
			<Table.Td>
				<Group
					gap={8}
					justify='center'
				>
					<Tooltip label='Update'>
						<ActionIcon variant='subtle'>
							<PencilSquareIcon className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Cancel'>
						<ActionIcon
							variant='subtle'
							color='red'
						>
							<TrashIcon className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Table.Td>
		</Table.Tr>
	))

	return (
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
						<Table.Th>
							<Text
								ta='center'
								fw={600}
							>
								Status
							</Text>
						</Table.Th>
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
	)
}

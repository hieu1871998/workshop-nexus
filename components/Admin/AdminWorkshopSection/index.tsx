'use client'

import { revalidateAllPath } from '@app/action'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { WorkshopUpdateModal } from '@components/WorkshopUpdateModal'
import { ActionIcon, Anchor, Avatar, Badge, Group, Paper, Table, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { approveWorkshop, rejectWorkshop, startWorkshop } from '@network/fetchers'
import { User } from '@prisma/client'
import { IconBan, IconCircleCheck, IconCircleChevronRight, IconCircleRectangle, IconPencil } from '@tabler/icons-react'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'
import Link from 'next/link'

interface AdminWorkshopSection {
	workshops?: WorkshopWithAllFields[]
}

export const AdminWorkshopSection = ({ workshops = [] }: AdminWorkshopSection) => {
	const openEditModal = (workshop: WorkshopWithAllFields) =>
		modals.open({
			title: <Text fw={600}>Update workshop</Text>,
			size: 'xl',
			children: (
				<WorkshopUpdateModal
					workshop={workshop}
					user={workshop?.host as User}
				/>
			),
		})

	const handleApprove = async (workshop: WorkshopWithAllFields) => {
		try {
			await approveWorkshop(workshop?.id ?? '')
			revalidateAllPath()
		} catch (error) {
			console.error(error)
		}
	}

	const handleReject = async (workshop: WorkshopWithAllFields) => {
		try {
			await rejectWorkshop(workshop?.id ?? '')
			revalidateAllPath()
		} catch (error) {
			console.error(error)
		}
	}

	const handleStart = async (workshop: WorkshopWithAllFields) => {
		try {
			await startWorkshop(workshop?.id ?? '')
			revalidateAllPath()
		} catch (error) {
			console.error(error)
		}
	}

	const rows = workshops.map(workshop => (
		<Table.Tr key={workshop?.id}>
			<Table.Td>
				<Group gap='sm'>
					<Avatar
						size={40}
						src={workshop?.host.image}
						radius={40}
					/>
					<div>
						<Text
							fz='sm'
							fw={500}
						>
							{workshop?.host.name}
						</Text>
						<Text
							fz='xs'
							c='dimmed'
						>
							{workshop?.host.email}
						</Text>
					</div>
				</Group>
			</Table.Td>
			<Table.Td maw={200}>
				<Text c='blue'>
					<Anchor
						href={`/workshop/${workshop?.slug}`}
						className='line-clamp-2 flex items-center gap-1'
						component={Link}
						c='blue'
						fw={600}
						size='sm'
					>
						{workshop?.topic}
					</Anchor>
				</Text>
			</Table.Td>
			{/* <Table.Td maw={360}>
				<Text
					className='line-clamp-2'
					size='sm'
				>
					{workshop?.description}
				</Text>
			</Table.Td> */}
			<Table.Td>
				<div className='flex items-center justify-center'>
					<Badge
						variant='light'
						color={getBadgeColor(workshop?.status ?? 'DRAFT')}
					>
						{workshop?.status}
					</Badge>
				</div>
			</Table.Td>
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
				<Text
					size='sm'
					ta='center'
				>
					{dayjs(workshop?.createdAt).format('YYYY, DD MMM')}
				</Text>
			</Table.Td>
			<Table.Td>
				<Group
					gap={8}
					justify='center'
				>
					<Tooltip label='Approve'>
						<ActionIcon
							variant='light'
							radius='xl'
							color='green'
							onClick={() => {
								modals.openConfirmModal({
									title: (
										<span>
											Are you sure you want to approve <b>{workshop?.topic}</b> workshop by <b>{workshop?.host.name}</b>
											?
										</span>
									),
									labels: { confirm: 'Yes', cancel: 'No' },
									onConfirm: () => void handleApprove(workshop),
								})
							}}
							disabled={workshop?.status !== 'PENDING'}
						>
							<IconCircleCheck className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
					<Tooltip label={workshop?.status === 'ONGOING' ? 'End' : 'Start'}>
						<ActionIcon
							variant='light'
							radius='xl'
							color={workshop?.status === 'ONGOING' ? 'orange' : 'blue'}
							onClick={() => void handleStart(workshop)}
							disabled={workshop?.status !== 'APPROVED' && workshop?.status !== 'ONGOING'}
						>
							{workshop?.status === 'ONGOING' ? (
								<IconCircleRectangle className='h-4 w-4' />
							) : (
								<IconCircleChevronRight className='h-4 w-4' />
							)}
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Update'>
						<ActionIcon
							variant='light'
							radius='xl'
							onClick={() => openEditModal(workshop)}
							disabled={workshop?.status === 'CANCELED' || workshop?.status === 'REJECTED'}
						>
							<IconPencil className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Reject'>
						<ActionIcon
							variant='light'
							radius='xl'
							color='red'
							onClick={() => void handleReject(workshop)}
							disabled={workshop?.status !== 'PENDING'}
						>
							<IconBan className='h-4 w-4' />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<Paper
			withBorder
			className='container mx-auto h-min overflow-hidden'
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
								Host
							</Text>
						</Table.Th>
						<Table.Th>
							<Text
								ta='center'
								fw={600}
							>
								Topic
							</Text>
						</Table.Th>
						{/* <Table.Th>
							<Text
								ta='center'
								fw={600}
							>
								Description
							</Text>
						</Table.Th> */}
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
								Created
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

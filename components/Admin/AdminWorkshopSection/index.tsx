'use client'

import { revalidateAllPath } from '@app/action'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { WorkshopUpdateModal } from '@components/WorkshopUpdateModal'
import { ActionIcon, Anchor, Avatar, Badge, Group, Pagination, Paper, Table, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { approveWorkshop, canceltWorkshop, rejectWorkshop, startWorkshop } from '@network/fetchers'
import { User } from '@prisma/client'
import { IconBan, IconCircleCheck, IconCircleChevronRight, IconCircleRectangle, IconPencil } from '@tabler/icons-react'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'
import Link from 'next/link'

interface AdminWorkshopSection {
	workshops?: WorkshopWithAllFields[]
	total: number
}

export const AdminWorkshopSection = ({ workshops = [], total }: AdminWorkshopSection) => {
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

	const handleStart = async (workshop: WorkshopWithAllFields) => {
		try {
			await startWorkshop(workshop?.id ?? '')

			revalidateAllPath()
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelReject = async (workshop: WorkshopWithAllFields) => {
		try {
			if (workshop?.status === 'PENDING') {
				await rejectWorkshop(workshop?.id ?? '')
			} else {
				await canceltWorkshop(workshop?.id ?? '')
			}

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
					<Tooltip label={workshop?.status === 'PENDING' ? 'Reject' : 'Cancel'}>
						<ActionIcon
							variant='light'
							radius='xl'
							color='red'
							onClick={() => void handleCancelReject(workshop)}
							disabled={workshop?.status === 'DRAFT' || workshop?.status === 'COMPLETED'}
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
			className='px-2'
			withBorder
		>
			<Group
				className='py-2'
				justify='flex-end'
			>
				<Pagination
					size='sm'
					total={Math.ceil(total / 20)}
				/>
			</Group>
			<Table.ScrollContainer minWidth={768}>
				<Table
					stickyHeader
					highlightOnHover
					captionSide='top'
					verticalSpacing='sm'
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>
								<Text fw={600}>Host</Text>
							</Table.Th>
							<Table.Th>
								<Text fw={600}>Topic</Text>
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
			</Table.ScrollContainer>
		</Paper>
	)
}

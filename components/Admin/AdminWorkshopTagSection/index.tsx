'use client'

import { useState } from 'react'
import { revalidateAllPath } from '@app/action'
import { WorkshopTagWithCount } from '@app/api/workshop/tag/route'
import {
	ActionIcon,
	Badge,
	Box,
	Button,
	Group,
	Paper,
	Popover,
	Stack,
	Table,
	Text,
	Title,
	Tooltip,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { deleteWorkshopTag } from '@network/fetchers'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { capitalize } from 'lodash'

export const AdminWorkshopTagSection = ({ tags = [] }: { tags?: WorkshopTagWithCount[] }) => {
	const [focused, setFocused] = useState<string>()
	const [loading, setLoading] = useState(false)

	const openTagModal = (title: React.ReactNode, tag?: WorkshopTagWithCount) => {
		setFocused(tag?.id)

		modals.openContextModal({
			modal: 'adminWorkshopTag',
			title,
			innerProps: {
				tag,
			},
			onClose: () => setFocused(undefined),
		})
	}

	const handleDelete = async (tag: WorkshopTagWithCount) => {
		setLoading(true)
		try {
			await deleteWorkshopTag(tag?.id ?? '')
			revalidateAllPath()
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	const rows = tags.map(tag => (
		<Table.Tr
			key={tag?.id}
			className='transition-all'
			bg={focused === tag?.id ? `${tag?.color}.1` : undefined}
		>
			<Table.Td>
				<Badge
					variant={tag?.variant}
					color={tag?.color}
				>
					{tag?.label}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Text
					fz='sm'
					fw={600}
				>
					{capitalize(tag?.variant)}
				</Text>
			</Table.Td>
			<Table.Td c={tag?.color}>
				<Text
					fz='sm'
					fw={600}
				>
					{capitalize(tag?.color)}
				</Text>
			</Table.Td>
			<Table.Td>
				<Text
					fw={600}
					ta='center'
				>
					{tag?._count.workshops}
				</Text>
			</Table.Td>
			<Table.Td>
				<Group
					gap={0}
					justify='center'
				>
					<ActionIcon
						variant='subtle'
						radius='xl'
						onClick={() => openTagModal('Update tag', tag)}
					>
						<IconEdit className='h-4 w-4' />
					</ActionIcon>
					<Popover
						onOpen={() => setFocused(tag?.id)}
						onClose={() => setFocused(undefined)}
					>
						<Popover.Target>
							<ActionIcon
								variant='subtle'
								radius='xl'
								color='red'
							>
								<IconTrash className='h-4 w-4' />
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown>
							<Stack>
								<Text ta='center'>
									Are you sure you want to delete{' '}
									<Text
										inline
										c={tag?.color}
									>
										{tag?.label}
									</Text>{' '}
									tag?
								</Text>
								<Group justify='flex-end'>
									<Button
										size='xs'
										onClick={() => void handleDelete(tag)}
										loading={loading}
									>
										Yes
									</Button>
								</Group>
							</Stack>
						</Popover.Dropdown>
					</Popover>
				</Group>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<Paper
			className='h-full w-full overflow-auto'
			withBorder
		>
			<Box
				p={12}
				bg='dark'
			>
				<Title
					order={4}
					c='white'
				>
					Tags
				</Title>
			</Box>
			<Table
				className='min-h-0 flex-1 overflow-auto'
				stickyHeader
				highlightOnHover
			>
				<Table.Thead className='z-10'>
					<Table.Tr>
						<Table.Th>Label</Table.Th>
						<Table.Th className='w-16'>Variant</Table.Th>
						<Table.Th className='w-16'>Color</Table.Th>
						<Table.Th className='w-10'>Workshops</Table.Th>
						<Table.Th className='w-20'>
							<Group justify='center'>
								<Tooltip label='Add tag'>
									<ActionIcon
										radius='xl'
										onClick={() => openTagModal('Create tag')}
									>
										<IconPlus className='h-4 w-4' />
									</ActionIcon>
								</Tooltip>
							</Group>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Paper>
	)
}

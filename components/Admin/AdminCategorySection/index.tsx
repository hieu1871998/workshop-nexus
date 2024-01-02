'use client'

import { useState } from 'react'
import { revalidateAllPath } from '@app/action'
import { CategoryWithCount } from '@app/api/workshop/category/route'
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
import { deleteCategory } from '@network/fetchers'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { capitalize } from 'lodash'

interface AdminCategorySection {
	categories?: CategoryWithCount[]
}

export const AdminCategorySection = ({ categories = [] }: AdminCategorySection) => {
	const [focused, setFocused] = useState<string>()
	const [loading, setLoading] = useState(false)

	const openCategoryModal = (title: React.ReactNode, category?: CategoryWithCount) => {
		setFocused(category?.id)

		modals.openContextModal({
			modal: 'adminCategory',
			title,
			innerProps: {
				category,
			},
			onClose: () => setFocused(undefined),
		})
	}

	const handleDelete = async (category: CategoryWithCount) => {
		setLoading(true)
		try {
			await deleteCategory(category?.id ?? '')
			revalidateAllPath()
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	const rows = categories.map(category => (
		<Table.Tr
			key={category?.id}
			className='transition-all'
			bg={focused === category?.id ? `${category?.color}.1` : undefined}
		>
			<Table.Td>
				<Badge
					variant={category?.variant}
					color={category?.color}
				>
					{category?.label}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Text
					fz='sm'
					fw={600}
				>
					{capitalize(category?.variant)}
				</Text>
			</Table.Td>
			<Table.Td c={category?.color}>
				<Text
					fz='sm'
					fw={600}
				>
					{capitalize(category?.color)}
				</Text>
			</Table.Td>
			<Table.Td>
				<Text
					fw={600}
					ta='center'
				>
					{category?._count.workshops}
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
						onClick={() => openCategoryModal('Update category', category)}
					>
						<IconEdit className='h-4 w-4' />
					</ActionIcon>
					<Popover
						onOpen={() => setFocused(category?.id)}
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
										c={category?.color}
									>
										{category?.label}
									</Text>{' '}
									category?
								</Text>
								<Group justify='flex-end'>
									<Button
										size='xs'
										onClick={() => void handleDelete(category)}
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
					Categories
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
								<Tooltip label='Add category'>
									<ActionIcon
										radius='xl'
										onClick={() => openCategoryModal('Add category')}
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

'use client'

import { useMemo, useState } from 'react'
import { Table, TableData } from '@mantine/core'
import { useGetAdminUsers } from '@network/queries'
import { Selection } from '@nextui-org/react'
import { WorkshopStatus } from '@prisma/client'
import { AdminUsers, GetAdminUsersPayload } from '@types'

const DEFAULT_STATUSES: WorkshopStatus[] = [
	'APPROVED',
	'CANCELED',
	'COMPLETED',
	'DRAFT',
	'ONGOING',
	'PENDING',
	'REJECTED',
]

const columns = [
	{
		key: 'topic',
		label: 'Topic',
	},
	{
		key: 'description',
		label: 'Description',
	},
	{
		key: 'host',
		label: 'Host',
	},
	{
		key: 'presentationDate',
		label: 'Presentation date',
	},
	{
		key: 'status',
		label: 'Status',
	},
	{
		key: 'actions',
		label: 'Actions',
	},
]

const PAGE_SIZE = 10

export const AdminUserSection = () => {
	const [statusFilter, setStatusFilter] = useState<Selection>(new Set(DEFAULT_STATUSES))
	const payload = useMemo<GetAdminUsersPayload>(
		() => ({
			page: 0,
			pageSize: PAGE_SIZE,
			orderBy: 'createdAt',
			// status: Array.from(statusFilter) as WorkshopStatus[],
		}),
		[statusFilter]
	)
	const { data, isLoading, fetchNextPage } = useGetAdminUsers(payload)

	const items = useMemo(
		() => data?.pages.reduce((previous, current) => [...previous, ...(current?.users ?? [])], [] as AdminUsers[]) ?? [],
		[data?.pages]
	)

	const hasMore = useMemo(() => data?.pages?.[data.pages.length - 1]?.hasNextPage, [data?.pages])

	const loadingState = useMemo(() => (isLoading ? 'loading' : 'idle'), [isLoading])
	console.log(items)

	const tableData: TableData = useMemo(
		() => ({
			caption: 'Nothing',
			head: ['email.id', 'id'],
			body: [[{ id: 1 }, 2]],
		}),
		[items]
	)

	return (
		<section className='flex gap-5'>
			<Table data={tableData} />
		</section>
	)
}

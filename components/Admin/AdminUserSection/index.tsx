'use client'

import { KeyboardEvent, memo, useEffect, useMemo, useState } from 'react'
import LoadingPage from '@app/[locale]/(user)/loading'
import {
	ActionIcon,
	Box,
	Button,
	Container,
	Flex,
	Grid,
	GridCol,
	Pagination,
	Select,
	Table,
	TableData,
	TextInput,
} from '@mantine/core'
import { useGetAdminUsers } from '@network/queries'
import EditIcon from '@public/icons/EditIcon'
import SearchIcon from '@public/icons/SearchIcon'
// import { WorkshopStatus } from '@prisma/client'
import { AdminUsers } from '@types'

import { useChangeFilter } from './components/useChangeFilter'

// const DEFAULT_STATUSES: WorkshopStatus[] = [
// 	'APPROVED',
// 	'CANCELED',
// 	'COMPLETED',
// 	'DRAFT',
// 	'ONGOING',
// 	'PENDING',
// 	'REJECTED',
// ]

const HEAD = ['Name', 'Email', '']

export const AdminUserSection = () => {
	const [payload, setPayload] = useChangeFilter()
	const [search, setSearch] = useState('')

	const { data, isLoading, isFetching, refetch } = useGetAdminUsers(payload)

	const body = useMemo(
		() =>
			data?.users.map(user => [
				user.name,
				user.email,
				<ButtonGroup
					user={user}
					key={user.id}
				/>,
			]) ?? [],
		[data?.users]
	)

	// const hasMore = useMemo(() => data?.pages?.[data.pages.length - 1]?.hasNextPage, [data?.pages])

	// const loadingState = useMemo(() => (isLoading ? 'loading' : 'idle'), [isLoading])

	const tableData: TableData = {
		head: HEAD,
		caption: body.length ? undefined : 'Nothing to show',
		body,
	}

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
	}

	useEffect(() => {
		void refetch()
	}, [refetch, payload])

	if (isLoading || isFetching) return <LoadingPage />

	return (
		<section>
			<Container fluid>
				<Grid>
					<GridCol>
						<Flex>
							<TextInput
								className='w-full'
								placeholder='Search for name, email'
								value={search}
								onKeyDown={e => onSearchChange(e)}
								onChange={e => setSearch(e.target.value)}
								leftSection={<SearchIcon />}
								onBlur={() => setPayload({ ...payload, query: search })}
							/>
						</Flex>
					</GridCol>

					<GridCol span={12}>
						<Box className='rounded-lg border border-solid'>
							<Table
								highlightOnHover
								data={tableData}
							/>
						</Box>
					</GridCol>

					{!!data?.users.length && (
						<GridCol>
							<Flex
								align='center'
								gap='sm'
							>
								<Select
									style={{ width: '95px' }}
									data={['10 / page', '25 / page', '50 / page']}
									size='xs'
									value={`${payload.pageSize || 10} / page`}
									withCheckIcon={false}
									onChange={value => setPayload({ ...payload, pageSize: parseInt(value || '10') })}
								/>
								<Pagination
									total={Math.ceil((data?.total || 0) / (payload?.pageSize || 10))}
									value={payload.page}
									onChange={page => {
										setPayload({ ...payload, page })
									}}
								/>
							</Flex>
						</GridCol>
					)}
				</Grid>
			</Container>
		</section>
	)
}

const ButtonGroup = memo(({ user }: { user: AdminUsers }) => {
	return (
		<>
			<ActionIcon
				key={user.id}
				color='yellow'
				aria-label='Settings'
				onClick={() => console.log(12)}
			>
				<EditIcon />
			</ActionIcon>
		</>
	)
})
ButtonGroup.displayName = 'button'

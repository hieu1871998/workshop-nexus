'use client'

import { KeyboardEvent, memo, useEffect, useMemo, useState } from 'react'
import LoadingPage from '@app/[locale]/(user)/loading'
import {
	Avatar,
	Badge,
	Box,
	Container,
	Flex,
	Grid,
	GridCol,
	Group,
	NavLink,
	Pagination,
	Select,
	Table,
	TableData,
	Text,
	TextInput,
} from '@mantine/core'
import { useGetAdminUsers } from '@network/queries'
import EditIcon from '@public/icons/EditIcon'
import SearchIcon from '@public/icons/SearchIcon'
import { AdminUsers, getRoleColor } from '@types'

import { useChangeFilter } from './components/useChangeFilter'

const HEAD = ['Name', 'Email', 'Workshops Hosted', 'Workshops Participated', 'Role', 'Tag', '']

export const AdminUserSection = () => {
	const [payload, setPayload] = useChangeFilter()
	const [search, setSearch] = useState('')

	const { data, isLoading, isFetching, refetch } = useGetAdminUsers(payload)

	const ButtonGroup = memo(({ user }: { user: AdminUsers }) => {
		return (
			<>
				<NavLink
					href={`/admin/users/${user.id}/edit`}
					leftSection={<EditIcon />}
				/>
			</>
		)
	})
	ButtonGroup.displayName = 'button'

	const body = useMemo(
		() =>
			data?.users.map(user => [
				<Flex
					key={user.id}
					align='center'
					gap='sm'
				>
					<Avatar
						src={user.image || null}
						size='sm'
					/>
					<Text>{user.name}</Text>
				</Flex>,
				user.email,
				user?.workshopsHosted?.length,
				user?.workshopsParticipated?.length,
				<Badge
					key={user.id}
					color={getRoleColor(user.role)}
					style={{ minWidth: 70 }}
				>
					{user.role}
				</Badge>,
				<Group
					gap='xs'
					key={user.id}
					style={{ maxWidth: 300 }}
				>
					{user.tags.map(tag => (
						<Badge
							key={tag.id}
							color={tag.color}
						>
							{tag.label}
						</Badge>
					))}
				</Group>,
				<ButtonGroup
					user={user}
					key={user.id}
				/>,
			]) ?? [],
		[ButtonGroup, data?.users]
	)

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

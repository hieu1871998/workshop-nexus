'use client'

import { KeyboardEvent, memo, useEffect, useState } from 'react'
import LoadingPage from '@app/[locale]/(user)/loading'
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Flex,
	Group,
	Pagination,
	Paper,
	Select,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	TextInput,
} from '@mantine/core'
import { useGetAdminUsers } from '@network/queries'
import EditIcon from '@public/icons/EditIcon'
import SearchIcon from '@public/icons/SearchIcon'
import { IconEdit } from '@tabler/icons-react'
import { AdminUsers, getRoleColor } from '@types'
import Link from 'next/link'
import { Session } from 'next-auth'

import { useChangeFilter } from './components/useChangeFilter'

export const AdminUserSection = ({ session }: { session: Session | null }) => {
	const userRole = session?.user.role
	const HEAD = ['Name', 'Email', 'Role', 'Hosted', 'Participated', 'Tag', userRole === 'ADMIN' ? '' : [].flat()]
	const [payload, setPayload] = useChangeFilter()
	const [search, setSearch] = useState('')

	const { data, isLoading, isFetching, refetch } = useGetAdminUsers(payload)

	const ButtonGroup = memo(({ user }: { user: AdminUsers }) => {
		return (
			<>
				<a href={`/admin/users/${user.id}/edit`}>
					<EditIcon />
				</a>
			</>
		)
	})
	ButtonGroup.displayName = 'button'

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
	}

	useEffect(() => {
		void refetch()
	}, [refetch, payload])

	if (isLoading || isFetching) return <LoadingPage />

	return (
		<div className='flex h-full w-full flex-col overflow-auto'>
			<Flex>
				<TextInput
					className='w-full max-w-sm'
					placeholder='Search for name, email'
					value={search}
					onKeyDown={e => onSearchChange(e)}
					onChange={e => setSearch(e.target.value)}
					leftSection={<SearchIcon />}
					onBlur={() => setPayload({ ...payload, query: search })}
				/>
			</Flex>
			<Paper
				className='mt-5 flex min-h-0 flex-1 flex-col overflow-auto p-2'
				withBorder
			>
				<Table className='min-h-0 flex-1 overflow-auto'>
					<TableThead>
						<TableTr>
							{HEAD.map((head, idx) => (
								<TableTh key={idx}>{head}</TableTh>
							))}
						</TableTr>
					</TableThead>
					<TableTbody>
						{data?.users.map(user => {
							return (
								<TableTr key={user.id}>
									<TableTd>
										<Anchor
											c='blue'
											fw={600}
											size='sm'
											component={Link}
											href={`/user/${user.id}`}
										>
											<Group>
												<Avatar
													src={user.image || null}
													size='sm'
												/>
												<Text>{user.name}</Text>
											</Group>
										</Anchor>
									</TableTd>
									<TableTd>{user.email}</TableTd>
									<TableTd>
										<Badge
											key={user.id}
											color={getRoleColor(user.role)}
											style={{ minWidth: 72 }}
										>
											{user.role}
										</Badge>
									</TableTd>
									<TableTd>{user?.workshopsHosted?.length}</TableTd>
									<TableTd>{user?.workshopsParticipated?.length}</TableTd>
									<TableTd>
										<Group
											key={user.id}
											gap={4}
											wrap='nowrap'
											maw={200}
										>
											{user.tags.map(tag => (
												<Badge
													key={tag.id}
													color={tag.color}
													variant={tag.variant}
												>
													{tag.label}
												</Badge>
											))}
										</Group>
									</TableTd>
									{userRole === 'ADMIN' && (
										<TableTd>
											<ActionIcon
												key={user.id}
												component={Link}
												href={`/admin/users/${user.id}/edit`}
												variant='subtle'
											>
												<IconEdit className='h-4 w-4' />
											</ActionIcon>
										</TableTd>
									)}
								</TableTr>
							)
						})}
					</TableTbody>
				</Table>
				{!!data?.users.length && (
					<Group justify='flex-end'>
						{!!data.total && (
							<Text size='sm'>
								{((payload.page || 1) - 1) * (payload.pageSize || 10) + 1} -{' '}
								{Math.min((payload.page || 0) * (payload?.pageSize || 10), data.total)} in {data.total}
							</Text>
						)}
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
							size='sm'
							onChange={page => {
								setPayload({ ...payload, page })
							}}
						/>
					</Group>
				)}
			</Paper>
		</div>
	)
}

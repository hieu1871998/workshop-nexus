'use client'

import { KeyboardEvent, memo, useEffect, useState } from 'react'
import LoadingPage from '@app/[locale]/(user)/loading'
import {
	Avatar,
	Badge,
	Box,
	Container,
	Flex,
	Grid,
	GridCol,
	Pagination,
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
import { AdminUsers, getRoleColor } from '@types'
import { Session } from 'next-auth'

import { useChangeFilter } from './components/useChangeFilter'

export const AdminUserSection = ({ session }: { session: Session | null }) => {
	const userRole = session?.user.role
	const HEAD = [
		'Name',
		'Email',
		'Role',
		'Workshops Hosted',
		'Workshops Participated',
		'Tag',
		userRole === 'ADMIN' ? '' : [].flat(),
	]
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
							<Table>
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
													<Flex
														align='center'
														gap='sm'
													>
														<Avatar
															src={user.image || null}
															size='sm'
														/>
														<Text>{user.name}</Text>
													</Flex>
												</TableTd>
												<TableTd>{user.email}</TableTd>
												<TableTd>
													<Badge
														key={user.id}
														color={getRoleColor(user.role)}
														style={{ minWidth: 70 }}
													>
														{user.role}
													</Badge>
												</TableTd>
												<TableTd>{user?.workshopsHosted?.length}</TableTd>
												<TableTd>{user?.workshopsParticipated?.length}</TableTd>
												<TableTd>
													<Box
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
													</Box>
												</TableTd>
												{userRole === 'ADMIN' && (
													<TableTd>
														<ButtonGroup
															user={user}
															key={user.id}
														/>
													</TableTd>
												)}
											</TableTr>
										)
									})}
								</TableTbody>
							</Table>
						</Box>
					</GridCol>

					{!!data?.users.length && (
						<GridCol>
							<Flex
								align='center'
								gap='sm'
							>
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

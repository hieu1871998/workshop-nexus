'use client'

import { KeyboardEvent, memo, useEffect, useMemo, useState } from 'react'
import LoadingPage from '@app/[locale]/(user)/loading'
import {
	ActionIcon,
	Box,
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
import { useGetAdminUserById, useGetAdminUsers } from '@network/queries'
import EditIcon from '@public/icons/EditIcon'
import SearchIcon from '@public/icons/SearchIcon'
import { AdminUsers } from '@types'

import { useChangeFilter } from './components/useChangeFilter'

const HEAD = ['Name', 'Email', '']

const AdminUserDetail = () => {
	const [payload, setPayload] = useChangeFilter()
	const [search, setSearch] = useState('')
	const id = 'ádf'

	const { data, isLoading, isFetching, refetch } = useGetAdminUserById(id)

	console.log(data)

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
	}

	useEffect(() => {
		void refetch()
	}, [refetch, payload])

	if (isLoading || isFetching) return <LoadingPage />

	return (
		<section>
			<div>ádf</div>
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

export default AdminUserDetail

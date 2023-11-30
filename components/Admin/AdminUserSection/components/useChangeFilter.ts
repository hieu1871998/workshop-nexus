import { useState } from 'react'
import { BaseListPayload, GetAdminUsersPayload } from '@types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const PAGE_SIZE = 10
const START_PAGE = 1

export const useChangeFilter = (): [GetAdminUsersPayload, (filter: BaseListPayload) => void] => {
	const params = useSearchParams()
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const query = params.get('query') || ''
	const page = Number(params.get('page') || START_PAGE)
	const limit = Number(params.get('limit') || PAGE_SIZE)
	const orderBy = params.get('orderBy') || 'createdAt'
	const des = params.get('sortBy') || 'desc'

	const [filter, setFilter] = useState<GetAdminUsersPayload>({
		query,
		page: page,
		pageSize: limit,
		orderBy,
		orderDirection: des,
	})

	const handleChangeFilter = (filters: BaseListPayload) => {
		const newFiler: GetAdminUsersPayload = {}
		const params = new URLSearchParams(searchParams)

		if (filters.query) {
			newFiler.query = filters.query
			params.set('query', filters.query)
		} else {
			params.delete('query')
		}
		if (filters.page) {
			newFiler.page = filters.page
			params.set('page', filters.page.toString())
		} else {
			params.delete('page')
		}
		if (filters.pageSize) {
			newFiler.pageSize = filters.pageSize
			params.set('pageSize', filters.pageSize.toString())
		} else {
			params.delete('pageSize')
		}
		if (filters.orderBy) {
			newFiler.orderBy = filters.orderBy
			params.set('orderBy', filters.orderBy)
		} else {
			params.delete('orderBy')
		}
		if (filters.orderDirection) {
			newFiler.orderDirection = filters.orderDirection
			params.set('orderDirection', filters.orderDirection)
		} else {
			params.delete('orderDirection')
		}
		if (filters.cursor) {
			newFiler.cursor = filters.cursor
			params.set('cursor', filters.cursor)
		} else {
			params.delete('cursor')
		}

		router.push(`${pathname}?${params.toString()}`)

		setFilter(newFiler)
	}

	return [filter, handleChangeFilter]
}

import { ApiRoute } from '@constants'
import { fetcher } from '@network/utils/fetcher'
import {
	AdminUsers,
	AdminUsersResponse,
	GetAdminUsersPayload,
	GetUserWorkshopPayload,
	UserWithProfile,
	WorkshopWithCategoryAndTags,
} from '@types'

export const getUserProfile = (id: string) => {
	return fetcher<UserWithProfile>(`${ApiRoute.USER}/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getUserWorkshops = (payload: GetUserWorkshopPayload) => {
	return fetcher<WorkshopWithCategoryAndTags>(`${ApiRoute.USER_WORKSHOP}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
}

export const getAdminUsers = async (payload: GetAdminUsersPayload) => {
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/users?${queryParams.toString()}`

	return fetcher<AdminUsersResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateAdminUsers = async (id: string, payload: AdminUsers) => {
	const url = `/api/admin/users/${id}`

	return fetcher<AdminUsersResponse>(url, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

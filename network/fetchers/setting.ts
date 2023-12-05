import { fetcher } from '@network/utils/fetcher'
import {
	AdminCategory,
	AdminCategoryResponse,
	AdminUserTagsResponse,
	AdminWorkshopTagsResponse,
	GetAdminCategoriesPayload,
	GetAdminUserTagsPayload,
	GetAdminWorkshopTagsPayload,
} from '@types'

export const getAdminUserTags = async (payload: GetAdminUserTagsPayload) => {
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/settings/user_tags?${queryParams.toString()}`

	return fetcher<AdminUserTagsResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getAdminWorkshopTags = async (payload: GetAdminWorkshopTagsPayload) => {
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/settings/workshop_tags?${queryParams.toString()}`

	return fetcher<AdminWorkshopTagsResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getAdminCategories = async (payload: GetAdminCategoriesPayload) => {
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/settings/categories?${queryParams.toString()}`

	return fetcher<AdminCategoryResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateAdminCategory = async (payload: AdminCategory) => {
	const url = `/api/admin/settings/category/${payload.id}`

	return fetcher<AdminCategory>(url, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

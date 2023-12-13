import { SettingForm } from '@components/Admin/AdminSettingSection/AdminTagModal'
import { fetcher } from '@network/utils/fetcher'
import {
	AdminCategory,
	AdminCategoryResponse,
	AdminUserTag,
	AdminUserTagsResponse,
	AdminWorkshopTag,
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

export const updateAdminUserTag = async (payload: AdminUserTag) => {
	const url = `/api/admin/settings/user_tags/${payload.id}`

	return fetcher<AdminUserTag>(url, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateAdminWorkshopTag = async (payload: AdminWorkshopTag) => {
	const url = `/api/admin/settings/workshop_tags/${payload.id}`

	return fetcher<AdminWorkshopTag>(url, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateAdminCategory = async (payload: AdminCategory) => {
	const url = `/api/admin/settings/categories/${payload.id}`

	return fetcher<AdminCategory>(url, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const createAdminUserTag = async (payload: SettingForm) => {
	const url = `/api/admin/settings/user_tags`

	return fetcher<AdminUserTag>(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const createAdminWorkshopTag = async (payload: SettingForm) => {
	const url = `/api/admin/settings/workshop_tags`

	return fetcher<AdminWorkshopTag>(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const createAdminCategory = async (payload: SettingForm) => {
	const url = `/api/admin/settings/categories`

	return fetcher<AdminUserTag>(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteAdminUserTag = async (id: string) => {
	const url = `/api/admin/settings/user_tags/${id}`

	return fetcher<void>(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteAdminWorkshopTag = async (id: string) => {
	const url = `/api/admin/settings/workshop_tags/${id}`

	return fetcher<void>(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteAdminCategory = async (id: string) => {
	const url = `/api/admin/settings/categories/${id}`

	return fetcher<void>(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

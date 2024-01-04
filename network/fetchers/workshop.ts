import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { WorkshopDetail } from '@app/api/workshop/[slug]/route'
import { CategoryWithCount } from '@app/api/workshop/category/route'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { WorkshopTagWithCount } from '@app/api/workshop/tag/route'
import { fetcher } from '@network/utils/fetcher'
import { Category, Workshop, WorkshopTag } from '@prisma/client'
import {
	AdminWorkshopResponse,
	BaseListPayload,
	GetAdminWorkshopParams,
	GetWorkshopParams,
	WorkshopApplyPayload,
	WorkshopUpdatePayload,
} from '@types'

export const fetchWorkshopCategories = async (params?: BaseListPayload) => {
	const searchParams = new URLSearchParams((params as Record<string, string>) ?? {})

	return fetcher<CategoryWithCount[]>(`/api/workshop/category?${searchParams.toString()}`)
}

export const fetchWorkshops = async (params?: GetWorkshopParams) => {
	const queryParams = new URLSearchParams(params as Record<string, string>)

	return fetcher<WorkshopWithAllFields[]>(`/api/workshop?${queryParams.toString()}`)
}

export const applyWorkshop = async (payload: WorkshopApplyPayload) => {
	return fetcher<Workshop>('/api/workshop/apply', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
}

export const updateWorkshop = async (payload: WorkshopUpdatePayload) => {
	return fetcher<Workshop>('/api/workshop/update', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
}

export const approveWorkshop = async (id: string) => {
	return fetcher<Workshop>(`/api/admin/workshop/${id}/approve`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getWorkshopDetail = async (slug: string) => {
	return fetcher<WorkshopDetail>(`/api/workshop/${slug}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getOtherWorkshops = async (payload: { id: string }) => {
	const params = new URLSearchParams(payload)

	return fetcher<WorkshopDetail[]>(`/api/workshop/others?${params.toString()}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})
}

export const getAdminWorkshops = async (payload?: GetAdminWorkshopParams) => {
	if (payload?.page) {
		payload.page = payload.page - 1
	}
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/workshop?${queryParams.toString()}`

	return fetcher<AdminWorkshopResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getUpcomingWorkshops = async (params?: { pageSize?: number; pageIndex?: number }) => {
	const searchParams = new URLSearchParams(params as Record<string, string>)

	return fetcher<WorkshopWithAllFields[]>(`/api/workshop/upcoming?${searchParams.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getOngoingWorkshops = async (params?: { pageSize?: number; pageIndex?: number }) => {
	const searchParams = new URLSearchParams(params as Record<string, string>)

	return fetcher<WorkshopWithAllFields[]>(`/api/workshop/ongoing?${searchParams.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getWorkshopMetadata = async () => {
	return fetcher<WorkshopMetadata>('/api/workshop/metadata', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})
}

export const publishWorkshop = async (payload: { id?: string }) => {
	return fetcher<boolean>('/api/workshop/publish', {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: { 'Content-Type': 'application/json' },
	})
}

export const cancelWorkshop = async (payload: { id?: string }) => {
	return fetcher(`/api/workshop/cancel`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: { 'Content-Type': 'application/json' },
	})
}

export const draftWorkshop = async (payload: { id?: string }) => {
	return fetcher(`/api/workshop/draft`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: { 'Content-Type': 'application/json' },
	})
}

export const getAdminWorkshopStats = async () => {
	return fetcher<WorkshopStats>('/api/admin/workshop/stats')
}

export const rejectWorkshop = async (id: string) => {
	return fetcher(`/api/admin/workshop/${id}/reject`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const startWorkshop = async (id: string) => {
	return fetcher(`/api/admin/workshop/${id}/start`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const completeWorkshop = async (id: string) => {
	return fetcher(`/api/admin/workshop/${id}/complete`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const createCategory = async (payload: Omit<Category, 'id' | 'createdAt'>) => {
	return fetcher<Category>('/api/admin/workshop/category', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateCategory = async (id: string, payload: Omit<Category, 'id' | 'createdAt'>) => {
	return fetcher<Omit<Category, 'id'>>(`/api/admin/workshop/category/${id}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteCategory = async (id: string) => {
	return fetcher<boolean>(`/api/admin/workshop/category/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getWorkshopTags = async (params?: BaseListPayload) => {
	const searchParams = new URLSearchParams((params as Record<string, string>) ?? {})

	return fetcher<WorkshopTagWithCount[]>(`/api/workshop/tag?${searchParams.toString()}`)
}

export const createWorkshopTag = async (payload: Omit<WorkshopTag, 'id' | 'createdAt'>) => {
	return fetcher<WorkshopTag>('/api/admin/workshop/tag', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateWorkshopTag = async (id: string, payload: Omit<WorkshopTag, 'id' | 'createdAt'>) => {
	return fetcher<Omit<WorkshopTag, 'id'>>(`/api/admin/workshop/tag/${id}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteWorkshopTag = async (id: string) => {
	return fetcher<boolean>(`/api/admin/workshop/tag/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

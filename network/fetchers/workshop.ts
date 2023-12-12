import { WorkshopDetail } from '@app/api/workshop/[slug]/route'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { UpcomingWorkshopDetail } from '@app/api/workshop/upcoming/route'
import { fetcher } from '@network/utils/fetcher'
import { Category, Workshop } from '@prisma/client'
import {
	AdminWorkshopsResponse,
	GetAdminWorkshopsPayload,
	GetWorkshopParams,
	WorkshopApplyPayload,
	WorkshopUpdatePayload,
} from '@types'

export const fetchWorkshopCategories = async () => {
	return fetcher<Category[]>('/api/workshop/category')
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

export const getAdminWorkshops = async (payload: GetAdminWorkshopsPayload) => {
	const queryParams = new URLSearchParams(payload as unknown as Record<string, string>)
	const url = `/api/admin/workshop?${queryParams.toString()}`

	return fetcher<AdminWorkshopsResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getUpcomingWorkshops = async (params?: { pageSize?: number; pageIndex?: number }) => {
	const searchParams = new URLSearchParams(params as Record<string, string>)

	return fetcher<UpcomingWorkshopDetail[]>(`/api/workshop/upcoming?${searchParams.toString()}`, {
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

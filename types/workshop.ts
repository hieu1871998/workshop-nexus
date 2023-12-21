import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { Prisma, WorkshopStatus } from '@prisma/client'

import { BaseListPayload } from './common'

const workshopWithCategoryAndTags = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
	include: {
		category: true,
		tags: true,
		_count: {
			select: { participants: true },
		},
	},
})

export interface WorkshopApplyPayload {
	email: string
	topic: string
	description: string
	requirement?: string
	expectedOutcome?: string
	categoryId: string
	tagIds?: string[]
	maxParticipants: number
	presentationDate: Date
	workshopThumbnailId: string
	duration: number
}

export interface WorkshopUpdatePayload extends WorkshopApplyPayload {
	id: string
}

export type WorkshopWithCategoryAndTags = Prisma.WorkshopGetPayload<typeof workshopWithCategoryAndTags>

export interface AdminWorkshopsResponse {
	hasNextPage: boolean
	nextPage?: number
	total: number
	workshops: AdminWorkshop[]
}

const adminWorkshop = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
	include: {
		category: true,
		tags: true,
		host: true,
		participants: true,
		_count: {
			select: { participants: true },
		},
	},
})

export type AdminWorkshop = Prisma.WorkshopGetPayload<typeof adminWorkshop>

export interface GetAdminWorkshopParams extends GetWorkshopParams {
	status?: WorkshopStatus[]
}

export interface GetWorkshopParams extends BaseListPayload {
	categoryId?: string[]
	tagIds?: number[]
	hostId?: string
	search?: string
	fromDate?: number
	toDate?: number
}

export interface AdminWorkshopResponse {
	workshops: WorkshopWithAllFields[]
	total: number
	nextPageIndex: number
}

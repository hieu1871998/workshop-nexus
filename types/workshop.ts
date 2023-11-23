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
	categoryId: string
	maxParticipants: number
	presentationDate: Date
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

export interface GetAdminWorkshopsPayload extends BaseListPayload {
	status: WorkshopStatus[]
}

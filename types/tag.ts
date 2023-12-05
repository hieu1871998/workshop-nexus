import { Prisma } from '@prisma/client'

import { BaseListPayload } from './common'

export interface AdminUserTagsResponse {
	hasNextPage: boolean
	nextPage?: number
	total: number
	tags: AdminUserTag[]
}

export interface AdminWorkshopTagsResponse {
	hasNextPage: boolean
	nextPage?: number
	total: number
	tags: AdminWorkshopTag[]
}

export interface AdminCategoryResponse {
	hasNextPage: boolean
	nextPage?: number
	total: number
	categories: AdminCategory[]
}

const adminUserTag = Prisma.validator<Prisma.UserTagDefaultArgs>()({})
const adminWorkshopTag = Prisma.validator<Prisma.WorkshopTagDefaultArgs>()({})
const adminCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({})

export type AdminUserTag = Prisma.UserTagGetPayload<typeof adminUserTag>
export type AdminWorkshopTag = Prisma.WorkshopTagGetPayload<typeof adminWorkshopTag>
export type AdminCategory = Prisma.WorkshopTagGetPayload<typeof adminCategory>

export interface GetAdminUserTagsPayload extends BaseListPayload {}
export interface GetAdminWorkshopTagsPayload extends BaseListPayload {}
export interface GetAdminCategoriesPayload extends BaseListPayload {}

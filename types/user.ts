import { Prisma } from '@prisma/client'

import { BaseListPayload } from './common'

const userProfile = Prisma.validator<Prisma.UserDefaultArgs>()({
	include: {
		workshopsHosted: true,
		workshopsParticipated: true,
		tags: true,
	},
})

export type UserWithProfile = Prisma.UserGetPayload<typeof userProfile>

export interface GetUserWorkshopPayload extends BaseListPayload {
	hostId: string
}

export interface AdminUsersResponse {
	hasNextPage: boolean
	nextPage?: number
	total: number
	users: AdminUsers[]
}

const adminUsers = Prisma.validator<Prisma.UserDefaultArgs>()({
	include: {
		tags: true,
		accounts: true,
	},
})

export type AdminUsers = Prisma.UserGetPayload<typeof adminUsers>

export interface GetAdminUsersPayload extends BaseListPayload {}

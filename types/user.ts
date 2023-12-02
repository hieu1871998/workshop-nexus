import { Prisma, Role } from '@prisma/client'

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
		workshopsHosted: true,
		workshopsParticipated: true,
	},
})

export const getRoleColor = (role: Role) => {
	switch (role) {
		case 'USER':
			return 'gray'
		case 'ADMIN':
			return 'blue'
		default:
			return 'gray'
	}
}

export type AdminUsers = Prisma.UserGetPayload<typeof adminUsers>

export interface GetAdminUsersPayload extends BaseListPayload {}

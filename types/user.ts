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

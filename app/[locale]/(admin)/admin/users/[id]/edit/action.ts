'use server'

import prisma from '@lib/prisma'
import { AdminUsers } from '@types'

export interface AdminUserResponse extends AdminUsers {
	_count: {
		workshopsHosted: number
		workshopsParticipated: number
	}
}

export const getAdminUserById = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: { id },
		include: {
			workshopsHosted: {
				take: 10,
			},
			workshopsParticipated: true,
			_count: {
				select: { workshopsHosted: true, workshopsParticipated: true },
			},
		},
	})

	return user as AdminUserResponse
}

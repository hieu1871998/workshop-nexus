'use server'

import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'

export const getAdminUsers = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			role: true,
			emailVerified: true,
			image: true,
			name: true,
			createdAt: true,
			accounts: true,
			sessions: true,
			workshopsHosted: true,
			tags: true,
			workshopsParticipated: true,
		},
	})

	return users
}

export type AdminUsers = Prisma.PromiseReturnType<typeof getAdminUsers>

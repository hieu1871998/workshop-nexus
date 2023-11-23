'use server'

import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'

export const getDashboardWorkshops = async () => {
	const workshops = await prisma.workshop.findMany({
		select: {
			id: true,
			topic: true,
			description: true,
			host: true,
			presentationDate: true,
			status: true,
			createdAt: true,
			submissionDate: true,
			approvalDate: true,
			startDate: true,
			completionDate: true,
		},
	})

	return workshops
}

export type DashboardWorkshops = Prisma.PromiseReturnType<typeof getDashboardWorkshops>

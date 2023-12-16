'use server'

import prisma from '@lib/prisma'
import { UserWithProfile, WorkshopUpdatePayload } from '@types'

export const getUser = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: { id },
		include: {
			workshopsHosted: true,
			workshopsParticipated: true,
			tags: true,
		},
	})

	return user as UserWithProfile
}

export const getWorkshops = async (hostId: string) => {
	const workshops = await prisma.workshop.findMany({
		where: {
			hostId,
		},
		include: {
			category: true,
			host: true,
			participants: true,
			tags: true,
			workshopAttachment: true,
			workshopThumbnail: true,
			_count: {
				select: {
					participants: true,
					tags: true,
					workshopAttachment: true,
				},
			},
		},
	})

	return workshops
}

export const updateWorkshop = async (data: WorkshopUpdatePayload) => {
	const workshop = await prisma.workshop.update({
		where: {
			id: data.id,
		},
		data: {
			description: data.description,
			maxParticipants: data.maxParticipants,
			presentationDate: data.presentationDate,
			topic: data.topic,
			categoryId: data.categoryId,
		},
	})

	return workshop
}

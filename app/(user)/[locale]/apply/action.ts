'use server'

import prisma from '@lib/prisma'
import { WorkshopApplyPayload } from '@types'

export const applyWorkshop = async (data: WorkshopApplyPayload) => {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	})

	if (user) {
		const workshop = await prisma.workshop.create({
			data: {
				description: data.description,
				maxParticipants: data.maxParticipants,
				presentationDate: data.presentationDate,
				topic: data.topic,
				categoryId: data.categoryId,
				hostId: user.id,
				workshopThumbnailId: data.thumbnailId,
			},
		})

		// await prisma.user.update({
		//   where: {
		//     email: data.email
		//   },
		//   data: {
		//     workshopsHosted: {
		//       connect: workshop
		//     }
		//   },
		// })

		return workshop
	}
}

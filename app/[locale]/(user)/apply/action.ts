'use server'

import prisma from '@lib/prisma'
import { WorkshopApplyPayload } from '@types'
import { convertToSlug } from '@utils'

export const applyWorkshop = async (data: WorkshopApplyPayload) => {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	})

	if (user) {
		const workshop = await prisma.workshop.create({
			data: {
				hostId: user.id,
				slug: convertToSlug(data.topic),
				workshopThumbnailId: data.thumbnailId,
				...data,
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

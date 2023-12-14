'use server'

import prisma from '@lib/prisma'
import { WorkshopApplyPayload } from '@types'
import { convertToSlug } from '@utils'
import { list } from '@vercel/blob'
import { omit } from 'lodash'

export const applyWorkshop = async (data: WorkshopApplyPayload) => {
	const blobs = await list()
	console.log('blobs: ', blobs)
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	})

	const tags = await prisma.workshopTag.findMany({
		where: {
			id: {
				in: data.tagIds,
			},
		},
	})

	if (user) {
		const workshop = await prisma.workshop.create({
			data: {
				hostId: user.id,
				slug: convertToSlug(data.topic),
				tags: {
					connect: tags,
				},
				...omit(data, ['email', 'tagIds']),
			},
		})

		await prisma.user.update({
			where: {
				email: data.email,
			},
			data: {
				workshopsHosted: {
					connect: workshop,
				},
			},
		})

		return workshop
	}
}

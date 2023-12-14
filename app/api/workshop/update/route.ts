import prisma from '@lib/prisma'
import { WorkshopUpdatePayload } from '@types'
import { omit } from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest) => {
	try {
		const payload = (await request.json()) as WorkshopUpdatePayload

		const data = await prisma.workshop.update({
			where: {
				id: payload.id,
			},
			data: {
				...omit(payload, ['email', 'categoryId', 'thumbnailId']),
				description: payload.description,
				maxParticipants: payload.maxParticipants,
				presentationDate: payload.presentationDate,
				topic: payload.topic,
				categoryId: payload.categoryId,
				workshopThumbnailId: payload.workshopThumbnailId,
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

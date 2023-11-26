import prisma from '@lib/prisma'
import { WorkshopApplyPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
	try {
		const data = (await request.json()) as WorkshopApplyPayload

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

			return NextResponse.json({ data: workshop }, { status: 201 })
		} else {
			return NextResponse.json({ error: 'Cannot get current user' }, { status: 500 })
		}
	} catch (error) {
		console.error('Error posting new workshop: ', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

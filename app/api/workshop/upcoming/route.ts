import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

const getUpcomingWorkshops = async () =>
	await prisma.workshop.findFirst({
		where: {
			presentationDate: {
				gt: new Date(),
			},
		},
		include: {
			category: true,
			host: {
				include: {
					tags: true,
					workshopsHosted: true,
					workshopsParticipated: true,
				},
			},
			workshopThumbnail: true,
			tags: true,
			_count: {
				select: {
					participants: true,
				},
			},
		},
		take: 10,
		orderBy: {
			presentationDate: 'desc',
		},
	})

export const GET = async () => {
	try {
		const data = await prisma.workshop.findMany({
			where: {
				presentationDate: {
					gt: new Date(),
				},
			},
			include: {
				category: true,
				host: {
					include: {
						tags: true,
						workshopsHosted: true,
						workshopsParticipated: true,
					},
				},
				tags: true,
				workshopThumbnail: true,
				_count: {
					select: {
						participants: true,
					},
				},
			},
			take: 10,
			orderBy: {
				presentationDate: 'desc',
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export type UpcomingWorkshopDetail = Prisma.PromiseReturnType<typeof getUpcomingWorkshops>

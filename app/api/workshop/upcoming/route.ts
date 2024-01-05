import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const getUpcomingWorkshops = async ({ pageIndex = 0, pageSize = 10 }: { pageSize?: number; pageIndex?: number }) =>
	await prisma.workshop.findFirst({
		where: {
			presentationDate: {
				gt: new Date(),
			},
			status: 'APPROVED',
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
		take: pageSize,
		skip: pageIndex * pageSize,
		orderBy: {
			presentationDate: 'desc',
		},
	})

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url)
	const pageIndex = searchParams.get('pageIndex')
	const pageSize = searchParams.get('pageSize')

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
			take: pageSize ? parseInt(pageSize) : 10,
			skip: (pageIndex ? parseInt(pageIndex) : 0) * (pageSize ? parseInt(pageSize) : 10),
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

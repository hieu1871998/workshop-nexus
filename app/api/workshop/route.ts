import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { GetWorkshopParams } from '@types'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

const getWorkshops = async (_: GetWorkshopParams) => {
	const workshops = await prisma.workshop.findFirst({
		// where: {
		// 	categoryId,
		// 	hostId,
		// 	presentationDate: {
		// 		gt: fromDate,
		// 		lt: toDate,
		// 	},
		// 	topic: {
		// 		search,
		// 	},
		// 	description: {
		// 		search,
		// 	},
		// 	requirement: {
		// 		search,
		// 	},
		// 	tags: {
		// 		every: {
		// 			id: { in: tagIds },
		// 		},
		// 	},
		// },
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

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl

	const categoryId = searchParams.get('categoryId')
	const fromDate = searchParams.get('fromDate')
	const hostId = searchParams.get('hostId') ?? ''
	const search = searchParams.get('search') ? (searchParams.get('search') ?? '').replace(' ', ' | ') : undefined
	const tagIds = searchParams.get('tagIds') ? searchParams.get('tagIds')?.split(',') : undefined
	const toDate = searchParams.get('toDate')

	try {
		const data = await prisma.workshop.findMany({
			where: {
				categoryId: {
					in: categoryId ? categoryId.toString().split(',') : undefined,
				},
				hostId: {
					in: hostId ? hostId.split(',') : undefined,
				},
				presentationDate: {
					lte: toDate ? dayjs(parseInt(toDate)).toDate() : undefined,
					gte: fromDate ? dayjs(parseInt(fromDate)).toDate() : undefined,
				},
				topic: {
					search,
				},
				description: {
					search,
				},
				requirement: {
					search,
				},
				tags: {
					every: {
						id: {
							in: tagIds,
						},
					},
				},
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

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('Error getting workshops: ', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

export type WorkshopWithAllFields = Prisma.PromiseReturnType<typeof getWorkshops>

import prisma from '@lib/prisma'
import { WorkshopStatus } from '@prisma/client'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl

	const categoryId = searchParams.get('categoryId')
	const fromDate = searchParams.get('fromDate')
	const hostId = searchParams.get('hostId') ?? ''
	const search = searchParams.get('search') ? (searchParams.get('search') ?? '').replace(' ', ' | ') : undefined
	const tagIds = searchParams.get('tagIds') ? searchParams.get('tagIds')?.split(',') : undefined
	const toDate = searchParams.get('toDate')
	const status = searchParams.get('status')
	const page = parseInt(searchParams.get('page') ?? '0')
	const pageSize = parseInt(searchParams.get('pageSize') ?? '20')
	const orderBy = searchParams.get('orderBy') ?? 'createdAt'
	const orderDirection = searchParams.get('orderDirection') ?? 'desc'

	try {
		const workshops = await prisma.workshop.findMany({
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
				status: {
					in: status ? (status.split(',') as WorkshopStatus[]) : undefined,
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
			orderBy: {
				[orderBy]: orderDirection,
			},
			take: pageSize,
			skip: page * pageSize,
		})
		const total = await prisma.workshop.count()
		const nextPageIndex = page + 1

		return NextResponse.json(
			{
				data: {
					workshops,
					total,
					nextPageIndex,
				},
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error getting workshops: ', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

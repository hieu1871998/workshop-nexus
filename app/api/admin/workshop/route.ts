import prisma from '@lib/prisma'
import { WorkshopStatus } from '@prisma/client'
import { BaseListPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 0
const DEFAULT_ORDER_BY = 'createdAt'
const DEFAULT_ORDER_DIRECTION = 'desc'

interface GetAdminWorkshopsRequest extends BaseListPayload {
	status: string
}

const getAdminWorkshops = async (payload: GetAdminWorkshopsRequest) => {
	const {
		orderBy = DEFAULT_ORDER_BY,
		orderDirection = DEFAULT_ORDER_DIRECTION,
		page = DEFAULT_PAGE,
		pageSize = DEFAULT_PAGE_SIZE,
		status,
	} = payload

	const workshops = await prisma.workshop.findMany({
		where: {
			status: {
				in: status.split(',') as WorkshopStatus[],
			},
		},
		include: {
			category: true,
			tags: true,
			host: true,
			participants: true,
			_count: {
				select: { participants: true },
			},
		},
		skip: (pageSize ?? DEFAULT_PAGE_SIZE) * (page ?? DEFAULT_PAGE),
		take: pageSize,
		orderBy: {
			[orderBy]: orderDirection,
		},
	})

	const total = await prisma.workshop.count()

	const hasNextPage = workshops.length >= pageSize
	const nextPage = hasNextPage ? page + 1 : undefined

	return {
		workshops,
		total,
		hasNextPage,
		nextPage,
	}
}

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url)
	const pageIndexParam = searchParams.get('page') ?? '0'
	const pageSizeParam = searchParams.get('pageSize') ?? '0'
	const page = parseInt(pageIndexParam)
	const pageSize = parseInt(pageSizeParam)
	const orderBy = searchParams.get('orderBy') ?? DEFAULT_ORDER_BY
	const orderDirection = searchParams.get('orderDirection') ?? DEFAULT_ORDER_DIRECTION
	const status = searchParams.get('status') as WorkshopStatus

	try {
		const data = await getAdminWorkshops({
			orderBy,
			orderDirection,
			page,
			pageSize,
			status,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

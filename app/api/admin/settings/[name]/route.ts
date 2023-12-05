import prisma from '@lib/prisma'
import { BaseListPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 0
const DEFAULT_ORDER_BY = 'id'
const DEFAULT_ORDER_DIRECTION = 'desc'

interface GetAdminUsersRequest extends BaseListPayload {}

const getUserTags = async (payload: GetAdminUsersRequest) => {
	const {
		query,
		orderBy = DEFAULT_ORDER_BY,
		orderDirection = DEFAULT_ORDER_DIRECTION,
		page = DEFAULT_PAGE,
		pageSize = DEFAULT_PAGE_SIZE,
	} = payload

	const tags = await prisma.userTag.findMany({
		where: {
			OR: [
				{
					label: {
						contains: query || '',
						mode: 'insensitive',
					},
				},
			],
		},
		skip: (pageSize || DEFAULT_PAGE_SIZE) * (page ? page - 1 : DEFAULT_PAGE),
		take: pageSize || DEFAULT_PAGE_SIZE,
		orderBy: {
			[orderBy]: orderDirection,
		},
	})

	const total = await prisma.userTag.count()

	const hasNextPage = tags.length >= pageSize
	const nextPage = hasNextPage ? page + 1 : undefined

	return {
		tags,
		total,
		hasNextPage,
		nextPage,
	}
}

const getWorkshopTags = async (payload: GetAdminUsersRequest) => {
	const {
		query,
		orderBy = DEFAULT_ORDER_BY,
		orderDirection = DEFAULT_ORDER_DIRECTION,
		page = DEFAULT_PAGE,
		pageSize = DEFAULT_PAGE_SIZE,
	} = payload

	const tags = await prisma.workshopTag.findMany({
		where: {
			OR: [
				{
					label: {
						contains: query || '',
						mode: 'insensitive',
					},
				},
			],
		},
		skip: (pageSize || DEFAULT_PAGE_SIZE) * (page ? page - 1 : DEFAULT_PAGE),
		take: pageSize || DEFAULT_PAGE_SIZE,
		// orderBy: {
		// 	[orderBy]: orderDirection,
		// },
	})

	const total = await prisma.workshopTag.count()

	const hasNextPage = tags.length >= pageSize
	const nextPage = hasNextPage ? page + 1 : undefined

	return {
		tags,
		total,
		hasNextPage,
		nextPage,
	}
}

const getCategories = async (payload: GetAdminUsersRequest) => {
	const { query, orderBy = DEFAULT_ORDER_BY, orderDirection = DEFAULT_ORDER_DIRECTION, page = DEFAULT_PAGE } = payload

	const pageSize = payload.pageSize || DEFAULT_PAGE_SIZE
	const skip = (pageSize || DEFAULT_PAGE_SIZE) * (page ? page - 1 : DEFAULT_PAGE)

	const categories = await prisma.category.findMany({
		where: {
			OR: [
				{
					label: {
						contains: query || '',
						mode: 'insensitive',
					},
				},
			],
		},
		skip: skip,
		take: pageSize,
		// orderBy: {
		// 	[orderBy]: orderDirection,
		// },
	})

	const total = await prisma.category.count()

	const hasNextPage = categories.length >= pageSize
	console.log(categories.length, pageSize)

	const nextPage = hasNextPage ? page + 1 : undefined

	return {
		categories,
		total,
		hasNextPage,
		nextPage,
	}
}

export const GET = async (request: NextRequest, context: { params: { name: string } }) => {
	const { searchParams } = new URL(request.url)
	const name = context.params.name

	const query = searchParams.get('query') || ''
	const pageIndexParam = searchParams.get('page') ?? '0'
	const pageSizeParam = searchParams.get('pageSize') ?? '0'
	const page = parseInt(pageIndexParam)
	const pageSize = parseInt(pageSizeParam)
	const orderBy = searchParams.get('orderBy') ?? DEFAULT_ORDER_BY
	const orderDirection = searchParams.get('orderDirection') ?? DEFAULT_ORDER_DIRECTION

	try {
		if (name === 'user_tags') {
			const data = await getUserTags({
				query,
				orderBy,
				orderDirection,
				page,
				pageSize,
			})

			return NextResponse.json({ data }, { status: 200 })
		} else if (name === 'workshop_tags') {
			const data = await getWorkshopTags({
				query,
				orderBy,
				orderDirection,
				page,
				pageSize,
			})

			return NextResponse.json({ data }, { status: 200 })
		} else {
			const data = await getCategories({
				query,
				orderBy,
				orderDirection,
				page,
				pageSize,
			})

			return NextResponse.json({ data }, { status: 200 })
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

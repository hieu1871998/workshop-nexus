// import { getAdminUsers } from '@network/fetchers'
// import { BaseListPayload } from '@types'
// import { NextRequest, NextResponse } from 'next/server'
// interface GetAdminUsersRequest extends BaseListPayload {}
// const updateAdminUsers = async (payload: GetAdminUsersRequest) => {
// 	const {
// 		query,
// 		orderBy = DEFAULT_ORDER_BY,
// 		orderDirection = DEFAULT_ORDER_DIRECTION,
// 		page = DEFAULT_PAGE,
// 		pageSize = DEFAULT_PAGE_SIZE,
// 	} = payload

// 	const users = await prisma.user.findMany({
// 		where: {
// 			OR: [
// 				{
// 					name: {
// 						contains: query || '',
// 						mode: 'insensitive',
// 					},
// 				},
// 				{
// 					email: {
// 						contains: query || '',
// 						mode: 'insensitive',
// 					},
// 				},
// 			],
// 		},
// 		include: {
// 			accounts: true,
// 		},
// 		skip: (pageSize || DEFAULT_PAGE_SIZE) * (page ? page - 1 : DEFAULT_PAGE),
// 		take: pageSize || DEFAULT_PAGE_SIZE,
// 		orderBy: {
// 			[orderBy]: orderDirection,
// 		},
// 	})

// 	const total = await prisma.user.count()

// 	const hasNextPage = users.length >= pageSize
// 	const nextPage = hasNextPage ? page + 1 : undefined

// 	return {
// 		users,
// 		total,
// 		hasNextPage,
// 		nextPage,
// 	}
// }

// export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
// 	const { searchParams } = new URL(request.url)
// 	const query = searchParams.get('query') || ''
// 	const pageIndexParam = searchParams.get('page') ?? '0'
// 	const pageSizeParam = searchParams.get('pageSize') ?? '0'
// 	const page = parseInt(pageIndexParam)
// 	const pageSize = parseInt(pageSizeParam)
// 	const orderBy = searchParams.get('orderBy') ?? DEFAULT_ORDER_BY
// 	const orderDirection = searchParams.get('orderDirection') ?? DEFAULT_ORDER_DIRECTION

// 	try {
// 		const data = await updateAdminUsers({
// 			query,
// 			orderBy,
// 			orderDirection,
// 			page,
// 			pageSize,
// 		})

// 		return NextResponse.json({ data }, { status: 200 })
// 	} catch (error) {
// 		return NextResponse.json({ error }, { status: 500 })
// 	}
// }

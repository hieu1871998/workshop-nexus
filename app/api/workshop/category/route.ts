import { Category, Prisma } from '@prisma/client'
import { SortOrder } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const getCategories = async () => {
	const data = await prisma?.category.findFirst({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})

	return data
}

export const GET = async (request: NextRequest) => {
	try {
		const searchParams = request.nextUrl.searchParams

		const search = searchParams.get('search')
		const page = parseInt(searchParams.get('page') ?? '0', 10)
		const pageSize = parseInt(searchParams.get('pageSize') ?? '20', 10)
		const orderBy: keyof Category = (searchParams.get('orderBy') as keyof Category) ?? 'createdAt'
		const orderDirection: keyof typeof SortOrder =
			(searchParams.get('orderDirection') as keyof typeof SortOrder) ?? 'desc'

		const data = await prisma?.category.findMany({
			where: {
				label: { search: search ? search : undefined },
			},
			include: {
				_count: {
					select: {
						workshops: true,
					},
				},
			},
			take: pageSize,
			skip: page * pageSize,
			orderBy: {
				[orderBy]: orderDirection,
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

export type CategoryWithCount = Prisma.PromiseReturnType<typeof getCategories>

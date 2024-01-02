import prisma from '@lib/prisma'
import { Prisma, WorkshopTag } from '@prisma/client'
import { SortOrder } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const getWorkshopTag = async () => {
	const tag = await prisma.workshopTag.findFirst({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})

	return tag
}

export const GET = async (request: NextRequest) => {
	try {
		const searchParams = request.nextUrl.searchParams

		const search = searchParams.get('search')
		const page = parseInt(searchParams.get('page') ?? '0', 10)
		const pageSize = parseInt(searchParams.get('pageSize') ?? '20', 10)
		const orderBy: keyof WorkshopTag = (searchParams.get('orderBy') as keyof WorkshopTag) ?? 'createdAt'
		const orderDirection: keyof typeof SortOrder =
			(searchParams.get('orderDirection') as keyof typeof SortOrder) ?? 'desc'

		const data = await prisma.workshopTag.findMany({
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

export type WorkshopTagWithCount = Prisma.PromiseReturnType<typeof getWorkshopTag>

import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const getWorkshopDetail = async (slug: string) => {
	const data = await prisma.workshop.findUnique({
		where: { slug },
		include: {
			category: true,
			host: true,
			participants: true,
			tags: true,
			_count: {
				select: { participants: true },
			},
		},
	})

	return data
}

export const GET = async (_: NextRequest, context: { params: { slug: string } }) => {
	const { slug } = context.params

	try {
		const data = await prisma.workshop.findUnique({
			where: { slug },
			include: {
				category: true,
				host: true,
				participants: true,
				tags: true,
				_count: { select: { participants: true } },
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

export type WorkshopDetail = Prisma.PromiseReturnType<typeof getWorkshopDetail>

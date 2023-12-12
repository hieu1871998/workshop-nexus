import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

const getMetadata = async () => {
	const users = await prisma.user.findMany({
		include: {
			_count: {
				select: {
					workshopsHosted: true,
				},
			},
		},
	})
	const categories = await prisma.category.findMany({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})
	const tags = await prisma.workshopTag.findMany({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})

	const data = {
		users,
		categories,
		tags,
	}

	return data
}

export const GET = async () => {
	try {
		const users = await prisma.user.findMany({
			include: {
				_count: {
					select: {
						workshopsHosted: true,
					},
				},
			},
		})
		const categories = await prisma.category.findMany({
			include: {
				_count: {
					select: {
						workshops: true,
					},
				},
			},
		})
		const tags = await prisma.workshopTag.findMany({
			include: {
				_count: {
					select: {
						workshops: true,
					},
				},
			},
		})

		const data = {
			users,
			categories,
			tags,
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('/api/workshop/metadata', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

export type WorkshopMetadata = Prisma.PromiseReturnType<typeof getMetadata>

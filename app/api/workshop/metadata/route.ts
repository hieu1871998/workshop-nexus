import prisma from '@lib/prisma'
import { Prisma, WorkshopStatus } from '@prisma/client'
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
	const statuses = [
		WorkshopStatus.APPROVED,
		WorkshopStatus.CANCELED,
		WorkshopStatus.COMPLETED,
		WorkshopStatus.DRAFT,
		WorkshopStatus.ONGOING,
		WorkshopStatus.PENDING,
		WorkshopStatus.REJECTED,
	]

	const data = {
		users,
		categories,
		tags,
		statuses,
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
		const statuses = [
			WorkshopStatus.APPROVED,
			WorkshopStatus.CANCELED,
			WorkshopStatus.COMPLETED,
			WorkshopStatus.DRAFT,
			WorkshopStatus.ONGOING,
			WorkshopStatus.PENDING,
			WorkshopStatus.REJECTED,
		]

		const data = {
			users,
			categories,
			tags,
			statuses,
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('/api/workshop/metadata', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

export type WorkshopMetadata = Prisma.PromiseReturnType<typeof getMetadata>

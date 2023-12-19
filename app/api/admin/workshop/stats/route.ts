import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { omit, orderBy } from 'lodash'
import { NextResponse } from 'next/server'

export const GET = async () => {
	try {
		const totalWorkshops = await prisma.workshop.count()
		const workshopCounts = await prisma.workshop.groupBy({
			by: ['status'],
			_count: true,
		})

		const totalCategories = await prisma.category.count()
		const categoryCounts = await prisma.category.findMany({
			include: {
				_count: {
					select: {
						workshops: true,
					},
				},
			},
		})

		const totalTags = await prisma.workshopTag.count()
		const tagCounts = await prisma.workshopTag.findMany({
			include: {
				_count: {
					select: {
						workshops: true,
					},
				},
			},
		})

		const data = {
			workshopStats: {
				total: totalWorkshops,
				counts: workshopCounts.map(item => ({
					status: item.status,
					count: item._count,
				})),
			},
			categoryStats: {
				total: totalCategories,
				counts: orderBy(categoryCounts, item => item._count.workshops, 'desc').map(item => ({
					item: omit(item, '_count'),
					count: item._count.workshops,
				})),
			},
			tagStats: {
				total: totalTags,
				counts: orderBy(tagCounts, item => item._count.workshops, 'desc').map(item => ({
					item: omit(item, '_count'),
					count: item._count.workshops,
				})),
			},
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('/admin/workshop/stats', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

const getWorkshopStats = async () => {
	const totalWorkshops = await prisma.workshop.count()
	const workshopCounts = await prisma.workshop.groupBy({
		by: ['status'],
		_count: true,
	})

	const totalCategories = await prisma.category.count()
	const categoryCounts = await prisma.category.findMany({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})

	const totalTags = await prisma.workshopTag.count()
	const tagCounts = await prisma.workshopTag.findMany({
		include: {
			_count: {
				select: {
					workshops: true,
				},
			},
		},
	})

	const data = {
		workshopStats: {
			total: totalWorkshops,
			counts: workshopCounts.map(item => ({
				status: item.status,
				count: item._count,
			})),
		},
		categoryStats: {
			total: totalCategories,
			counts: categoryCounts.map(item => ({
				item: omit(item, '_count'),
				count: item._count.workshops,
			})),
		},
		tagStats: {
			total: totalTags,
			counts: tagCounts.map(item => ({
				item: omit(item, '_count'),
				count: item._count.workshops,
			})),
		},
	}

	return data
}

export type WorkshopStats = Prisma.PromiseReturnType<typeof getWorkshopStats>

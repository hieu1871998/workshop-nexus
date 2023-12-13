import prisma from '@lib/prisma'
import { AdminCategory } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const updateUserTag = async (id: string, data: AdminCategory) => {
	const { color, label, variant } = data
	return await prisma.userTag.update({
		where: {
			id,
		},
		data: {
			color,
			label,
			variant,
		},
	})
}

const updateWorkshopTag = async (id: string, data: AdminCategory) => {
	const { color, label, variant } = data
	return await prisma.workshopTag.update({
		where: {
			id,
		},
		data: {
			color,
			label,
			variant,
		},
	})
}

const updateCategories = async (id: string, data: AdminCategory) => {
	const { color, label, variant } = data
	return await prisma.category.update({
		where: {
			id,
		},
		data: {
			color,
			label,
			variant,
		},
	})
}

export const PUT = async (request: NextRequest, context: { params: { id: string; name: string } }) => {
	const name = context.params.name
	const id = context.params.id

	let data

	try {
		if (name === 'user_tags') {
			const body = (await request.json()) as AdminCategory
			data = await updateUserTag(id, body)
		} else if (name === 'workshop_tags') {
			const body = (await request.json()) as AdminCategory
			data = await updateWorkshopTag(id, body)
		} else if (name === 'categories') {
			const body = (await request.json()) as AdminCategory
			data = await updateCategories(id, body)
		}
		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

export const DELETE = async (_: NextRequest, context: { params: { id: string; name: string } }) => {
	const name = context.params.name
	const id = context.params.id

	let data
	try {
		if (name === 'user_tags') {
			data = await prisma.userTag.delete({
				where: {
					id,
				},
			})
		} else if (name === 'workshop_tags') {
			data = await prisma.workshopTag.delete({
				where: {
					id,
				},
			})
		} else if (name === 'categories') {
			data = await prisma.category.delete({
				where: {
					id,
				},
			})
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

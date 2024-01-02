import prisma from '@lib/prisma'
import { Category } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const payload = (await request.json()) as Omit<Category, 'id'>
		const { id } = params

		const data = await prisma.workshopTag.update({
			where: {
				id,
			},
			data: payload,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('/api/admin/workshop/tag/[id]')
		return NextResponse.json({ error }, { status: 500 })
	}
}

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const { id } = params

		await prisma.workshopTag.delete({
			where: { id },
		})

		return NextResponse.json({ data: true }, { status: 200 })
	} catch (error) {
		console.error('/api/admin/workshop/tag/[id]', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

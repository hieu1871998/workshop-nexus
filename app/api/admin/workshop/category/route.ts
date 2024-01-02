import prisma from '@lib/prisma'
import { Category } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
	try {
		const payload = (await request.json()) as Omit<Category, 'id'>

		const data = await prisma.category.create({
			data: payload,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('/api/admin/workshop/category', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

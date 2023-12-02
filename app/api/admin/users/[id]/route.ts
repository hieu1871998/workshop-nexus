import prisma from '@lib/prisma'
import { AdminUsers } from '@types'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
	const id = context.params.id
	const body = (await request.json()) as AdminUsers

	try {
		const response = await prisma.user.update({
			where: {
				id,
			},
			data: {
				role: body.role,
				tags: {
					set: body.tags,
				},
			},
		})

		return NextResponse.json({ response }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

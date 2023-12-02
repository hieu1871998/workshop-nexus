import prisma from '@lib/prisma'
import { AdminUsers } from '@types'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
	const id = context.params.id
	const body = await request.json()

	console.log(body)

	try {
		const data = await prisma.user.update({
			where: {
				id,
			},
			data: body,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest) => {
	try {
		const { id } = (await request.json()) as { id: string }

		await prisma.workshop.update({
			where: {
				id,
			},
			data: {
				status: 'CANCELED',
			},
		})

		return NextResponse.json({ data: true }, { status: 200 })
	} catch (error) {
		console.error('/workshop/publish', error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

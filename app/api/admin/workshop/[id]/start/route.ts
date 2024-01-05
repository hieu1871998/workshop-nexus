import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (_: NextRequest, context: { params: { id: string } }) => {
	try {
		const { id } = context.params

		const ongoing = await prisma.workshop.findMany({
			where: {
				status: 'ONGOING',
			},
		})

		if (ongoing.length < 3) {
			const data = await prisma.workshop.update({
				where: {
					id,
				},
				data: {
					status: 'ONGOING',
					presentationDate: new Date(),
				},
			})

			return NextResponse.json({ data }, { status: 200 })
		} else {
			return NextResponse.json(
				{ data: { error: 'Maximum ongoing workshop reached, only 3 active workshop at a time.' } },
				{ status: 200 }
			)
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

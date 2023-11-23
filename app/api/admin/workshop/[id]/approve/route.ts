import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (_: NextRequest, context: { params: { id: string } }) => {
	try {
		const { id } = context.params

		const data = await prisma.workshop.update({
			where: {
				id,
			},
			data: {
				status: 'APPROVED',
				approvalDate: new Date(),
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

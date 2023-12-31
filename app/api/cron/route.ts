import prisma from '@lib/prisma'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

export const GET = async () => {
	try {
		await prisma.workshop.updateMany({
			where: {
				presentationDate: { lt: new Date() },
				status: {
					in: ['APPROVED', 'PENDING', 'ONGOING'],
				},
			},
			data: {
				presentationDate: dayjs().add(14, 'day').toDate(),
			},
		})

		return NextResponse.json({ data: true }, { status: 200 })
	} catch (error) {
		console.error(error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

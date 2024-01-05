import prisma from '@lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
	try {
		const data = await prisma.workshop.findMany({
			where: {
				status: 'ONGOING',
			},
			include: {
				_count: {
					select: {
						participants: true,
					},
				},
				category: true,
				host: true,
				participants: true,
				tags: true,
				workshopAttachment: true,
				workshopThumbnail: true,
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error(error)

		return NextResponse.json({ error }, { status: 500 })
	}
}

import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id') as string

		const data = await prisma?.workshop.findMany({
			where: {
				id: { not: id },
				presentationDate: { gt: new Date() },
			},
			include: {
				category: true,
				host: true,
				workshopThumbnail: true,
			},
			orderBy: {
				presentationDate: 'desc',
			},
			take: 3,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

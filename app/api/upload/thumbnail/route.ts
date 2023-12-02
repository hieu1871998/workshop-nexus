import prisma from '@lib/prisma'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	try {
		const { searchParams } = new URL(request.url)
		const filename = searchParams.get('filename')

		const blob = await put(filename ?? 'filename', request.body!, { access: 'public' })

		const data = await prisma.workshopThumbnail.create({
			data: blob,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

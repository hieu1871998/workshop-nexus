import prisma from '@lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
	try {
		const data = await prisma.workshopTag.findMany()

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

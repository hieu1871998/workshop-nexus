import prisma from '@lib/prisma'
import { RegisterPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { email } = (await request.json()) as RegisterPayload
	// const avatar = `https://source.boringavatars.com/beam/120/${firstName}?colors=264653,f4a261,e76f51`

	const exists = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (exists) {
		return NextResponse.json({ error: 'User already exists' }, { status: 400 })
	} else {
		const user = await prisma.user.create({
			data: {
				email,
				image: '',
				name: email,
			},
		})

		return NextResponse.json(user)
	}
}

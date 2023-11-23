import prisma from '@lib/prisma'
import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const { email, password, firstName, lastName } = await request.json()
	const avatar = `https://source.boringavatars.com/beam/120/${firstName}?colors=264653,f4a261,e76f51`

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
				// password: await hash(password, 10),
				// firstName,
				// lastName,
				// avatar
			},
		})

		return NextResponse.json(user)
	}
}

import { KNOCK_WORKFLOW, KnockNotificationType } from '@constants/knock'
import { Knock } from '@knocklabs/node'
import { authOptions } from '@lib/auth'
import prisma from '@lib/prisma'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

const knockClient = new Knock(process.env.KNOCK_API_KEY)

export const POST = async (request: NextRequest) => {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'You must be logged in ' }, { status: 401 })
		}

		const payload = (await request.json()) as { id: string }

		const participant = (await prisma.user.findUnique({
			where: { id: session.user.id },
		})) as User

		const workshop = await prisma.workshop.findUnique({
			where: {
				id: payload.id,
			},
			include: { participants: true },
		})

		if (workshop) {
			const updatedWorkshop = await prisma.workshop.update({
				where: {
					id: payload.id,
				},
				data: {
					participants: {
						set: [participant, ...workshop.participants],
					},
				},
			})

			await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
				recipients: [workshop.hostId],
				actor: participant.id,
				data: {
					type: KnockNotificationType.Attend,
				},
			})

			return NextResponse.json({ data: updatedWorkshop }, { status: 200 })
		}

		return NextResponse.json({ error: 'Cannot find workshop or participant ' }, { status: 500 })
	} catch (error) {
		console.error('error at /api/workshop/attend: ', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

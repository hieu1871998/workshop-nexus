import { KNOCK_WORKFLOW, KnockNotificationType } from '@constants/knock'
import { Knock } from '@knocklabs/node'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const knockClient = new Knock(process.env.KNOCK_API_KEY)

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
				include: {
					participants: true,
				},
			})

			await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
				recipients: data.participants.map(participant => participant.id),
				actor: data.hostId,
				data: {
					type: KnockNotificationType.Ongoing,
					workshop: data.topic,
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

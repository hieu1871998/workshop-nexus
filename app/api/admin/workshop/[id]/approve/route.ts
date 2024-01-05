import { KNOCK_WORKFLOW, KnockNotificationType } from '@constants/knock'
import { Knock } from '@knocklabs/node'
import { authOptions } from '@lib/auth'
import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

const knockClient = new Knock(process.env.KNOCK_API_KEY)

export const PUT = async (_: NextRequest, context: { params: { id: string } }) => {
	try {
		const session = await getServerSession(authOptions)
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

		await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
			recipients: [data.hostId],
			actor: session?.user.id ?? '',
			data: {
				type: KnockNotificationType.Approved,
				workshop: data.topic,
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

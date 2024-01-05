import { Knock } from '@knocklabs/node'
import { KnockNotifyPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

const knockClient = new Knock(process.env.KNOCK_API_KEY)

const KNOCK_WORKFLOW = 'in-app'

export const POST = async (request: NextRequest) => {
	try {
		const { message, showToast, userId, tenant } = (await request.json()) as KnockNotifyPayload

		await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
			recipients: [userId],
			actor: userId,
			tenant,
			data: {
				message,
				showToast,
			},
		})

		return NextResponse.json({ error: null }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

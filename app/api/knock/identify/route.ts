import { Knock } from '@knocklabs/node'
import { KnockIdentifyPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const knockClient = new Knock(process.env.KNOCK_API_KEY)

export const POST = async (request: NextRequest) => {
	try {
		const { name, id, email, avatar } = (await request.json()) as KnockIdentifyPayload
		const userId = id ?? uuidv4()

		const knockUser = await knockClient.users.identify(userId, {
			name,
			email,
			avatar,
		})

		return NextResponse.json({ error: null, user: knockUser })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

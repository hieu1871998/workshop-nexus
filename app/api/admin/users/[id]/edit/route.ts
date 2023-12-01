import prisma from '@lib/prisma'
import { BaseListPayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'

interface GetAdminUsersRequest extends BaseListPayload {}

const getAdminUserById = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	})

	if (!user) {
		throw new Error('User not found')
	}

	return user
}

const updateAdminUsers = async (payload: GetAdminUsersRequest) => {
	const users = await prisma.user.findMany({
		include: {
			accounts: true,
		},
	})

	const total = await prisma.user.count()

	return {
		users,
		total,
	}
}

export const GET = async (_: NextRequest, context: { params: { id: string } }) => {
	console.log(context)

	try {
		const data = await getAdminUserById(context.params.id)

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get('query') || ''
	const pageIndexParam = searchParams.get('page') ?? '0'
	const pageSizeParam = searchParams.get('pageSize') ?? '0'
	const page = parseInt(pageIndexParam)
	const pageSize = parseInt(pageSizeParam)

	try {
		const data = await updateAdminUsers({
			query,
			page,
			pageSize,
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

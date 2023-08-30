import prisma from '@lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (_: Request, { params }: { params: { id: string, },}) => {
  console.log('params: ', params)
  const { id } = params
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        workshopsHosted: true,
        workshopsParticipated: true,
        tags: true
      }
    })

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

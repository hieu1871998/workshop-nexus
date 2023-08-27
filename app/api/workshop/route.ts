import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const data = await prisma?.workshop.findMany()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error getting workshops: ', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

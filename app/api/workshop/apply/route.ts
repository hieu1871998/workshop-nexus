import { NextResponse } from 'next/server'
import prisma from '@lib/prisma'

export const POST = async (request: Request) => {
  const data = await request.json() as unknown
  console.log('workshop apply request: ', data)

  const workshop = await prisma.workshop.create({
    data: {
      description: 'Description',
      maxParticipants: 1,
      presentationDate: new Date(),
      topic: 'Topic',
      categoryId: '',
      hostId: ''
    }
  })

  return NextResponse.json({ data: workshop })
}

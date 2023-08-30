import { WorkshopUpdatePayload } from '@types'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@lib/prisma'

export const PUT = async (request: NextRequest) => {
  try {
    const payload = await request.json() as WorkshopUpdatePayload

    const data = await prisma.workshop.update({
      where: {
        id: payload.id,
      },
      data: {
        description: payload.description,
        maxParticipants: payload.maxParticipants,
        presentationDate: payload.presentationDate,
        topic: payload.topic,
        categoryId: payload.categoryId,
      }
    })

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

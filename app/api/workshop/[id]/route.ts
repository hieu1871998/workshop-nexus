import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const getWorkshopDetail = async (id: string) => {
  const data = await prisma.workshop.findUnique({
    where: { id },
    include: {
      category: true,
      host: true,
      participants: true,
      tags: true
    }
  })

  return data
}

export const GET = async (_: NextRequest, context: { params: { id: string } }) => {
  const { id } = context.params
  console.log('id: ', id)

  try {
    const data = await prisma.workshop.findUnique({
      where: { id },
      include: {
        category: true,
        host: true,
        participants: true,
        tags: true,
        _count: { select: { participants: true }}
      }
    })

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export type WorkshopDetail = Prisma.PromiseReturnType<typeof getWorkshopDetail>

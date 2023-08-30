import prisma from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const hostId = searchParams.get('hostId') as string
  const pageIndexParam = searchParams.get('pageIndex') ?? '0'
  const pageSizeParam = searchParams.get('pageSize') ?? '0'
  const pageIndex = parseInt(pageIndexParam)
  const pageSize = parseInt(pageSizeParam)

  try {
    const data = await prisma.workshop.findMany({
      where: {
        hostId
      },
      include: {
        category: true,
        tags: true,
        _count: {
          select: { participants: true }
        }
      },
      skip: (pageSize ?? 0) * (pageIndex ?? 0),
      take: pageSize
    })

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

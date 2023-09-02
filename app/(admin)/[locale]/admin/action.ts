'use server'

import prisma from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { map, orderBy } from 'lodash'

export const getWorkshopCounts = async () => {
  const counts = await prisma.workshop.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  })
  const total = await prisma.workshop.count()

  const statuses = orderBy(map(counts, ({ status, _count }) => ({
    name: status,
    value: _count.status
  })), 'value', 'desc')

  return {
    total,
    statuses
  }
}

export type WorkshopCounts = Prisma.PromiseReturnType<typeof getWorkshopCounts>

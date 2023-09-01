'use server'

import prisma from '@lib/prisma'

export const getWorkshopCounts = async () => {
  const total = await prisma.workshop.count()
  const approved = await prisma.workshop.count({
    where: {
      status: 'APPROVED'
    }
  })
  const canceled = await prisma.workshop.count({
    where: {
      status: 'CANCELED'
    }
  })
  const completed = await prisma.workshop.count({
    where: {
      status: 'COMPLETED'
    }
  })
  const ongoing = await prisma.workshop.count({
    where: {
      status: 'ONGOING'
    }
  })
  const pending = await prisma.workshop.count({
    where: {
      status: 'PENDING'
    }
  })
  const rejected = await prisma.workshop.count({
    where: {
      status: 'REJECTED'
    }
  })

  return {
    total,
    approved,
    canceled,
    completed,
    ongoing,
    pending,
    rejected,
  }
}

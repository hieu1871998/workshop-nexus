'use server'

import prisma from '@lib/prisma'
import { UserWithProfile, WorkshopWithCategoryAndTags } from '@types'


export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      workshopsHosted: true,
      workshopsParticipated: true,
      tags: true
    }
  })

  return user as UserWithProfile
}

export const getWorkshops = async (hostId: string) => {
  const workshops = await prisma.workshop.findMany({
    where: {
      hostId
    },
    include: {
      category: true,
      tags: true,
      _count: {
        select: { participants: true }
      }
    }
  })

  return workshops as WorkshopWithCategoryAndTags[]
}

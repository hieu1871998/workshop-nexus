'use server'

import { WorkshopApplyPayload } from '@types'
import prisma from '@lib/prisma'

export const applyWorkshop = async (data: WorkshopApplyPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if (user) {
    const workshop = await prisma.workshop.create({
      data: {
        description: data.description,
        maxParticipants: data.maxParticipants,
        presentationDate: data.presentationDate,
        topic: data.topic,
        categoryId: data.categoryId,
        hostId: user.id
      }
    })

    // await prisma.user.update({
    //   where: {
    //     email: data.email
    //   },
    //   data: {
    //     workshopsHosted: {
    //       connect: workshop
    //     }
    //   },
    // })

    return workshop
  }
}

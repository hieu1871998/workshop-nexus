import { Prisma } from '@prisma/client'

const workshopWithCategoryAndTags = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  include: {
    category: true,
    tags: true,
    _count: {
      select: { participants: true }
    }
  }
})

export interface WorkshopApplyPayload {
  email: string
  topic: string
  description: string
  categoryId: string
  maxParticipants: number
  presentationDate: Date
}

export interface WorkshopUpdatePayload extends WorkshopApplyPayload {
  id: string
}

export type WorkshopWithCategoryAndTags = Prisma.WorkshopGetPayload<typeof workshopWithCategoryAndTags>

import { Prisma } from '@prisma/client'
import { Dayjs } from 'dayjs'

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
  presentationDate: Dayjs
}

export type WorkshopWithCategoryAndTags = Prisma.WorkshopGetPayload<typeof workshopWithCategoryAndTags>

import { Prisma } from '@prisma/client'

const dashboardWorkshop = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  select: {
    id: true,
    topic: true,
    description: true,
    host: true,
    presentationDate: true,
    status: true,
    createdAt: true,
    submissionDate: true,
    approvalDate: true,
    startDate: true,
    completionDate: true,
  }
})

export type DashboardWorkshop = Prisma.WorkshopGetPayload<typeof dashboardWorkshop>

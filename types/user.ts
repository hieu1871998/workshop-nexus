import { Prisma } from '@prisma/client'

const userProfile = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    workshopsHosted: true,
    workshopsParticipated: true,
    tags: true,
  },
})

export type UserWithProfile = Prisma.UserGetPayload<typeof userProfile>

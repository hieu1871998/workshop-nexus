import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

if (process.env.NODE_ENV === 'development') global.prisma = prisma as unknown as PrismaClient

export default prisma

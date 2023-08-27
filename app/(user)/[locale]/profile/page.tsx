import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'
import prisma from '@lib/prisma'

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? ''
    },
    include: {
      workshopsHosted: true
    }
  })

  console.log('user: ', user)

  return (
    <main>

    </main>
  )
}

export default ProfilePage

import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/button'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export const UserSection = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div>
      {user ? (
        <Link href='/apply'>
          <Button
            className='px-10 bg-black text-white'
            radius='full'
            startContent={<ArrowRightIcon className='w-4 h-4 text-white' />}
          >
            Start sharing your knowlegde
          </Button>
        </Link>
      ) : (
        <Link href='/signin'>
          <Button
            className='px-10 bg-black text-white'
            radius='full'
            startContent={<UserIcon className='w-4 h-4 text-white' />}
          >
            Sign in and start exploring
          </Button>
        </Link>
      )}
    </div>
  )
}

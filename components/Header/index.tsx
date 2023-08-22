import { getServerSession } from 'next-auth'
import { NavigationBar } from './NavigationBar'
import { authOptions } from '@app/api/auth/[...nextauth]/route'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className='sticky top-0 bg-white bg-opacity-90 backdrop-blur-md'>
      <div className='container p-4 mx-auto flex gap-4'>
        <Link href='/'>
          <Image
            className='w-10 h-10'
            src='/logo.svg'
            alt='Header logo'
            width={48}
            height={48}
          />
        </Link>
        <NavigationBar session={session} />
      </div>
    </header>
  )
}

import { getServerSession } from 'next-auth'
import { NavigationBar } from './NavigationBar'
import { authOptions } from '@lib/auth'
import Link from 'next/link'
import { Logo } from '@components/icons/Logo'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className='sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-50'>
      <div className='container px-4 mx-auto flex gap-4'>
        <Link href='/'>
          <div className='p-2 -mx-2 text-gray-900 hover:bg-gray-900 hover:text-white transition-all'>
            <Logo className='w-12 h-12' />
          </div>
        </Link>
        <NavigationBar session={session} />
      </div>
    </header>
  )
}

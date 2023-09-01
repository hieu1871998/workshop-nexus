import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import { AdminNavigationBar } from './AdminNavigationBar'

export const AdminHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className='sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-50 shadow-md shadow-gray-50'>
      <div className='container px-4 mx-auto'>
        <AdminNavigationBar session={session} />
      </div>
    </header>
  )
}

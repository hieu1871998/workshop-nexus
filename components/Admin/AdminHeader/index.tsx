import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { AdminNavigationBar } from './AdminNavigationBar'

export const AdminHeader = async () => {
	const session = await getServerSession(authOptions)

	return (
		<header className='bg-black-haze sticky top-0 z-50 bg-opacity-90 shadow-md shadow-gray-50 backdrop-blur-md'>
			<div className='container mx-auto px-4'>
				<AdminNavigationBar session={session} />
			</div>
		</header>
	)
}

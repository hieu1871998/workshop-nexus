import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { AdminNavigationBar } from './AdminNavigationBar'

export const AdminHeader = async () => {
	const session = await getServerSession(authOptions)

	return (
		<header className='sticky top-0 z-50 border-b bg-white'>
			<div className='container mx-auto px-4'>
				<AdminNavigationBar session={session} />
			</div>
		</header>
	)
}

import { Logo } from '@components/icons/Logo'
import { authOptions } from '@lib/auth'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { NavigationBar } from './NavigationBar'

export const Header = async () => {
	const session = await getServerSession(authOptions)

	return (
		<header className='sticky top-0 z-50 border-b bg-white'>
			<div className='container mx-auto flex gap-4 px-4'>
				<Link href='/'>
					<div className='-mx-2 p-2 text-gray-900 transition-all hover:bg-gray-900 hover:text-white'>
						<Logo className='h-12 w-12' />
					</div>
				</Link>
				<NavigationBar session={session} />
			</div>
		</header>
	)
}

import { Logo } from '@components/icons/Logo'
import { authOptions } from '@lib/auth'
import { calSans } from '@theme/fonts/calsans'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { NavigationBar } from './NavigationBar'

export const Header = async () => {
	const session = await getServerSession(authOptions)

	return (
		<header className='sticky top-0 z-50 border-b bg-white'>
			<div className='container mx-auto flex items-center justify-between gap-4 px-4'>
				<Link href='/'>
					<div className='-mx-2 flex items-center gap-2 p-2'>
						<Logo className='h-10 w-10' />
						<span className={`${calSans.className} text-xl`}>Zenith</span>
					</div>
				</Link>
				<NavigationBar session={session} />
			</div>
		</header>
	)
}

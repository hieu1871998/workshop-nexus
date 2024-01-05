import { Logo } from '@components/icons/Logo'
import { OngoingBanner } from '@components/OngoingBanner'
import { authOptions } from '@lib/auth'
import { getOngoingWorkshops } from '@network/fetchers'
import { calSans } from '@theme/fonts/calsans'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { NavigationBar } from './NavigationBar'

export const Header = async () => {
	const ongoings = await getOngoingWorkshops()
	const session = await getServerSession(authOptions)

	return (
		<header className='sticky top-0 z-50 border-b bg-white'>
			{ongoings && !isEmpty(ongoings) && <OngoingBanner workshops={ongoings} />}
			<div className='container mx-auto flex items-center justify-between gap-4 px-4'>
				<Link href='/'>
					<div className='-mx-2 flex items-center gap-2 p-2'>
						<Logo className='h-10 w-10' />
						<span className={`${calSans.className} text-xl`}>Workshop Nexus</span>
					</div>
				</Link>
				<NavigationBar session={session} />
			</div>
		</header>
	)
}

'use client'

import { UserDropdown } from '@components'
import { calSans } from '@theme/fonts/calsans'
import { Session } from 'next-auth'

export const NavigationBar = ({ session }: { session: Session | null }) => {
	return (
		<div className='flex w-full items-center justify-between'>
			<div className={`${calSans.className} text-xl`}>Zenith</div>
			<UserDropdown session={session} />
		</div>
	)
}

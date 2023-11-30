'use client'

import { UserDropdown } from '@components'
import { Session } from 'next-auth'

export const NavigationBar = ({ session }: { session: Session | null }) => {
	return <div className='flex w-full items-center justify-end'>{session && <UserDropdown session={session} />}</div>
}

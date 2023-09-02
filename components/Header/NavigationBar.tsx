'use client'

import { Session } from 'next-auth'
import { calSans } from '@theme/fonts/calsans'
import { UserDropdown } from '@components'

export const NavigationBar = ({ session }: { session: Session | null }) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className={`${calSans.className} text-xl`}>
        Workshop Nexus
      </div>
      <UserDropdown session={session} />
    </div>
  )
}

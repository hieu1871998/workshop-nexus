'use client'

import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const NavigationBar = ({ session }: { session: Session | null }) => {
  const router = useRouter()

  return (
    <div className='w-full flex justify-between items-center'>
      <div>Workshop Nexus</div>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            src={session?.user?.image ?? ''}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          {session ? (
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>{session?.user?.email}</p>
            </DropdownItem>
          ) : (
            <></>
          )}
          {session ? (
            <DropdownItem
              key='signout'
              color='danger'
              onPress={() => void signOut()}
            >
              Sign out
            </DropdownItem>
          ) : (
            <DropdownItem key='signin' onPress={() => router.push('/signin')}>
              Sign in
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

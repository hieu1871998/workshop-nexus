'use client'

import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { calSans } from '@theme/fonts/calsans'
import Link from 'next/link'

export const NavigationBar = ({ session }: { session: Session | null, }) => {
  const router = useRouter()
  const t = useTranslations('common')

  return (
    <div className='w-full flex justify-between items-center'>
      <div className={`${calSans.className} text-xl`}>
        Workshop Nexus
      </div>
      <Dropdown placement='bottom-end' closeOnSelect={false}>
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
            <DropdownItem key='user' className='h-14 gap-2'>
              <Link href={`/user/${session.user.id}`}>
                <p className='font-semibold'>{t('signedInAs')}</p>
                <p className='font-semibold'>{session?.user?.email}</p>
              </Link>
            </DropdownItem>
          ) : (
            <DropdownItem key='user'>
              <span className='font-semibold'>{t('notSignedIn')}</span>
            </DropdownItem>
          )}
          {session ? (
            <DropdownItem
              key='signout'
              color='danger'
              onPress={() => void signOut({ redirect: true, callbackUrl: '/' })}
            >
              {t('signOut')}
            </DropdownItem>
          ) : (
            <DropdownItem key='signin' onPress={() => router.push('/signin')}>
              {t('signIn')}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

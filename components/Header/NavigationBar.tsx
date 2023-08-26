'use client'

import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { usePathname, useRouter } from 'next/navigation'
import i18nConfig from '../../i18n.json'
import Link from 'next/link'

const { locales } = i18nConfig

export const NavigationBar = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { t, lang } = useTranslation('common')

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale.split('-')[0]
    return segments.join('/')
  }

  return (
    <div className='w-full flex justify-between items-center'>
      <div>Workshop Nexus</div>
      {locales.map(locale => locale !== lang && (
        <Link key={locale} href={redirectedPathName(locale)}>
          <span className='uppercase'>{locale.split('-')[0]}</span>
        </Link>
      ))}
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
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>{session?.user?.email}</p>
            </DropdownItem>
          ) : (
            <DropdownItem key='profile'>
              You are not signed in
            </DropdownItem>
          )}
          {session ? (
            <DropdownItem
              key='signout'
              color='danger'
              onPress={() => void signOut({ redirect: true, callbackUrl: '/' })}
            >
              {t`signOut`}
            </DropdownItem>
          ) : (
            <DropdownItem key='signin' onPress={() => router.push('/signin')}>
              {t`signIn`}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

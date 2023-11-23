'use client'

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

interface UserDropdownProps {
	session: Session | null
}

export const UserDropdown = ({ session }: UserDropdownProps) => {
	const t = useTranslations('common')

	const isAdmin = session?.user.role === 'ADMIN'

	return (
		<Dropdown
			placement='bottom-end'
			closeOnSelect={false}
		>
			<DropdownTrigger>
				<Avatar
					isBordered
					as='button'
					className='transition-transform'
					src={session?.user?.image ?? ''}
				/>
			</DropdownTrigger>
			<DropdownMenu
				aria-label='Profile Actions'
				variant='flat'
				disabledKeys={isAdmin ? [] : ['admin']}
			>
				{session ? (
					<DropdownItem
						key='user'
						className='h-14 gap-2'
						href={`/user/${session.user.id}`}
					>
						<p className='font-semibold'>{t('signedInAs')}</p>
						<p className='font-semibold'>{session?.user?.email}</p>
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
					<DropdownItem
						key='signin'
						href='/signin'
					>
						{t('signIn')}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	)
}

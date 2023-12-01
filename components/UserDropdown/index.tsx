'use client'

import { Avatar, Badge, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
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
		<Menu
			position='bottom-end'
			offset={-8}
		>
			<Menu.Target>
				<UnstyledButton
					style={{
						color: 'var(--mantine-color-text)',
						borderRadius: 'var(--mantine-radius-sm)',
					}}
				>
					<Group>
						<div className='text-right'>
							<Text
								size='sm'
								fw={500}
							>
								{session?.user?.name}
							</Text>
							{isAdmin && <Badge variant='outline'>Admin</Badge>}
						</div>
						<Avatar
							className='transition-transform'
							src={session?.user?.image ?? ''}
						/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					{session ? (
						<>
							<p className='font-semibold'>{t('signedInAs')}</p>
							<p className='font-semibold'>{session?.user?.email}</p>
						</>
					) : (
						<span className='font-semibold'>{t('notSignedIn')}</span>
					)}
				</Menu.Label>
				{session ? (
					<>
						<Menu.Item
							key='profile'
							component={Link}
							href={`/user/${session.user.id}`}
						>
							{t('profile')}
						</Menu.Item>
						<Menu.Item
							key='signout'
							color='red'
							onClick={() => void signOut({ redirect: true, callbackUrl: '/' })}
						>
							{t('signOut')}
						</Menu.Item>
					</>
				) : (
					<Menu.Item
						key='signin'
						color='blue'
						component={Link}
						href='/signin'
					>
						{t('signIn')}
					</Menu.Item>
				)}
			</Menu.Dropdown>
		</Menu>
	)
}

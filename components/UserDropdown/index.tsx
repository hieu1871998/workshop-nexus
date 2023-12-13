'use client'

import { Avatar, Badge, Group, Menu, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

interface UserDropdownProps {
	session: Session | null
}

export const UserDropdown = ({ session }: UserDropdownProps) => {
	const t = useTranslations('common')
	const pathname = usePathname()

	const isAdmin = session?.user.role === 'ADMIN'

	return (
		<Menu
			position='bottom-end'
			trigger='hover'
			radius='lg'
		>
			<Menu.Target>
				<UnstyledButton
					style={{
						color: 'var(--mantine-color-text)',
						borderRadius: 'var(--mantine-radius-sm)',
					}}
				>
					<Group>
						{isAdmin && <Badge variant='outline'>Admin</Badge>}
						<Avatar
							className='transition-transform'
							size='md'
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
							disabled={pathname.includes(`user/${session.user.id}`)}
						>
							{t('profile')}
						</Menu.Item>
						<Menu.Item
							key='apply'
							component={Link}
							href='/workshop/apply'
							disabled={pathname.includes(`apply`)}
						>
							{t('apply')}
						</Menu.Item>
						<Menu.Divider />
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

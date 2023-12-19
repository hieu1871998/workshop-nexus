'use client'

import { Avatar, Badge, Group, MantineColor, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconDiamonds, IconLogin, IconLogout, TablerIconsProps } from '@tabler/icons-react'
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
			trigger='click'
			radius='md'
			width={240}
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
							size='sm'
							src={session?.user?.image ?? ''}
						/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					{session ? (
						<span className='font-semibold'>{session?.user?.email}</span>
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
						{session.user.role === 'ADMIN' && (
							<>
								<Menu.Divider />
								<Menu.Item
									key='admin'
									component={Link}
									href='/admin'
									rightSection={<RightSectionIcon icon={IconDiamonds} />}
								>
									{t('adminDashboard')}
								</Menu.Item>
							</>
						)}
						<Menu.Divider />
						<Menu.Item
							key='signout'
							color='red'
							onClick={() => void signOut({ redirect: true, callbackUrl: '/' })}
							rightSection={
								<RightSectionIcon
									icon={IconLogout}
									color='red'
								/>
							}
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
						rightSection={
							<RightSectionIcon
								icon={IconLogin}
								color='blue'
							/>
						}
					>
						{t('signIn')}
					</Menu.Item>
				)}
			</Menu.Dropdown>
		</Menu>
	)
}

const RightSectionIcon = ({
	icon: Icon,
	color = 'dimmed',
}: {
	icon: (props: TablerIconsProps) => JSX.Element
	color?: MantineColor
}) => {
	return (
		<Text c={color}>
			<Icon className='h-5 w-5' />
		</Text>
	)
}

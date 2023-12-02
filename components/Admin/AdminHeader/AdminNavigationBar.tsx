'use client'

import { UserDropdown } from '@components'
import { Logo } from '@components/icons/Logo'
import { Burger, Group, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

interface AdminNavigationBarProps {
	session: Session | null
}

const links = [
	{ path: '/admin', name: 'Dashboard' },
	{ path: '/admin/workshop', name: 'Workshops' },
	{ path: '/admin/users', name: 'Users' },
]

export const AdminNavigationBar = ({ session }: AdminNavigationBarProps) => {
	const pathname = usePathname()
	const [opened, { toggle }] = useDisclosure(false)

	return (
		<div className='flex w-full items-center justify-between'>
			<div className='-mx-2 p-2 text-gray-900 transition-all hover:bg-gray-900 hover:text-white'>
				<Logo className='h-12 w-12' />
			</div>
			<Group
				gap={20}
				visibleFrom='sm'
			>
				{links.map(link => (
					<Menu
						key={link.path}
						trigger='hover'
						transitionProps={{ exitDuration: 0 }}
						withinPortal
					>
						<Menu.Target>
							<Link
								href={link.path}
								className={`${link.path === pathname ? 'font-bold' : 'rounded p-2 hover:bg-gray-200 '}`}
							>
								{link.name}
							</Link>
						</Menu.Target>
					</Menu>
				))}
			</Group>
			<UserDropdown session={session} />
			<Burger
				opened={opened}
				onClick={toggle}
				size='sm'
				hiddenFrom='sm'
			/>
		</div>
	)
}

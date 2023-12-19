'use client'

import { useState } from 'react'
import { UserDropdown } from '@components'
import { Logo } from '@components/icons/Logo'
import { Group, Tabs } from '@mantine/core'
import { calSans } from '@theme/fonts/calsans'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

interface AdminNavigationBarProps {
	session: Session | null
}

export const AdminNavigationBar = ({ session }: AdminNavigationBarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()

	return (
		<Group justify='space-between'>
			<Link href='/'>
				<div className='-mx-2 flex items-center gap-2 p-2'>
					<Logo className='h-10 w-10' />
					<span className={`${calSans.className} text-xl`}>Workshop Nexus</span>
				</div>
			</Link>
			<Group gap={10}>
				<Tabs
					variant='pills'
					value={pathname}
					classNames={{
						tabLabel: 'font-semibold',
					}}
				>
					<Tabs.List>
						<Link href='/admin'>
							<Tabs.Tab value='/admin'>Dashboard</Tabs.Tab>
						</Link>
						<Link href='/admin/workshop'>
							<Tabs.Tab value='/admin/workshop'>Workshops</Tabs.Tab>
						</Link>
						<Link href='/admin/users'>
							<Tabs.Tab value='/admin/users'>Users</Tabs.Tab>
						</Link>
						<Link href='/admin/settings'>
							<Tabs.Tab value='/admin/settings'>Settings</Tabs.Tab>
						</Link>
					</Tabs.List>
				</Tabs>
				<UserDropdown session={session} />
			</Group>
		</Group>
	)
}

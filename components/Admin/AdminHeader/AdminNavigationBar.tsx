'use client'

import { UserDropdown } from '@components'
import { AppShell, Group, NavLink, ScrollArea, Stack } from '@mantine/core'
import { IconArticle, IconGauge, IconSettings2, IconTags, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

interface AdminNavigationBarProps {
	session: Session | null
}

export const AdminNavigationBar = ({ session }: AdminNavigationBarProps) => {
	const pathname = usePathname()

	const links = [
		{
			href: '/admin/dashboard',
			label: 'Dashboard',
			icon: <IconGauge />,
		},
		{
			href: '/admin/workshop',
			label: 'Workshops',
			icon: <IconArticle />,
		},
		{
			href: '/admin/users',
			label: 'Users',
			icon: <IconUsers />,
		},
		{
			href: '/admin/categories-tags',
			label: 'Categories & Tags',
			icon: <IconTags />,
		},
		{
			href: '/admin/settings',
			label: 'Settings',
			icon: <IconSettings2 />,
		},
	]

	return (
		<>
			<AppShell.Section
				grow
				component={ScrollArea}
			>
				<Stack gap={10}>
					{links.map(link => (
						<NavLink
							key={link.href}
							component={Link}
							variant='filled'
							href={link.href}
							label={link.label}
							leftSection={link.icon}
							active={pathname.startsWith(link.href)}
						/>
					))}
					{/* <Tabs
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
					</Tabs> */}
				</Stack>
			</AppShell.Section>
			<AppShell.Section>
				<Group
					p='md'
					justify='flex-end'
				>
					<UserDropdown session={session} />
				</Group>
			</AppShell.Section>
		</>
	)
}

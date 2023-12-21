'use client'

import { UserDropdown } from '@components'
import { Logo } from '@components/icons/Logo'
import { AppShell, Burger, Group, NavLink, ScrollArea, Stack, Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArticle, IconCategory, IconGauge, IconSettings2, IconTags, IconUsers } from '@tabler/icons-react'
import { calSans } from '@theme/fonts/calsans'
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
			href: '/admin',
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
			href: '/admin/category',
			label: 'Categories',
			icon: <IconCategory />,
		},
		{
			href: '/admin/tag',
			label: 'Tags',
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
							active={pathname === link.href}
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

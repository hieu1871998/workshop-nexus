'use client'

import { AdminNavigationBar } from '@components/Admin/AdminHeader/AdminNavigationBar'
import { Logo } from '@components/icons/Logo'
import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { calSans } from '@theme/fonts/calsans'
import Link from 'next/link'
import { Session } from 'next-auth'

export const AdminShell = ({ session, children }: { session: Session | null; children: React.ReactNode }) => {
	const [opened, { toggle }] = useDisclosure(true)

	return (
		<AppShell
			header={{ height: 56 }}
			navbar={{ width: 208, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
		>
			<AppShell.Header px='md'>
				<Group>
					<Burger
						opened={opened}
						onClick={toggle}
					/>
					<Link href='/'>
						<div className='-mx-2 flex items-center gap-2 p-2'>
							<Logo className='h-10 w-10' />
							<span className={`${calSans.className} text-xl`}>Workshop Nexus</span>
						</div>
					</Link>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar>
				<AdminNavigationBar session={session} />
			</AppShell.Navbar>
			<AppShell.Main className='flex h-full overflow-auto bg-black-haze'>{children}</AppShell.Main>
		</AppShell>
	)
}

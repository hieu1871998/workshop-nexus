'use client'

import { UserDropdown } from '@components'
import { Group, Tabs } from '@mantine/core'
import { IconDiamonds } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

export const NavigationBar = ({ session }: { session: Session | null }) => {
	const pathname = usePathname()

	return (
		<Group justify='space-between'>
			<Tabs
				variant='pills'
				value={pathname}
				classNames={{
					tabLabel: 'font-semibold',
				}}
			>
				<Tabs.List>
					<Link href='/'>
						<Tabs.Tab value='/'>Home</Tabs.Tab>
					</Link>
					<Link href='/workshop/apply'>
						<Tabs.Tab value='/workshop/apply'>Apply</Tabs.Tab>
					</Link>
					<Link href='/workshop/listing'>
						<Tabs.Tab value='/workshop/listing'>Listing</Tabs.Tab>
					</Link>
					{session?.user.role === 'ADMIN' && (
						<Link href='/admin'>
							<Tabs.Tab
								value='/admin'
								leftSection={<IconDiamonds className='h-4 w-4' />}
							>
								Dashboard
							</Tabs.Tab>
						</Link>
					)}
				</Tabs.List>
			</Tabs>
			<UserDropdown session={session} />
		</Group>
	)
}

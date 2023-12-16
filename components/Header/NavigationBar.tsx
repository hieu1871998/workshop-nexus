'use client'

import { UserDropdown } from '@components'
import { Tabs } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

export const NavigationBar = ({ session }: { session: Session | null }) => {
	const pathname = usePathname()

	return (
		<>
			<Tabs
				variant='pills'
				radius='xl'
				value={pathname}
				classNames={{
					tabLabel: 'font-semibold',
				}}
			>
				<Tabs.List>
					<Link href='/workshop/apply'>
						<Tabs.Tab value='/workshop/apply'>Apply</Tabs.Tab>
					</Link>
					<Link href='/workshop/listing'>
						<Tabs.Tab value='/workshop/listing'>Listing</Tabs.Tab>
					</Link>
				</Tabs.List>
			</Tabs>
			<UserDropdown session={session} />
		</>
	)
}

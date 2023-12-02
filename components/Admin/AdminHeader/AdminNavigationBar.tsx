'use client'

import { useState } from 'react'
import { UserDropdown } from '@components'
import { Logo } from '@components/icons/Logo'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from '@nextui-org/react'
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
		<div className='w-full'>
			<Navbar
				maxWidth='2xl'
				classNames={{
					wrapper: 'px-0',
				}}
				onMenuOpenChange={setIsMenuOpen}
			>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<Link href='/admin'>
						<div className='-mx-2 p-2 text-gray-900 transition-all hover:bg-gray-900 hover:text-white'>
							<Logo className='h-12 w-12' />
						</div>
					</Link>
				</NavbarBrand>
				<NavbarContent
					className='hidden gap-5 sm:flex'
					justify='center'
				>
					<NavbarItem isActive={pathname === '/admin'}>
						<Link href='/admin'>Dashboard</Link>
					</NavbarItem>
					<NavbarItem isActive={pathname === '/admin/workshop'}>
						<Link href='/admin/workshop'>Workshops</Link>
					</NavbarItem>
					<NavbarItem isActive={pathname === '/admin/users'}>
						<Link href='/admin/users'>Users</Link>
					</NavbarItem>
					<NavbarItem isActive={pathname === '/admin/settings'}>
						<Link href='/admin/settings'>Settings</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent
					as='div'
					justify='end'
				>
					<UserDropdown session={session} />
				</NavbarContent>
			</Navbar>
		</div>
	)
}

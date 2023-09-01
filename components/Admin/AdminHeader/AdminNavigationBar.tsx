'use client'

import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { Logo } from '@components/icons/Logo'
import { UserDropdown } from '@components'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

interface AdminNavigationBarProps {
  session: Session | null
}

export const AdminNavigationBar = ({ session }: AdminNavigationBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className='w-full'>
      <div>
        <Link href='/admin'>
          <div className='p-2 -mx-2 text-gray-900 hover:bg-gray-900 hover:text-white transition-all'>
            <Logo className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <Navbar
        maxWidth='2xl'
        classNames={{
          wrapper: 'px-0'
        }}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarContent className='hidden sm:flex gap-5' justify='center'>
          <NavbarItem isActive={pathname === '/admin'}>
            <Link href='/admin'>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/admin/workshop'}>
            <Link href='/admin/workshop'>
              Workshop
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as='div' justify='end'>
          <UserDropdown session={session} />
        </NavbarContent>
      </Navbar>
    </div>
  )
}

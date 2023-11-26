'use client'

import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/button'
import { fadeInDownMotion } from '@utils'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

export const UserSection = ({ session }: { session: Session | null }) => {
	const user = session?.user
	const t = useTranslations('home')

	return (
		<m.div
			{...fadeInDownMotion}
			transition={{ duration: 1, delay: 1 }}
		>
			{user ? (
				<Link href='/apply'>
					<Button
						className='px-10'
						color='primary'
						startContent={<ArrowRightIcon className='h-4 w-4 text-white' />}
					>
						{t('heroApplyButtonLabel')}
					</Button>
				</Link>
			) : (
				<Link href='/signin'>
					<Button
						className='px-10'
						color='primary'
						startContent={<UserIcon className='h-4 w-4 text-white' />}
					>
						{t('heroSignInButtonLabel')}
					</Button>
				</Link>
			)}
		</m.div>
	)
}

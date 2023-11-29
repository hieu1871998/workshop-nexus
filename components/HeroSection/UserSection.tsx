'use client'

import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline'
import { Button } from '@mantine/core'
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
						classNames={{ root: 'px-10' }}
						color='blue'
						leftSection={<ArrowRightIcon className='h-4 w-4 text-white' />}
					>
						{t('heroApplyButtonLabel')}
					</Button>
				</Link>
			) : (
				<Link href='/signin'>
					<Button
						classNames={{ root: 'px-10' }}
						color='blue'
						leftSection={<UserIcon className='h-4 w-4 text-white' />}
					>
						{t('heroSignInButtonLabel')}
					</Button>
				</Link>
			)}
		</m.div>
	)
}

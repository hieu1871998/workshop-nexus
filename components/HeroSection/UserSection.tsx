'use client'

import { FiArrowRight, FiUser } from 'react-icons/fi'
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
						leftSection={<FiArrowRight className='text-base' />}
					>
						{t('heroApplyButtonLabel')}
					</Button>
				</Link>
			) : (
				<Link href='/signin'>
					<Button
						classNames={{ root: 'px-10' }}
						leftSection={<FiUser className='text-base' />}
					>
						{t('heroSignInButtonLabel')}
					</Button>
				</Link>
			)}
		</m.div>
	)
}

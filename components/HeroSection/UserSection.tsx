'use client'

import { FiArrowDown, FiArrowRight, FiUser } from 'react-icons/fi'
import { Button } from '@mantine/core'
import { fadeInDownMotion } from '@utils'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

import styles from './styles.module.scss'

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
			<m.div
				className={`${styles.explore} mt-20 flex flex-col items-center`}
				{...fadeInDownMotion}
				transition={{ delay: 1.2, duration: 1 }}
			>
				<Button
					variant='transparent'
					component={Link}
					href='#upcoming'
				>
					Explore
				</Button>
				<FiArrowDown className={styles.arrow} />
			</m.div>
		</m.div>
	)
}

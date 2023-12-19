'use client'

import { FiArrowDown, FiArrowRight, FiUser } from 'react-icons/fi'
import { ActionIcon, Affix, Button, Transition } from '@mantine/core'
import { useViewportSize, useWindowScroll } from '@mantine/hooks'
import { fadeInDownMotion } from '@utils'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

import styles from './styles.module.scss'

export const UserSection = ({ session }: { session: Session | null }) => {
	const user = session?.user
	const t = useTranslations('home')
	const [scroll, scrollTo] = useWindowScroll()
	const { height } = useViewportSize()

	return (
		<m.div
			{...fadeInDownMotion}
			transition={{ duration: 1, delay: 1 }}
		>
			{user ? (
				<Link href='/workshop/apply'>
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
			<Affix position={{ bottom: 20, right: 20, left: 20 }}>
				<Transition
					transition='pop'
					duration={500}
					mounted={scroll.y < 120}
				>
					{transitionStyles => (
						<m.div className='flex flex-col items-center'>
							<ActionIcon
								classNames={{
									root: `${styles.explore} shadow-lg`,
								}}
								variant='white'
								radius={9999}
								size={40}
								onClick={() => {
									scrollTo({ y: height })
								}}
								style={transitionStyles}
							>
								<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-50' />
								<div className='relative flex h-full w-full flex-col items-center justify-center rounded-full bg-white'>
									<FiArrowDown className={styles.arrow} />
								</div>
							</ActionIcon>
						</m.div>
					)}
				</Transition>
			</Affix>
		</m.div>
	)
}

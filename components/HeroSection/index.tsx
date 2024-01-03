import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { HeroSectionTitle } from './HeroSectionTitle'
import { UserSection } from './UserSection'

import styles from './styles.module.scss'

export const HeroSection = async () => {
	const session = await getServerSession(authOptions)

	return (
		<section
			className={`${styles.heroSection} container mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 py-40`}
		>
			<HeroSectionTitle />
			<div className='flex w-full justify-start sm:justify-center'>
				<UserSection session={session} />
			</div>
		</section>
	)
}

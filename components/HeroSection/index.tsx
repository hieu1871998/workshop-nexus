import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { HeroSectionTitle } from './HeroSectionTitle'
import { UserSection } from './UserSection'

export const HeroSection = async () => {
	const session = await getServerSession(authOptions)
	return (
		<section className='container mx-auto flex max-w-5xl flex-col items-center'>
			<HeroSectionTitle />
			<div className='mt-10 flex w-full justify-start sm:justify-center'>
				<UserSection session={session} />
			</div>
		</section>
	)
}

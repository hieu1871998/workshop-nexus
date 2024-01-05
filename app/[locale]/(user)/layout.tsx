import { Footer, Header, OngoingBanner } from '@components'
import { getOngoingWorkshops } from '@network/fetchers'
import { isEmpty } from 'lodash'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Workshop Nexus',
	description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

const RootUserLayout = async ({ children }: { children: React.ReactNode }) => {
	const ongoings = await getOngoingWorkshops()

	return (
		<main className='bg-black-haze'>
			{ongoings && !isEmpty(ongoings) && <OngoingBanner workshops={ongoings} />}
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default RootUserLayout

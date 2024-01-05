import { HeroSection } from '@components'
import { OngoingSection } from '@components/OngoingSection'
import { UpcomingSection } from '@components/UpcomingSection'
import { getOngoingWorkshops, getUpcomingWorkshops } from '@network/fetchers'
import { isEmpty } from 'lodash'

export default async function Home() {
	const upcomings = await getUpcomingWorkshops()
	const ongoings = await getOngoingWorkshops()

	return (
		<main className='relative'>
			<div className='container z-50 mx-auto flex min-h-screen flex-col items-center px-4'>
				<HeroSection />
				{ongoings && !isEmpty(ongoings) && <OngoingSection workshops={ongoings} />}
				{upcomings && !isEmpty(upcomings) && <UpcomingSection workshops={upcomings} />}
			</div>
		</main>
	)
}

import { HeroSection } from '@components'
import { UpcomingSection } from '@components/UpcomingSection'
import { getUpcomingWorkshops } from '@network/fetchers'
import { isEmpty } from 'lodash'

export default async function Home() {
	const workshops = await getUpcomingWorkshops()

	return (
		<main className='relative'>
			<div className='container z-50 mx-auto flex min-h-screen flex-col items-center px-4 pt-10 sm:pt-40'>
				<HeroSection />
				{workshops && !isEmpty(workshops) && <UpcomingSection workshops={workshops} />}
			</div>
		</main>
	)
}

import { HeroSection } from '@components'
// import { UpcomingSection } from '@components/UpcomingSection'

export default function Home() {
	return (
		<main className='relative'>
			<div className='container z-50 mx-auto flex min-h-screen flex-col items-center px-4 pt-10 sm:pt-40'>
				<HeroSection />
				{/* <UpcomingSection /> */}
			</div>
		</main>
	)
}

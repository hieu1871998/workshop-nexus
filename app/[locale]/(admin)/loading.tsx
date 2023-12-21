import { PulsingLoader } from '@components/PulsingLoader'

const LoadingPage = () => {
	return (
		<main className='flex min-h-0 flex-1 items-center justify-center'>
			<PulsingLoader />
		</main>
	)
}

export default LoadingPage

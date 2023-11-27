import { PulsingLoader } from '@components/PulsingLoader'

const LoadingPage = () => {
	return (
		<main className='container mx-auto -mt-16 flex min-h-screen flex-col items-center justify-center'>
			<PulsingLoader />
		</main>
	)
}

export default LoadingPage

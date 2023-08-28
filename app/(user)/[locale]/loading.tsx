import { PulsingLoader } from '@components/PulsingLoader'

const LoadingPage = () => {
  return (
    <main className='-mt-16 min-h-screen container mx-auto flex flex-col justify-center items-center'>
      <PulsingLoader />
      <p className='text-base font-medium'>
        Loading...
      </p>
    </main>
  )
}

export default LoadingPage

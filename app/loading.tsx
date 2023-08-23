import { PulsingLoader } from '@components/PulsingLoader'

const LoadingPage = () => {
  return (
    <main className='-mt-16 min-h-screen container mx-auto flex justify-center items-center'>
      <PulsingLoader />
    </main>
  )
}

export default LoadingPage

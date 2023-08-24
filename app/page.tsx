import { HeroSection } from '@components'
// import { UpcomingSection } from '@components/UpcomingSection'

export default function Home() {
  return (
    <main className='container px-4 pt-10 mx-auto flex flex-col items-center min-h-screen'>
      <HeroSection />
      {/* <UpcomingSection /> */}
    </main>
  )
}

import { UpcomingSpotlightItem } from '@components'

export const UpcomingSection = () => {
  return (
    <section className='container mx-auto mt-10 py-10'>
      <h2 className='text-4xl font-bold mb-5'>
        Upcoming
      </h2>
      <UpcomingSpotlightItem />
    </section>
  )
}

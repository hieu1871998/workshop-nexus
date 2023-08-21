import Image from 'next/image'

export const UpcomingSection = () => {
  return (
    <section className='mt-10 py-10'>
      <h2 className='text-4xl font-bold mb-5'>
        Upcoming workshops
      </h2>
      <div>
        <Image
          className='border rounded-xl mb-2'
          src='/SolidJS.jpg'
          alt='Thumbnail'
          width={900}
          height={600}
        />
        <h3 className='text-2xl'>
          Tech Spotlight: SolidJS: A worthy ReactJS alternative?
        </h3>
      </div>
    </section>
  )
}

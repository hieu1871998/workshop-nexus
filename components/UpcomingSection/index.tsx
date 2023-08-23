import Image from 'next/image'
import SolidJSThumbnail from '../../public/SolidJS.jpg'
import { Card, CardFooter } from '@nextui-org/card'

export const UpcomingSection = () => {
  return (
    <section className='mt-10 py-10'>
      <h2 className='text-4xl font-bold mb-5'>
        Upcoming
      </h2>
      <Card
        className='rounded-2xl'
      >
        {/* <CardHeader>
          <h3 className='text-2xl'>
            Tech Spotlight: SolidJS: A worthy ReactJS alternative?
          </h3>
        </CardHeader> */}
        <Image
          className='object-cover rounded-2xl shadow-md h-auto'
          src={SolidJSThumbnail}
          alt='Thumbnail'
          priority
        />
        <CardFooter>
          <h3 className='text-xl'>
            Tech Spotlight: SolidJS: A worthy ReactJS alternative?
          </h3>
        </CardFooter>
      </Card>
    </section>
  )
}

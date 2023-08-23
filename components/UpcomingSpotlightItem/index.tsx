import { Logo } from '@components/icons/Logo'
import styles from './UpcomingSpotlightItem.module.scss'
import Image from 'next/image'

// eslint-disable-next-line max-len
const desc = `Delve into the emerging SolidJS framework as a potential alternative to ReactJS. The workshop will explore SolidJS's unique features, performance benefits, and its comparison with ReactJS. As a frontend/mobile developer, this workshop could provide you with valuable insights into a cutting-edge technology and help you assess whether SolidJS could be a suitable choice for your projects.`

export const UpcomingSpotlightItem = () => {
  return (
    <div
      className={`${styles.upcomingSpotlightItem} flex-col sm:flex-row w-full grid grid-cols-3 grid-rows-1 h-96`}
    >
      <div className='p-1 col-span-2 overflow-hidden'>
        <div className='w-full h-full overflow-hidden'>
          <Image
            className={`${styles.cover} object-cover h-full w-full`}
            src='/SolidJS.jpg'
            width={1920}
            height={1024}
            alt='Thumbnail'
            priority
          />
        </div>
      </div>
      <div className='px-0 sm:px-5 flex items-end col-span-1 gap-x-6 relative'>
        <div className='absolute top-5 right-5'>
          <Logo className={styles.logo} />
          {/* <Image
            className='text-white'
            src='/logo.svg'
            alt=''
            width={50}
            height={50}
          /> */}
        </div>
        <div className='py-5 relative'>
          <p className={`${styles.category} text-xs uppercase mb-2 mr-4`}>
            Tech Spotlight
          </p>
          <p className={`${styles.title} text-base lg:text-3xl font-bold lg:uppercase mr-4`}>
            SolidJS: A worthy ReactJS alternative?
          </p>
          <p className={`${styles.description} text-xl line-clamp-4 mt-2 mr-4`}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}

import { Logo } from '@components/icons/Logo'
import Image from 'next/image'

import styles from './UpcomingSpotlightItem.module.scss'

// eslint-disable-next-line max-len
const desc = `Delve into the emerging SolidJS framework as a potential alternative to ReactJS. The workshop will explore SolidJS's unique features, performance benefits, and its comparison with ReactJS. As a frontend/mobile developer, this workshop could provide you with valuable insights into a cutting-edge technology and help you assess whether SolidJS could be a suitable choice for your projects.`

export const UpcomingSpotlightItem = () => {
	return (
		<div className={`${styles.upcomingSpotlightItem} grid h-96 w-full grid-cols-3 grid-rows-1 flex-col sm:flex-row`}>
			<div className='col-span-2 overflow-hidden p-1'>
				<div className='h-full w-full overflow-hidden'>
					<Image
						className={`${styles.cover} h-full w-full object-cover`}
						src='/SolidJS.jpg'
						width={1920}
						height={1024}
						alt='Thumbnail'
						priority
					/>
				</div>
			</div>
			<div className='relative col-span-1 flex items-end gap-x-6 px-0 sm:px-5'>
				<div className='absolute right-5 top-5'>
					<Logo className={styles.logo} />
					{/* <Image
            className='text-white'
            src='/logo.svg'
            alt=''
            width={50}
            height={50}
          /> */}
				</div>
				<div className='relative py-5'>
					<p className={`${styles.category} mb-2 mr-4 text-xs uppercase`}>Tech Spotlight</p>
					<p className={`${styles.title} mr-4 text-base font-bold lg:text-3xl lg:uppercase`}>
						SolidJS: A worthy ReactJS alternative?
					</p>
					<p className={`${styles.description} mr-4 mt-2 line-clamp-4 text-xl`}>{desc}</p>
				</div>
			</div>
		</div>
	)
}

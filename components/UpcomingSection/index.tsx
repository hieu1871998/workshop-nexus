'use client'

import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { Banner, UpcomingSpotlightItem, WorkshopItem } from '@components'
import { SimpleGrid, Title } from '@mantine/core'
import { m } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface UpcomingSection {
	workshops: WorkshopWithAllFields[]
}

export const UpcomingSection = ({ workshops }: UpcomingSection) => {
	const t = useTranslations('home.upcomingSection')

	return (
		<section
			id='upcoming'
			className='container mx-auto mb-10 flex flex-col py-10'
		>
			<m.div
				initial={{
					y: 40,
					opacity: 0,
				}}
				whileInView={{
					y: 0,
					opacity: 1,
				}}
				transition={{ duration: 1 }}
				viewport={{ once: true }}
			>
				<Title
					className='mb-5'
					order={1}
				>
					{t('sectionTitle')}
				</Title>
			</m.div>
			<UpcomingSpotlightItem workshop={workshops[0]} />
			<SimpleGrid
				cols={4}
				my={20}
			>
				{workshops.slice(1, workshops.length).map(workshop => (
					<WorkshopItem
						key={workshop?.id}
						workshop={workshop}
					/>
				))}
			</SimpleGrid>
			<Banner />
		</section>
	)
}

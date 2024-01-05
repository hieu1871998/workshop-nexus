'use client'

import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { PingDot } from '@components/PingDot'
import { Group, Stack, Title } from '@mantine/core'
import { m } from 'framer-motion'

import { OngoingSpotlightItem } from './OngoingSpotlightItem'

interface OngoingSection {
	workshops: WorkshopWithAllFields[]
}

export const OngoingSection = ({ workshops }: OngoingSection) => {
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
				<Group
					mb={20}
					gap={8}
				>
					<PingDot />
					<Title order={1}>Ongoing</Title>
				</Group>
			</m.div>
			<Stack>
				{workshops.map(workshop => (
					<OngoingSpotlightItem
						key={workshop?.id}
						workshop={workshop}
					/>
				))}
			</Stack>
		</section>
	)
}

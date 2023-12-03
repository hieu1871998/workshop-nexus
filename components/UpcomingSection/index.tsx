import { UpcomingWorkshopDetail } from '@app/api/workshop/upcoming/route'
import { UpcomingSpotlightItem, WorkshopItem } from '@components'
import { Button, Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface UpcomingSection {
	workshops: UpcomingWorkshopDetail[]
}

export const UpcomingSection = ({ workshops }: UpcomingSection) => {
	const t = useTranslations('home.upcomingSection')

	return (
		<section className='container mx-auto my-10 flex flex-col py-10'>
			<h2 className='mb-5 text-4xl font-bold'>{t('sectionTitle')}</h2>
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
			<Card
				styles={{ root: { backgroundColor: 'var(--mantine-color-dark-filled)' } }}
				mt={80}
				p={64}
			>
				<Group justify='space-between'>
					<Stack>
						<Title
							order={1}
							c='white'
							size={48}
						>
							Supercharge Your Knowledge
						</Title>
						<Text
							size='24px'
							c='gray.5'
						>
							Explore a multitude of engaging workshops tailored to your interests
						</Text>
					</Stack>
					<Button
						color='dark.5'
						size='lg'
						component={Link}
						href='/workshops'
					>
						Start Exploring Now!
					</Button>
				</Group>
			</Card>
		</section>
	)
}

'use client'

import { FiCalendar } from 'react-icons/fi'
import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { UserHoverCard } from '@components/UserHoverCard'
import { Badge, Card, Divider, Group, Text, Title, Tooltip } from '@mantine/core'
import { User } from '@prisma/client'
import dayjs from 'dayjs'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const UpcomingSpotlightItem = ({ workshop }: { workshop: WorkshopWithAllFields }) => {
	const t = useTranslations('home.upcomingSection.upcomingItem')

	return (
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
			<Card
				classNames={{
					root: 'hover:shadow-lg transition-all',
				}}
				withBorder
				component={Link}
				href={`/workshop/${workshop?.slug}`}
			>
				<div className='grid grid-cols-10 gap-5'>
					<div className='relative col-span-4 aspect-16/9'>
						<Image
							className='rounded-md border object-cover object-center'
							src={workshop?.workshopThumbnail?.url ?? ''}
							alt={workshop?.topic ?? ''}
							fill
							priority
						/>
					</div>
					<div className='col-span-6 flex flex-col justify-between'>
						<div className='flex justify-end gap-10'>
							<UserHoverCard
								user={workshop?.host as User}
								position='top-end'
							/>
						</div>
						<div>
							<Badge color={workshop?.category?.color}>{workshop?.category?.label}</Badge>
							<Title
								className='line-clamp-1'
								order={2}
							>
								{workshop?.topic}
							</Title>
							<Group>
								<Group gap={8}>
									<FiCalendar className='mb-1 text-lg' />
									<Text>{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY - HH:mm')}</Text>
								</Group>
								<Divider
									orientation='vertical'
									size='sm'
								/>
								<Text>{t('participating', { count: workshop?._count.participants })}</Text>
							</Group>
							<Text className='line-clamp-3'>{workshop?.description}</Text>
							<Group
								gap={4}
								wrap='nowrap'
								mt={8}
								preventGrowOverflow={false}
							>
								{workshop?.tags.map(tag => (
									<Tooltip
										key={tag.id}
										label={tag.label}
									>
										<Badge color={tag.color}>{tag.label}</Badge>
									</Tooltip>
								))}
							</Group>
						</div>
					</div>
				</div>
			</Card>
		</m.div>
	)
}

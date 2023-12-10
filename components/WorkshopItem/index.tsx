'use client'

import { FiCalendar } from 'react-icons/fi'
import { UpcomingWorkshopDetail } from '@app/api/workshop/upcoming/route'
import { Avatar, Badge, Card, Group, Text, Title, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface WorkshopItem {
	workshop: UpcomingWorkshopDetail
}

export const WorkshopItem = ({ workshop }: WorkshopItem) => {
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
				<Card.Section>
					<div className='relative aspect-16/9 w-full'>
						<Image
							className='object-cover object-center'
							src={workshop?.workshopThumbnail.url ?? ''}
							alt={workshop?.topic ?? ''}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					</div>
				</Card.Section>
				<div className='mt-4'>
					<Tooltip
						label={workshop?.topic}
						position='top-start'
					>
						<Title
							order={5}
							className='line-clamp-1'
						>
							{workshop?.topic}
						</Title>
					</Tooltip>
					<Badge
						size='xs'
						color={workshop?.category.color}
					>
						{workshop?.category.label}
					</Badge>
					<Text
						className='line-clamp-2'
						mt={8}
					>
						{workshop?.description}
					</Text>
					<Group
						justify='space-between'
						mt={8}
					>
						<Group gap={4}>
							<FiCalendar className='text-xs' />
							<span className='text-xs'>{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY')}</span>
						</Group>
						<Group gap={4}>
							<Text
								size='xs'
								c='dark.4'
							>
								By
							</Text>
							<Avatar
								size='xs'
								variant='outline'
								src={workshop?.host.image}
							/>
							<Text
								size='xs'
								c='dark.4'
							>
								{workshop?.host.name}
							</Text>
						</Group>
					</Group>
				</div>
			</Card>
		</m.div>
	)
}

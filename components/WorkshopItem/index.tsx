'use client'

import { UpcomingWorkshopDetail } from '@app/api/workshop/upcoming/route'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge, Card, Group, Indicator, Text, Title, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

interface WorkshopItem {
	workshop: UpcomingWorkshopDetail
}

export const WorkshopItem = ({ workshop }: WorkshopItem) => {
	return (
		<Card
			classNames={{
				root: 'hover:shadow-lg transition-all',
			}}
			withBorder
			component={Link}
			href={`/workshop/${workshop?.slug}`}
		>
			<Card.Section>
				<div className='relative aspect-21/9 w-full'>
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
					ml={4}
					h={28}
				>
					{workshop?.tags.map(tag => (
						<Tooltip
							key={tag.id}
							label={tag.label}
							color={tag.color}
						>
							<Indicator
								key={tag.id}
								offset={0}
								color={tag.color}
								position='middle-end'
							>
								.
							</Indicator>
						</Tooltip>
					))}
				</Group>
				<Group justify='space-between'>
					<Group gap={4}>
						<CalendarDaysIcon className='h-4 w-4' />
						<Text
							size='xs'
							c='dark.4'
						>
							{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY')}
						</Text>
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
						G
					</Group>
				</Group>
			</div>
		</Card>
	)
}

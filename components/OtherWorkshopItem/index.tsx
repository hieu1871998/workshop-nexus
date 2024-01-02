'use client'

import { WorkshopDetail } from '@app/api/workshop/[slug]/route'
import { Badge, Card, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

interface OtherWorkshopItem {
	workshop: WorkshopDetail
}

export const OtherWorkshopItem = (props: OtherWorkshopItem) => {
	const { workshop } = props

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
				<Image
					className='aspect-16/9 w-full object-cover object-center'
					src={workshop?.workshopThumbnail.url ?? ''}
					alt={workshop?.topic ?? ''}
					width={400}
					height={400}
				/>
			</Card.Section>
			<div className='mt-4'>
				<Badge color={workshop?.category?.color}>{workshop?.category?.label}</Badge>
				<Title order={4}>{workshop?.topic}</Title>
				<div className='mt-2 flex justify-between'>
					<Text size='xs'>{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY')}</Text>
					<Text
						size='xs'
						fw={500}
					>
						{workshop?.host.name}
					</Text>
				</div>
			</div>
		</Card>
	)
}

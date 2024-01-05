'use client'

import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { UserHoverCard } from '@components/UserHoverCard'
import { Avatar, Badge, Card, Divider, Group, Stack, Text, Title } from '@mantine/core'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export const OngoingSpotlightItem = ({ workshop }: { workshop: WorkshopWithAllFields }) => {
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
					<div className='col-span-4 flex flex-col justify-between'>
						<div className='flex justify-start gap-10'>
							<Link href={`/user/${workshop?.host.id}`}>
								<Group>
									<Avatar src={workshop?.host.image} />
									<Stack gap={5}>
										<Text
											size='lg'
											fw={700}
											style={{ lineHeight: 1 }}
										>
											{workshop?.host.name}
										</Text>
									</Stack>
								</Group>
							</Link>
						</div>
						<div className='mt-20'>
							<Badge
								color={workshop?.category?.color}
								variant={workshop?.category?.variant}
							>
								{workshop?.category?.label}
							</Badge>
							<Title
								className='line-clamp-1'
								order={2}
							>
								{workshop?.topic}
							</Title>
							<Text className='line-clamp-3'>{workshop?.description}</Text>
							<Divider my='md' />
							<Group>
								{workshop?.participants.map(participant => (
									<UserHoverCard
										key={participant.id}
										user={participant}
									/>
								))}
							</Group>
						</div>
					</div>
					<div className='relative col-span-6 aspect-16/9'>
						<Image
							className='rounded-md border object-cover object-center'
							src={workshop?.workshopThumbnail?.url ?? ''}
							alt={workshop?.topic ?? ''}
							fill
							priority
						/>
					</div>
				</div>
			</Card>
		</m.div>
	)
}

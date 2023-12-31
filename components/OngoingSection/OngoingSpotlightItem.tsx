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
						<div>
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
							<Title
								className='line-clamp-1'
								order={1}
								mt={12}
								mb={4}
							>
								{workshop?.topic}
							</Title>
							<Badge
								color={workshop?.category?.color}
								variant={workshop?.category?.variant}
								size='lg'
								mb={20}
							>
								{workshop?.category?.label}
							</Badge>
							<Text className='line-clamp-3 text-lg'>{workshop?.description}</Text>
						</div>
						{workshop?.participants && workshop?.participants.length > 0 && (
							<div>
								<Text className='text-lg font-semibold'>Participants</Text>
								<Divider mb='md' />
								<Group>
									{workshop?.participants.map(participant => (
										<UserHoverCard
											key={participant.id}
											user={participant}
										/>
									))}
								</Group>
							</div>
						)}
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

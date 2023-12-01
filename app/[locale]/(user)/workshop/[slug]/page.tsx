import { Avatar, Badge, Button, Paper, Text, Title } from '@mantine/core'
import { getWorkshopDetail } from '@network/fetchers'
import dayjs from 'dayjs'
import Link from 'next/link'

const WorkshopDetailPage = async ({ params: { slug } }: { params: { slug: string } }) => {
	const workshop = await getWorkshopDetail(slug)

	return (
		<main className='container mx-auto my-10 min-h-screen'>
			<div className='mx-auto flex max-w-5xl items-start gap-5'>
				<div>
					<Title order={1}>{workshop?.topic}</Title>
					<div>
						<Badge color={workshop?.category.color}>{workshop?.category.label}</Badge>
					</div>
					<Paper
						mt={12}
						withBorder
						w='fit-content'
						component={Link}
						href={`/user/${workshop?.host.id}`}
						classNames={{ root: 'hover:shadow-lg transition-all' }}
					>
						<div className='flex w-fit items-center gap-4 p-5'>
							<Avatar
								src={workshop?.host.image}
								size='lg'
							/>
							<div className='flex flex-col'>
								<Text>
									By <span className='font-semibold'>{workshop?.host.name}</span>
								</Text>
								<Text c='dimmed'>{workshop?.host.email}</Text>
							</div>
						</div>
					</Paper>
					<Paper
						withBorder
						p={20}
						mt={12}
					>
						<div>
							<Text
								size='xl'
								fw={600}
							>
								Date and time
							</Text>
							<Text size='md'>{dayjs(workshop?.presentationDate).format('ddd, DD MMM YYYY - HH:mm')}</Text>
						</div>
						<div className='mt-5'>
							<Text
								size='xl'
								fw={600}
							>
								Presented by
							</Text>
							<Text size='md'>
								<Link href={`/user/${workshop?.hostId}`}>{workshop?.host.name}</Link>
							</Text>
						</div>
						<div className='mt-5'>
							<Text
								size='xl'
								fw={600}
							>
								About this workshop
							</Text>
							<Text size='md'>{workshop?.description}</Text>
							<div className='mt-5 flex w-full flex-wrap gap-2'>
								{workshop?.tags.map(tag => (
									<Badge
										key={tag.id}
										color={tag.color}
									>
										{tag.label}
									</Badge>
								))}
							</div>
						</div>
					</Paper>
				</div>
				<Button>Attend this workshop</Button>
			</div>
		</main>
	)
}

export default WorkshopDetailPage

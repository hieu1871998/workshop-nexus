import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { Badge, Card, Group, Progress, Stack, Text, Title } from '@mantine/core'

interface CategoryTagStatsCard {
	title: string
	stats?: WorkshopStats['categoryStats']
}

export const CategoryTagStatsCard = ({ title, stats }: CategoryTagStatsCard) => {
	return (
		<Card>
			<Group gap={8}>
				<Title order={3}>{title}</Title>
				<Badge>{stats?.total}</Badge>
			</Group>
			<Stack className='max-h-96 flex-1 overflow-auto p-4'>
				{stats?.counts.map(item => (
					<Stack
						key={item.item.id}
						gap={4}
					>
						<Group
							gap={4}
							justify='space-between'
						>
							<Title
								order={5}
								fz='sm'
							>
								{item.item.label}
							</Title>
							<Text
								size='sm'
								fw={600}
							>
								{item.count}
							</Text>
						</Group>
						<Progress
							value={(item.count / stats.total) * 100}
							color={item.item.color}
						/>
					</Stack>
				))}
			</Stack>
		</Card>
	)
}

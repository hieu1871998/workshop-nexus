import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { Badge, Card, Group, Progress, Stack, Text, Title } from '@mantine/core'
import { getBadgeColor } from '@utils'

interface WorkshopStatsCard {
	stats?: WorkshopStats['workshopStats']
}

export const WorkshopStatsCard = ({ stats }: WorkshopStatsCard) => {
	return (
		<Card>
			<Group gap={8}>
				<Title order={3}>Workshops</Title>
				<Badge>{stats?.total}</Badge>
			</Group>
			<Stack className='max-h-96 flex-1 overflow-auto p-4'>
				{stats?.counts.map(item => (
					<Stack
						key={item.status}
						gap={4}
					>
						<Group justify='space-between'>
							<Title
								order={5}
								fz='sm'
								c={getBadgeColor(item.status)}
							>
								{item.status}
							</Title>
							<Text
								c={getBadgeColor(item.status)}
								size='sm'
								fw={600}
							>
								{item.count}
							</Text>
						</Group>
						<Progress
							value={(item.count / stats.total) * 100}
							color={getBadgeColor(item.status)}
						/>
					</Stack>
				))}
			</Stack>
		</Card>
	)
}

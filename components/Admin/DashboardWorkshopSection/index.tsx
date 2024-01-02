'use client'

import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { Badge, Card, Grid, Paper, Tabs } from '@mantine/core'

import { CategoryTagStatsCard } from '../CategoryStatsCard'
import { WorkshopStatsCard } from '../WorkshopStatsCard'

interface DashboardWorkshopSection {
	stats?: WorkshopStats
}

export const DashboardWorkshopSection = ({ stats }: DashboardWorkshopSection) => {
	const pendings = stats?.workshopStats.counts.find(item => item.status === 'PENDING')
	return (
		<Paper
			className='overflow-hidden'
			withBorder
		>
			<Tabs
				variant='default'
				defaultValue='workshops'
				// orientation='vertical'
				radius={0}
			>
				<Tabs.List>
					<Tabs.Tab
						value='workshops'
						rightSection={
							<Badge
								color='yellow'
								c='dark'
								size='xs'
							>
								{pendings?.count}
							</Badge>
						}
					>
						Workshops
					</Tabs.Tab>
					<Tabs.Tab value='users'>Users</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='workshops'>
					<Grid>
						<Grid.Col span={12}>
							<WorkshopStatsCard stats={stats?.workshopStats} />
						</Grid.Col>
						<Grid.Col span={6}>
							<CategoryTagStatsCard
								title='Categories'
								stats={stats?.categoryStats}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<CategoryTagStatsCard
								title='Workshop tags'
								stats={stats?.tagStats}
							/>
						</Grid.Col>
					</Grid>
				</Tabs.Panel>

				<Tabs.Panel value='users'>
					<div className='container mx-auto max-w-5xl p-10'>
						<Card withBorder>Messages tab content</Card>
					</div>
				</Tabs.Panel>
			</Tabs>
		</Paper>
	)
}

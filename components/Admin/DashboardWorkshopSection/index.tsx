'use client'

import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { Badge, Card, Grid, Tabs } from '@mantine/core'

import { CategoryTagStatsCard } from '../CategoryStatsCard'
import { WorkshopStatsCard } from '../WorkshopStatsCard'

interface DashboardWorkshopSection {
	stats?: WorkshopStats
}

export const DashboardWorkshopSection = ({ stats }: DashboardWorkshopSection) => {
	const pendings = stats?.workshopStats.counts.find(item => item.status === 'PENDING')
	return (
		<Tabs
			variant='pills'
			defaultValue='workshops'
			classNames={{
				root: 'bg-white',
				list: 'bg-white px-4 container mx-auto py-2',
				panel: 'bg-black-haze border-t',
			}}
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
				<div className='container mx-auto max-w-5xl py-10'>
					<Card
						withBorder
						mt={20}
					>
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
					</Card>
				</div>
			</Tabs.Panel>

			<Tabs.Panel value='users'>
				<div className='container mx-auto max-w-5xl py-10'>
					<Card withBorder>Messages tab content</Card>
				</div>
			</Tabs.Panel>
		</Tabs>
	)
}

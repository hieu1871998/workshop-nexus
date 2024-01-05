'use client'

import { WorkshopStats } from '@app/api/admin/workshop/stats/route'
import { Grid } from '@mantine/core'

import { CategoryTagStatsCard } from '../CategoryStatsCard'
import { WorkshopStatsCard } from '../WorkshopStatsCard'

interface DashboardWorkshopSection {
	stats?: WorkshopStats
}

export const DashboardWorkshopSection = ({ stats }: DashboardWorkshopSection) => {
	// const pendings = stats?.workshopStats.counts.find(item => item.status === 'PENDING')
	return (
		<div className='overflow-hidden'>
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
		</div>
	)
}

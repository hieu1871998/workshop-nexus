'use client'
import { WorkshopCounts } from '@app/[locale]/(admin)/admin/action'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { BarList, Flex, Metric, Text, Title } from '@tremor/react'

interface DashboardWorkshopSection {
	workshopCounts: WorkshopCounts
}

export const DashboardWorkshopSection = ({ workshopCounts }: DashboardWorkshopSection) => {
	return (
		<section>
			<Card className='mx-auto max-w-lg'>
				<CardHeader>
					<div>
						<Title>Workshops</Title>
						<Flex
							justifyContent='start'
							alignItems='baseline'
							className='space-x-2'
						>
							<Metric>{workshopCounts.total}</Metric>
							<Text>total workshops</Text>
						</Flex>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<Flex>
						<Text>Status</Text>
						<Text className='text-right'>Count</Text>
					</Flex>
					<BarList
						className='mt-2'
						data={workshopCounts.statuses}
					/>
				</CardBody>
			</Card>
		</section>
	)
}

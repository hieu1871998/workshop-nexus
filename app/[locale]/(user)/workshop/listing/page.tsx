import { WorkshopItem } from '@components'
import { SimpleGrid } from '@mantine/core'
import { getUpcomingWorkshops } from '@network/fetchers'

export const metadata = {
	title: 'Listing | Zenith',
}

const WorkshopPage = async () => {
	const workshops = await getUpcomingWorkshops({ pageIndex: 0, pageSize: 10 })

	return (
		<div>
			<SimpleGrid cols={3}>
				{workshops?.map(workshop => (
					<WorkshopItem
						key={workshop?.id}
						workshop={workshop}
					/>
				))}
			</SimpleGrid>
		</div>
	)
}

export default WorkshopPage

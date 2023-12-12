import { WorkshopItem } from '@components'
import { SimpleGrid } from '@mantine/core'
import { fetchWorkshops } from '@network/fetchers'
import { GetWorkshopParams } from '@types'

export const metadata = {
	title: 'Listing | Zenith',
}

const WorkshopPage = async ({ searchParams }: { searchParams: GetWorkshopParams }) => {
	const workshops = await fetchWorkshops(searchParams)

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

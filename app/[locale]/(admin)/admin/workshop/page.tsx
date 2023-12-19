import { AdminWorkshopSection, WorkshopFilters } from '@components'
import { getAdminWorkshops, getWorkshopMetadata } from '@network/fetchers'
import { GetAdminWorkshopParams } from '@types'

const AdminWorkshopPage = async ({ searchParams }: { searchParams: GetAdminWorkshopParams }) => {
	const metadata = await getWorkshopMetadata()

	const workshops = await getAdminWorkshops(searchParams)

	return (
		<main className='container mx-auto flex gap-4 px-5 py-20'>
			<div className='flex-shrink-0'>
				<WorkshopFilters
					isAdmin
					metadata={metadata}
				/>
			</div>
			<AdminWorkshopSection workshops={workshops} />
		</main>
	)
}

export default AdminWorkshopPage

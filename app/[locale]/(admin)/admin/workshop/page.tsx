import { AdminWorkshopSection, WorkshopFilters } from '@components'
import { AdminWorkshopFilters } from '@components/Admin/AdminWorkshopFilters'
import { getAdminWorkshops, getWorkshopMetadata } from '@network/fetchers'
import { GetAdminWorkshopParams } from '@types'

const AdminWorkshopPage = async ({ searchParams }: { searchParams: GetAdminWorkshopParams }) => {
	const metadata = await getWorkshopMetadata()
	console.log('searchParams: ', searchParams)

	const workshops = await getAdminWorkshops(searchParams)

	return (
		<main className='container mx-auto flex gap-4 px-5 py-20'>
			<WorkshopFilters
				isAdmin
				metadata={metadata}
			/>
			<AdminWorkshopSection workshops={workshops} />
		</main>
	)
}

export default AdminWorkshopPage

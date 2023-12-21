import { AdminWorkshopSection, WorkshopFilters } from '@components'
import { getAdminWorkshops, getWorkshopMetadata } from '@network/fetchers'
import { GetAdminWorkshopParams } from '@types'

const AdminWorkshopPage = async ({ searchParams }: { searchParams: GetAdminWorkshopParams }) => {
	const metadata = await getWorkshopMetadata()

	const workshopRes = await getAdminWorkshops(searchParams)

	return (
		<div className='flex min-h-0 flex-1 gap-5 p-5'>
			<div className='w-72 flex-shrink-0'>
				<WorkshopFilters
					isAdmin
					metadata={metadata}
				/>
			</div>
			<div className='flex h-full w-full flex-col'>
				<AdminWorkshopSection
					workshops={workshopRes?.workshops}
					total={workshopRes?.total ?? 0}
				/>
			</div>
		</div>
	)
}

export default AdminWorkshopPage

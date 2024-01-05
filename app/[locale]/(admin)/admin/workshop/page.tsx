import { AdminWorkshopFilters, AdminWorkshopSection } from '@components'
import { getAdminWorkshops, getWorkshopMetadata } from '@network/fetchers'
import { GetAdminWorkshopParams } from '@types'

const AdminWorkshopPage = async ({ searchParams }: { searchParams: GetAdminWorkshopParams }) => {
	const metadata = await getWorkshopMetadata()

	const workshopRes = await getAdminWorkshops(searchParams)

	return (
		<div className='flex h-[calc(100vh-56px)] w-full flex-col overflow-auto p-5'>
			<AdminWorkshopFilters metadata={metadata} />
			<AdminWorkshopSection
				workshops={workshopRes?.workshops}
				total={workshopRes?.total ?? 0}
			/>
		</div>
	)
}

export default AdminWorkshopPage

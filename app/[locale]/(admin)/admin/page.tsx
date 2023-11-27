import { DashboardWorkshopSection } from '@components/Admin/DashboardWorkshopSection'

import { getWorkshopCounts } from './action'

const AdminHomePage = async () => {
	const workshopCounts = await getWorkshopCounts()

	return (
		<main className='container mx-auto min-h-screen px-5 py-20'>
			<DashboardWorkshopSection workshopCounts={workshopCounts} />
		</main>
	)
}

export default AdminHomePage

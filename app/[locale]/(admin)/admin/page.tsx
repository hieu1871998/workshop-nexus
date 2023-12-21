import { DashboardWorkshopSection } from '@components'
import { getAdminWorkshopStats } from '@network/fetchers'

export interface StatItem {
	label: React.ReactNode
	count: number
}

const AdminHomePage = async () => {
	const stats = await getAdminWorkshopStats()

	return (
		<main className='container mx-auto py-5'>
			<DashboardWorkshopSection stats={stats} />
		</main>
	)
}

export default AdminHomePage

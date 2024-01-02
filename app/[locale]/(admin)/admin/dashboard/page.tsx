import { DashboardWorkshopSection } from '@components'
import { getAdminWorkshopStats } from '@network/fetchers'

export interface StatItem {
	label: React.ReactNode
	count: number
}

const AdminHomePage = async () => {
	const stats = await getAdminWorkshopStats()

	return (
		<div className='h-full w-full p-5'>
			<DashboardWorkshopSection stats={stats} />
		</div>
	)
}

export default AdminHomePage

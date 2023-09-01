import { DashboardWorkshopSection } from '@components/Admin/DashboardWorkshopSection'
import { getWorkshopCounts } from './action'

const AdminHomePage = async () => {
  const workshopCounts = await getWorkshopCounts()

  return (
    <main className='container mx-auto px-5 py-20 min-h-screen'>
      <DashboardWorkshopSection
        workshopCounts={workshopCounts}
      />
    </main>
  )
}

export default AdminHomePage

import { AdminWorkshopSection } from '@components'
import { DashboardWorkshops, getDashboardWorkshops } from './action'

const AdminWorkshopPage = async () => {
  const workshops: DashboardWorkshops = await getDashboardWorkshops()

  return (
    <main className='container mx-auto px-5 py-20'>
      <AdminWorkshopSection
        workshops={workshops}
      />
    </main>
  )
}

export default AdminWorkshopPage

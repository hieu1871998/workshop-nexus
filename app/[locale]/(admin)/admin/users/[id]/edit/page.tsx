import AdminUserDetail from '@components/Admin/AdminUserSection/AdminUserDetail'

import { getAdminUserById } from './action'

const AdminUserDetailPage = async ({ params }: { params: { id: string } }) => {
	const user = await getAdminUserById(params.id)

	if (!user) return <div>not found</div>

	return (
		<main className='container mx-auto px-5 py-20'>
			<AdminUserDetail user={user} />
		</main>
	)
}

export default AdminUserDetailPage

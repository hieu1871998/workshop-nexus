import AdminUserDetail from '@components/Admin/AdminUserSection/AdminUserDetail'
import { authOptions } from '@lib/auth'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { getAdminUserById, getAdminUserTags } from './action'

const AdminUserDetailPage = async ({ params }: { params: { id: string } }) => {
	const user = await getAdminUserById(params.id)
	const userTags = await getAdminUserTags()
	const session = await getServerSession(authOptions)

	if (!user) notFound()

	return (
		<main className='container mx-auto p-5'>
			<AdminUserDetail
				user={user}
				userTags={userTags}
				session={session}
			/>
		</main>
	)
}

export default AdminUserDetailPage

import { AdminUserSection } from '@components'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

const AdminUserPage = async () => {
	const session = await getServerSession(authOptions)
	return (
		<main className='container mx-auto px-5 py-20'>
			<AdminUserSection session={session} />
		</main>
	)
}

export default AdminUserPage

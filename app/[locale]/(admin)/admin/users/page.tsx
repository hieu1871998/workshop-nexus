import { AdminUserSection } from '@components'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

const AdminUserPage = async () => {
	const session = await getServerSession(authOptions)
	return (
		<main className='h-full w-full p-5'>
			<AdminUserSection session={session} />
		</main>
	)
}

export default AdminUserPage

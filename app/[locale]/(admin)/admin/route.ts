import { authOptions } from '@lib/auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export const GET = async () => {
	const session = await getServerSession(authOptions)

	if (session && session.user.role === 'ADMIN') {
		redirect('/admin/dashboard')
	} else {
		redirect('/')
	}
}

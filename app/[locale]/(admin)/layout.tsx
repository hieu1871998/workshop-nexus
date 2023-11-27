import { AdminHeader, Footer } from '@components'
import { authOptions } from '@lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Admin | Zenith',
	description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

const RootAdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions)

	return (
		<>
			<AdminHeader />
			{session?.user.role === 'ADMIN' ? (
				children
			) : (
				<main className='flex min-h-screen items-center justify-center'>Unauthorized</main>
			)}
			<Footer />
		</>
	)
}

export default RootAdminLayout

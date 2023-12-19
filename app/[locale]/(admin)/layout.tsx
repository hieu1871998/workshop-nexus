import { AdminHeader, Footer } from '@components'
import { authOptions } from '@lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Admin | Zenith',
	description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

const RootAdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/signin')
	}

	if (session?.user.role !== 'ADMIN') {
		redirect('/')
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<AdminHeader />
			<div className='flex flex-1 flex-col justify-between overflow-auto bg-black-haze'>
				<div className='h-full'>{children}</div>
				<Footer />
			</div>
		</div>
	)
}

export default RootAdminLayout

import { authOptions } from '@lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { AdminShell } from './AdminShell'

export const metadata: Metadata = {
	title: 'Admin | Workshop Nexus',
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

	return <AdminShell session={session}>{children}</AdminShell>
}

export default RootAdminLayout

import { UserWorkshopTable } from '@components'
import { UserProfile } from '@components/UserProfile'
import { authOptions } from '@lib/auth'
import { Title } from '@mantine/core'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'

import { getUser, getWorkshops } from './action'

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
	const user = await getUser(params.id)

	const metadata: Metadata = {
		title: `${user.name} | Workshop Nexus`,
	}

	return metadata
}

const UserPage = async ({ params }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions)
	const user = await getUser(params.id)
	const workshops = await getWorkshops(params.id)
	const t = await getTranslations('userPage')

	return (
		<main className='container mx-auto my-10 min-h-screen'>
			<Title order={1}>{t('pageTitle')}</Title>
			<div className='mt-10 flex gap-5'>
				<div className='w-96'>
					<UserProfile user={user} />
				</div>
				<div className='w-full'>
					<UserWorkshopTable
						workshops={workshops}
						user={user}
						session={session}
					/>
				</div>
			</div>
		</main>
	)
}

export default UserPage

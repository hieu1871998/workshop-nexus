import { UserWorkshopTable } from '@components'
import { UserProfile } from '@components/UserProfile'
import { Title } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import { getUser, getWorkshops } from './action'

const UserPage = async ({ params }: { params: { id: string } }) => {
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
					/>
				</div>
			</div>
		</main>
	)
}

export default UserPage

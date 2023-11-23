import { UserWorkshopTable } from '@components'
import { UserProfile } from '@components/UserProfile'

import { getUser, getWorkshops } from './action'

const UserPage = async ({ params }: { params: { id: string } }) => {
	const user = await getUser(params.id)
	const workshops = await getWorkshops(params.id)

	return (
		<main className='container mx-auto px-5'>
			<div className='flex flex-col gap-5'>
				<div className='mt-20 grid grid-cols-3 gap-x-5'>
					<div className='col-span-1'>
						<UserProfile user={user} />
					</div>
					<div className='col-span-2'>
						<UserWorkshopTable
							workshops={workshops}
							user={user}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserPage

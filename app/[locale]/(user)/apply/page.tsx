import { WorkshopApplyForm } from '@components'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { ApplyPageTitleSection } from './ApplyPageTitleSection'

const BookingPage = async () => {
	const session = await getServerSession(authOptions)

	return (
		<main className='container mx-auto max-w-5xl px-4'>
			<div className='grid h-full grid-cols-1 gap-x-10 sm:grid-cols-2'>
				<ApplyPageTitleSection />
				<section className='col-span-1 flex h-full flex-col justify-center'>
					<WorkshopApplyForm session={session} />
				</section>
			</div>
		</main>
	)
}

export default BookingPage

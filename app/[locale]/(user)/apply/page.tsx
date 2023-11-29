import { WorkshopApplyForm } from '@components'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'

import { ApplyPageTitleSection } from './ApplyPageTitleSection'

const BookingPage = async () => {
	const session = await getServerSession(authOptions)

	return (
		<main className='container relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:flex-row'>
			<section className='sticky top-32 h-min w-full sm:w-1/2'>
				<ApplyPageTitleSection />
			</section>
			<section className='flex h-full w-full flex-col justify-center sm:w-1/2'>
				<WorkshopApplyForm session={session} />
			</section>
		</main>
	)
}

export default BookingPage

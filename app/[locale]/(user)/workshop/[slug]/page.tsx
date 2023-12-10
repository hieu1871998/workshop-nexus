import { WorkshopDetail } from '@app/api/workshop/[slug]/route'
import { WorkshopDetailSection } from '@components'
import { authOptions } from '@lib/auth'
import { getOtherWorkshops, getWorkshopDetail } from '@network/fetchers'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
	const workshop = await getWorkshopDetail(params.slug)

	const metadata: Metadata = {
		title: `${workshop?.topic} | Zenith`,
	}

	return metadata
}

const WorkshopDetailPage = async ({ params: { slug } }: { params: { slug: string } }) => {
	const session = await getServerSession(authOptions)
	const workshop = await getWorkshopDetail(slug)
	const otherWorkshops = await getOtherWorkshops({ id: workshop?.id ?? '' })

	return (
		<main className='container mx-auto my-10 min-h-screen'>
			<WorkshopDetailSection
				session={session}
				workshop={workshop as WorkshopDetail}
				otherWorkshops={otherWorkshops}
			/>
		</main>
	)
}

export default WorkshopDetailPage

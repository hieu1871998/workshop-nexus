import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { WorkshopDetailSection } from '@components'
import { authOptions } from '@lib/auth'
import { getOtherWorkshops, getWorkshopDetail } from '@network/fetchers'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
	const workshop = await getWorkshopDetail(params.slug)

	const metadata: Metadata = {
		title: `${workshop?.topic} | Workshop Nexus`,
	}

	return metadata
}

const WorkshopDetailPage = async ({ params: { slug } }: { params: { slug: string } }) => {
	const session = await getServerSession(authOptions)
	const workshop = (await getWorkshopDetail(slug)) as WorkshopWithAllFields
	const otherWorkshops = await getOtherWorkshops({ id: workshop?.id ?? '' })

	if (!workshop) {
		notFound()
	}

	return (
		<main className='container mx-auto my-10 min-h-screen'>
			<WorkshopDetailSection
				session={session}
				workshop={workshop}
				otherWorkshops={otherWorkshops as WorkshopWithAllFields[]}
			/>
		</main>
	)
}

export default WorkshopDetailPage

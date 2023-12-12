import { Suspense } from 'react'
import { ErrorBoundary, PulsingLoader, WorkshopFilters } from '@components'
import { Text, Title } from '@mantine/core'
import { getWorkshopMetadata } from '@network/fetchers'

const ListingLayout = async ({ children }: { children: React.ReactNode }) => {
	const metadata = await getWorkshopMetadata()

	return (
		<div className='container mx-auto min-h-screen py-20'>
			<div className='mb-16'>
				<Title
					className='mb-5'
					order={1}
					ta='center'
					size={64}
				>
					Find your Workshop
				</Title>
				<Text
					fz={24}
					c='dimmed'
					ta='center'
				>
					Explore a multitude of engaging workshops tailored to your interests
				</Text>
			</div>
			<div className='flex gap-10'>
				<aside className='w-80 flex-shrink-0'>
					<Title
						order={4}
						mb={8}
					>
						Filter Workshops
					</Title>
					<WorkshopFilters metadata={metadata} />
				</aside>
				<main className='flex h-full w-full items-center justify-center'>
					<ErrorBoundary>
						<Suspense
							fallback={
								<div className='py-10'>
									<PulsingLoader />
								</div>
							}
						>
							{children}
						</Suspense>
					</ErrorBoundary>
				</main>
			</div>
		</div>
	)
}

export default ListingLayout

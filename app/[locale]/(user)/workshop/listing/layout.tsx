import { Text, Title } from '@mantine/core'

const ListingLayout = ({ children }: { children: React.ReactNode }) => {
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
				<aside className='w-96 flex-shrink-0'>
					<Title order={3}>Filter Workshops</Title>
				</aside>
				<main>{children}</main>
				TT
			</div>
		</div>
	)
}

export default ListingLayout

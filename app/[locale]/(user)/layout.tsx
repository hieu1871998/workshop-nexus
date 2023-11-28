import { Footer, Header } from '@components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Zenith',
	description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

const RootUserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='bg-black-haze'>
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default RootUserLayout

import { WorkshopWithAllFields } from '@app/api/workshop/route'
import { PingDot } from '@components/PingDot'
import { Group, Text } from '@mantine/core'
import Link from 'next/link'

export const OngoingBanner = ({ workshops }: { workshops: WorkshopWithAllFields[] }) => {
	const workshop = workshops[0]

	return (
		<div className='w-full bg-black py-2'>
			<Group
				className='container mx-auto'
				gap={8}
				justify='center'
			>
				<PingDot size={8} />
				<Text
					c='white'
					ta='center'
					fz='sm'
				>
					The{' '}
					<Link
						className='font-semibold underline'
						href={`workshop/${workshop?.slug}`}
					>
						{workshop?.topic}
					</Link>{' '}
					workshop is currently ongoing. Check it out along with other ongoing workshops!
				</Text>
			</Group>
		</div>
	)
}

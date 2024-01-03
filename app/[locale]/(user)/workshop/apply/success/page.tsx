import { Button, Card, Text, Title } from '@mantine/core'
import { IconCircleCheckFilled, IconHome } from '@tabler/icons-react'
import Link from 'next/link'

const ApplySuccessPage = () => {
	return (
		<main className='flex min-h-[calc(100vh-58px-118px)] items-center justify-center'>
			<Card
				className='max-w-xl'
				withBorder
				shadow='lg'
			>
				<div className='flex flex-col items-center'>
					<IconCircleCheckFilled className='h-20 w-20 text-green-500' />
					<Title order={1}>Congratulations</Title>
					<Text
						fw={500}
						fz='lg'
						mb={20}
					>
						You have successfully applied to host your workshop.
					</Text>
					<Text
						fz='md'
						c='dimmed'
						ta='center'
					>
						Your application to host the workshop has been received by our team. The admin will review it shortly and
						get back to you soon.
					</Text>
					<Button
						leftSection={<IconHome className='h-4 w-4' />}
						fullWidth
						mt={20}
						component={Link}
						href='/'
					>
						Home
					</Button>
				</div>
			</Card>
		</main>
	)
}

export default ApplySuccessPage

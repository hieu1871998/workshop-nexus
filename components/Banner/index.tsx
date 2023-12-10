'use client'

import { Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { m } from 'framer-motion'
import Link from 'next/link'

export const Banner = () => {
	return (
		<m.div
			className='mt-20'
			initial={{
				y: 40,
				opacity: 0,
			}}
			whileInView={{
				y: 0,
				opacity: 1,
			}}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			<Card
				styles={{ root: { backgroundColor: 'var(--mantine-color-dark-filled)' } }}
				p={64}
			>
				<Group justify='space-between'>
					<Stack>
						<Title
							order={1}
							c='white'
							size={48}
						>
							Supercharge Your Knowledge
						</Title>
						<Text
							size='24px'
							c='gray.5'
						>
							Explore a multitude of engaging workshops tailored to your interests
						</Text>
					</Stack>
					<Button
						color='dark.5'
						size='lg'
						component={Link}
						href='/workshop/listing'
					>
						Start Exploring Now!
					</Button>
				</Group>
			</Card>
		</m.div>
	)
}

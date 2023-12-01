import { EnvelopeIcon, SignalIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge, Card, Text } from '@mantine/core'
import { UserWithProfile } from '@types'
import { useTranslations } from 'next-intl'

export const UserProfile = ({ user }: { user: UserWithProfile }) => {
	const t = useTranslations('userPage.miniProfile')
	return (
		<Card
			withBorder
			padding='lg'
		>
			<div className='flex flex-col items-center'>
				<Avatar
					size={120}
					src={user?.image as string}
				/>
				<Text
					fw={600}
					ta='center'
					size='xl'
				>
					{user?.name}
				</Text>
				<div className='mt-5 flex w-full flex-wrap justify-center gap-2'>
					{user.tags.map(tag => (
						<Badge
							key={tag.id}
							color={tag.color}
						>
							{tag.label}
						</Badge>
					))}
				</div>
			</div>
			<div className='mt-5 flex flex-col gap-2'>
				<div className='flex items-center gap-2'>
					<EnvelopeIcon className='h-6 w-6' />
					<Text
						fw={500}
						c='dimmed'
					>
						{user?.email}
					</Text>
				</div>
				<div className='flex items-center gap-2'>
					<SignalIcon className='h-6 w-6' />
					<Text
						fw={500}
						c='dimmed'
					>
						{t('hostedValue', { count: user.workshopsHosted.length })}
					</Text>
				</div>
			</div>
		</Card>
	)
}

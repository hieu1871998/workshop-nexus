import { Avatar, Badge, Card, Text } from '@mantine/core'
import { UserWithProfile } from '@types'

export const UserProfile = ({ user }: { user: UserWithProfile }) => {
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
			<div className='mt-5 flex flex-col'>
				<div className='grid grid-cols-4 gap-x-4'>
					<div className='col-span-1'>
						<Text c='dimmed'>Email</Text>
					</div>
					<Text fw={500}>{user?.email}</Text>
				</div>
				<div className='grid grid-cols-4 gap-x-4'>
					<div className='col-span-1'>
						<Text c='dimmed'>Name</Text>
					</div>
					<Text fw={500}>{user?.name}</Text>
				</div>
				<div className='grid grid-cols-4 gap-x-4'>
					<div className='col-span-1'>
						<Text c='dimmed'>Hosted</Text>
					</div>
					<Text fw={500}>{user.workshopsHosted.length}</Text>
				</div>
			</div>
		</Card>
	)
}

import { Avatar, Group, HoverCard, HoverCardProps, Stack, Text } from '@mantine/core'
import { User } from '@prisma/client'
import Link from 'next/link'

interface UserHoverCard extends HoverCardProps {
	user: User
}

export const UserHoverCard = (props: UserHoverCard) => {
	const { user, position = 'top-start' } = props

	return (
		<HoverCard
			key={user.id}
			position={position}
			{...props}
		>
			<HoverCard.Target>
				<Avatar
					key={user.id}
					src={user.image}
				/>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Link href={`/user/${user.id}`}>
					<Group>
						<Avatar src={user.image} />
						<Stack gap={5}>
							<Text
								size='sm'
								fw={700}
								style={{ lineHeight: 1 }}
							>
								{user.name}
							</Text>
							<Text
								c='dimmed'
								size='xs'
								style={{ lineHeight: 1 }}
							>
								{user.email}
							</Text>
						</Stack>
					</Group>
				</Link>
			</HoverCard.Dropdown>
		</HoverCard>
	)
}

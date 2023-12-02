import { Avatar, Group, HoverCard, Stack, Text } from '@mantine/core'
import { User } from '@prisma/client'
import Link from 'next/link'

interface ParticipantItem {
	participant: User
}

export const ParticipantItem = ({ participant }: ParticipantItem) => {
	return (
		<HoverCard
			key={participant.id}
			position='top-start'
			withArrow
		>
			<HoverCard.Target>
				<Avatar
					key={participant.id}
					src={participant.image}
				/>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Link href={`/user/${participant.id}`}>
					<Group>
						<Avatar src={participant.image} />
						<Stack gap={5}>
							<Text
								size='sm'
								fw={700}
								style={{ lineHeight: 1 }}
							>
								{participant.name}
							</Text>
							<Text
								c='dimmed'
								size='xs'
								style={{ lineHeight: 1 }}
							>
								{participant.email}
							</Text>
						</Stack>
					</Group>
				</Link>
			</HoverCard.Dropdown>
		</HoverCard>
	)
}

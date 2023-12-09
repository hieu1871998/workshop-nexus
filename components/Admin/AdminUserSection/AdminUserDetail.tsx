'use client'

import toast from 'react-hot-toast'
import { AdminUserResponse } from '@app/[locale]/(admin)/admin/users/[id]/edit/action'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Flex,
	Grid,
	GridCol,
	Group,
	MultiSelect,
	Select,
	Text,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { updateAdminUsers } from '@network/fetchers'
import { Role, UserTag } from '@prisma/client'
import { AdminUsers } from '@types'
import { Session } from 'next-auth'

export interface UserForm {
	id: string
	tags: string[]
	role: Role
}

const AdminUserDetail = ({
	user,
	userTags,
	session,
}: {
	user: AdminUserResponse
	userTags: UserTag[]
	session: Session | null
}) => {
	const isAdmin = session?.user.role === 'ADMIN'
	const { getInputProps, isDirty, reset, onSubmit } = useForm<UserForm>({
		initialValues: {
			id: user.id,
			tags: user.tags.map(tag => tag.label),
			role: user.role,
		},
		validate: {},
	})
	const handleSubmit = (value: UserForm) => {
		const request = {
			tags: userTags.filter(tag => value.tags.includes(tag.label)),
			role: value.role,
		} as AdminUsers
		updateAdminUsers(value.id, request)
			.then(data => {
				data ? toast.success('Update success') : toast.error('An error occurred!')
			})
			.catch(() => toast.error('An error occurred!'))
	}

	return (
		<section>
			<Flex
				justify='space-between'
				align='flex-start'
			>
				<Flex gap='sm'>
					<Avatar
						src={user.image || null}
						size='lg'
					/>
					<Flex direction='column'>
						<Text
							fw='bold'
							size='lg'
						>
							{user.name}
						</Text>
						<Text>{user.email}</Text>
					</Flex>
				</Flex>

				{isAdmin && (
					<Group justify='flex-end'>
						{isDirty() && (
							<Button
								color='red'
								onClick={reset}
								variant='outline'
							>
								Cancel
							</Button>
						)}
						<Button
							onClick={() => onSubmit(handleSubmit)()}
							color='blue'
							disabled={!isDirty()}
						>
							Save
						</Button>
					</Group>
				)}
			</Flex>

			<Box style={{ maxWidth: 800 }}>
				{user.tags.map(tag => (
					<Badge
						key={tag.id}
						color={tag.color}
					>
						{tag.label}
					</Badge>
				))}
			</Box>

			<Grid mt='16px'>
				<GridCol span={6}>
					<TextInput
						label='Workshops Hosted'
						disabled
						value={user._count.workshopsHosted}
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput
						label='Workshops Participated'
						disabled
						value={user._count.workshopsParticipated}
					/>
				</GridCol>

				<GridCol span={6}>
					<Select
						label='Role'
						data={Object.values(Role)}
						{...getInputProps('role')}
						disabled={!isAdmin}
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput
						label='Permission'
						disabled={!isAdmin}
					/>
				</GridCol>

				<GridCol span={12}>
					<MultiSelect
						label='Tags'
						{...getInputProps('tags')}
						data={userTags.map(tag => tag.label)}
						hidePickedOptions
						searchable
						disabled={!isAdmin}
					/>
				</GridCol>
			</Grid>
		</section>
	)
}

export default AdminUserDetail

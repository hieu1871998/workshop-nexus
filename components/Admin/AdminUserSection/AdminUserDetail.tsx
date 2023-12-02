'use client'

import toast from 'react-hot-toast'
import { AdminUserResponse } from '@app/[locale]/(admin)/admin/users/[id]/edit/action'
import { Button, Grid, GridCol, Group, Select, TagsInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { updateAdminUsers } from '@network/fetchers'
import { Role } from '@prisma/client'
import { AdminUsers } from '@types'

const AdminUserDetail = ({ user }: { user: AdminUserResponse }) => {
	const { getInputProps, isDirty, reset, onSubmit } = useForm<AdminUserResponse>({
		initialValues: user,
		validate: {},
	})

	const handleSubmit = (value: AdminUserResponse) => {
		const request = {
			tags: value.tags,
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
				<Button onClick={() => onSubmit(handleSubmit)()}>Save</Button>
			</Group>

			<Grid>
				<GridCol span={6}>
					<TextInput
						label='Name'
						disabled
						value={user.name || ''}
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput
						label='Email'
						disabled
						value={user.email || ''}
					/>
				</GridCol>

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
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput label='Permission' />
				</GridCol>

				<GridCol span={12}>
					<TagsInput
						label='Tags'
						{...getInputProps('tags')}
					/>
				</GridCol>
			</Grid>
		</section>
	)
}

export default AdminUserDetail

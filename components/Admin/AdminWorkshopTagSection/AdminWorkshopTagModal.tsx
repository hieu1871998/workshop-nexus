'use client'

import { useState } from 'react'
import { revalidateAllPath } from '@app/action'
import { WorkshopTagWithCount } from '@app/api/workshop/tag/route'
import { Badge, Button, Group, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ContextModalProps } from '@mantine/modals'
import { createWorkshopTag, updateWorkshopTag } from '@network/fetchers'
import { Category, TagColor, TagVariant } from '@prisma/client'
import { capitalize, isEmpty } from 'lodash'

interface AdminWorkshopTagModal {
	tag?: WorkshopTagWithCount
}

const tagColors = Object.keys(TagColor).map(value => ({
	label: capitalize(value),
	value,
}))

const variants = Object.keys(TagVariant).map(value => ({
	label: capitalize(value),
	value,
}))

export const AdminWorkshopTagModal = ({ context, id, innerProps }: ContextModalProps<AdminWorkshopTagModal>) => {
	const { tag } = innerProps
	const [loading, setLoading] = useState(false)
	const form = useForm<Omit<Category, 'id' | 'createdAt'>>({
		initialValues: {
			color: tag?.color ?? 'blue',
			label: tag?.label ?? '',
			variant: tag?.variant ?? 'filled',
		},
	})

	const handleSubmit = async (values: Omit<Category, 'id' | 'createdAt'>) => {
		setLoading(true)

		try {
			if (tag) {
				await updateWorkshopTag(tag.id, values)
			} else {
				await createWorkshopTag(values)
			}

			revalidateAllPath()
			form.resetDirty()
			setLoading(false)
			context.closeModal(id)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}

	return (
		<form onSubmit={form.onSubmit(values => void handleSubmit(values))}>
			<div className='mb-5 flex justify-center'>
				<Badge
					variant={form.values.variant}
					color={form.values.color}
					size='lg'
				>
					{isEmpty(form.values.label) ? 'Label' : form.values.label}
				</Badge>
			</div>
			<Stack gap={8}>
				<TextInput
					{...form.getInputProps('label')}
					label='Label'
					placeholder='Label'
					disabled={loading}
				/>
				<Group grow>
					<Select
						{...form.getInputProps('color')}
						label='Color'
						data={tagColors}
						placeholder='Color'
						allowDeselect={false}
						disabled={loading}
					/>
					<Select
						{...form.getInputProps('variant')}
						label='Variant'
						data={variants}
						placeholder='Variant'
						allowDeselect={false}
						disabled={loading}
					/>
				</Group>
				<Button
					className='mt-4'
					type='submit'
					loading={loading}
					disabled={!form.isDirty()}
				>
					Save
				</Button>
			</Stack>
		</form>
	)
}

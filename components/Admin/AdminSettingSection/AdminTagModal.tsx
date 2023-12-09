/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Badge, Button, CloseButton, Flex, Modal, Select, Text, TextInput, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { createAdminCategory, createAdminUserTag, createAdminWorkshopTag } from '@network/fetchers/setting'
import { TagColor, TagVariant } from '@prisma/client'

interface AdminTagModalProps {
	opened: boolean
	onClose: (refresh?: boolean) => void
	tab: 'userTags' | 'workshopTags' | 'categories'
	isEdit?: boolean
	onSave?: (data: SettingForm) => void
	selected?: SettingForm
}

export interface SettingForm {
	id?: number
	label: string
	color: TagColor
	variant: TagVariant
}

const COLOR = Object.values(TagColor)
const VARIANT = Object.values(TagVariant)

export const AdminTagModal = ({ opened, onClose, tab, isEdit, onSave, selected }: AdminTagModalProps) => {
	const [isLoading, setLoading] = useState(false)
	const { getInputProps, isDirty, reset, onSubmit, values } = useForm<SettingForm>({
		initialValues: {
			id: selected?.id,
			label: selected?.label || '',
			color: selected?.color || 'blue',
			variant: selected?.variant || 'default',
		},
	})

	const title =
		tab === 'userTags' ? 'USER TAG' : tab === 'workshopTags' ? 'Workshop Tag' : tab === 'categories' ? 'Category' : ''

	const handleSubmit = async (value: SettingForm) => {
		if (isEdit) {
			setLoading(true)
			onSave?.(value)
			return
		}
		setLoading(true)
		let data
		try {
			if (tab === 'userTags') {
				data = await createAdminUserTag(value)
			} else if (tab === 'workshopTags') {
				data = await createAdminWorkshopTag(value)
			} else if (tab === 'categories') {
				data = await createAdminCategory(value)
			} else {
				setLoading(false)
				onClose(true)
				return
			}
			if (data) {
				toast.success('Create success')
				onClose(true)
			} else {
				toast.error('An error occurred!')
			}
		} catch (e) {
			toast.error('An error occurred!')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			opened={opened}
			onClose={() => {}}
			withCloseButton={false}
		>
			<Flex justify='space-between'>
				<Text fw='bold'>{title}</Text>
				<CloseButton onClick={() => onClose()} />
			</Flex>

			<Flex
				gap='xs'
				mt='xs'
				mb='xs'
				direction='column'
			>
				<Tooltip label={values.label}>
					<Badge
						color={values.color}
						variant={values?.variant}
					>
						{values?.label}
					</Badge>
				</Tooltip>
				<TextInput
					className='w-full'
					placeholder='Search for label'
					{...getInputProps('label')}
					mt='12px'
				/>
				<Flex gap='xs'>
					<Select
						data={COLOR}
						{...getInputProps('color')}
					/>
					<Select
						data={VARIANT}
						{...getInputProps('variant')}
					/>
				</Flex>
			</Flex>

			<Flex
				justify='end'
				gap='xs'
			>
				{isDirty() && isEdit && (
					<Button
						color='red'
						onClick={reset}
						variant='outline'
						loading={isLoading}
					>
						Cancel
					</Button>
				)}
				<Button
					loading={isLoading}
					onClick={() => onSubmit(handleSubmit)()}
				>
					{isEdit ? 'Save' : 'Add'}
				</Button>
			</Flex>
		</Modal>
	)
}

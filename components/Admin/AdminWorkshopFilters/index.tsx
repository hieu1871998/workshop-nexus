'use client'

import { useEffect } from 'react'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { Group, MultiSelect, MultiSelectProps, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch } from '@tabler/icons-react'
import { GetAdminWorkshopParams } from '@types'
import { capitalize, isEmpty, isNumber, omitBy } from 'lodash'
import { useRouter } from 'next/navigation'

interface AdminWorkshopFilters {
	metadata?: WorkshopMetadata
}

const defaultMultiSelectProps: MultiSelectProps = {
	clearable: true,
	checkIconPosition: 'right',
	maw: 200,
	classNames: {
		input: 'max-h-[36px] overflow-auto',
	},
}

export const AdminWorkshopFilters = ({ metadata }: AdminWorkshopFilters) => {
	const router = useRouter()
	const form = useForm<GetAdminWorkshopParams>()

	useEffect(() => {
		const params = omitBy(form.values, value => (isNumber(value) ? false : isEmpty(value)))
		const searchParams = new URLSearchParams(params as Record<string, string>)

		router.push(`/admin/workshop?${searchParams.toString()}`, { scroll: false })
	}, [form.values, router])

	const categories = metadata?.categories.map(category => ({
		label: category.label,
		value: category.id,
	}))
	const tags = metadata?.tags.map(tag => ({
		label: tag.label,
		value: tag.id,
	}))
	const statuses = metadata?.statuses.map(status => ({
		label: capitalize(status),
		value: status,
	}))
	const hosts = metadata?.users.map(user => ({
		label: user.name,
		value: user.id,
	}))

	return (
		<div className='mb-4'>
			<form>
				<Group>
					<TextInput
						{...form.getInputProps('search')}
						aria-label='Search'
						placeholder='Search'
						leftSection={<IconSearch className='h-5 w-5' />}
					/>
					<MultiSelect
						{...form.getInputProps('categoryId')}
						data={categories}
						placeholder='Categories'
						{...defaultMultiSelectProps}
					/>
					<MultiSelect
						{...form.getInputProps('tagIds')}
						data={tags}
						placeholder='Tags'
						{...defaultMultiSelectProps}
					/>
					<MultiSelect
						{...form.getInputProps('status')}
						data={statuses}
						placeholder='Statuses'
						{...defaultMultiSelectProps}
					/>
					<MultiSelect
						{...form.getInputProps('hostId')}
						placeholder='Hosts'
						data={hosts}
						{...defaultMultiSelectProps}
					/>
				</Group>
			</form>
		</div>
	)
}

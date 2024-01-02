'use client'

import { useEffect } from 'react'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { Badge, Checkbox, Group, MultiSelect, Stack, Text, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCategory, IconSearch, IconTag } from '@tabler/icons-react'
import { GetWorkshopParams } from '@types'
import dayjs from 'dayjs'
import { isEmpty, isNumber, omitBy } from 'lodash'
import { useRouter } from 'next/navigation'

import { FilterGroup } from './FilterGroup'

interface WorkshopFilters {
	metadata?: WorkshopMetadata
	isAdmin?: boolean
}

export const WorkshopFilters = ({ metadata }: WorkshopFilters) => {
	const router = useRouter()
	const form = useForm<GetWorkshopParams>()

	useEffect(() => {
		const params = omitBy(form.values, value => (isNumber(value) ? false : isEmpty(value)))
		const searchParams = new URLSearchParams(params as Record<string, string>)

		router.push(`/workshop/listing?${searchParams.toString()}`, { scroll: false })
	}, [form.values, router])

	const hosts = metadata?.users.map(user => ({
		label: user.name,
		value: user.id,
	}))

	return (
		<form>
			<Stack gap={12}>
				<TextInput
					{...form.getInputProps('search')}
					aria-label='Search'
					placeholder='Search'
					leftSection={<IconSearch className='h-5 w-5' />}
				/>
				<DatePickerInput
					valueFormat='DD MMM YYYY'
					type='range'
					placeholder='Filter by presentation date'
					clearable
					onChange={values => {
						if (values[0] === null) {
							form.setFieldValue('fromDate', undefined)
							form.setFieldValue('toDate', undefined)
						}
						if (values[0]) form.setFieldValue('fromDate', dayjs(values[0]).valueOf())
						if (values[1]) form.setFieldValue('toDate', dayjs(values[1]).valueOf())
					}}
				/>
				<MultiSelect
					{...form.getInputProps('hostId')}
					placeholder='Filter by hosts'
					data={hosts}
					checkIconPosition='right'
					clearable
					searchable
				/>
			</Stack>
			<div className='mt-3'>
				<FilterGroup
					icon={IconCategory}
					label='Category'
					initiallyOpened
				>
					<Checkbox.Group {...form.getInputProps('categoryId')}>
						<Stack
							gap={4}
							mb={12}
							px={4}
						>
							{metadata?.categories.map(category => (
								<Checkbox
									key={category.id}
									label={
										<Group gap={8}>
											<Text>{category.label}</Text>
											<Badge
												size='md'
												variant='default'
											>
												{category._count.workshops}
											</Badge>
										</Group>
									}
									value={category.id}
								/>
							))}
						</Stack>
					</Checkbox.Group>
				</FilterGroup>
				<FilterGroup
					label='Tag'
					icon={IconTag}
				>
					<Checkbox.Group {...form.getInputProps('tagIds')}>
						<Stack
							gap={4}
							mb={8}
							px={4}
						>
							{metadata?.tags.map(category => (
								<Checkbox
									key={category.id}
									label={
										<Group gap={8}>
											<Text>{category.label}</Text>
											<Badge
												size='md'
												variant='default'
											>
												{category._count.workshops}
											</Badge>
										</Group>
									}
									value={category.id.toString()}
								/>
							))}
						</Stack>
					</Checkbox.Group>
				</FilterGroup>
			</div>
		</form>
	)
}

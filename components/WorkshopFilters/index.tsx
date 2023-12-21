'use client'

import { useEffect } from 'react'
import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { Badge, Checkbox, Group, MultiSelect, Stack, Text, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { WorkshopStatus } from '@prisma/client'
import { IconCategory, IconSearch, IconTag } from '@tabler/icons-react'
import { GetAdminWorkshopParams, GetWorkshopParams } from '@types'
import dayjs from 'dayjs'
import { capitalize, isEmpty, isNumber, omitBy } from 'lodash'
import { useRouter } from 'next/navigation'

import { FilterGroup } from './FilterGroup'

const workshopStatuses: WorkshopStatus[] = [
	WorkshopStatus.APPROVED,
	WorkshopStatus.CANCELED,
	WorkshopStatus.COMPLETED,
	WorkshopStatus.DRAFT,
	WorkshopStatus.ONGOING,
	WorkshopStatus.PENDING,
	WorkshopStatus.REJECTED,
]

interface WorkshopFilters {
	metadata?: WorkshopMetadata
	isAdmin?: boolean
}

export const WorkshopFilters = ({ metadata, isAdmin }: WorkshopFilters) => {
	const router = useRouter()
	const form = useForm<GetWorkshopParams | GetAdminWorkshopParams>()

	useEffect(() => {
		const params = omitBy(form.values, value => (isNumber(value) ? false : isEmpty(value)))
		const baseUrl = isAdmin ? '/admin/workshop' : '/workshop/listing'
		const searchParams = new URLSearchParams(params as Record<string, string>)

		router.push(`${baseUrl}?${searchParams.toString()}`, { scroll: false })
	}, [form.values, router, isAdmin])

	const hosts = metadata?.users.map(user => ({
		label: user.name,
		value: user.id,
	}))

	const statuses = workshopStatuses.map(status => ({
		label: capitalize(status),
		value: status,
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
				{isAdmin && (
					<MultiSelect
						{...form.getInputProps('status')}
						placeholder='Filter by status'
						data={statuses}
						checkIconPosition='right'
						clearable
					/>
				)}
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

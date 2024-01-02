import { WorkshopMetadata } from '@app/api/workshop/metadata/route'
import { Group, MultiSelect, MultiSelectProps } from '@mantine/core'
import { capitalize } from 'lodash'

import { MultiSelectLimited } from './MultiSelectLimited'

interface AdminWorkshopFilters {
	metadata?: WorkshopMetadata
}

export const AdminWorkshopFilters = ({ metadata }: AdminWorkshopFilters) => {
	const categories = metadata?.categories.map(category => ({
		label: category.label,
		value: category.id,
	}))
	const statuses = metadata?.statuses.map(status => ({
		label: capitalize(status),
		value: status,
	}))

	const defaultMultiSelectProps: MultiSelectProps = {
		clearable: true,
		checkIconPosition: 'right',
	}

	return (
		<div className='py-4'>
			<form>
				<Group>
					<MultiSelect
						data={categories}
						placeholder='Categories'
						{...defaultMultiSelectProps}
					/>
					<MultiSelectLimited data={categories ?? []} />
					<MultiSelect
						data={statuses}
						placeholder='Statuses'
						{...defaultMultiSelectProps}
					/>
				</Group>
			</form>
		</div>
	)
}

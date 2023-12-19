'use client'

import { useState } from 'react'
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core'

const MAX_DISPLAYED_VALUES = 2

export const MultiSelectLimited = ({ data }: { data: { value: string; label: string }[] }) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
	})

	const [value, setValue] = useState<string[]>([])

	const handleValueSelect = (val: string) =>
		setValue(current => (current.includes(val) ? current.filter(v => v !== val) : [...current, val]))

	const handleValueRemove = (val: string) => setValue(current => current.filter(v => v !== val))

	const values = value
		.slice(0, MAX_DISPLAYED_VALUES === value.length ? MAX_DISPLAYED_VALUES : MAX_DISPLAYED_VALUES - 1)
		.map(item => (
			<Pill
				key={item}
				withRemoveButton
				onRemove={() => handleValueRemove(item)}
			>
				{item}
			</Pill>
		))

	const options = data.map(item => (
		<Combobox.Option
			value={item.value}
			key={item.value}
			active={value.includes(item.value)}
		>
			<Group gap='sm'>
				<span>{item.label}</span>
				{value.includes(item.value) ? <CheckIcon size={12} /> : null}
			</Group>
		</Combobox.Option>
	))

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={handleValueSelect}
			withinPortal={false}
			classNames={{
				dropdown: '!min-w-max',
			}}
		>
			<Combobox.DropdownTarget>
				<PillsInput
					pointer
					onClick={() => combobox.toggleDropdown()}
				>
					<Pill.Group>
						{value.length > 0 ? (
							<>
								{values}
								{value.length > MAX_DISPLAYED_VALUES && <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>}
							</>
						) : (
							<Input.Placeholder>Pick one or more values</Input.Placeholder>
						)}

						<Combobox.EventsTarget>
							<PillsInput.Field
								type='hidden'
								onBlur={() => combobox.closeDropdown()}
								onKeyDown={event => {
									if (event.key === 'Backspace') {
										event.preventDefault()
										handleValueRemove(value[value.length - 1])
									}
								}}
							/>
						</Combobox.EventsTarget>
					</Pill.Group>
				</PillsInput>
			</Combobox.DropdownTarget>

			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}

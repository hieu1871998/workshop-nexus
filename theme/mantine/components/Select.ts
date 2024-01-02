import { Select } from '@mantine/core'

export const SelectTheme = Select.extend({
	defaultProps: {
		rightSectionPointerEvents: 'none',
		checkIconPosition: 'right',
	},
})

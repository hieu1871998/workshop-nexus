import { Button } from '@mantine/core'

export const ButtonTheme = Button.extend({
	defaultProps: {
		variant: 'filled',
	},
	classNames: () => {
		return {
			root: 'transition-all',
		}
	},
})

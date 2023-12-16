import { Notification } from '@mantine/core'

export const NotificationTheme = Notification.extend({
	defaultProps: {
		withBorder: true,
		radius: 'lg',
	},
})

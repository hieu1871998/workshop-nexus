import { DefaultMantineColor } from '@mantine/core'
import { Workshop } from '@prisma/client'

export const getBadgeColor = (status: Workshop['status']): DefaultMantineColor => {
	switch (status) {
		case 'APPROVED':
			return 'green'
		case 'CANCELED':
			return 'red'
		case 'COMPLETED':
			return 'teal'
		case 'ONGOING':
			return 'blue'
		case 'PENDING':
			return 'yellow'
		case 'REJECTED':
			return 'red'
		case 'DRAFT':
			return 'dark'
	}
}

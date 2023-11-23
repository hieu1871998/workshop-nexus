import { Workshop } from '@prisma/client'
import { Color } from '@tremor/react'

export const getBadgeColor = (status: Workshop['status']): Color => {
	switch (status) {
		case 'APPROVED':
			return 'green'
		case 'CANCELED':
			return 'red'
		case 'COMPLETED':
			return 'blue'
		case 'ONGOING':
			return 'orange'
		case 'PENDING':
			return 'yellow'
		case 'REJECTED':
			return 'red'
		case 'DRAFT':
			return 'neutral'
	}
}

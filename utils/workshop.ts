import { Workshop } from '@prisma/client'

export const getBadgeColor = (status: Workshop['status']) => {
  switch (status) {
    case 'APPROVED': return 'success'
    case 'CANCELED': return 'danger'
    case 'COMPLETED': return 'primary'
    case 'ONGOING': return 'secondary'
    case 'PENDING': return 'default'
    case 'REJECTED': return 'danger'
  }
}

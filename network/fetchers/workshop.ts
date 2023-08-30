import { fetcher } from '@network/utils/fetcher'
import { Category, Workshop } from '@prisma/client'
import { WorkshopApplyPayload, WorkshopUpdatePayload } from '@types'

export const fetchWorkshopCategories = async () => {
  return fetcher<Category[]>('/api/workshop/category')
}

export const fetchWorkshops = async () => {
  return fetcher<Workshop[]>('/api/workshop')
}

export const applyWorkshop = async (payload: WorkshopApplyPayload) => {
  return fetcher<Workshop>(
    '/api/workshop/apply',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }
  )
}

export const updateWorkshop = async (payload: WorkshopUpdatePayload) => {
  return fetcher<Workshop>(
    '/api/workshop/update',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )
}

import { WorkshopDetail } from '@app/api/workshop/[id]/route'
import { fetcher } from '@network/utils/fetcher'
import { Category, Workshop } from '@prisma/client'
import { AdminWorkshopsResponse, BaseListPayload, WorkshopApplyPayload, WorkshopUpdatePayload } from '@types'

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

export const approveWorkshop = async (id: string) => {
  return fetcher<Workshop>(
    `/api/admin/workshop/${id}/approve`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
}

export const getWorkshopDetail = async (id: string) => {
  return fetcher<WorkshopDetail>(
    `/api/workshop/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const getAdminWorkshops = async (payload: BaseListPayload) => {
  const queryParams = new URLSearchParams(payload as Record<string, string>)
  const url = `/api/admin/workshop?${queryParams.toString()}`

  return fetcher<AdminWorkshopsResponse>(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

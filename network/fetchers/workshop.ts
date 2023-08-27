import { fetcher } from '@network/utils/fetcher'
import { Category, Workshop } from '@prisma/client'

export const fetchWorkshopCategories = async () => {
  return fetcher<Category[]>('/api/workshop/category')
}

export const fetchWorkshops = async () => {
  return fetcher<Workshop[]>('/api/workshop')
}

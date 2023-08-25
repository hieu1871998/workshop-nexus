import { fetcher } from '@network/utils/fetcher'
import { Category } from '@prisma/client'

export const fetchWorkshopCategory = async () => {
  return fetcher<Category[]>('/api/workshop/category')
}

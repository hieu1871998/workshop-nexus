import { fetchWorkshopCategory } from '@network/fetchers'
import { useQuery } from '@tanstack/react-query'

export const useGetWorkshopCategory = () =>
  useQuery({
    queryKey: ['WORKSHOP_CATEGORY'],
    queryFn: () => fetchWorkshopCategory()
  })

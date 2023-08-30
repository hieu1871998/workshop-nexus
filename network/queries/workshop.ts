import { fetchWorkshopCategories, fetchWorkshops } from '@network/fetchers'
import { useQuery } from '@tanstack/react-query'

export const useGetWorkshopCategories = () =>
  useQuery({
    queryKey: ['WORKSHOP_CATEGORY'],
    queryFn: () => fetchWorkshopCategories(),
  })

export const useGetWorkshops = () =>
  useQuery({
    queryKey: ['WORKSHOPS'],
    queryFn: () => fetchWorkshops()
  })

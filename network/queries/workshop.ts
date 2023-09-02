import { approveWorkshop, fetchWorkshopCategories, fetchWorkshops, getWorkshopDetail } from '@network/fetchers'
import { Workshop } from '@prisma/client'
import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query'
import { ErrorResponse } from '@types'

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

export const useGetWorkshop = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ['WORKSHOP_DETAIL', id],
    queryFn: () => getWorkshopDetail(id),
    enabled: enabled
  })

export const useApproveWorkshop = (
  options: MutationOptions<
    Workshop | undefined,
    ErrorResponse,
    string
  >
) => useMutation(
  id => approveWorkshop(id),
  options
)

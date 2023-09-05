import { approveWorkshop, fetchWorkshopCategories, fetchWorkshops, getAdminWorkshops, getWorkshopDetail } from '@network/fetchers'
import { Workshop } from '@prisma/client'
import { MutationOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { ErrorResponse, GetAdminWorkshopsPayload } from '@types'

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
) => useMutation({
  ...options,
  mutationFn: id => approveWorkshop(id)
})

export const useGetAdminWorkshops = (payload: GetAdminWorkshopsPayload) =>
  useInfiniteQuery({
    queryKey: ['GET_ADMIN_WORKSHOPS', payload],
    queryFn: ({ pageParam = 0 }) => getAdminWorkshops({ ...payload, page: pageParam as number }),
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => lastPage?.nextPage,
  })

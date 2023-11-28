import { QueryKey } from '@constants'
import { getAdminUsers, getUserProfile, getUserWorkshops } from '@network/fetchers'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetAdminUsersPayload, GetUserWorkshopPayload } from '@types'

export const useGetUserProfile = (id: string) =>
	useQuery({
		queryFn: () => getUserProfile(id),
		queryKey: [QueryKey.GET_USER_PROFILE],
	})

export const useGetUserWorkshops = (payload: GetUserWorkshopPayload) =>
	useQuery({
		queryFn: () => getUserWorkshops(payload),
		queryKey: [QueryKey.GET_USER_WORKSHOPS],
	})

export const useGetAdminUsers = (payload: GetAdminUsersPayload) =>
	useInfiniteQuery({
		queryKey: ['GET_ADMIN_USERS', payload],
		queryFn: ({ pageParam = 0 }) => getAdminUsers({ ...payload, page: pageParam }),
		refetchOnWindowFocus: false,
		getNextPageParam: lastPage => lastPage?.nextPage,
		initialPageParam: 0,
	})

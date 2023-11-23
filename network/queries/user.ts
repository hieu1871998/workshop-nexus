import { QueryKey } from '@constants'
import { getUserProfile, getUserWorkshops } from '@network/fetchers'
import { useQuery } from '@tanstack/react-query'
import { GetUserWorkshopPayload } from '@types'

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

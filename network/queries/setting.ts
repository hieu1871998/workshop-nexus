import { getAdminCategories, getAdminUserTags, getAdminWorkshopTags } from '@network/fetchers/setting'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GetAdminCategoriesPayload, GetAdminUserTagsPayload, GetAdminWorkshopTagsPayload } from '@types'

export const useGetAdminUserTags = (payload: GetAdminUserTagsPayload) => {
	return useInfiniteQuery({
		queryKey: ['GET_ADMIN_USER_TAGS', payload],
		queryFn: ({ pageParam = 1 }) => getAdminUserTags({ ...payload, page: pageParam }),
		refetchOnWindowFocus: false,
		getNextPageParam: lastPage => lastPage?.nextPage,
		initialPageParam: 1,
	})
}

export const useGetAdminWorkshopTags = (payload: GetAdminWorkshopTagsPayload) => {
	return useInfiniteQuery({
		queryKey: ['GET_ADMIN_WORKSHOP_TAGS', payload],
		queryFn: ({ pageParam = 1 }) => getAdminWorkshopTags({ ...payload, page: pageParam }),
		refetchOnWindowFocus: false,
		getNextPageParam: lastPage => lastPage?.nextPage,
		initialPageParam: 1,
	})
}

export const useGetAdminCategories = (payload: GetAdminCategoriesPayload) => {
	return useInfiniteQuery({
		queryKey: ['GET_ADMIN_CATEGORY', payload],
		queryFn: ({ pageParam = 1 }) => getAdminCategories({ ...payload, page: pageParam }),
		refetchOnWindowFocus: false,
		getNextPageParam: lastPage => lastPage?.nextPage,
		initialPageParam: 1,
	})
}

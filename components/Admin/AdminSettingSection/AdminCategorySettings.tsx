import { useMemo, useState } from 'react'
import { Box, Button } from '@mantine/core'
import { useGetAdminCategories } from '@network/queries'
import { AdminCategory, GetAdminCategoriesPayload } from '@types'

export const AdminCategorySettings = () => {
	const [payload, setPayload] = useState({
		page: 1,
	} as GetAdminCategoriesPayload)

	const { data, hasNextPage, isLoading, isFetching, fetchNextPage } = useGetAdminCategories(payload)

	const categories = useMemo(
		() =>
			data?.pages.reduce((previous, current) => [...previous, ...(current?.categories ?? [])], [] as AdminCategory[]) ??
			[],
		[data?.pages]
	)

	const hasMore = useMemo(() => data?.pages?.[data.pages.length - 1]?.hasNextPage, [data?.pages])

	console.log(data, categories)

	return (
		<div>
			{categories.map(category => (
				<Box key={category.id}>{category.label}</Box>
			))}

			{hasMore && (
				<Button
					onClick={() => {
						void fetchNextPage()
					}}
				>
					Show more
				</Button>
			)}
		</div>
	)
}

import { AdminCategorySection, AdminWorkshopTagSection } from '@components'
import { SimpleGrid } from '@mantine/core'
import { fetchWorkshopCategories, getWorkshopTags } from '@network/fetchers'

const AdminCategoryPage = async () => {
	const categories = await fetchWorkshopCategories()
	const tags = await getWorkshopTags()

	return (
		<div className='flex h-[calc(100vh-56px)] w-full overflow-auto p-5'>
			<SimpleGrid
				className='h-full w-full overflow-auto'
				cols={2}
			>
				<AdminCategorySection categories={categories} />
				<AdminWorkshopTagSection tags={tags} />
			</SimpleGrid>
		</div>
	)
}

export default AdminCategoryPage

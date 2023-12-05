import { useGetAdminWorkshopTags } from '@network/queries'
import { GetAdminWorkshopTagsPayload } from '@types'

export const AdminWorkshopTagSettings = () => {
	const payload: GetAdminWorkshopTagsPayload = {}

	const { data } = useGetAdminWorkshopTags(payload)

	console.log(data)
	return <div>admin workshop tag</div>
}

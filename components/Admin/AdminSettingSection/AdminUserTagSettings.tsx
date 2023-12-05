import { useGetAdminUserTags } from '@network/queries'
import { GetAdminUserTagsPayload } from '@types'

export const AdminUserTagSettings = () => {
	const payload: GetAdminUserTagsPayload = {}

	const { data } = useGetAdminUserTags(payload)

	console.log(data)

	return <div>admin user tag</div>
}

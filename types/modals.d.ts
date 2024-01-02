import { AdminCategoryModal } from '@components/Admin/AdminCategorySection/AdminCategoryModal'
import { AdminWorkshopTagModal } from '@components/Admin/AdminWorkshopTagSection/AdminWorkshopTagModal'

const modals = {
	adminCategory: AdminCategoryModal,
	adminWorkshopTag: AdminWorkshopTagModal,
}

declare module '@mantine/modals' {
	export interface MantineModalsOverride {
		modals: typeof modals
	}
}

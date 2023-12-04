import { WorkshopUpdateModal } from '@components'

const modals = {
	workshopUpdate: WorkshopUpdateModal,
}

declare module '@mantine/modals' {
	export interface MantineModalsOverride {
		modals: typeof modals
	}
}

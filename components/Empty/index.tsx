import { Stack, Text } from '@mantine/core'
import { IconFolderOpen } from '@tabler/icons-react'

export const Empty = () => {
	return (
		<Stack
			align='center'
			c='dimmed'
		>
			<IconFolderOpen className='h-10 w-10' />
			<Text>No data</Text>
		</Stack>
	)
}

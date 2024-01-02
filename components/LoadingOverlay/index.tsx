'use client'

import { LogoAnimated } from '@components/icons/LogoAnimated'
import { Modal } from '@mantine/core'

interface LoadingOverlay {
	children: React.ReactNode
}

export const LoadingOverlay = ({ children }: LoadingOverlay) => {
	return (
		<div className='relative'>
			{children}
			<Modal
				opened
				onClose={() => console.log('close')}
				fullScreen
			>
				<div className='absolute left-0 right-0 top-0 z-[2000] flex h-screen items-center justify-center bg-white'>
					<LogoAnimated className='text-7xl' />
				</div>
			</Modal>
		</div>
	)
}

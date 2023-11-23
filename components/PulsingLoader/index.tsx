import { Logo } from '@components/icons/Logo'

import styles from './PulsingLoader.module.scss'

export const PulsingLoader = () => {
	return (
		<div className={styles.loader}>
			<Logo className='h-20 w-20' />
		</div>
	)
}

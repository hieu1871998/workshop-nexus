import { LogoAnimated } from '@components/icons/LogoAnimated'

import styles from './PulsingLoader.module.scss'

export const PulsingLoader = () => {
	return (
		<div className={styles.loader}>
			<LogoAnimated className='text-7xl text-gray-900' />
		</div>
	)
}

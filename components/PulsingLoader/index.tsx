import { Logo } from '@components/icons/Logo'
import styles from './PulsingLoader.module.scss'

export const PulsingLoader = () => {
  return (
    <div className={styles.loader}>
      <Logo className='w-20 h-20' />
    </div>
  )
}

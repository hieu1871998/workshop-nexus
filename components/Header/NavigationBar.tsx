import { Avatar } from '@nextui-org/avatar'
import { Session } from 'next-auth'

export const NavigationBar = ({ session }: { session: Session | null }) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div>Workshop Nexus</div>
      <Avatar
        src={session?.user?.image ?? ''}
      />
    </div>
  )
}

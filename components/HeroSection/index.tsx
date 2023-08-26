import { getServerSession } from 'next-auth'
import { HeroSectionTitle } from './HeroSectionTitle'
import { UserSection } from './UserSection'
import { authOptions } from '@lib/auth'

export const HeroSection = async () => {
  const session = await getServerSession(authOptions)
  return (
    <section className='container max-w-5xl mx-auto flex flex-col items-center'>
      <HeroSectionTitle />
      <div className='w-full flex justify-start sm:justify-center mt-10'>
        <UserSection session={session} />
      </div>
    </section>
  )
}

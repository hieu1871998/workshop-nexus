import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { WorkshopApplyForm } from '@components'
import { getServerSession } from 'next-auth'
import { ApplyPageTitleSection } from './ApplyPageTitleSection'

const BookingPage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <main className='container mx-auto px-4 min-h-screen max-w-5xl -mt-16'>
      <div className='grid grid-cols-2 h-full gap-x-10'>
        <ApplyPageTitleSection />
        <section className='col-span-1 h-full flex flex-col justify-center'>
          <WorkshopApplyForm session={session} />
        </section>
      </div>
    </main>
  )
}

export default BookingPage

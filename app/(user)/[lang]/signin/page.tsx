import { authOptions } from '@lib/auth'
import { SignInForm } from '@components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  console.log('session: ', session)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between pt-20'>
      <SignInForm />
    </main>
  )
}

export default LoginPage

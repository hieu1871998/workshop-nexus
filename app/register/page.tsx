'use client'
import { RegisterForm } from '@components'
import { Button, Input } from '@nextui-org/react'
import { FormEventHandler, useState } from 'react'

const UserPage = () => {
  const [loading, setLoading] = useState(false)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <RegisterForm />
    </main>
  )
}

export default UserPage

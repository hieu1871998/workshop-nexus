import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const GET =  async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    return NextResponse.json({ data: 'Authorized' }, { status: 200 })
  } else {
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 })
  }
}

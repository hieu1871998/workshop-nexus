import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json() as unknown
  console.log('workshop apply request: ', data)

  return NextResponse.json({ message: 'Hello' })
}

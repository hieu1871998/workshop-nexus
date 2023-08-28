'use client'

import { Avatar, Chip } from '@nextui-org/react'
import { UserWithProfile } from '@types'

export const UserProfile = ({
  user,
}: {
  user: UserWithProfile,
}) => {
  return (
    <div className='rounded-2xl border'>
      <div className='flex flex-col p-5 items-center'>
        <Avatar
          className='w-20 h-20'
          src={user?.image as string}
        />
        <p className='text-lg mt-5 font-semibold'>
          {user?.email}
        </p>
        <div className='flex gap-2'>
          {user.tags.map(tag => (
            <Chip
              key={tag.id}
              variant={tag.variant}
              color={tag.color}
            >
              {tag.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className='p-5 border-t'>
        <div className='grid grid-cols-4 gap-x-4'>
          <div className='col-span-1'>
            Name
          </div>
          <div className='font-semibold'>
            {user?.name}
          </div>
        </div>
        <div className='grid grid-cols-4 gap-x-4'>
          <div className='col-span-1'>
            Hosted
          </div>
          <div className='font-semibold'>
            {user.workshopsHosted.length}
          </div>
        </div>
      </div>
    </div>
  )
}

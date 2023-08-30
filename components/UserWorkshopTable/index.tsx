'use client'

import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { Workshop, WorkshopStatus } from '@prisma/client'
import { UserWithProfile, WorkshopWithCategoryAndTags } from '@types'
import { Key, useCallback } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

interface UserWorkshopTableProps {
  workshops: WorkshopWithCategoryAndTags[]
  user: UserWithProfile
}

export const UserWorkshopTable = ({ workshops }: UserWorkshopTableProps) => {
  const columns = [
    {
      key: 'topic',
      label: 'Topic'
    },
    {
      key: 'description',
      label: 'Description'
    },
    // {
    //   key: 'category',
    //   label: 'Category'
    // },
    // {
    //   key: 'tags',
    //   label: 'Tags'
    // },
    // {
    //   key: 'maxParticipants',
    //   label: 'Participants'
    // },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'action',
      label: 'Action'
    }
  ]

  const getBadgeColor = (status: Workshop['status']) => {
    switch (status) {
      case 'APPROVED': return 'success'
      case 'CANCELED': return 'danger'
      case 'COMPLETED': return 'primary'
      case 'ONGOING': return 'secondary'
      case 'PENDING': return 'default'
      case 'REJECTED': return 'danger'
    }
  }

  const renderCell = useCallback(
    (workshop: WorkshopWithCategoryAndTags, key: Key) => {
      const cellValue = workshop[key as keyof typeof workshop]

      switch (key) {
        case 'topic':
        case 'description': return (
          <p className='text-base'>{cellValue as string}</p>
        )
        case 'maxParticipants': return (
          <p className='text-base text-center'>{workshop._count.participants}</p>
        )
        case 'category': return (
          <div className='flex justify-center'>
            <Chip variant={workshop.category.variant} color={workshop.category.color}>
              {workshop.category.label}
            </Chip>
          </div>
        )
        case 'tags': return (
          <div className='flex gap-2 justify-center'>
            {workshop.tags.map(tag => (
              <Chip key={tag.id} variant={tag.variant} color={tag.color}>
                {tag.label}
              </Chip>
            ))}
          </div>
        )
        case 'status': return (
          <div className='flex justify-center'>
            <Chip
              color={getBadgeColor(cellValue as WorkshopStatus)}
              variant='dot'
            >
              {cellValue as WorkshopStatus}
            </Chip>
          </div>
        )
        case 'action': return (
          <div className='flex justify-center gap-2'>
            <Tooltip content='Update' color='primary'>
              <div className='p-1'>
                <PencilSquareIcon
                  className='w-5 h-5 cursor-pointer'
                />
              </div>
            </Tooltip>
            <Tooltip content='Cancel' color='danger'>
              <div className='p-1'>
                <TrashIcon
                  className='w-5 h-5 cursor-pointer text-red-500'
                />
              </div>
            </Tooltip>
          </div>
        )
        default: return cellValue as string
      }
    },
    []
  )

  return (
    <Table
      classNames={{
        wrapper: 'border shadow-none rounded-2xl',
        th: 'text-center text-base text-white bg-black'
      }}
      aria-label='Users hosted workshops'
      isVirtualized
      isHeaderSticky
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={workshops}>
        {item => (
          <TableRow key={item.id}>
            {key => (
              <TableCell>
                {renderCell(item, key)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

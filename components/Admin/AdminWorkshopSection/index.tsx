'use client'

import { DashboardWorkshops } from '@app/(admin)/[locale]/admin/workshop/action'
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import { Key, useCallback } from 'react'
import { DashboardWorkshop } from '@types'
import { getBadgeColor } from '@utils'
import { WorkshopStatus } from '@prisma/client'
import { FiSlash, FiCheckCircle } from 'react-icons/fi'
import dayjs from 'dayjs'

interface AdminWorkshopSectionProps {
  workshops: DashboardWorkshops
}

export const AdminWorkshopSection = ({
  workshops
}: AdminWorkshopSectionProps) => {
  'topic'
  'description'
  'host'
  'presentationDate'
  'status'
  'createdAt'
  'submissionDate'
  'approvalDate'
  'startDate'
  'completionDate'
  const columns = [
    {
      key: 'topic',
      label: 'Topic',
    },
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'host',
      label: 'Host'
    },
    {
      key: 'presentationDate',
      label: 'Presentation date'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'actions',
      label: 'Actions'
    }
  ]

  const renderCell = useCallback(
    (workshop: DashboardWorkshop, key: Key) => {
      const cellValue = workshop[key as keyof typeof workshop]

      switch (key) {
        case 'topic':
        case 'description': return (
          <p className='text-base'>{cellValue as string}</p>
        )
        case 'host': return (
          <User
            avatarProps={{
              src: workshop.host.image as string,
            }}
            name={workshop.host.name}
            description={workshop.host.email}
          />
        )
        case 'presentationDate': return (
          <p>{dayjs(workshop.presentationDate).format('DD/MM/YYYY')}</p>
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
        case 'actions': return (
          <div className='flex justify-center gap-2'>
            <Tooltip content='Approve'>
              <div className='p-1'>
                <FiCheckCircle
                  className='w-5 h-5 cursor-pointer'
                />
              </div>
            </Tooltip>
            <Tooltip content='Reject'>
              <div className='p-1'>
                <FiSlash
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
    <section className='flex gap-5'>
      <Table>
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
              {columnKey => (
                <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* {workshops.map(workshop => (
        <DashboardWorkshopItem
          key={workshop.id}
          workshop={workshop}
        />
      ))} */}
    </section>
  )
}

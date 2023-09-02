'use client'

import { DashboardWorkshops } from '@app/(admin)/[locale]/admin/workshop/action'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { AdminWorkshopTableCell } from './AdminWorkshopTableCell'

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

  return (
    <section className='flex gap-5'>
      <Table
        classNames={{
          th: 'text-center'
        }}
        color='primary'
        selectionMode='single'
        onRowAction={key => console.log('onRowAction: ', key)}
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
              {columnKey => (
                <TableCell>
                  <AdminWorkshopTableCell workshop={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}

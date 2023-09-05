'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection
} from '@nextui-org/react'
import { AdminWorkshopTableCell } from './AdminWorkshopTableCell'
import { useGetAdminWorkshops } from '@network/queries'
import { useMemo, useState } from 'react'
import { AdminWorkshop, GetAdminWorkshopsPayload } from '@types'
import { FiChevronDown } from 'react-icons/fi'
import { capitalize } from 'lodash'
import { WorkshopStatus } from '@prisma/client'

const DEFAULT_STATUSES: WorkshopStatus[] = [
  'APPROVED',
  'CANCELED',
  'COMPLETED',
  'DRAFT',
  'ONGOING',
  'PENDING',
  'REJECTED'
]

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

const PAGE_SIZE = 10

export const AdminWorkshopSection = () => {
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(DEFAULT_STATUSES))
  const payload = useMemo<GetAdminWorkshopsPayload>(
    () => ({
      page: 0,
      pageSize: PAGE_SIZE,
      orderBy: 'createdAt',
      status: Array.from(statusFilter) as WorkshopStatus[]
    }),
    [statusFilter]
  )
  const { data, isLoading, fetchNextPage } = useGetAdminWorkshops(payload)

  const items = useMemo(
    () => data?.pages.reduce(
      (previous, current) => [
        ...previous,
        ...(current?.workshops ?? [])
      ],
      [] as AdminWorkshop[]
    ) ?? [],
    [data?.pages]
  )

  const hasMore = useMemo(
    () => data?.pages?.[data.pages.length - 1]?.hasNextPage,
    [data?.pages]
  )

  const loadingState = useMemo(
    () => isLoading ? 'loading' : 'idle',
    [isLoading]
  )

  return (
    <section className='flex gap-5'>
      <Table
        classNames={{
          th: 'text-center',
          table: 'min-h-[520px]'
        }}
        aria-label='Workshops table'
        color='primary'
        selectionMode='single'
        topContent={(
          <div>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<FiChevronDown className='text-small' />} variant='flat'>
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={setStatusFilter}
              >
                {DEFAULT_STATUSES.map((status) => (
                  <DropdownItem key={status} className='capitalize'>
                    {capitalize(status)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        bottomContent={
          hasMore ? (
            <div className='flex w-full justify-center'>
              <Button onPress={() => void fetchNextPage()} isLoading={isLoading}>
                Load more
              </Button>
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {item => (
            <TableRow key={item?.id}>
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

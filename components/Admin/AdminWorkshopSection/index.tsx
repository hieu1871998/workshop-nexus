'use client'

import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { AdminWorkshopTableCell } from './AdminWorkshopTableCell'
import { useGetAdminWorkshops } from '@network/queries'
import { useMemo } from 'react'
import { AdminWorkshop, BaseListPayload } from '@types'

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
  const payload = useMemo<BaseListPayload>(
    () => ({
      page: 0,
      pageSize: PAGE_SIZE,
      orderBy: 'createdAt'
    }),
    []
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

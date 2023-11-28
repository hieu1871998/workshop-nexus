'use client'

import { useMemo } from 'react'
import { FiCheck, FiCheckCircle, FiClock, FiFileText, FiPlay, FiSlash, FiX, FiXCircle } from 'react-icons/fi'
import { Tooltip, useDisclosure, User } from '@nextui-org/react'
import { WorkshopStatus } from '@prisma/client'
import { Badge } from '@tremor/react'
import { AdminWorkshop } from '@types'
import { getBadgeColor } from '@utils'
import dayjs from 'dayjs'

import { AdminWorkshopDetailModal } from './AdminWorkshopDetailModal'

interface AdminWorkshopTableCellProps {
	workshop: AdminWorkshop
	columnKey: React.Key
}

export const AdminWorkshopTableCell = ({ workshop, columnKey }: AdminWorkshopTableCellProps) => {
	const cellValue = workshop[columnKey as keyof typeof workshop]

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const statusIcon = useMemo(() => {
		switch (workshop.status) {
			case 'APPROVED':
				return FiCheckCircle
			case 'CANCELED':
				return FiXCircle
			case 'COMPLETED':
				return FiCheck
			case 'DRAFT':
				return FiFileText
			case 'ONGOING':
				return FiPlay
			case 'PENDING':
				return FiClock
			case 'REJECTED':
				return FiX
		}
	}, [workshop.status])

	const cell = useMemo(() => {
		switch (columnKey) {
			case 'topic':
			case 'description':
				return <p className='line-clamp-2 text-base'>{cellValue as string}</p>
			case 'host':
				return (
					<User
						avatarProps={{
							src: workshop.host.image as string,
						}}
						name={workshop.host.name}
						description={workshop.host.email}
					/>
				)
			case 'presentationDate':
				return <p className='text-center'>{dayjs(workshop.presentationDate).format('DD/MM/YYYY')}</p>
			case 'status':
				return (
					<div className='flex justify-center'>
						<Badge
							color={getBadgeColor(cellValue as WorkshopStatus)}
							icon={statusIcon}
						>
							<span className='lowercase'>{cellValue as WorkshopStatus}</span>
						</Badge>
					</div>
				)
			case 'actions':
				return (
					<div className='flex justify-center gap-2'>
						<Tooltip content='Approve'>
							<div
								className='cursor-pointer p-1'
								onClick={onOpen}
							>
								<FiCheckCircle className='h-5 w-5' />
							</div>
						</Tooltip>
						<Tooltip content='Reject'>
							<div className='cursor-pointer p-1'>
								<FiSlash className='h-5 w-5 text-red-500' />
							</div>
						</Tooltip>
					</div>
				)
			default:
				return cellValue as string
		}
	}, [cellValue, columnKey, onOpen, statusIcon, workshop])

	return (
		<>
			<AdminWorkshopDetailModal
				id={workshop.id}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
			/>
			{cell}
		</>
	)
}

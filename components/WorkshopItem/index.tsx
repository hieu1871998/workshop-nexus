'use client'

import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react'
import { DashboardWorkshop } from '@types'
import dayjs from 'dayjs'
import NextImage from 'next/image'

interface WorkshopItemProps {
	workshop: DashboardWorkshop
}

export const WorkshopItem = ({ workshop }: WorkshopItemProps) => {
	const { description, host, presentationDate, topic, createdAt } = workshop
	const { email, name } = host

	return (
		<Card
			className='w-full'
			isHoverable
		>
			<CardHeader className='flex'>
				<div className='flex items-center gap-3'>
					<Image
						alt='nextui logo'
						height={40}
						radius='sm'
						src='/logo.svg'
						width={40}
						as={NextImage}
					/>
					<div className='flex flex-col'>
						<p className='text-base'>{topic}</p>
						<p className='text-xs text-gray-500'>
							{name} - {email}
						</p>
					</div>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{description}</p>
			</CardBody>
			<Divider />
			<CardFooter className='flex justify-between'>
				<div className='text-xs text-gray-500'>Created: {dayjs(createdAt).format('DD/MM/YYYY')}</div>
				<div className='text-xs text-gray-500'>Presentation: {dayjs(presentationDate).format('DD/MM/YYYY')}</div>
			</CardFooter>
		</Card>
	)
}

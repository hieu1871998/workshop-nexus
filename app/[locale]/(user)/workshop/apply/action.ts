'use server'

import prisma from '@lib/prisma'
import { WorkshopStatus } from '@prisma/client'
import { WorkshopApplyPayload } from '@types'
import { convertToSlug } from '@utils'
import { list } from '@vercel/blob'
import { omit } from 'lodash'

import json from './data.json'

export const applyWorkshop = async (data: WorkshopApplyPayload) => {
	const blobs = await list()
	console.log('blobs: ', blobs)
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	})

	const tags = await prisma.workshopTag.findMany({
		where: {
			id: {
				in: data.tagIds,
			},
		},
	})

	if (user) {
		const workshop = await prisma.workshop.create({
			data: {
				hostId: user.id,
				slug: convertToSlug(data.topic),
				tags: {
					connect: tags,
				},
				...omit(data, ['email', 'tagIds']),
			},
		})

		await prisma.user.update({
			where: {
				email: data.email,
			},
			data: {
				workshopsHosted: {
					connect: workshop,
				},
			},
		})

		return workshop
	}
}

export const applyFakeWorkshopData = async () => {
	let success = 0
	let err = 0

	const temp = json as unknown as WorkshopApplyPayload[]

	const statuses = [
		WorkshopStatus.APPROVED,
		WorkshopStatus.CANCELED,
		WorkshopStatus.COMPLETED,
		WorkshopStatus.DRAFT,
		WorkshopStatus.ONGOING,
		WorkshopStatus.PENDING,
		WorkshopStatus.REJECTED,
	]

	const users = await prisma.user.findMany()
	const randomTags = await prisma.workshopTag.findMany()
	const categories = await prisma.category.findMany()
	const thumbnails = await prisma.workshopThumbnail.findMany()

	for (const data of temp) {
		try {
			const user = users.sort(() => Math.random() - 0.5)[0]
			const tags = randomTags.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * randomTags.length))
			const category = categories.sort(() => Math.random() - 0.5)[0]
			const thumb = thumbnails.sort(() => Math.random() - 0.5)[0]
			const status = statuses.sort(() => Math.random() - 0.5)[0]

			const [dateSmall, dateBig, endDate] = getRandomDate()

			if (user) {
				const thumbnail = await prisma.workshopThumbnail.create({
					data: {
						...omit(thumb, ['id']),
					},
				})
				data.categoryId = category.id
				data.workshopThumbnailId = thumbnail.id
				data.status = status

				if (status !== WorkshopStatus.DRAFT) {
					data.approvalDate = dateBig
				}

				data.completionDate = endDate
				data.createdAt = dateSmall
				data.startDate = dateSmall
				data.presentationDate = endDate

				const workshop = await prisma.workshop.create({
					data: {
						hostId: user.id,
						slug: convertToSlug(data.topic),
						tags: {
							connect: tags,
						},
						...omit(data, ['email', 'tagIds']),
					},
				})
				await prisma.user.update({
					where: {
						email: user.email,
					},
					data: {
						workshopsHosted: {
							connect: workshop,
						},
					},
				})
				success += 1
				// return workshop
				console.log('Succes Topic: ', data.topic)
			}
		} catch (e) {
			console.error('Error Topic: ', data.topic)

			err += 1
			continue
		}
	}
	console.log('Total: ', json.length, '. Success: ', success, '. Error: ', err)
}

function getRandomDate() {
	const minYear = 2020
	const currentDate = new Date()

	// Tạo một đối tượng Date với thời điểm tối thiểu (năm 2020)
	const minDate = new Date(minYear, 0, 1) // Tháng bắt đầu từ 0

	// Lấy timestamp của thời điểm tối thiểu và hiện tại
	const minTimestamp = minDate.getTime()
	const currentTimestamp = currentDate.getTime()

	// Sinh timestamp ngẫu nhiên trong khoảng từ minTimestamp đến currentTimestamp
	const randomTimestamp1 = Math.floor(Math.random() * (currentTimestamp - minTimestamp + 1)) + minTimestamp
	const randomTimestamp2 = Math.floor(Math.random() * (currentTimestamp - minTimestamp + 1)) + minTimestamp

	const [smallerTimestamp, largerTimestamp] =
		randomTimestamp1 < randomTimestamp2 ? [randomTimestamp1, randomTimestamp2] : [randomTimestamp2, randomTimestamp1]

	const smallerDate = new Date(smallerTimestamp)
	const largerDate = new Date(largerTimestamp)

	const endDate = new Date(largerDate)
	endDate.setDate(largerDate.getDate() + 7)

	return [smallerDate, largerDate, endDate]
}

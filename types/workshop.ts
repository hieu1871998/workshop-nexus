import { Dayjs } from 'dayjs'

export interface WorkshopApplyPayload {
  email: string
  topic: string
  description: string
  categoryId: string
  maxParticipants: number
  presentationDate: Dayjs
}

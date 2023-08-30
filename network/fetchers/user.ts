import { ApiRoute } from '@constants'
import { fetcher } from '@network/utils/fetcher'
import { GetUserWorkshopPayload, UserWithProfile, WorkshopWithCategoryAndTags } from '@types'

export const getUserProfile = (id: string) => {
  return fetcher<UserWithProfile>(
    `${ApiRoute.USER}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export const getUserWorkshops = (payload: GetUserWorkshopPayload) => {
  return fetcher<WorkshopWithCategoryAndTags>(
    `${ApiRoute.USER_WORKSHOP}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )
}

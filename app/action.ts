'use server'

import { revalidatePath } from 'next/cache'

export const revalidateAllPath = () => {
	revalidatePath('/', 'layout')
}

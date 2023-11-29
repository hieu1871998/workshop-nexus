import { FileWithPath } from 'react-dropzone-esm'
import { fetcher } from '@network/utils/fetcher'

import { WorkshopThumbnail } from '.prisma/client'

export const uploadWorkshopThumbnail = async (file: FileWithPath) =>
	fetcher<WorkshopThumbnail>(`api/upload/thumbnail?filename=${file.name}`, {
		method: 'POST',
		body: file,
	})

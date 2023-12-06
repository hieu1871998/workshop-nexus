import { KeyboardEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
	Badge,
	Button,
	Center,
	Flex,
	Loader,
	Select,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	TextInput,
} from '@mantine/core'
import { updateAdminCategory } from '@network/fetchers/setting'
import { useGetAdminUserTags } from '@network/queries'
import { TagColor, TagVariant } from '@prisma/client'
import SearchIcon from '@public/icons/SearchIcon'
import { AdminUserTag, GetAdminUserTagsPayload } from '@types'

const COLOR = Object.values(TagColor)
const VARIANT = Object.values(TagVariant)

export const AdminUserTagSettings = () => {
	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState<AdminUserTag>()
	const [payload, setPayload] = useState({
		page: 1,
	} as GetAdminUserTagsPayload)

	const { data, isLoading, isFetching, fetchNextPage, refetch } = useGetAdminUserTags(payload)

	const tags = useMemo(
		() =>
			data?.pages.reduce((previous, current) => [...previous, ...(current?.tags ?? [])], [] as AdminUserTag[]) ?? [],
		[data?.pages]
	)

	const hasMore = useMemo(() => data?.pages?.[data.pages.length - 1]?.hasNextPage, [data?.pages])

	const rows = useMemo(
		() =>
			tags.map(category => (
				<TableTr
					key={category.id}
					onClick={() => setSelected(category)}
				>
					<TableTd>
						<Badge
							color={category.color}
							variant={category.variant}
						>
							{category.label}
						</Badge>
					</TableTd>
					<TableTd>{category.color}</TableTd>
					<TableTd>{category.variant}</TableTd>
				</TableTr>
			)),
		[tags]
	)

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
		setSelected(undefined)
	}

	const handleSave = async () => {
		try {
			if (selected) {
				const res = await updateAdminCategory(selected)
				if (res?.id) {
					await refetch()
					setPayload({
						page: 1,
					})
					toast.success('Update success')
					setSelected(undefined)
				}
			}
		} catch (e) {
			toast.error('An error occurred!')
		}
	}

	if (isLoading)
		return (
			<Center
				maw='100%'
				h='100%'
			>
				<Loader />
			</Center>
		)

	return (
		<div>
			<TextInput
				className='w-full'
				placeholder='Search for label'
				value={search}
				onKeyDown={e => onSearchChange(e)}
				onChange={e => setSearch(e.target.value)}
				leftSection={<SearchIcon />}
				onBlur={() => setPayload({ ...payload, query: search })}
			/>

			{selected && (
				<Flex
					gap='xs'
					mt='xs'
					mb='xs'
					direction='column'
				>
					<Flex>
						<Badge
							color={selected?.color}
							variant={selected?.variant}
							style={{ flexShrink: 0 }}
						>
							{selected?.label}
						</Badge>
					</Flex>
					<Flex gap='xs'>
						<TextInput
							className='w-full'
							placeholder='Search for label'
							value={selected?.label}
							onChange={e => setSelected({ ...selected, label: e.target.value })}
						/>
						<Select
							value={selected?.color}
							data={COLOR}
							onChange={e => setSelected({ ...selected, color: e as TagColor })}
						/>
						<Select
							value={selected?.variant}
							data={VARIANT}
							onChange={e => setSelected({ ...selected, variant: e as TagVariant })}
						/>
						<Button onClick={() => void handleSave()}>Save</Button>
					</Flex>
				</Flex>
			)}

			<Table
				highlightOnHover
				striped
				withRowBorders={false}
			>
				<TableThead>
					<TableTr>
						<TableTh>Label</TableTh>
						<TableTh>Color</TableTh>
						<TableTh>Variant</TableTh>
					</TableTr>
				</TableThead>
				<TableTbody>{rows}</TableTbody>
			</Table>

			{hasMore && !!tags.length && (
				<Flex justify='center'>
					<Button
						onClick={() => {
							void fetchNextPage()
						}}
						loading={isFetching}
					>
						Show more
					</Button>
				</Flex>
			)}
		</div>
	)
}

import { KeyboardEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import {
	Badge,
	Button,
	Center,
	CloseButton,
	Flex,
	Loader,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { deleteAdminUserTag, updateAdminUserTag } from '@network/fetchers/setting'
import { useGetAdminUserTags } from '@network/queries'
import SearchIcon from '@public/icons/SearchIcon'
import { AdminUserTag, GetAdminUserTagsPayload } from '@types'
import { useTranslations } from 'next-intl'

import { AdminTagModal, SettingForm } from './AdminTagModal'

export const AdminUserTagSettings = () => {
	const t = useTranslations('workshopDetailpage')
	const [search, setSearch] = useState('')
	const [isEdit, setEdit] = useState(false)
	const [opened, { open, close }] = useDisclosure(false)
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
					onClick={() => {
						open()
						setEdit(true)
						setSelected(category)
					}}
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
					<TableTd>
						<CloseButton
							onClick={() => {
								setTimeout(() => {
									close()
									openDeleteModal(category)
								})
							}}
						/>
					</TableTd>
				</TableTr>
			)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[tags]
	)

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
		setSelected(undefined)
	}

	const openDeleteModal = (category: AdminUserTag) =>
		modals.openConfirmModal({
			title: `Are you sure you want to delete '${category.label}'?`,
			labels: { confirm: t('attendModal.confirm'), cancel: t('attendModal.cancel') },
			onCancel: () => setSelected(undefined),
			onConfirm: () => {
				setSelected(undefined)
				void handleDelete(category.id)
			},
		})

	const handleDelete = (id: number) => {
		deleteAdminUserTag(id)
			.then(v => {
				if (v) {
					toast.success('Delete success')
					setPayload({
						page: 1,
					})
					void refetch()
				}
			})
			.catch(e => {
				toast.error('An error occurred!' + e)
			})
	}

	const handleSave = async (value: SettingForm) => {
		try {
			const res = await updateAdminUserTag(value as AdminUserTag)
			if (res?.id) {
				await refetch()
				setPayload({
					page: 1,
				})
				toast.success('Update success')
				setSelected(undefined)
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
			<Flex justify='end'>
				<Button
					leftSection={<PlusCircleIcon />}
					onClick={() => {
						open()
						setEdit(false)
						setSelected({
							id: 0,
							label: '',
							color: 'blue',
							variant: 'default',
						})
					}}
					mb='12px'
				>
					Add Tag
				</Button>
			</Flex>

			<TextInput
				className='w-full'
				placeholder='Search for label'
				value={search}
				onKeyDown={e => onSearchChange(e)}
				onChange={e => setSearch(e.target.value)}
				leftSection={<SearchIcon />}
				onBlur={() => setPayload({ ...payload, query: search })}
			/>

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

			{hasMore && (
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

			{selected && (
				<AdminTagModal
					opened={opened}
					onClose={(refresh?: boolean) => {
						close()
						if (refresh) {
							setPayload({
								page: 1,
							})
							void refetch()
						}
						setSelected(undefined)
					}}
					tab='userTags'
					isEdit={isEdit}
					onSave={e => void handleSave(e)}
					selected={selected as SettingForm}
				/>
			)}
		</div>
	)
}

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
import { deleteAdminCategory, updateAdminCategory } from '@network/fetchers/setting'
import { useGetAdminCategories } from '@network/queries'
import SearchIcon from '@public/icons/SearchIcon'
import { AdminCategory, GetAdminCategoriesPayload } from '@types'
import { useTranslations } from 'next-intl'

import { AdminTagModal, SettingForm } from './AdminTagModal'

export const AdminCategorySettings = () => {
	const t = useTranslations('workshopDetailpage')
	const [search, setSearch] = useState('')
	const [isEdit, setEdit] = useState(false)
	const [opened, { open, close }] = useDisclosure(false)
	const [selected, setSelected] = useState<AdminCategory>()
	const [payload, setPayload] = useState({
		page: 1,
	} as GetAdminCategoriesPayload)

	const { data, isLoading, isFetching, fetchNextPage, refetch } = useGetAdminCategories(payload)

	const categories = useMemo(
		() =>
			data?.pages.reduce((previous, current) => [...previous, ...(current?.categories ?? [])], [] as AdminCategory[]) ??
			[],
		[data?.pages]
	)

	const hasMore = useMemo(() => data?.pages?.[data.pages.length - 1]?.hasNextPage, [data?.pages])

	const rows = useMemo(
		() =>
			categories.map(category => (
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
		[categories]
	)

	const onSearchChange = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') setPayload({ ...payload, query: search })
		setSelected(undefined)
	}

	const openDeleteModal = (category: AdminCategory) =>
		modals.openConfirmModal({
			title: `Are you sure you want to delete '${category.label}'?`,
			labels: { confirm: t('attendModal.confirm'), cancel: t('attendModal.cancel') },
			onCancel: () => setSelected(undefined),
			onConfirm: () => {
				setSelected(undefined)
				void handleDelete(category.id)
			},
		})

	const handleDelete = (id: string) => {
		deleteAdminCategory(id)
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
			const res = await updateAdminCategory(value as AdminCategory)
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
							id: '',
							label: '',
							color: 'blue',
							variant: 'default',
						})
					}}
					mb='12px'
				>
					Add Category
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
						<TableTh></TableTh>
					</TableTr>
				</TableThead>
				<TableTbody>{rows}</TableTbody>
			</Table>

			{hasMore && !!categories.length && (
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
					tab='categories'
					isEdit={isEdit}
					onSave={e => void handleSave(e)}
					selected={selected as SettingForm}
				/>
			)}
		</div>
	)
}

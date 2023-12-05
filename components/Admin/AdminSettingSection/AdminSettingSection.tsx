'use client'

import { useState } from 'react'
import { Box, Container, Flex, Tabs, TabsList, TabsTab } from '@mantine/core'

import { AdminCategorySettings } from './AdminCategorySettings'
import { AdminUserTagSettings } from './AdminUserTagSettings'
import { AdminWorkshopTagSettings } from './AdminWorkshopTagSettings'

export const AdminSettingSection = () => {
	const [tab, setTab] = useState<'userTags' | 'workshopTags' | 'categories'>('userTags')

	return (
		<section>
			<Container fluid>
				<Flex gap='sm'>
					<Box style={{ flexShrink: 0 }}>
						<Tabs orientation='vertical'>
							<TabsList>
								<TabsTab
									value='UserTags'
									onClick={() => setTab('userTags')}
								>
									User Tags
								</TabsTab>
								<TabsTab
									value='WorkshopTags'
									onClick={() => setTab('workshopTags')}
								>
									Workshop Tags
								</TabsTab>

								<TabsTab
									value='categories'
									onClick={() => setTab('categories')}
								>
									Categories
								</TabsTab>
							</TabsList>
						</Tabs>
					</Box>
					<Box style={{ overflow: 'auto', flexGrow: 1 }}>
						{tab === 'userTags' && <AdminUserTagSettings />}
						{tab === 'workshopTags' && <AdminWorkshopTagSettings />}
						{tab === 'categories' && <AdminCategorySettings />}
					</Box>
				</Flex>
			</Container>
		</section>
	)
}

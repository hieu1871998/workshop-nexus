'use client'

import { Card, CardSection, Container, Grid, GridCol, Tabs, TabsPanel, TabsTab } from '@mantine/core'

export const AdminSettingSection = () => {
	const SETTING_TAB = [
		{
			label: 'Tag',
			value: 'tag',
			panel: 'tag',
		},
	]

	return (
		<section>
			<Container fluid>
				<Grid gutter='sm'>
					<Tabs
						defaultValue='Tags'
						orientation='vertical'
					>
						<Tabs.List>
							{SETTING_TAB.map((setting, idx) => (
								<TabsTab
									key={idx}
									value={setting.value}
									p='md'
								>
									{setting.label}
								</TabsTab>
							))}
						</Tabs.List>

						{SETTING_TAB.map((setting, idx) => (
							<TabsPanel
								key={idx}
								value={setting.value}
								p='md'
							>
								{setting.panel}
							</TabsPanel>
						))}
					</Tabs>
				</Grid>
			</Container>
		</section>
	)
}

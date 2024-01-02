import { useState } from 'react'
import { Box, Collapse, Divider, Group, rem, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconMinus, IconPlus, TablerIconsProps } from '@tabler/icons-react'
import { AnimatePresence, m } from 'framer-motion'

import classes from './FilterGroup.module.scss'

interface LinksGroupProps {
	icon: React.FC<TablerIconsProps>
	label: string
	initiallyOpened?: boolean
	links?: { label: string; link: string }[]
	children: React.ReactNode
}

export const FilterGroup = ({ icon: Icon, label, initiallyOpened, children }: LinksGroupProps) => {
	const [opened, setOpened] = useState(initiallyOpened || false)

	return (
		<>
			<Divider />
			<UnstyledButton
				onClick={() => setOpened(o => !o)}
				className='w-full border-t py-2'
			>
				<Group
					justify='space-between'
					align='center'
					gap={0}
				>
					<Group gap={8}>
						<ThemeIcon variant='subtle'>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Text>{label}</Text>
					</Group>
					<Box className='relative flex h-5 w-5 items-center'>
						<AnimatePresence
							initial={false}
							mode='wait'
						>
							<m.div
								className='absolute right-0 top-0'
								animate={{ opacity: opened ? 0 : 1, rotate: opened ? '90deg' : '0deg' }}
							>
								<IconPlus
									className={`${classes.chevron}`}
									stroke={1.5}
									style={{
										width: rem(16),
										height: rem(16),
									}}
								/>
							</m.div>
							<m.div
								className='absolute right-0 top-0'
								animate={{ opacity: opened ? 1 : 0, rotate: opened ? '0deg' : '90deg' }}
							>
								<IconMinus
									className={`${classes.chevron}`}
									stroke={1.5}
									style={{
										width: rem(16),
										height: rem(16),
									}}
								/>
							</m.div>
						</AnimatePresence>
					</Box>
				</Group>
			</UnstyledButton>
			<Collapse in={opened}>{children}</Collapse>
		</>
	)
}

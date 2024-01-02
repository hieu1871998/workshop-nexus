'use client'

import { ErrorInfo } from 'react'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps as ReactFallbackProps } from 'react-error-boundary'
import { InlineCodeHighlight } from '@mantine/code-highlight'
import { ActionIcon, Card, Group, Stack, Title, Tooltip } from '@mantine/core'
import { IconArrowBack, IconRotateClockwise } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const logError = (error: Error, info: ErrorInfo) => {
	console.error(error, info)
}

interface FallbackProps extends ReactFallbackProps {
	error: { message: string }
}

const Fallback = ({ resetErrorBoundary, error }: FallbackProps) => {
	const router = useRouter()
	const t = useTranslations('errorBoundary')

	return (
		<Card
			classNames={{
				root: 'bg-red-100 border-red-500',
			}}
			withBorder
			padding='lg'
		>
			<Stack>
				<Group justify='space-between'>
					<Title
						order={3}
						c='red'
					>
						{t('title')}
					</Title>
					<Group gap={4}>
						<Tooltip label={t('reloadLabel')}>
							<ActionIcon
								variant='outline'
								color='red'
								onClick={() => router.refresh()}
							>
								<IconArrowBack />
							</ActionIcon>
						</Tooltip>
						<Tooltip label={t('retryLabel')}>
							<ActionIcon
								color='red'
								onClick={resetErrorBoundary}
							>
								<IconRotateClockwise />
							</ActionIcon>
						</Tooltip>
					</Group>
				</Group>
				<InlineCodeHighlight code={error.message} />
			</Stack>
		</Card>
	)
}

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactErrorBoundary
			FallbackComponent={Fallback}
			onError={logError}
		>
			{children}
		</ReactErrorBoundary>
	)
}

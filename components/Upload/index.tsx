import { useRef } from 'react'

interface UploadProps {
	children: React.ReactNode
	onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	classNames?: {
		input?: string
	}
	styles?: {
		input?: React.CSSProperties
	}
	id?: string
	accept?: string
	multiple?: boolean
}

export const Upload = (props: UploadProps) => {
	const { children, onClick, className, classNames, disabled, style, styles, id, accept, multiple } = props
	const inputFileRef = useRef<HTMLInputElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
		const fileInput = inputFileRef.current

		if (!fileInput) {
			return
		}

		if (children && (children as React.ReactElement).type === 'button') {
			const parent = fileInput.parentNode as HTMLInputElement

			parent.focus()
			parent.querySelector('button')?.blur()
		}

		fileInput.click()

		if (onClick) {
			onClick(event)
		}
	}

	return (
		<div
			className={className}
			style={style}
			onClick={handleClick}
		>
			<input
				ref={inputFileRef}
				id={id}
				className={classNames?.input}
				style={{
					display: 'none',
					...styles?.input,
				}}
				type='file'
				onClick={event => event.stopPropagation()}
				accept={accept}
				disabled={disabled}
				multiple={multiple}
				onChange={event => console.log('onChange: ', event.target)}
			/>
			{children}
		</div>
	)
}

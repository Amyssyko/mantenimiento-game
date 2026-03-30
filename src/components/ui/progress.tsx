'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type ProgressProps = React.ComponentProps<'div'> & {
	value?: number
	max?: number
}

function Progress({ className, value, max = 100, ...props }: ProgressProps) {
	const clampedValue = Math.min(Math.max(value ?? 0, 0), max)
	const progress = max > 0 ? (clampedValue / max) * 100 : 0

	return (
		<div
			data-slot='progress'
			role='progressbar'
			aria-valuemin={0}
			aria-valuemax={max}
			aria-valuenow={Math.round(clampedValue)}
			className={cn(
				'relative flex items-center bg-muted rounded-full w-full h-1 overflow-x-hidden',
				className
			)}
			{...props}>
			<div
				data-slot='progress-indicator'
				className='flex-1 bg-primary size-full transition-all'
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</div>
	)
}

export { Progress }

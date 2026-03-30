import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const alertVariants = cva(
	"group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	)
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-title'
			className={cn(
				'group-has-[>svg]/alert:col-start-2 cn-font-heading font-medium [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3',
				className
			)}
			{...props}
		/>
	)
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-description'
			className={cn(
				'[&_p:not(:last-child)]:mb-4 text-muted-foreground [&_a]:hover:text-foreground text-sm [&_a]:underline [&_a]:underline-offset-3 text-balance md:text-pretty',
				className
			)}
			{...props}
		/>
	)
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-action'
			className={cn('top-2 right-2 absolute', className)}
			{...props}
		/>
	)
}

export { Alert, AlertAction, AlertDescription, AlertTitle }

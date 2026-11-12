import * as React from 'react'
import { cn } from '@/lib/utils'

function Alert({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn('rounded-md border border-border bg-surface text-ink shadow-card', className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn('text-item-title text-ink', className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-description" className={cn('text-meta text-ink-muted', className)} {...props} />
  )
}

export { Alert, AlertTitle, AlertDescription }

import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('rounded-md border border-border bg-surface text-ink shadow-card', className)}
      {...props}
    />
  )
}

export { Card }

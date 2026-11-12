import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 text-label',
  {
    variants: {
      variant: {
        done: 'bg-status-done-bg text-status-done-ink',
        todo: 'bg-status-todo-bg text-status-todo-ink',
        overdue: 'bg-status-overdue-bg text-status-overdue-ink',
        late: 'bg-status-late-bg text-status-late-ink',
      },
    },
    defaultVariants: { variant: 'todo' },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

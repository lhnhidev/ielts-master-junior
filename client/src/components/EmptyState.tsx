import { ClipboardList } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function EmptyState() {
  return (
    <Card className="flex flex-col items-center gap-4 py-16">
      <div className="flex size-12 items-center justify-center rounded-md border border-border bg-page text-ink-muted">
        <ClipboardList className="size-6" strokeWidth={2} aria-hidden="true" />
      </div>
      <p className="text-item-title text-ink">Bạn chưa có bài tập nào</p>
    </Card>
  )
}

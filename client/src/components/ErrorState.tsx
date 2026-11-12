import { useEffect, useRef } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  onRetry: () => void
  /** Move focus to the retry button; only set when the error follows a user retry. */
  focusRetry?: boolean
}

export function ErrorState({ onRetry, focusRetry = false }: ErrorStateProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (focusRetry) buttonRef.current?.focus()
  }, [focusRetry])

  return (
    <Alert className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-status-overdue-bg text-status-overdue-ink">
        <TriangleAlert className="size-5" strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <AlertTitle>Chưa tải được bài tập của bạn</AlertTitle>
        <AlertDescription>Kết nối bị gián đoạn. Vui lòng thử lại sau ít phút.</AlertDescription>
      </div>
      <Button ref={buttonRef} onClick={onRetry} className="w-full sm:w-auto">
        Thử lại
      </Button>
    </Alert>
  )
}

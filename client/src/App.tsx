import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { AssignmentList } from '@/components/AssignmentList'
import { AssignmentSkeleton } from '@/components/AssignmentSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAssignments, type AssignmentsResponse } from '@/lib/api'
import { formatDateTime } from '@/lib/format'

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: AssignmentsResponse }

function App() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [userRetried, setUserRetried] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetchAssignments(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setUserRetried(true)
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  const key = state.status === 'ready' ? (state.data.assignments.length ? 'list' : 'empty') : state.status

  return (
    <MotionConfig reducedMotion="user">
      <header className="flex h-14 items-center border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-[960px] px-4 sm:px-8">
          <span className="text-wordmark text-ink">IELTS Master</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[960px] px-4 pb-8 pt-6 sm:px-8 sm:pb-16 sm:pt-10">
        <h1 className="text-page-title text-ink">Bài tập của tôi</h1>
        <div className="mt-1 flex h-5 items-center text-meta text-ink-muted">
          {state.status === 'ready' ? (
            <p>
              Học viên {state.data.studentId} · Thời điểm giả lập: {formatDateTime(state.data.now)}
            </p>
          ) : state.status === 'loading' ? (
            <Skeleton className="h-3.5 w-72 max-w-full" />
          ) : null}
        </div>

        <div className="mt-5 sm:mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {state.status === 'loading' && <AssignmentSkeleton />}
              {state.status === 'error' && <ErrorState onRetry={retry} focusRetry={userRetried} />}
              {state.status === 'ready' &&
                (state.data.assignments.length === 0 ? (
                  <EmptyState />
                ) : (
                  <AssignmentList assignments={state.data.assignments} now={state.data.now} />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </MotionConfig>
  )
}

export default App

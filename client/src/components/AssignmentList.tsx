import { motion } from 'motion/react'
import { StatusBadge } from '@/components/StatusBadge'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Assignment } from '@/lib/api'
import { describeAssignment, formatDateTime } from '@/lib/format'

const MotionRow = motion.create(TableRow)

const rowMotion = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: 'easeOut' as const, delay: i * 0.04 },
})

export function AssignmentTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Tên bài</TableHead>
        <TableHead className="w-44">Hạn nộp</TableHead>
        <TableHead className="w-72">Trạng thái</TableHead>
      </TableRow>
    </TableHeader>
  )
}

interface AssignmentListProps {
  assignments: Assignment[]
  now: string
}

export function AssignmentList({ assignments, now }: AssignmentListProps) {
  const items = assignments.map((a) => ({ a, d: describeAssignment(a, now) }))

  return (
    <>
      <Card className="hidden overflow-hidden p-0 sm:block">
        <Table>
          <AssignmentTableHeader />
          <TableBody>
            {items.map(({ a, d }, i) => (
              <MotionRow key={a.id} className="h-16 hover:bg-page" {...rowMotion(i)}>
                <TableCell className="text-item-title text-ink">{a.title}</TableCell>
                <TableCell className="text-meta tabular-nums text-ink">{formatDateTime(a.dueAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {d.badges.map((kind) => (
                      <StatusBadge key={kind} kind={kind} index={i} />
                    ))}
                  </div>
                  <div className="mt-1 text-meta text-ink-muted">{d.info}</div>
                </TableCell>
              </MotionRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <ul className="flex flex-col gap-3 sm:hidden">
        {items.map(({ a, d }, i) => (
          <motion.li key={a.id} {...rowMotion(i)}>
            <Card className="p-4">
              <div className="text-item-title text-ink">{a.title}</div>
              <div className="text-meta text-ink-muted">
                Hạn nộp <span className="tabular-nums text-ink">{formatDateTime(a.dueAt)}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {d.badges.map((kind) => (
                  <StatusBadge key={kind} kind={kind} index={i} />
                ))}
              </div>
              <div className="mt-1 text-meta text-ink-muted">{d.info}</div>
            </Card>
          </motion.li>
        ))}
      </ul>
    </>
  )
}

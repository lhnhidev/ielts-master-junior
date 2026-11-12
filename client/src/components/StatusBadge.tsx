import { Check, Clock, TriangleAlert } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import type { BadgeKind } from '@/lib/format'

const CONFIG = {
  done: { label: 'Đã nộp', Icon: Check },
  todo: { label: 'Chưa nộp', Icon: Clock },
  overdue: { label: 'Quá hạn', Icon: TriangleAlert },
  late: { label: 'Nộp trễ', Icon: Clock },
} as const

interface StatusBadgeProps {
  kind: BadgeKind
  /** Row index, used to delay the "Nộp trễ" pop-in after its row starts entering. */
  index?: number
}

export function StatusBadge({ kind, index = 0 }: StatusBadgeProps) {
  const { label, Icon } = CONFIG[kind]
  const badge = (
    <Badge variant={kind}>
      <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
      {label}
    </Badge>
  )
  if (kind !== 'late') return badge
  return (
    <motion.span
      className="inline-flex"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.04 + 0.12 }}
    >
      {badge}
    </motion.span>
  )
}

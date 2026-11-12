import { AssignmentTableHeader } from '@/components/AssignmentList'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const ROWS = [0, 1, 2, 3]

export function AssignmentSkeleton() {
  return (
    <div aria-busy="true">
      <span role="status" className="sr-only">
        Đang tải bài tập
      </span>

      <Card className="hidden overflow-hidden p-0 sm:block" aria-hidden="true">
        <Table>
          <AssignmentTableHeader />
          <TableBody>
            {ROWS.map((i) => (
              <TableRow key={i} className="h-16">
                <TableCell>
                  <Skeleton className="h-4 w-56 max-w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3.5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="mt-1 h-3.5 w-40" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex flex-col gap-3 sm:hidden" aria-hidden="true">
        {ROWS.map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-1.5 h-3.5 w-40" />
            <Skeleton className="mt-3 h-6 w-24" />
            <Skeleton className="mt-1 h-3.5 w-48" />
          </Card>
        ))}
      </div>
    </div>
  )
}

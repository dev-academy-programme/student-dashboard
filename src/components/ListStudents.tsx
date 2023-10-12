import { StudentSummary } from '../github.ts'
import StudentsSummaryRow from './StudentsSummaryRow.tsx'

interface Props {
  data: StudentSummary[]
  sort: string
  direction?: string
}

function ListStudents({ data, direction }: Props) {
  direction = direction || 'asc'
  direction = direction === 'asc' ? 'desc' : 'asc'
  return (
    <table className="table-auto border-collapse border border-slate-500">
      <thead>
        <tr className="bg-slate-800">
          <th className="p-4">
            <a className="cursor-pointer" href={`/?sort=date`}>
              Commit Date
            </a>
          </th>
          <th className="p-4">
            <a href={`/?sort=name&direction=${direction}`}>Student</a>
          </th>
          <th className="p-4">
            <a href={`/?sort=commits&direction=${direction}`}># Commits</a>
          </th>
          <th className="p-4">
            <p>
              <a href={`/?sort=progress&direction=${direction}`}>
                Progress Score
              </a>
              <br />
              <span className="text-xs text-gray-500">
                (# commits / Std of commits)
              </span>
            </p>
          </th>
          <th className="p-4">Challenge/Repo</th>
        </tr>
      </thead>
      <StudentsSummaryRow data={data} />
    </table>
  )
}

export default ListStudents

import ListCommitsByDay from '../components/ListCommitsByDay.tsx'
import ListStudents from '../components/ListStudents.tsx'
import PivotCommits from '../components/PivotCommits.tsx'
import { StudentSummary } from '../github.ts'

interface Props {
  sort: string
  studentSummary: StudentSummary[]
  pivotReposStudents: { [key: string]: { [key: string]: number } }
  pivotDaysStudents: { [key: string]: { [key: string]: number } }
  uniqueNames: string[]
  direction?: string
}

function Index({
  uniqueNames,
  studentSummary,
  pivotReposStudents,
  pivotDaysStudents,
  sort,
  direction,
}: Props) {
  return (
    <div className="flex flex-col gap-10 w-fit items-center justify-center mx-auto">
      <h2 className="self-start text-lg font-medium text-slate-400">
        A list of all students in the cohort
      </h2>

      <ListStudents direction={direction} sort={sort} data={studentSummary} />
      <h2 className="self-start text-lg font-medium text-slate-400">
        Total commits for each student for all challenges
      </h2>
      <PivotCommits
        studentNames={uniqueNames}
        pivotTable={pivotReposStudents}
      />
      <h2 className="self-start text-lg font-medium text-slate-400">
        Total commits for each student for each day
      </h2>
      <ListCommitsByDay
        studentNames={uniqueNames}
        pivotTable={pivotDaysStudents}
      />
    </div>
  )
}

export default Index

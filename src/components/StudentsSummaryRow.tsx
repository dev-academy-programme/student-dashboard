import { StudentData, getStudentSummary } from '../github'

type SummaryData = ReturnType<typeof getStudentSummary>

interface Props {
  data: SummaryData
}

function StudentsSummaryRow({ data }: Props) {
  const mediumTime = new Intl.DateTimeFormat('en-NZ', {
    timeStyle: 'medium',
    dateStyle: 'long',
  })

  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
  })

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ]

  function formatTimeAgo(date) {
    let duration = (date - new Date()) / 1000

    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
  }

  return (
    <tbody id="body-students">
      {data.map((student) => (
        <tr>
          <td
            className="text-right pr-4"
            title={mediumTime.format(student.lastCommitDate)}
          >
            {student.lastCommitDate
              ? formatTimeAgo(student.lastCommitDate)
              : ''}
          </td>
          <td className="text-left pl-4">
            <a className="text-blue-500" href={`${student.username}`}>
              {student.name}
            </a>
          </td>
          <td className="text-right">
            <span>{student.totalCommits}</span>
          </td>
          <td className="px-4 text-right">
            <span>
              {isNaN(student.progressScore)
                ? 0
                : student.progressScore.toFixed(0)}
            </span>
          </td>
          <td className="text-left pr-4">{student.lastRepo}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default StudentsSummaryRow

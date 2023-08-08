interface Props {
  pivotTable: any
  studentNames: string[]
}

function PivotCommits({ pivotTable, studentNames }: Props) {
  return (
    <table className="table-auto border-collapse border border-slate-500">
      <thead>
        <tr className="bg-slate-800">
          <th className="p-2" />
          {studentNames.map((name) => (
            <th className="border border-slate-600 align-top px-4 py-2">
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(pivotTable).map(([date, commitsByStudent]) => (
          <tr>
            <td className="border border-slate-600 text-right px-2">{date}</td>
            {studentNames.map((studentName) => (
              <td className="border border-slate-600 text-center">
                {commitsByStudent[studentName] || ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PivotCommits

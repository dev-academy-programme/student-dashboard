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
            <th
              className="border border-slate-600 align-top px-4 py-2"
              key={name}
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(pivotTable).map(([date, commitsByStudent], idx) => (
          <tr key={idx.toString()}>
            <td className="border border-slate-600 text-right px-2">{date}</td>
            {studentNames.map((studentName) => (
              <td
                key={studentName}
                className="border border-slate-600 text-center"
              >
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

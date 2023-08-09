interface Props {
  pivotTable: any
  studentNames: string[]
}

function ListCommitsByDay({ pivotTable, studentNames }: Props) {
  return (
    <table className="table-auto border-collapse border border-slate-500">
      <thead>
        <tr className="bg-slate-800">
          <th className="p-2" />
          {studentNames.map((name, idx) => (
            <th
              key={idx}
              className="border border-slate-600 align-top px-4 py-2"
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(pivotTable).map(([date, commitsByStudent], idi) => (
          <tr key={idi}>
            <td className="border border-slate-600 text-right px-2">{date}</td>
            {studentNames.map((studentName, idj) => (
              <td
                key={`${idi}-${idj}`}
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

export default ListCommitsByDay

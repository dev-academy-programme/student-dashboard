<script>
  export let data

  const mediumTime = new Intl.DateTimeFormat('en-NZ', {
    timeStyle: 'medium',
    dateStyle: 'long'
  })

  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
  })

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
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
</script>

<table class="table-auto border-collapse border border-slate-500">
  <thead>
    <tr class="bg-slate-800">
      <th class="p-4">Commit Date</th>
      <th class="p-4">Student</th>
      <th class="p-4"># Commits so far</th>
      <th class="p-4">
        <p>
          Progress Score
          <br />
          <span class="text-xs text-gray-500">
            (# commits / Std of commits)
          </span>
        </p>
      </th>
      <th class="p-4">Challenge/Repo</th>
    </tr>
  </thead>
  <tbody>
    {#each data as student}
      <tr>
        <td
          class="text-right pr-4"
          title={mediumTime.format(student.lastCommitDate)}
          >{student.lastCommitDate
            ? formatTimeAgo(student.lastCommitDate)
            : ''}</td
        >
        <td class="text-left pl-4">
          <a class="text-blue-500" href={`${student.username}`}
            >{student.name}</a
          >
        </td>
        <td class="text-right">
          <span>{student.totalCommits}</span>
        </td>
        <td class="px-4 text-right">
          <span
            >{isNaN(student.progressScore)
              ? 0
              : student.progressScore.toFixed(0)}</span
          >
        </td>
        <td class="text-left pr-4">
          {student.lastRepo}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

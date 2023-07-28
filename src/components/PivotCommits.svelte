<script>
  export let pivotTable
  export let studentNames
</script>

<table class="table-auto border-collapse border border-slate-500">
  <thead>
    <tr class="bg-slate-800">
      <th class="p-2" />
      {#each studentNames as name (name)}
        <th class="border border-slate-600 align-top px-4 py-2">{name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(pivotTable) as [date, commitsByStudent] (date)}
      <tr>
        <td class="border border-slate-600 text-right px-2">{date}</td>
        {#each studentNames as studentName (studentName)}
          <td class="border border-slate-600 text-center"
            >{commitsByStudent[studentName] || ''}</td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

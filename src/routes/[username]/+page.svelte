<script lang="ts">
  import { getLastSegment } from '../../utils'
  export let data
</script>

<svelte:head>
  <title>{data.commits[0].Student.name}</title>
  <meta
    name="description"
    content="This is where the description goes for SEO"
  />
</svelte:head>

<a href="/">Home</a>
<div class="flex flex-col justify-center items-center gap-6">
  <h1 class="text-3xl font-bold">{data.commits[0].Student.name}</h1>
  <table class="table-auto border-collapse border border-slate-500">
    <tr class="bg-slate-800">
      <th class="p-4">
        <h2>Repo</h2>
      </th>
      <th class="p-4">
        <h2>Date</h2>
      </th>
      <th class="p-4">
        <h2>Branch</h2>
      </th>
      <th />
    </tr>
    {#each data.commits.sort((a, b) => b.created_on - a.created_on) as commit}
      <tr>
        <td class="p-4">{commit.repo_name}</td>
        <td class="p-4">{commit.created_on.toLocaleString()}</td>
        <td class="p-4 text-blue-500"
          ><a
            target="_blank"
            href={`https://github.com/${data.org}/${
              commit.repo_name
            }/tree/${getLastSegment(commit.branch)}`}
            >{getLastSegment(commit.branch)}</a
          ></td
        >

        <td class="p-4 text-blue-500"
          ><a
            target="_blank"
            href={`https://github.com/${data.org}/${commit.repo_name}/commit/${commit.id}`}
            >Commit</a
          ></td
        >
      </tr>
    {/each}
  </table>
</div>

<script lang="ts">
  import ListStudents from '../component/ListStudents.svelte'
  import PivotCommits from '../component/PivotCommits.svelte'

  export let data
</script>

<svelte:head>
  <title>Cohort Analytics</title>
  <meta
    name="description"
    content="This is where the description goes for SEO"
  />
</svelte:head>

<div class="flex flex-col gap-10 w-fit items-center justify-center mx-auto">
  {#await data.streamed.studentSummary}
    Loading...
  {:then value}
    <h2 class="self-start text-lg font-medium text-slate-400">
      A list of all students in the cohort
    </h2>
    <ListStudents data={value} />
  {:catch error}
    {error.message}
  {/await}
  {#await data.streamed.pivotReposStudents}
    Loading...
  {:then value}
    <h2 class="self-start text-lg font-medium text-slate-400">
      Total commits for each student for all challenges
    </h2>
    <PivotCommits pivotTable={value} studentNames={data.uniqueNames} />
  {:catch error}
    {error.message}
  {/await}

  {#await data.streamed.pivotDaysStudents}
    Loading...
  {:then value}
    <h2 class="self-start text-lg font-medium text-slate-400">
      Total commits for each student for each day
    </h2>
    <PivotCommits pivotTable={value} studentNames={data.uniqueNames} />
  {:catch error}
    {error.message}
  {/await}
</div>

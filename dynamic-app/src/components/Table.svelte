<script>
  import Skeleton from './Functions/Skeleton.svelte';

  export let data = null;
  export let colDef;
  export let wrapperRef = null;

  // const ids = new Set();
  // res.flatMap(({ posts }) => posts).filter(({ id }) => ids.has(id) ? false : ids.add(id));

  const dummyRows = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  const mql = window.matchMedia('(min-width: 1281px)');
  $: maxCols = mql.matches ? 6 : 5;
  $: visible = colDef.filter(({ show }) => show);
  $: colCount = visible.length;
  $: excessCols = Math.max(colCount - maxCols, 0);
</script>

<div class="table-wrapper" bind:this={wrapperRef}>
  <!-- {#each tableData as { posts, id } (id)} -->
  <table style:width={`calc(98vw + (250px * ${excessCols}))`}>
    <thead>
      <tr>
        {#each colDef as { title, headerComponent, show }, i (i)}
          {#if show}
            <th>
              <svelte:component this={headerComponent} text={title} />
            </th>
          {/if}
        {/each}
      </tr>
    </thead>

    <tbody>
      {#if data}
        {#each data as row}
          <tr>
            {#each colDef as { cellComponent, show, args }}
              {#if show}
                <td>
                  <svelte:component this={cellComponent} post={row} {...args} />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      {:else}
        {#each dummyRows as dummyRow (dummyRow)}
          <tr>
            {#each colDef as { id, show } (id)}
              {#if show}
                <td>
                  <Skeleton />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper {
    overflow-y: scroll;
    overflow-x: scroll;
    width: 98vw;
    margin: 0 auto;
    max-height: calc(60px * 9);
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  thead {
    position: sticky;
    top: 0px;
    z-index: 999;
    background-color: #014e89;
    color: white;
    border: 1px solid #014e89;
    border-top: 0 none;
  }

  thead th {
    padding: 0.875rem;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    font-size: 1rem;
    line-height: 1.2rem;
    text-align: center;
  }

  tbody tr:hover {
    background-color: #f2f2f2;
  }

  tbody td {
    font-size: 0.875rem;
    font-family: 'Lora', 'Lato', sans-serif;
    border: 1px solid #d9d9d9;
  }

  td {
    font-family: 'Work Sans', sans-serif;
    letter-spacing: initial;
    padding: 0.5rem;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
</style>

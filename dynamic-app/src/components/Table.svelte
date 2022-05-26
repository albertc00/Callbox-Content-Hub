<script>
  import { ELLIPSIS } from './pagination/symbolTypes.js';
  import { validate_component } from 'svelte/internal';

  import { cols, fieldID } from './store';

  function onClick(value) {
    $fieldID = value;
  }

  export let data;

  export let colDef;

  let rowRef;

  // const ids = new Set();
  // res.flatMap(({ posts }) => posts).filter(({ id }) => ids.has(id) ? false : ids.add(id));
</script>

<div class="table-wrapper">
  <!-- {#each tableData as { posts, id } (id)} -->
  <table>
    <thead>
      <tr bind:this={rowRef}>
        {#each colDef as { title, headerComponent, hidden }, i}
          {#if !hidden}
            <th>
              <svelte:component this={headerComponent} text={title} />
            </th>
          {/if}
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each data as row}
        <tr>
          {#each colDef as { cellComponent, hidden, args }}
            {#if !hidden}
              <td>
                <svelte:component this={cellComponent} post={row} {...args} />
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper {
    overflow-y: scroll;
    overflow-x: scroll;
    width: 98vw;
    margin: 0 auto;
    height: calc(52px * 9);
  }

  table {
    border-collapse: collapse;
    width: 100%;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

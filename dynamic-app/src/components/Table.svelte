<script>
  import Skeleton from './Functions/Skeleton.svelte';

  export let data = null;
  export let colDef;
  export let wrapperRef = null;

  // const ids = new Set();
  // res.flatMap(({ posts }) => posts).filter(({ id }) => ids.has(id) ? false : ids.add(id));

  const dummyRows = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  const mql = window.matchMedia('(min-width: 1281px)');
  $: maxCols = mql.matches ? 6 : 5;
  $: visible = colDef.filter(({ show }) => show);
  $: colCount = visible.length;
  $: excessCols = Math.max(colCount - maxCols, 0);

  let rowRef;
  $: rowHeight = rowRef?.offsetHeight;
</script>

<div
  class="table-wrapper"
  bind:this={wrapperRef}
  style:max-height={`calc(${rowHeight}px * 11)`}
>
  <table style:width={`calc(98vw + (250px * ${excessCols}))`} cellspacing="0">
    <thead>
      <tr>
        {#each colDef as { id, title, headerComponent, show } (id)}
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
          <tr bind:this={rowRef}>
            {#each colDef as { id, cellComponent, show, args } (id)}
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

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .table-wrapper {
      overflow-y: scroll;
      overflow-x: scroll;
      width: 98vw;
      margin: 0 auto;
      border-top: 1px solid app.colors('grey-200');
      border-left: 1px solid app.colors('grey-200');
    }

    table {
      border-collapse: separate;
      table-layout: fixed;
    }

    thead {
      position: sticky;
      top: 0px;
      z-index: 999;
      border-top: 0 none;
    }

    thead tr {
      background-color: app.colors('grey-150');
    }

    $cell-padding: 0.5rem 1rem;

    thead th {
      padding: 0.625rem 1rem;
      @include app.text('sm');
      font-family: 'Work Sans', sans-serif;
      font-weight: 500;
      letter-spacing: 0.025em;
      text-align: left;
      text-transform: uppercase;
      color: app.colors('grey-900');
      border: 1px solid app.colors('grey-200');

      border-top-width: 0;
      border-right-width: 0;
      border-bottom-width: 2px;

      &:first-child {
        border-left-width: 0;
      }

      &:last-child {
        border-right-width: 1px;
      }
    }

    tbody tr:hover {
      background-color: app.colors('grey-100');
    }

    tbody td {
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      padding: $cell-padding;
      border: 1px solid app.colors('grey-200');

      border-top-width: 0;
      border-right-width: 0;

      &:first-child {
        border-left-width: 0;
      }

      &:last-child {
        border-right-width: 1px;
      }
    }
  }
</style>

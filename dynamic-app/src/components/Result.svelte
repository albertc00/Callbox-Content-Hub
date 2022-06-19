<script>
  import { useModal } from './modal/Modal.svelte';
  import TextWithTooltip from './Functions/TextWithTooltip.svelte';
  import PDF from './PDF.svelte';
  import Title from './Title.svelte';
  import Webpage from './Webpage.svelte';

  import Header from './Functions/Header.svelte';
  import TableFunc from './Functions/TableFunc.svelte';
  import SearchForm from './SearchForm.svelte';
  import DropdownActions from './DropdownActions.svelte';
  import Hyperlink from './Functions/Hyperlink.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import { pages, boundary } from './store';
  import Filter from './Filter.svelte';

  import ShowHideCols from './modal/ShowHideCols.svelte';

  const url = `https://www.callboxinc.com/wp-json/wp/v2/pages`;

  $: page = $pages;
  async function fetchPosts(page) {
    const res = await fetch(`${url}?_embed&tags=1220&page=${page}&per_page=10`);

    const totalPage = res.headers.get('x-wp-total');

    const data = await res.json();

    return { data, totalPage };
  }

  $: queryResult = useQuery(['posts', page], () => fetchPosts(page), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  $: d = $queryResult.data;
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;
  $: totalPage = d?.totalPage;
  $: data = d?.data;

  $: colDef = [
    {
      label: 'Title',
      id: 'title',
      show: true,
      title: 'Title',
      headerComponent: Header,
      cellComponent: Title,
      cellAs: 'td',
    },
    {
      id: 'product',
      label: 'Product or Service',
      show: true,
      title: 'Product or Service',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_industry', center: false },
    },
    {
      id: 'targetLocation',
      label: 'Target Location',
      show: true,
      title: 'Target Location',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',
      args: { selector: 'acf.cs_target_location', center: false },
    },
    {
      id: 'pdf',
      label: 'PDF',
      show: true,
      title: 'PDF',
      headerComponent: Header,
      cellComponent: PDF,
      cellAs: 'td',
    },
    {
      id: 'webpage',
      label: 'Webpage',
      show: false,
      title: 'WEBPAGE',
      headerComponent: Header,
      cellComponent: Webpage,
      cellAs: 'td',
    },
    {
      id: 'target_dm',
      label: 'Target DM',
      show: false,
      title: 'TARGET DM',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',

      args: { selector: 'acf.cs_target_dm', center: false },
    },
    {
      id: 'target_industry',
      label: 'Target Industry',
      show: false,
      title: 'TARGET INDUSTRY',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',

      args: { selector: 'acf.cs_target_industry', center: false },
    },
    {
      id: 'client_location',
      label: 'Client Location',
      show: false,
      title: 'CLIENT LOCATION',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_location', center: false },
    },
    {
      id: 'client_HQ',
      label: 'Client HQ',
      show: false,
      title: 'CLIENT HQ',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_hq', center: false },
    },
    {
      id: 'campaign',
      label: 'Campaign',
      show: false,
      title: 'CAMPAIGN',
      headerComponent: Header,
      cellComponent: TableFunc,
      cellAs: 'td',
      args: { selector: 'acf.cs_campaign_types' },
    },
    {
      id: 'results',
      label: 'Results',
      show: false,
      title: 'RESULTS',
      headerComponent: Header,
      cellComponent: TableFunc,
      cellAs: 'td',
      args: { selector: 'acf.cs_results' },
    },
    {
      id: 'client',
      label: 'Client',
      show: true,
      title: 'Client',
      headerComponent: Header,
      cellComponent: Hyperlink,
      cellAs: 'td',
      args: {
        texts: 'acf.cs_client.name',
        links: 'acf.cs_client.website',
        as: 'p',
      },
    },
    {
      id: 'clientLob',
      label: 'Client LOB',
      show: false,
      title: 'Client LOB',
      headerComponent: Header,
      cellComponent: TextWithTooltip,
      cellAs: 'td',
      args: { selector: 'acf.cs_client.lob', center: false },
    },
  ];

  const ddaText = 'Table actions';
  const ddaActions = [
    { text: 'Edit columns', id: 'EDIT_COLUMNS' },
    { text: 'Coming soon...', id: 'COMING_SOON_1' },
    { text: 'Coming soon...', id: 'COMING_SOON_2' },
  ];

  //showhidecols
  $: [show, hide] = useModal(
    { title: 'Choose which columns you see' },
    ShowHideCols,
    {
      cols: colDef,
      onApply: handleApply,
      onClose: handleClose,
    }
  );

  function handleClose() {
    hide();
  }

  function handleApply(detail) {
    colDef = detail;
    hide();
    //let title = 'Choose which columns you see';
    // let printCols = 'nayeon';
    // printCols = JSON.stringify(colDef, null, 2);
    // console.log(printCols);
  }
  //showhidecols
  $: filters = [];

  function handleApplyFilters(detail) {
    filters = detail;
    hide();
  }
  function handleCancel() {
    hide();
  }

  // filters
  $: [showfilters] = useModal({ title: 'Choose Filters' }, Filter, {
    properties: colDef.map(({ id, label }) => ({ id, label })),
    exclude: ['pdf', 'webpage', 'results', ...filters.map(({ id }) => id)],
    onClose: handleCancel,
    onApply: handleApplyFilters,
    filters: filters,
  });

  //filters
  function handleDropdownAction({ text, id }) {
    // console.log(`${id}: ${text}`);

    switch (id) {
      case 'EDIT_COLUMNS':
        show();

        break;
      default:
        break;
    }
  }

  import { category } from './store';

  const selec = [
    { id: 1, label: 'Case Studies' },
    { id: 2, label: 'Coming Soon...' },
    { id: 3, label: 'Coming Soon...' },
  ];
</script>

<div class="top-wrapper">
  <select class="content-type" bind:value={$category}>
    {#each selec as { id, label } (id)}
      <option value={id} disabled={label == 'Coming Soon...'}>
        {label}
      </option>
    {/each}
  </select>

  <div class="actionContainer">
    <div class="search">
      <div class="search-wrapper">
        <SearchForm />
      </div>

      <button class="filter" on:click={() => showfilters()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
          ><path
            d="M2.5 15.833V14.083H7.667V15.833ZM2.5 5.917V4.167H10.771V5.917ZM9.208 17.5V12.438H10.958V14.083H17.5V15.833H10.958V17.5ZM5.917 12.542V10.875H2.5V9.125H5.917V7.479H7.667V12.542ZM9.208 10.875V9.125H17.5V10.875ZM12.333 7.562V2.5H14.083V4.167H17.5V5.917H14.083V7.562Z"
          /></svg
        >
        <span>Filters ({filters.length})</span>
      </button>
      {#if filters.length}
        <button> Clear all </button>
      {/if}
    </div>

    <DropdownActions
      text={ddaText}
      actions={ddaActions}
      onAction={handleDropdownAction}
    />
  </div>
  <div class="cntnr">
    <div class="results">
      {#if isFetching || isLoading}
        <div class="table-container">
          <Table data={null} {colDef} />
        </div>
      {:else if isError}
        <span>Error</span>
      {:else}
        <div class="table-container">
          <!-- this is table -->
          <Table {data} {colDef} bind:wrapperRef={$boundary} />
          <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
        </div>

        <div class="area-2">
          <LightPaginationNav
            totalItems={totalPage}
            pageSize={9}
            currentPage={page}
            limit={1}
            on:setPage={(e) => (page = e.detail.page)}
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .table-label {
      @include app.text('2xl');
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      margin: 1.5rem 0 1.5rem 1vw;
    }

    .content-type {
      @include app.text('2xl');
      font-family: 'Work Sans', sans-serif;
      font-weight: 500;
      margin: 1.5rem 0 1.5rem 1vw;
      padding: 0.375rem 0rem;
      border: 0 none;

      // border-bottom: 2px solid app.colors('blue-400');
      color: app.colors('blue-400');
      background-color: transparent;
      cursor: pointer;
      max-width: 180px;

      &:active,
      &:focus {
        outline: 0 none;
      }

      option {
        @include app.text('base');
        color: app.colors('grey-900');
      }
    }

    .actionContainer {
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 98vw;
      margin: 0 auto;
    }

    .search {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-wrapper {
      min-width: 280px;
    }

    .filter {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      border: 0 none;
      padding: 0;
      background: transparent;
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      color: app.colors('blue-350');
      cursor: pointer;

      svg {
        fill: app.colors('blue-350');
      }
    }

    .top-wrapper {
      background-color: #f7f7f7;
    }

    .table-container {
      overflow: auto;
      width: 100%;
      margin: auto;
    }

    .area-2 {
      grid-column-start: 2;
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
    }
  }
</style>

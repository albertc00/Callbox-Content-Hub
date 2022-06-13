<script>
  import { useModal } from './modal/Modal.svelte';
  import TextWithTooltip from './Functions/TextWithTooltip.svelte';
  import PDF from './PDF.svelte';
  import Title from './Title.svelte';
  import Webpage from './Webpage.svelte';

  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import TableFunc from './Functions/TableFunc.svelte';
  import SearchForm from './SearchForm.svelte';
  import DropdownActions from './DropdownActions.svelte';
  import Hyperlink from './Functions/Hyperlink.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import { pages, boundary } from './store';

  import ShowHideCols from './modal/ShowHideCols.svelte';

  const url = `https://www.callboxinc.com/wp-json/wp/v2/pages`;

  $: page = $pages;
  async function fetchPosts(page) {
    const res = await fetch(`${url}?_embed&tags=1220&page=${page}&per_page=9`);

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
  $: console.log(data);

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
</script>

<!-- <Modal {title} bind:show>
  <ShowHideCols cols={colDef} on:apply={handleApply} on:cancel={handleClose} />
</Modal> -->

<div class="top-wrapper">
  <h2 class="table-label">Case Studies</h2>
  <div class="actionContainer">
    <SearchForm />
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
      @include app.text('3xl');
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      margin: 1.5rem 0 1.5rem 1vw;
    }

    .actionContainer {
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 98vw;
      margin: 0 auto;
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

<script>
  import PDF from './PDF.svelte';
  import Title from './Title.svelte';
  import Webpage from './Webpage.svelte';

  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import TableFunc from './Functions/TableFunc.svelte';
  import DropdownActions from './DropdownActions.svelte';
  import Hyperlink from './Functions/Hyperlink.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import { pages } from './store';

  import ShowHideCols from './modal/ShowHideCols.svelte';
  import Modal from './modal/Modal.svelte';

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

  let colDef = [
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
      cellComponent: Textonly,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_industry' },
    },
    {
      id: 'targetLocation',
      label: 'Target Location',
      show: true,
      title: 'Target Location',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      args: { selector: 'acf.cs_target_location' },
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
      cellComponent: Textonly,
      cellAs: 'td',

      args: { selector: 'acf.cs_target_dm' },
    },
    {
      id: 'target_industry',
      label: 'Target Industry',
      show: false,
      title: 'TARGET INDUSTRY',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',

      args: { selector: 'acf.cs_target_industry' },
    },
    {
      id: 'client_location',
      label: 'Client Location',
      show: false,
      title: 'CLIENT LOCATION',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_location' },
    },
    {
      id: 'client_HQ',
      label: 'Client HQ',
      show: false,
      title: 'CLIENT HQ',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      args: { selector: 'acf.cs_client_hq' },
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

  //let show = false;

  import { useModal } from './modal/Modal.svelte';
  import TextWithTooltip from './Functions/TextWithTooltip.svelte';

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
  <div class="actionContainer">
    <DropdownActions
      text={ddaText}
      actions={ddaActions}
      onAction={handleDropdownAction}
    />
  </div>
  <h2 class="table-label">Case Studies</h2>
  <!-- <Query options={queryOptions}>
    <div slot="query" let:queryResult={{ data, isFetching, isError }}> -->
  <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
  <div class="cntnr">
    <div class="results svelte-fhxlyi">
      {#if isFetching || isLoading}
        <div class="table-container">
          <Table data={null} {colDef} />
        </div>
      {:else if isError}
        <span>Error</span>
      {:else}
        <div class="table-container">
          <!-- this is table -->
          <Table {data} {colDef} />
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

<!-- </Query>
</div> -->
<style>
  .actionContainer {
    padding: 1rem 0;
    display: flex;
    justify-content: right;
    width: 98vw;
    margin: 0 auto;
  }

  .top-wrapper {
    background-color: #f7f7f7;
  }

  .table-label {
    position: absolute;
    top: 7rem;
    left: 3rem;
    font-family: 'open Sans', sans-serif;
    font-weight: 650;
    font-size: 2rem;
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
    padding-top: 15px;
    padding-left: 25px;
  }
</style>

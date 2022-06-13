<script>
  import PDF from './PDF.svelte';
  import Title from './Title.svelte';
  import Webpage from './Webpage.svelte';
  import Hyperlink from './Functions/Hyperlink.svelte';

  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import TableFunc from './Functions/TableFunc.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import { pages, SearchTerm } from './store';

  import DropdownActions from './DropdownActions.svelte';
  import ShowHideCols from './modal/ShowHideCols.svelte';
  import SearchForm from './SearchForm.svelte';

  // const url = `https://www.callboxinc.com/wp-json/cbtk/v1/case-studies`;

  const url = `https://www.callboxinc.com/wp-json/wp/v2/pages`;
  let s;
  $: s = $SearchTerm.toLowerCase();
  $: page = $pages;
  async function fetchPosts(s, page) {
    // const res = await fetch(`${url}?s=${s}&page=${page}&per_page=9&fields=-1`);
    const res = await fetch(
      `${url}?_embed&search=${s}&tags=1220&page=${page}&per_page=9`
    );

    const totalPage = res.headers.get('x-wp-total');

    const data = await res.json();

    return { data, totalPage };
  }

  $: queryResult = useQuery(['posts', s, page], () => fetchPosts(s, page), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // $: d = $queryResult.data;
  // $: isFetching = $queryResult.isFetching;
  // $: isLoading = $queryResult.isLoading;
  // $: isError = $queryResult.isError;
  // $: data = d?.data[0];

  $: d = $queryResult.data;
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;
  $: totalPage = d?.totalPage;
  $: data = d?.data;

  import NoResult from './NoResult.svelte';

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
      title: 'TARGET LOCATION',
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
      cellComponent: Textonly,
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

  import { useModal } from './modal/Modal.svelte';

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

<!-- {#if $fieldID > 0}
  <ModalPrev modalContent={PreviewSearchResult} />
{/if} -->

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
    <div class="results svelte-fhxlyi">
      {#if isFetching}
        <div class="table-container">
          <Table data={null} {colDef} />
        </div>
      {:else if isError}
        <span>Error</span>
      {:else if data?.length}
        <div class="table-container">
          <!-- this is table -->
          <Table {data} {colDef} />
          <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
        </div>
        <div class="area-2">
          <LightPaginationNav
            totalItems={totalPage}
            pageSize={9}
            currentPage={$pages}
            limit={1}
            on:setPage={(e) => ($pages = e.detail.page)}
          />
        </div>
      {:else}
        <NoResult />
      {/if}
    </div>
  </div>
</div>

<!-- $: colDef = [
  {
    id: 'title',
    label: 'Title',
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
    args: { selector: 'product' },
  },
  {
    id: 'targetLocation',
    label: 'Target Location',
    show: true,
    title: 'TARGET LOCATION',
    headerComponent: Header,
    cellComponent: Textonly,
    cellAs: 'td',
    args: { selector: 'targetLocation' },
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
    id: 'webpage_unlocked',
    label: 'Webpage (Unlocked)',
    show: false,
    title: 'WEBPAGE UNLOCKED',
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

    args: { selector: 'targetDM' },
  },
  {
    id: 'target_industry',
    label: 'Target Industry',
    show: false,
    title: 'TARGET INDUSTRY',
    headerComponent: Header,
    cellComponent: Textonly,
    cellAs: 'td',

    args: { selector: 'targetIndustry' },
  },
  {
    id: 'client_location',
    label: 'Client Location',
    show: false,
    title: 'CLIENT LOCATION',
    headerComponent: Header,
    cellComponent: Textonly,
    cellAs: 'td',
    args: { selector: 'clientLocation' },
  },
  {
    id: 'client_HQ',
    label: 'Client HQ',
    show: false,
    title: 'CLIENT HQ',
    headerComponent: Header,
    cellComponent: Textonly,
    cellAs: 'td',
    args: { selector: 'clientHQ' },
  },
  {
    id: 'campaign',
    label: 'Campaign',
    show: false,
    title: 'CAMPAIGN',
    headerComponent: Header,
    cellComponent: TableFunc,
    cellAs: 'td',
    args: { selector: 'campaign' },
  },
  {
    id: 'results',
    label: 'Results',
    show: false,
    title: 'RESULTS',
    headerComponent: Header,
    cellComponent: TableFunc,
    cellAs: 'td',
    hidden: !$cols.includes('results'),
    args: { selector: 'results' },
  },
]; -->
<style lang="scss">
  @use '../styles/app';

  @include app.root {
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

    .table-label {
      @include app.text('3xl');
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      margin: 1.5rem 0 1.5rem 1vw;
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

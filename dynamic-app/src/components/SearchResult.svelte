<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import ButtonLink from './Functions/ButtonLink.svelte';
  import TableFunc from './Functions/TableFunc.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import TableLoading from './TableLoading.svelte';
  import { cols, pages, fieldID, SearchTerm } from './store';

  import DropdownActions from './DropdownActions.svelte';
  import ShowHideCols from './modal/ShowHideCols.svelte';
  import Modal from './modal/Modal.svelte';

  const url = `https://www.callboxinc.com/wp-json/cbtk/v1/case-studies`;

  let s;
  $: s = $SearchTerm.toLowerCase();
  $: page = $pages;
  async function fetchPosts(s, page) {
    const res = await fetch(`${url}?s=${s}&page=${page}&per_page=9&fields=-1`);

    const data = await res.json();

    return { data };
  }

  $: queryResult = useQuery(['posts', s, page], () => fetchPosts(s, page), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  $: d = $queryResult.data;
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;
  $: data = d?.data[0];

  import { onMount } from 'svelte';
  import NoResult from './NoResult.svelte';
  import PreviewSearchResult from './PreviewSearchResult.svelte';
  import ModalPrev from './modal/ModalPrev.svelte';

  let box;
  let yTop = 0;
  let yHeight;
  let yScroll;

  function parseScroll() {
    yTop = box.scrollTop;
    yHeight = box.clientHeight;
    yScroll = box.scrollHeight;
  }

  onMount(async () => parseScroll());

  $: colDef = [
    {
      id: 'title',
      label: 'Title',
      show: true,
      title: 'Title',
      headerComponent: Header,
      cellComponent: TextWithButton,
      cellAs: 'td',
      args: { selector: 'title' },
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
      cellComponent: ButtonLink,
      cellAs: 'td',
      args: { selector: 'pdf' },
    },
    {
      id: 'webpage',
      label: 'Webpage',
      show: false,
      title: 'WEBPAGE',
      headerComponent: Header,
      cellComponent: ButtonLink,
      cellAs: 'td',
      args: { selector: 'link' },
    },
    {
      id: 'webpage_unlocked',
      label: 'Webpage (Unlocked)',
      show: false,
      title: 'WEBPAGE UNLOCKED',
      headerComponent: Header,
      cellComponent: ButtonLink,
      cellAs: 'td',
      args: { selector: 'linkUnlocked' },
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
  ];

  const ddaText = 'Table actions';
  const ddaActions = [
    { text: 'Edit columns', id: 'EDIT_COLUMNS' },
    { text: 'Coming soon...', id: 'COMING_SOON_1' },
    { text: 'Coming soon...', id: 'COMING_SOON_2' },
  ];
  let show = false;

  function handleDropdownAction({ text, id }) {
    console.log(`${id}: ${text}`);

    switch (id) {
      case 'EDIT_COLUMNS':
        show = true;
        break;
      default:
        break;
    }
  }

  let title = 'Choose which columns you see';
  let printCols = 'nayeon';
  function handleApply({ detail }) {
    colDef = detail;
    show = false;
    printCols = JSON.stringify(colDef, null, 2);
    console.log(printCols);
  }

  function handleClose({ detail }) {
    show = false;
  }
</script>

{#if $fieldID > 0}
  <ModalPrev modalContent={PreviewSearchResult} />
{/if}

<Modal {title} bind:show>
  <ShowHideCols cols={colDef} on:apply={handleApply} on:cancel={handleClose} />
</Modal>

<div class="top-wrapper">
  <div class="actionContainer">
    <DropdownActions
      text={ddaText}
      actions={ddaActions}
      onAction={handleDropdownAction}
    />
  </div>

  <div id="selection" class="modal" />
  <!-- <Query options={queryOptions}>
    <div slot="query" let:queryResult={{ data, isFetching, isError }}> -->
  <div class="cntnr">
    <div class="results svelte-fhxlyi">
      {#if isFetching}
        <div class="loading">
          <div
            class="table-wrapper"
            class:tableScrolled={yTop > 45}
            bind:this={box}
            on:scroll={parseScroll}
            on:mousemove={parseScroll}
          >
            <TableLoading />
          </div>
        </div>
      {:else if isError}
        <span>Error</span>
      {:else if data.posts?.length}
        <h2 class="table-label">Case Studies</h2>
        <div class="table-container">
          <div
            class="table-wrapper"
            class:tableScrolled={yTop > 50}
            bind:this={box}
            on:scroll={parseScroll}
            on:mousemove={parseScroll}
          >
            <!-- this is table -->
            <Table data={data?.posts} {colDef} />

            <!-- table helloworld -->
          </div>
        </div>
        <div class="area-2">
          <LightPaginationNav
            totalItems={data?.total}
            pageSize={10}
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
    top: 5.5rem;
    left: 3rem;
    font-family: 'open Sans', sans-serif;
    font-weight: 650;
    font-size: 2rem;
  }

  .table-container {
    width: 100%;
    margin: auto;
  }

  .table-wrapper {
    width: 95vw;
    max-height: 69vh;
    margin: 0 auto;
  }

  .loading {
    padding-top: 55px;
  }
  .modal {
    padding-top: 5px;
    padding-bottom: 10px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    width: 95vw;
    margin: 0 auto;
  }

  .area-2 {
    grid-column-start: 2;
    display: flex;
    justify-content: flex-start;
    padding-top: 20px;
    padding-left: 25px;
  }
</style>

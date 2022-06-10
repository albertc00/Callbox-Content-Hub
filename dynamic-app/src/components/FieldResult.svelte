<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import ButtonLink from './Functions/ButtonLink.svelte';
  import TableFunc from './Functions/TableFunc.svelte';
  import Table from './Table.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import { SearchTerm, fields, pages } from './store';
  import { LightPaginationNav } from './pagination/index.js';
  import NoResult from './NoResult.svelte';
  import FieldResultLoading from './FieldResultLoading.svelte';

  import DropdownActions from './DropdownActions.svelte';
  import ShowHideCols from './modal/ShowHideCols.svelte';
  import Modal from './modal/Modal.svelte';

  $: s = $SearchTerm.toLowerCase();
  $: page = $pages;
  $: field = $fields.join(',');

  const url = `https://www.callboxinc.com/wp-json/cbtk/v1/case-studies`;
  async function fetchPosts(page, s, field) {
    const res = await fetch(
      `${url}?s=${s}&page=${page}&per_page=9&fields=${field}`
    );

    const data = await res.json();

    return data;
  }

  $: queryResult = useQuery(
    ['posts', page, s, field],
    () => fetchPosts(page, s, field),
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  const ids = new Set();
  $: data = $queryResult.data
    ?.flatMap(({ posts }) => posts)
    .filter(({ id }) => (ids.has(id) ? false : ids.add(id)));
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;

  import { onMount } from 'svelte';
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
      args: { selector: 'results' },
    },
  ];
  let showAction = false;

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

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- {#if $fieldID > 0}
  <ModalPrev modalContent={PreviewFieldResult} />
{/if} -->

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
  <div class="modal-wrapper">
    <div class="dropdwn-selection">
      <!-- <Modal show={$modal}>
        <button class="modal-button" on:click={showModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#014e89"
            height="30"
            width="35"
            viewBox="-5 7 55 35"
            ><path
              d="M9 39H11.2L35.45 14.75L34.35 13.65L33.25 12.55L9 36.8ZM6 42V35.6L35.4 6.2Q36.25 5.35 37.525 5.375Q38.8 5.4 39.65 6.25L41.8 8.4Q42.65 9.25 42.65 10.5Q42.65 11.75 41.8 12.6L12.4 42ZM39.5 10.45 37.45 8.4ZM35.45 14.75 34.35 13.65 33.25 12.55 35.45 14.75Z"
            /></svg
          >
          <span class="modal-text">Edit Columns</span>
        </button>
      </Modal> -->
    </div>
  </div>
  <!-- 
  <Query options={queryOptions}>
    <div slot="query" let:queryResult={{ data, isFetching, isError }}> -->
  <div class="cntnr">
    <div class="results svelte-fhxlyi">
      {#if isFetching}
        <div
          class="table-wrapper"
          class:tableScrolled={yTop > 50}
          bind:this={box}
          on:scroll={parseScroll}
          on:mousemove={parseScroll}
        >
          <FieldResultLoading />
        </div>
      {:else if isError}
        <span>Error</span>
      {:else if data?.length}
        <h2 class="table-label">Case Studies</h2>
        <!-- {#each $queryResult.data as hello}
        <h2 class="table-sublabe">By {hello.label}</h2> 
        {/each} -->

        <div class="table-container">
          <div
            class="table-wrapper"
            class:tableScrolled={yTop > 50}
            bind:this={box}
            on:scroll={parseScroll}
            on:mousemove={parseScroll}
          >
            <!-- this is table -->
            <Table {data} {colDef} />
            <!-- table helloworld -->
          </div>
        </div>

        <div class="area-2">
          <LightPaginationNav
            totalItems={data?.length}
            pageSize={5}
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

  .cntnr {
    position: relative;
  }
  .table-label {
    position: absolute;
    top: -7.3rem;
    left: 2.8rem;
    font-family: 'open Sans', sans-serif;
    font-weight: 650;
    font-size: 2rem;
  }

  .area-2 {
    grid-column-start: 2;
    display: flex;
    justify-content: flex-start;
    padding-top: 15px;
    padding-left: 20px;
  }

  .table-container {
    width: 100%;
    margin: auto;
  }

  .table-wrapper {
    width: 95vw;
    max-height: 68vh;
    margin: 0 auto;
  }

  .modal-wrapper {
    /* padding-top: 20px; */
    padding-bottom: 10px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    width: 95vw;
    margin: 0 auto;
  }
  .dropdwn-selection {
    padding-top: 5px;
    max-width: 200px;
  }
</style>

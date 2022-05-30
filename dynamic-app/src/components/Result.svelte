<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import ButtonLink from './Functions/ButtonLink.svelte';
  import TableFunc from './Functions/TableFunc.svelte';
  import DropdownActions from './DropdownActions.svelte';

  import { useQuery } from '@sveltestack/svelte-query';
  import Table from './Table.svelte';
  import { LightPaginationNav } from './pagination/index';
  import TableLoading from './TableLoading.svelte';
  import { cols, pages, fieldID, category, colModal } from './store';
  import { col } from './SelectColumn';

  import Modal, { bind } from './modal/index.js';
  import { writable } from 'svelte/store';
  import ViewResult from './ViewResult.svelte';
  import Popup from './modal/Popup.svelte';
  const showModal = () => modal.set(bind(Popup));
  const modal = writable(null);
  const modals = writable(null);

  const url = `https://www.callboxinc.com/wp-json/cbtk/v1/case-studies`;

  $: page = $pages;
  async function fetchPosts(page) {
    const res = await fetch(`${url}?page=${page}&per_page=9`);

    const data = await res.json();

    return { data };
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
  $: data = d?.data;

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
      title: 'Title',
      headerComponent: Header,
      cellComponent: TextWithButton,
      cellAs: 'td',
      hidden: !$cols.includes('title'),
      args: { selector: 'title' },
    },
    {
      title: 'Product or Service',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('product'),
      args: { selector: 'product' },
    },
    {
      title: 'TARGET LOCATION',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('target-location'),
      args: { selector: 'targetLocation' },
    },
    {
      title: 'PDF',
      headerComponent: Header,
      cellComponent: ButtonLink,
      cellAs: 'td',
      hidden: !$cols.includes('pdf'),
      args: { selector: 'pdf' },
    },
    {
      title: 'WEBPAGE',
      headerComponent: Header,
      cellComponent: ButtonLink,
      cellAs: 'td',
      hidden: !$cols.includes('link'),
      args: { selector: 'link' },
    },
    {
      title: 'WEBPAGE UNLOCKED',
      headerComponent: Header,
      cellComponent: ButtonLink,
      cellAs: 'td',
      hidden: !$cols.includes('linkUnlocked'),
      args: { selector: 'linkUnlocked' },
    },

    {
      title: 'TARGET DM',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('target-dm'),
      args: { selector: 'targetDM' },
    },
    {
      title: 'TARGET INDUSTRY',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('target-industry'),
      args: { selector: 'targetIndustry' },
    },
    {
      title: 'CLIENT LOCATION',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('client-location'),
      args: { selector: 'clientLocation' },
    },
    {
      title: 'CLIENT HQ',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('clientHQ'),
      args: { selector: 'clientHQ' },
    },
    {
      title: 'CAMPAIGN',
      headerComponent: Header,
      cellComponent: TableFunc,
      cellAs: 'td',
      hidden: !$cols.includes('campaign'),
      args: { selector: 'campaign' },
    },
    {
      title: 'RESULTS',
      headerComponent: Header,
      cellComponent: TableFunc,
      cellAs: 'td',
      hidden: !$cols.includes('results'),
      args: { selector: 'results' },
    },
  ];
  let showAction = false;

  const ddaText = 'Show actions';
  const ddaActions = [
    { text: 'Edit columns', id: 'EDIT_COLUMNS' },
    { text: 'Coming soon...', id: 'COMING_SOON_1' },
    { text: 'Coming soon...', id: 'COMING_SOON_2' },
  ];

  function handleDropdownAction({ text, id }) {
    console.log(`${id}: ${text}`);

    switch (id) {
      case 'EDIT_COLUMNS':
        $colModal = true;
        break;
      default:
        break;
    }
  }
</script>

{#if $fieldID > 0}
  <ModalPrev modalContent={ViewResult} />
  <!-- <Modal show={modal.set(bind(ViewResult))} />  -->
{/if}

{#if $colModal}
  <ModalPrev modalContent={Popup} />
{/if}

<div class="top-wrapper">
  <div class="actionContainer">
    <DropdownActions
      text={ddaText}
      actions={ddaActions}
      onAction={handleDropdownAction}
    />
  </div>

  <!-- <Query options={queryOptions}>
    <div slot="query" let:queryResult={{ data, isFetching, isError }}> -->
  <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
  <div class="cntnr">
    <div class="results svelte-fhxlyi">
      {#if isFetching || isLoading}
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
      {:else}
        <h2 class="table-label">Case Studies</h2>
        <div class="table-container">
          <!-- this is table -->
          <Table data={data?.posts} {colDef} />
          <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
        </div>

        <div class="area-2">
          <LightPaginationNav
            totalItems={data?.total}
            pageSize={9}
            currentPage={$pages}
            limit={1}
            on:setPage={(e) => ($pages = e.detail.page)}
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
  /* .modal-button {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    padding-top: 20px;
    align-items: center;
  } */

  .table-container {
    overflow: auto;
    width: 100%;
    margin: auto;
  }

  .table-wrapper {
    overflow: scroll;
    width: 95vw;
    max-height: 69vh;
    margin: 0 auto;
  }

  .loading {
    padding-top: 55px;
  }

  /* button.modal-button {
    background-color: #ffca09;
    border: 1px solid #ffca09;
    border-radius: 0.25rem;
    color: #004b84;
    font-weight: 600;
    letter-spacing: 0.0375rem;
    line-height: unset;
    padding: 0.3rem 0.6rem;
    transition: all 0.3s;
    text-transform: uppercase;
  }

  button.modal-button:hover {
    background-color: unset;
    cursor: pointer;
  } */

  .area-2 {
    grid-column-start: 2;
    display: flex;
    justify-content: flex-start;
    padding-top: 15px;
    padding-left: 25px;
  }
</style>

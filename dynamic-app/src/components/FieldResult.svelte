<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Textonly from './Functions/Textonly.svelte';
  import Header from './Functions/Header.svelte';
  import ButtonLink from './Functions/ButtonLink.svelte';
  import TableFunc from './Functions/TableFunc.svelte';

  import Selection from './Selection.svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import { SearchTerm, selection, fields, cols, pages, fieldID } from './store';
  import { col } from './SelectColumn';
  import { LightPaginationNav } from './pagination/index.js';
  import NoResult from './NoResult.svelte';
  import FieldResultLoading from './FieldResultLoading.svelte';
  import Skeleton from 'svelte-skeleton/Skeleton.svelte';

  import Modal, { bind } from './modal/index.js';
  import { writable } from 'svelte/store';
  import ViewResult from './ViewResult.svelte';
  import Popup from './modal/Popup.svelte';
  import Table from './Table.svelte';
  const showModal = () => modal.set(bind(Popup));
  const modal = writable(null);

  $: s = $SearchTerm.toLowerCase();
  $: page = $pages;
  $: field = $fields.join(',');

  const url = `https://www.callboxinc.com/wp-json/cbtk/v1/case-studies`;
  async function fetchPosts(page = 1, s, field) {
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
  $: console.log(data);
  // res.flatMap(({ posts }) => posts).filter(({ id }) => ids.has(id) ? false : ids.add(id));

  import { onMount } from 'svelte';

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
      title: 'TARGET LOCATION',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      hidden: !$cols.includes('target-location'),
      args: { selector: 'targetLocation' },
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
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- backup fect function-->
<!-- const res = await fetch(
  `${url}?s=${s}&page=${page}&per_page=10&fields=${field.join(',')}`
);

const data = await res.json();

return data; -->

<!-- <SearchFormClose /> -->
{#if $fieldID > 0}
  <Modal show={modal.set(bind(ViewResult))} />
{/if}
<div class="top-wrapper">
  <div class="modal-wrapper">
    <!-- <div class="modal">
      <Selection />
    </div> -->
    <div class="dropdwn-selection">
      <Modal show={$modal}>
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
      </Modal>
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
        <h2 class="table-sublabel">By {data.label}</h2>

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
        {#if $selection > 0}
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
      {:else}
        <NoResult />
      {/if}
    </div>
  </div>
</div>

<!-- </Query>
</div> -->
<style>
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
  .table-sublabel {
    position: absolute;
    top: -3.5rem;
    left: 3rem;
    font-family: 'open Sans', sans-serif;
    font-weight: 550;
    font-size: 1.1rem;
  }
  .modal {
    padding: 8px;
    padding-left: 53rem;
    padding-top: 5px;
  }

  .modal-button {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    padding-top: 20px;
    align-items: center;
  }
  .modal-text {
    color: #014e89;
    font-family: 'open Sans', sans-serif;
    font-weight: 650;
    font-size: 1rem;
    text-transform: capitalize;
  }

  .area-2 {
    grid-column-start: 2;
    display: flex;
    justify-content: flex-start;
    padding-top: 15px;
    padding-left: 20px;
  }

  .table-container {
    overflow: auto;
    width: 100%;
    margin: auto;
  }

  .table-wrapper {
    overflow: scroll;
    width: 95vw;
    max-height: 68vh;
    margin: 0 auto;
  }

  button.modal-button {
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

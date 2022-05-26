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
  import { cols, pages, fieldID, category } from './store';
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
</script>

{#if $fieldID > 0}
  <ModalPrev modalContent={ViewResult} />
  <!-- <Modal show={modal.set(bind(ViewResult))} /> -->
{/if}

<div class="top-wrapper">
  <div class="actionContainer">
    <!-- <button
      class="modal-button-outer"
      on:click|preventDefault={() => (showAction = true)}
    >
      <span>action</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
        ><path
          d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"
        /></svg
      >
    </button> -->
    <div class="modal-outer">
      <button
        class="modal-button-outer"
        on:click|preventDefault={() => (showAction = true)}
      >
        <span>action</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
          ><path
            d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"
          /></svg
        >
      </button>
    </div>
    {#if showAction}
      <div id="selection" class="modal">
        <ul
          class="dropdown-inner"
          tabindex="-1"
          on:blur={() => (showAction = false)}
        >
          <li>
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
          </li>
          <li>
            <button class="modal-button"
              ><span class="modal-text">Coming Soon...</span></button
            >
          </li>
        </ul>
      </div>
    {/if}
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
    position: relative;
    width: max-content;
  }
  /* .modal {
    position: relative;

     z-index: 9999; 
  }*/
  .dropdown-inner {
    position: absolute;
    right: 0;
    z-index: 9999;
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
  .modal-text {
    color: #014e89;
    font-family: 'open Sans', sans-serif;
    font-weight: 650;
    font-size: 1rem;
    text-transform: capitalize;
  }

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
  .modal {
    padding-top: 8px;
    padding-bottom: 8px;
    grid-auto-flow: column;
    justify-content: end;
    width: 95vw;
    margin: 0 auto;
  }
  .modal-outer {
    padding-top: 8px;
    padding-bottom: 8px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    width: 95vw;
    margin: 0 auto;
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

  button.modal-button-outer {
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

  button.modal-button-outer:hover {
    background-color: unset;
    cursor: pointer;
  }

  .area-2 {
    grid-column-start: 2;
    display: flex;
    justify-content: flex-start;
    padding-top: 15px;
    padding-left: 25px;
  }
</style>

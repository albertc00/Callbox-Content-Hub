<script>
  import FeaturedImage from './../Functions/FeaturedImage.svelte';
  import TextWithButton from '../Functions/TextWithButton.svelte';
  import Textonly from '../Functions/Textonly.svelte';
  import Header from '../Functions/Header.svelte';

  import Table from '../Table.svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import NoResult from './NoResult.svelte';
  import { fieldID, SearchTerm, pages } from '../store';
  import TableLoading from './TableLoading.svelte';
  import { LightPaginationNav } from '../pagination/index';

  const url = `https://www.callboxinc.com/wp-json/wp/v2/posts`;

  $: s = $SearchTerm.toLowerCase();
  $: page = $pages;
  $: console.log(page);
  async function fetchPosts(page, s) {
    const res = await fetch(
      `${url}?_embed&search=${s}&page=${page}&per_page=10`
    );

    const totalPage = res.headers.get('x-wp-totalpages');
    const data = await res.json();

    return { data, totalPage };
  }

  $: queryResult = useQuery(['posts', page, s], () => fetchPosts(page, s), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  $: d = $queryResult.data;
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;
  $: data = d?.data;
  $: totalPage = d?.totalPage;
  $: console.log(data);

  import { onMount } from 'svelte';
  import SearchForm from './SearchForm.svelte';
  let box;
  let yTop = 0;

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
      show: true,
      args: { selector: 'title.rendered' },
    },
    {
      title: 'Status',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      show: true,
      args: { selector: 'status' },
    },
    {
      title: 'Excerpt',
      headerComponent: Header,
      cellComponent: Textonly,
      cellAs: 'td',
      show: true,
      args: { selector: 'excerpt.rendered' },
    },
    {
      title: 'Featured Image',
      headerComponent: Header,
      cellComponent: FeaturedImage,
      cellAs: 'td',
      show: true,
      args: { selector: 'slug' },
    },
  ];
</script>

<SearchForm />
<!-- {#if $fieldID > 0}
  <Modal show={modals.set(bind(BlogPost))} />
{/if} -->

<div class="cntnr">
  <div class="results svelte-fhxlyi">
    {#if isFetching || isLoading}
      <div class="loading">
        <div
          class="table-wrapper"
          class:tableScrolled={yTop > 50}
          bind:this={box}
          on:scroll={parseScroll}
          on:mousemove={parseScroll}
        >
          <TableLoading />
        </div>
      </div>
    {:else if isError}
      <span>Error</span>
    {:else if data.length}
      <h2 class="table-label">Blog</h2>
      <div class="table-container">
        <div
          class="table-wrapper"
          class:tableScrolled={yTop > 50}
          bind:this={box}
          on:scroll={parseScroll}
          on:mousemove={parseScroll}
        >
          <Table {data} {colDef} />
        </div>
      </div>
      <div class="area-2">
        <LightPaginationNav
          totalItems={totalPage}
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

<style>
  .loading {
    padding-top: 52px;
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
    overflow: auto;
    width: 100%;
    margin: auto;
  }
  .table-wrapper {
    overflow: scroll;
    width: 95vw;
    max-height: 73vh;
    margin: 0 auto;
  }

  .cntnr {
    padding-top: 20px;
    background-color: #f7f7f7;
  }

  .area-2 {
    grid-column-start: 2;
    padding-left: 0;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
  }
</style>

<script>
  import BlogLoading from './BlogLoading.svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import { fieldID } from '../store';

  const url = `https://www.callboxinc.com/wp-json/wp/v2/posts`;

  async function fetchPosts($fieldID) {
    const res = await fetch(`${url}/${$fieldID}?_embed`);

    const data = await res.json();

    return { data };
  }

  $: queryResult = useQuery(['posts', $fieldID], () => fetchPosts($fieldID), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  $: d = $queryResult.data;
  $: isFetching = $queryResult.isFetching;
  $: isLoading = $queryResult.isLoading;
  $: isError = $queryResult.isError;
  $: data = d?.data;
  $: console.log(data);
</script>

{#if isFetching}
  <BlogLoading />
{:else if isError}
  <span>Error</span>
{:else}
  <div class="container">
    <main>
      <article>
        <header class="entry-header">
          <div class="entry-title">
            <h1>{data.title.rendered}</h1>
            <div class="entry-author">
              Written by
              <a href="https://www.callboxinc.com/author/meldoyr/"
                >{data._embedded['author']['0'].name}</a
              >
            </div>
          </div>

          <img
            class="wp-post-img"
            src={data._embedded['wp:featuredmedia']['0'].link}
            alt={data.slug}
            width="800"
            height="450"
          />
        </header>
        <div class="entry-content">
          <p>{@html data.content.rendered}</p>
        </div>
      </article>
    </main>
  </div>
{/if}

<style>
  article {
    float: none;
    clear: initial;
    width: 100%;
    position: initial;
  }
  .entry-author {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: 'Work Sans', sans-serif;
    color: #231f20;
  }
  .container {
    padding-top: 5rem;
    padding-bottom: 5rem;
    padding-right: calc(1280px / 12);
    padding-left: calc(1280px / 12);
    background-color: #fff;
    border-radius: 10px;
  }
  .wp-post-img {
    width: 100%;
    height: auto;
  }
  .entry-header {
    grid-template-columns: 2fr 3fr;
    gap: 2rem;
    display: grid;
    order: 1;
  }
  .entry-title {
    order: 1;
    display: grid;
    row-gap: 0.75rem;
  }
  .entry-content {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  .entry-content p {
    font-size: 1.25rem;
    line-height: 2.375rem;
    color: rgba(35, 31, 32, 0.9);
    font-family: 'Lora', 'Lato', sans-serif;
    font-weight: 400;

    margin-block-start: 5rem;
    margin-block-end: 2.5rem;
  }
</style>

<script>
  import Result from './Result.svelte';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { isSearching, category } from './store';
  import SearchForm from './SearchForm.svelte';
  import FieldResult from './FieldResult.svelte';
  import SearchResult from './SearchResult.svelte';
  import Dashboard from './Dashboard.svelte';
  import BlogResult from './Blog/BlogResult.svelte';
  import BlogSearchResult from './Blog/BlogSearchResult.svelte';
  import Modal from './modal/Modal.svelte';
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <div
    style="height: 100vh;
  background-color: #f7f7f7;"
  >
    <div class="navbar-selection">
      <div class="nav-wrapper">
        <Dashboard />
      </div>
    </div>
    {#if $category == 1}
      {#if $isSearching}
        <SearchResult />
      {:else}
        <Result />
      {/if}
      <Modal />
      <!-- {:else if $category == 2}
      {#if $isSearching}
        <BlogSearchResult />
      {:else}
        <BlogResult />
      {/if} -->
    {/if}
  </div>
</QueryClientProvider>

<style lang="scss">
  @use '../styles/app';

  @include app.reset;

  @include app.root {
    .divider {
      color: app.colors('grey-150');
      text-align: center;
      @include app.text('4xl');
      height: 54px;
    }
    .navbar-selection {
      top: 44px;
      z-index: 200;
      background-color: #014e89;
    }

    .nav-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr max-content 50px 65px;
      padding: 0 30px;
      align-items: center;
    }
  }
</style>

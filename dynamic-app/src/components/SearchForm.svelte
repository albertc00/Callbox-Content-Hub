<script>
  import { isSearching, SearchTerm, fields } from './store';
  function handleOnSubmit() {
    $isSearching = true;
    $fields = $fields;
  }
</script>

<!-- <button class="menubar" on:click={() => (show = true)}>
    <div class="menubarlabel">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
        ><path d="M20 36V33H28V36ZM6 15V12H42V15ZM12 25.5V22.5H36V25.5Z" /></svg
      ><span class="menulabel">Filters</span>
    </div>
  </button>
  <Modal title={'Select Filter'} bind:show>
    <Filter />
  </Modal> -->

<form class="form" on:submit|preventDefault={handleOnSubmit}>
  <div class="wrapper">
    <input
      class="searchBox"
      type="search"
      name="search"
      spellcheck="true"
      placeholder="Type keywords to find case studies"
      aria-label="Search case studies"
      bind:value={$SearchTerm}
      required
    />

    <button
      class="button"
      disabled={$SearchTerm === ''}
      type="submit"
      aria-label="Start search"
      title="Click to search"
      ><svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="24px"
        height="24px"
        ><path d="M0 0h24v24H0z" fill="none" /><path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        /></svg
      ></button
    >
  </div>
</form>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .form {
      // max-width: 350px;
      width: 100%;
    }

    .wrapper {
      position: relative;
      border-radius: 0.375rem;
      background: #fff;
    }

    .searchBox {
      display: inline-block;
      width: 100%;
      padding: 0.5rem 2.375rem 0.5rem 0.75rem;
      margin: 0;
      font-family: 'Lato', sans-serif;
      @include app.text('sm');
      color: app.colors('grey-400');
      border: 1px solid app.colors('grey-200');
      border-radius: 0.375rem;
      // box-shadow: 0px 8px 9px -6px rgb(95 115 128 / 44%);

      &:focus {
        outline: 0 none;
      }
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      // height: 2.875rem;
      // width: 2.875rem;
      height: calc(2.25rem + 2px);
      width: 2.375rem;
      padding: 0;
      background: none;
      border: 0 none;
      border-radius: 0 0.375rem 0.375rem 0;
      padding: calc((2.25rem - 24px) / 2);
      cursor: pointer;
    }

    .button:disabled {
      cursor: not-allowed;
    }

    .button:disabled > svg {
      fill: #c4cbcf;
    }
  }
</style>

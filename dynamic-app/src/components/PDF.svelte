<script>
  import Button from './Button.svelte';

  export let post;
  export let center = false;
  let copied = false;

  const pdf = post.acf.cb_asset;
  const copy = async () => {
    await navigator.clipboard.writeText(pdf);
    copied = true;

    setTimeout(() => {
      copied = !copied;
    }, 2000);
  };
</script>

<div class="wrapper" class:center>
  <Button href={pdf}>View PDF</Button>

  <Button on:click={copy}>
    {#if copied}
      Copied
    {:else}
      Copy link
    {/if}
  </Button>
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .wrapper {
      display: grid;
      grid-template-columns: max-content max-content;
      gap: 0.5rem;

      &.center {
        justify-content: center;
      }
    }
  }
</style>

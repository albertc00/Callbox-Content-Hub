<script>
  export let id;

  import Button from './Button.svelte';

  export let post;
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

<div class="center">
  <Button href={pdf}>View PDF</Button>

  <Button on:click={copy}>
    {#if copied}
      Copied
    {:else}
      Copy link
    {/if}
  </Button>
</div>

<style>
  .center {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.5rem;
    text-align: center;
    justify-content: center;
  }
</style>

<script>
  import Button from './Button.svelte';
  import ButtonLink from './Functions/ButtonLink.svelte';

  export let post;
  const pdf = post.acf.cb_asset;

  let copied = false;
  const copy = async () => {
    await navigator.clipboard.writeText(pdf);
    copied = true;

    setTimeout(() => {
      copied = !copied;
    }, 2000);
  };
</script>

<div class="center">
  <ButtonLink link={pdf} buttonText="View PDF" />

  <Button on:click={copy}>Copy link</Button>
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

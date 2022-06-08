<script>
  import Button from './Button.svelte';
  export let post;
  let webpage = post.link;
</script>

<div class="center">
  <Button href={webpage}>Gated</Button>

  <Button href={`${webpage}?user=benb`}>Unlocked</Button>
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

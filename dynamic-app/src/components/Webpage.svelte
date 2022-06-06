<script>
  import Anchor from './Anchor.svelte';
  export let post;
  export let id;
  let webpage = post.link;
</script>

{#if id === 'webpage'}
  <Anchor link={webpage}>See Webpage</Anchor>
{:else if id === 'webpage_unlocked'}
  <Anchor link={`${webpage}?user=benb`}>See Full Webpage</Anchor>
{/if}

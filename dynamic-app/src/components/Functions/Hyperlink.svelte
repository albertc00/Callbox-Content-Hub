<script>
  export let post;
  export let texts;
  export let as = 'p';
  export let links;
  const text = texts.split('.').reduce((prev, curr) => prev[curr], post);
  const link = links.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<svelte:element this={as} class="hyperlink"
  ><a href={link}>{text}</a></svelte:element
>

<style>
  .hyperlink {
    margin: 0;
    text-align: center;
  }

  .hyperlink a {
    text-decoration: none;
    color: #196fd9;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
  }
</style>

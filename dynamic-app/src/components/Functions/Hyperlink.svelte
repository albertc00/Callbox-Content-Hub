<script>
  export let post;
  export let texts = 'text';
  console.log(texts);
  const text = texts.split('.').reduce((prev, curr) => prev[curr], post);

  export let as = 'p';
  //   export let text;

  export let links;
  console.log(links);
  const link = links.split('.').reduce((prev, curr) => prev[curr], post);
</script>

{#if as === 'p'}
  <p class="hyperlink"><a href={link}>{text}</a></p>
{:else if as === 'span'}
  <span class="hyperlink"><a href={link}>{text}</a></span>
{:else}
  <div class="hyperlink"><a href={link}>{text}</a></div>
{/if}

<style>
  .hyperlink {
    text-align: center;
  }
  .hyperlink a {
    text-decoration: none;
    color: #196fd9;
  }
</style>

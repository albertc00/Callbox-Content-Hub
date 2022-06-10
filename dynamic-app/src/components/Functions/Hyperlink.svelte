<script>
  export let post;
  export let texts;
  export let as = 'p';
  export let links;
  export let favicon = true;

  const text =
    texts.split('.').reduce((prev, curr) => prev?.[curr], post) ?? '';
  const link =
    links.split('.').reduce((prev, curr) => prev?.[curr], post) ?? '';
</script>

{#if link}
  <svelte:element this={as} class="hyperlink">
    <a href={link} target="_blank" class:favicon>
      {#if favicon}
        <img
          class="favicon"
          src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${link}`}
          alt="Company logo"
          width="16"
          height="16"
          loading="lazy"
        />
      {/if}
      <span class="text">{text}</span>
    </a>
  </svelte:element>
{/if}

<style lang="scss">
  @use '../../styles/app';

  @include app.root {
    .hyperlink {
      margin: 0;
    }

    .hyperlink a {
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      text-decoration: none;
      color: app.colors('blue-350');
    }

    .favicon {
      display: inline-flex;
      gap: 0.5rem;
      align-items: center;
    }
  }
</style>

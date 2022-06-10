<script>
  export let href = null;
</script>

{#if href}
  <a class="button" {href} target="_blank">
    <slot />
  </a>
{:else}
  <button class="button" on:click>
    <slot />
  </button>
{/if}

<style lang="scss">
  @use '../styles/app';

  .button {
    /* display: inline-block;
    visibility: hidden; */
    /* display: none; */
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid app.colors('blue-400');
    color: app.colors('blue-400');
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    background-color: transparent;
    @include app.text('xs');
    font-weight: 600;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    flex-basis: content;
  }

  a.button {
    text-decoration: none;
  }

  .button:hover {
    text-decoration: none;
    background-color: app.colors('blue-400');
    color: #fff;
  }

  .button {
    display: inline-block;
  }
</style>

<script>
  export let link;
</script>

<div class="center">
  <a class="cs_button" href={link} target="_blank">
    <slot />
  </a>
</div>

<style>
  .cs_button {
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #014e89;
    color: #014e89;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    background-color: transparent;
    font-weight: 600;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    flex-basis: content;
  }

  .cs_button:hover {
    text-decoration: none;
    background-color: #014e89;
    color: #fff;
  }
  .center {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.5rem;
    text-align: center;
    justify-content: center;
  }
</style>

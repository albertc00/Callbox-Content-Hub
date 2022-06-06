<script>
  export let post;
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<div class="center">
  <span title={text} class="text">
    {@html text}
  </span>
</div>

<style>
  .center {
    text-align: center;
  }
  span:hover {
    cursor: help;
  }
</style>

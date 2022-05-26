<script>
  export let post;
  export let selector = 'text';

  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<div class="center">
  <span class="text">
    {text}
  </span>
</div>

<style>
  .center {
    text-align: center;
  }
  /* .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
</style>

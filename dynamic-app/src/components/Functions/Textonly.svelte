<script>
  export let post;
  export let selector = 'text';
  export let center = true;
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
  console.log(text);
</script>

<div class:center>
  <span title={text} class="text">
    {@html text}
  </span>
  <!-- <TextWithInfo {as} info={text}>{@html text}</TextWithInfo> -->
</div>

<style>
  .center {
    text-align: center;
  }

  div:hover {
    cursor: help;
  }
  .text {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

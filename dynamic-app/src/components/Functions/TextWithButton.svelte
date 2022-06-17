<script>
  import Button from '../Button.svelte';

  export let text;
  export let buttonText;

  // fetch('https://www.callboxinc.com').then(res => res.text()).then(data => { const parser = new DOMParser(); const doc = parser.parseFromString(data, 'text/html'); const favico = doc.querySelector('link[rel="shortcut icon"]'); console.log(favico.href); })
</script>

<div class="title">
  <span class="text">{text}</span>
  <div class="title-prev">
    <Button on:click>{buttonText}</Button>
  </div>
</div>

<style>
  .title {
    display: flex;
    gap: 0.75rem;
    /* flex-wrap: wrap; */
    align-items: center;
  }

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-prev {
    display: none;
  }

  .title:hover .title-prev {
    display: inline-block;
  }

  /* .title-prev:hover {
    text-decoration: none;
    background-color: #014e89;
    color: #fff;
  } */
</style>

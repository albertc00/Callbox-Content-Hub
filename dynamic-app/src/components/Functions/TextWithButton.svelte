<script>
  import { fieldID } from '../store';
  export let post;

  function onClick(value) {
    $fieldID = value;
  }

  export let tableheader = ['nani', 'nandato'];
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<div class="title">
  <span class="text">{text}</span>
  <button class="preview" on:click={() => onClick(post.id)}>Preview</button>
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

  .preview {
    /* display: inline-block;
    visibility: hidden; */
    display: none;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #014e89;
    color: #014e89;
    border-radius: 0.25rem;
    padding: 0.525rem 1.05rem;
    background-color: transparent;
    font-weight: 600;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    flex-basis: content;
  }

  .title:hover .preview {
    display: inline-block;
  }

  .preview:hover {
    text-decoration: none;
    background-color: #014e89;
    color: #fff;
  }
</style>

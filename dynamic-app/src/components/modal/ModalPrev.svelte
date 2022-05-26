<script>
  import { fieldID } from '../store';

  export let modalContent;
  function close() {
    $fieldID = 0;
  }
</script>

<div on:click|self class="modal">
  <div class="content">
    <button on:click={close}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="48" width="48"
        ><path
          d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"
        /></svg
      >
    </button>
    <svelte:component this={modalContent} on:click />
  </div>
</div>

<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }

  .content {
    background-color: white;
    border-radius: 10px;
    width: 70rem;
    height: 50rem;
    z-index: 9999;
    position: relative;
  }
  .content button {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: transparent;
    border: 0;
  }

  .content button:hover {
    cursor: pointer;
  }
</style>

<script>
  import { fade, fly } from 'svelte/transition';

  import {
    createEventDispatcher,
    beforeUpdate,
    afterUpdate,
    onMount,
  } from 'svelte';

  const dispatch = createEventDispatcher();

  export let title = 'Modal';
  export let show = true;

  function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent('clickOutside', node));
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      },
    };
  }

  function handleClose() {
    show = false;
    dispatch('close');
  }

  let modalRef;
  let scroll = false;

  beforeUpdate(() => {
    // if (modalRef) {
    //   const vh = window.innerHeight;
    //   const marginTop = vh * 0.15;
    //   const modalHeight = modalRef.offsetHeight + marginTop;
    //   scroll = modalHeight > vh;
    //   console.log(scroll);
    // }
  });

  afterUpdate(() => {
    if (modalRef) {
      const vh = window.innerHeight;
      const marginTop = vh * 0.15;
      const modalHeight = modalRef.offsetHeight + marginTop;
      scroll = modalHeight > vh;
      console.log(scroll);
    }
  });
</script>

{#if show}
  <div class="modal-bg" class:scroll>
    <div
      role="dialog"
      class="modal"
      use:clickOutside
      bind:this={modalRef}
      on:clickOutside={handleClose}
      transition:fly={{ y: 50 }}
    >
      <div class="modal-header" class:hasTitle={title !== ''}>
        <h4 class="modal-title">{title}</h4>
        <button class="close" on:click={handleClose}>
          <svg
            class="x"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            ><path
              d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z"
            /></svg
          >
        </button>
      </div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-bg {
    background-color: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .modal-bg.scroll {
    overflow-y: scroll;
  }

  .modal {
    margin-top: 15vh;
    align-self: flex-start;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 1px 24px 0 rgb(0 0 0 / 8%);
    min-width: 400px;
    max-width: 75%;
    min-height: 200px;
  }

  .modal-header {
    display: flex;
    justify-content: right;
    align-items: center;
    background-color: #063060;
    border-radius: 0.25rem 0.25rem 0 0;
    padding: 0.5rem;
  }

  .modal-header.hasTitle {
    justify-content: space-between;
  }

  .modal-title {
    margin: 0 0 0 1rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: #fff;
  }

  .close {
    display: inline-block;
    background-color: transparent;
    border: 0 none;
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: calc(24px + 1rem);
  }

  .x {
    fill: #fff;
  }

  .modal-content {
    padding: 1.25rem;
  }
</style>

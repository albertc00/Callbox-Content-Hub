<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Modal from './modal/Modal.svelte';

  export let post;
  const title = post.title.rendered;
  const postID = post.id;

  let show = false;
</script>

<Modal title="Case Study Preview" bind:show>
  <div style="height: 150vh; width: 400px; background-color: red;" />
</Modal>

<TextWithButton
  text={title}
  buttonText="Preview"
  on:click={() => (show = true)}
/>

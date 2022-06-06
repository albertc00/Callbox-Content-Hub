<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Modal from './modal/Modal.svelte';
  import PreviewFieldResult from './PreviewFieldResult.svelte';

  export let post;
  const title = post.title.rendered;
  const postID = post.id;

  let show = false;
</script>

<Modal title="Case Study Preview" bind:show>
  <PreviewFieldResult {postID} />
</Modal>

<TextWithButton
  text={title}
  buttonText="Preview"
  on:click={() => (show = true)}
/>

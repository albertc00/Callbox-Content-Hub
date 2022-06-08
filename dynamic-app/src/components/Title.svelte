<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import Modal from './modal/Modal.svelte';
  import PreviewFieldResult from './PreviewFieldResult.svelte';
  import CaseStudyDetails from './CaseStudyDetails.svelte';
  export let post;
  export let id;
  const title = post.title.rendered;
  let postID = post.id;

  //let show = false;
  import { useModal } from './modal/Modal.svelte';

  // const [show] = useModal({ title: 'Case Study Preview' }, PreviewFieldResult, {
  //   postID: postID,
  // });

  const [show] = useModal({ title: 'Case Study Details' }, CaseStudyDetails, {
    post: post,
  });
</script>

<!-- <Modal title="Case Study Preview" bind:show>
  <PreviewFieldResult {postID} />
</Modal> -->

<TextWithButton text={title} buttonText="Preview" on:click={() => show()} />

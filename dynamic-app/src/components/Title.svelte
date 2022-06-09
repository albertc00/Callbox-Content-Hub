<script>
  import TextWithButton from './Functions/TextWithButton.svelte';
  import CaseStudyDetails from './CaseStudyDetails.svelte';

  export let post;
  const titles = post.title.rendered;

  import { useModal } from './modal/Modal.svelte';

  const decodeHtml = (() => {
    const text = document.createElement('textarea');

    return (html) => {
      text.innerHTML = html;
      return text.value;
    };
  })();

  const title = decodeHtml(titles);

  const [show] = useModal({ title: 'Case Study Details' }, CaseStudyDetails, {
    post: post,
  });
</script>

<!-- <Modal title="Case Study Preview" bind:show>
  <PreviewFieldResult {postID} />
</Modal> -->

<TextWithButton text={title} buttonText="Details" on:click={() => show()} />

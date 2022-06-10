<script>
  import Button from '../Button.svelte';
  export let post;
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
  // let show = false;
  //import Modal from '../modal/Modal.svelte';
  import CaseResult from '../CaseResult.svelte';
  import { useModal } from '../modal/Modal.svelte';

  const [show] = useModal({ title: 'Case Study Preview' }, CaseResult, {
    title: post.title.rendered,
    text: text,
  });
</script>

<div>
  {#if selector === 'acf.cs_results'}
    <Button class="cs_button" on:click={() => show()}>Results</Button>
  {:else}
    <span>{text.map(({ label }) => label).join(', ')}</span>
  {/if}
</div>

<!-- 
{#if selector === 'acf.cs_results'}
   <Modal title="Campaign Results" bind:show> 
  <div class="wrapper">
    <h3>{post.title.rendered}</h3>
    <table>
      <thead>
        <tr>
          <th>KPI</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {#each text as { label, value }}
          <tr>
            <td>
              {label}
            </td>
            <td>
              {value}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  </Modal>
{/if} -->

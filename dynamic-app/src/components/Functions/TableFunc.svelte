<script>
  export let post;
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
  let show = false;
  import Modal from '../modal/Modal.svelte';
</script>

{#if selector === 'acf.cs_results'}
  <div class="center">
    <button class="cs_button" on:click={() => (show = true)}>Results</button>
  </div>
{:else}
  <div class="center">
    <span>{text.map(({ label }) => label).join(', ')}</span>
  </div>
{/if}

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
{/if}

<style>
  .cs_button {
    /* margin: 10px; */
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #014e89;
    color: #014e89;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    background-color: transparent;
    font-weight: 600;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    text-decoration: none;
  }

  .cs_button:hover {
    text-decoration: none;
    background-color: #014e89;
    color: #fff;
  }

  .center {
    text-align: center;
  }

  .wrapper {
    padding: 1rem;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    color: #231f20;
    margin: 0 0 1.25rem;
  }

  table {
    /* border: 1px solid rgb(199, 198, 198); */
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0 auto;
  }

  table,
  td {
    /* border: 1px solid rgb(199, 198, 198); */
    /* border-collapse: collapse;  */
    /* margin-bottom: 10px; */
    /* padding: 10px; */
    /* width: 100%; */
    /* position: relative; */
  }

  /* tr:hover {
    background-color: #f1efef;
  } */

  td,
  th {
    border: 1px solid #c4cbcf;
  }

  td {
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: initial;
    padding: 0.5rem 1rem;
    color: #231f20;
    min-width: 150px;
  }

  th {
    /* color: #fff; */
    /* background-color: #014e89; */
    background-color: #c4cbcf;
    color: #231f20;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Work Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.5rem;
    /* min-width: 200px; */
    text-align: center;
  }

  /* tr:nth-child(odd) {
    background-color: rgb(202, 199, 199);
  } */
</style>

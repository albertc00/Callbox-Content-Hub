<script>
  export let post;
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
  let show = false;
  import Modal from '../modal/Modal.svelte';
</script>

{#if selector === 'results'}
  <div class="center">
    <button class="cs_button" on:click={() => (show = true)}> Results </button>
  </div>
{:else}
  <div class="center">
    <span>{text.map(({ label }) => label).join(', ')}</span>
  </div>
{/if}

{#if selector === 'results'}
  <Modal title="Results" bind:show>
    <div class="center">
      <table>
        <thead>
          <tr>
            <th> KPI </th>
            <th> # </th>
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
    padding: 0.525rem 1.05rem;
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
  table {
    border: 1px solid rgb(199, 198, 198);
    border-collapse: collapse;
  }

  table,
  td {
    /* border: 1px solid rgb(199, 198, 198); */
    /* border-collapse: collapse;  */
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    position: relative;
  }
  th {
    background-color: #014e89;
    color: white;
    /* border: 1px solid rgb(199, 198, 198); */
    /* border-collapse: collapse; */
    margin-bottom: 10px;
    padding: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 1.15rem;
    line-height: 1.2rem;
  }
  tr:hover {
    background-color: #f1efef;
  }
  td {
    font-family: 'Work Sans', sans-serif;
    letter-spacing: initial;
  }

  th {
    color: #fff;
    background-color: #014e89;
    font-weight: 600 !important;
    text-transform: uppercase;
    font-size: 1rem;
    line-height: 1.25rem;
    font-family: 'Work Sans', sans-serif;
    letter-spacing: 0.1px;
    padding: 15px 25px;
    min-width: 200px;
    text-align: center;
  }
  tr:nth-child(odd) {
    background-color: rgb(202, 199, 199);
  }
</style>

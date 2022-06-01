<script>
  import { col } from '../SelectColumn';
  import {
    isSearching,
    SearchTerm,
    fields,
    cols,
    seecol,
    MoreField,
  } from '../store';
  import { selects } from '../selection';
  function handleOnSubmit() {
    $isSearching = false;
    $MoreField = true;

    $cols = $cols;
  }
</script>

<h2>Available</h2>
<div class="dropdown">
  <ul class="checbox-filters">
    {#each selects as { n, id, label } (id)}
      <li class="check-svelte">
        <label class="filters">
          <input
            class="checkbox-svelte"
            type="checkbox"
            bind:group={$fields}
            value={n}
          />
          <span class="checkbox-label" for={id}> {label} </span>
        </label>
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    list-style-type: none;
  }
  .filters {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    padding: 5px;
    background-color: #f7f7f7;
    border-radius: 0.25rem;
  }
  .check-svelte {
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    background-color: #fff;
    color: #5f7380;
  }

  h2 {
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #231f20;
    margin: 0 0 0.5rem 0.5rem;
  }
  .checbox-filters {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
  .filters:hover,
  .checkbox-label:hover {
    cursor: pointer;
  }
  .checkbox-svelte {
    -webkit-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 8px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }
  .checkbox-svelte:active,
  .checkbox-svelte:checked:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .checkbox-svelte:checked {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
  }
  .checkbox-svelte:checked:after {
    content: '\2714';

    font-size: 18px;
    position: absolute;
    top: -4px;
    left: 1px;

    color: #4e4e4e;
  }
  .checkbox-svelte:hover {
    transform: scale(1.2, 1.2);
  }
  .checkbox-label {
    font-family: 'Work Sans', work-sans, sans-serif;
    font-size: 1.15rem;
    line-height: 1.2rem;
    padding: 8px;
    color: #1f1f1f;
  }
</style>

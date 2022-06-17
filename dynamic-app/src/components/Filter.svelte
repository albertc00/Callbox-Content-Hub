<script>
  import Button from './Button.svelte';
  import MultiTermInput from './MultiTermInput.svelte';

  export let properties;
  export let filters = [];
  export let exclude = [];
  export let onClose;
  export let onApply;

  function handleCancel() {
    onClose();
  }

  let step = filters.length ? 2 : 0;

  // Step 0
  let selectedProp;
  $: property = properties.find(({ id }) => selectedProp === id) ?? {};

  // Step 1
  const operators = [
    { text: 'contains exactly', value: 'contains' },
    { text: "doesn't contain exactly", value: 'not_contains' },
  ];

  let selectedOperator = null;
  $: operator = operators.find(({ value }) => selectedOperator === value);

  let operand = [];

  function handleBack() {
    const goto =
      filters.some(({ id }) => id === selectedProp) || filters.length ? 2 : 0;

    selectedProp = '';
    selectedOperator = null;
    operand = [];

    step = goto;
  }

  function handleAddFilter() {
    //  const goto = filters.some(({ id }) => id === selectedProp) ? 2 : 0;
    selectedProp = '';
    selectedOperator = null;
    operand = [];
    // step = goto;
    step = 0;
  }

  // Step 1
  function handleApply(filter) {
    const { id: filterID } = filter;
    const index = filters.findIndex(({ id }) => id === filterID);

    if (index >= 0) {
      filters[index] = filter;
    } else {
      filters = [...filters, filter];
    }

    if (!exclude.includes(filterID)) {
      exclude = [...exclude, filterID];
    }

    step = 2;
  }

  // Step 2
  function handleEditFilter(filterID) {
    const {
      operator: { value },
      operand: op,
    } = filters.find(({ id }) => id === filterID);

    selectedProp = filterID;
    selectedOperator = value;
    operand = op;

    step = 1;
  }

  function handleDeleteFilter(filterID) {
    filters = filters.filter(({ id }) => id !== filterID);
    exclude = exclude.filter((excl) => excl !== filterID);
    selectedOperator = null;
    operand = [];

    if (!filters.length) {
      step = 0;
    }
  }

  function handleSubmit() {
    onApply(filters);
  }

  function joinOr(arr) {
    const words = [...arr];

    if (words.length < 3) {
      return words.join(' or ');
    } else {
      const last = words.pop();
      return `${words.join(', ')} or ${last}`;
    }
  }
</script>

<form class="filter-wrapper" on:submit|preventDefault={handleSubmit}>
  {#if step === 0}
    <div class="step">
      {#if filters.length}
        <button type="button" class="back" on:click|preventDefault={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
            ><path
              d="M10 16 4 10 10 4 11.062 5.062 6.875 9.25H16V10.75H6.875L11.062 14.938Z"
            /></svg
          >
          <span>Back</span>
        </button>
      {/if}
      <h6>Case Study Properties</h6>
      <div class="scroll-container">
        <ul>
          {#each properties as { id, label } (id)}
            {#if !exclude?.includes(id)}
              <li>
                <label class="field">
                  <input
                    class="radio offscreen"
                    type="radio"
                    name="property"
                    bind:group={selectedProp}
                    value={id}
                    on:change={() => (step = 1)}
                  />
                  <span>{label}</span>
                </label>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  {:else if step === 1}
    <div class="step">
      <button type="button" class="back" on:click|preventDefault={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
          ><path
            d="M10 16 4 10 10 4 11.062 5.062 6.875 9.25H16V10.75H6.875L11.062 14.938Z"
          /></svg
        >
        <span>Back</span>
      </button>
      <h6>{property.label}</h6>
      <div class="operators" class:operator>
        {#each operators as { text, value } (value)}
          <div class="operator">
            <label class="operator-label">
              <input
                class="radio"
                type="radio"
                name="operator"
                bind:group={selectedOperator}
                {value}
              />
              <span class="operator-text">{text}</span>
            </label>
            {#if selectedOperator === value}
              <div>
                <!-- <input class="operand" bind:value={operand} /> -->
                <MultiTermInput bind:keywords={operand} />
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <Button
        disabled={!operand.length}
        on:click={() => handleApply({ ...property, operator, operand })}
        preventDefault>Apply filter</Button
      >
    </div>
  {:else if step === 2}
    <div class="step">
      <div class="filters">
        {#each filters as { id, label, operator: { text }, operand } (id)}
          <div
            class="filter"
            on:click|preventDefault={() => handleEditFilter(id)}
          >
            <p
              class="filter-desc"
              title={`${label} ${text} "${joinOr(operand)}"`}
            >
              <span class="filter-prop">{label}</span>
              {text}
              <strong class="filter-keyword">{joinOr(operand)}</strong>
            </p>
            <button
              type="button"
              class="delete-filter"
              on:click|preventDefault={() => handleDeleteFilter(id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                ><path
                  d="M5.896 17.5Q5.167 17.5 4.656 16.99Q4.146 16.479 4.146 15.75V5.125H3.333V3.375H7.542V2.5H12.458V3.375H16.667V5.125H15.833V15.75Q15.833 16.479 15.323 16.99Q14.812 17.5 14.083 17.5ZM14.083 5.125H5.896V15.75Q5.896 15.75 5.896 15.75Q5.896 15.75 5.896 15.75H14.083Q14.083 15.75 14.083 15.75Q14.083 15.75 14.083 15.75ZM7.458 14H9.208V6.875H7.458ZM10.771 14H12.521V6.875H10.771ZM5.896 5.125V15.75Q5.896 15.75 5.896 15.75Q5.896 15.75 5.896 15.75Q5.896 15.75 5.896 15.75Q5.896 15.75 5.896 15.75Z"
                /></svg
              >
            </button>
          </div>
        {/each}
      </div>
      <button
        type="button"
        class="and"
        on:click|preventDefault={handleAddFilter}>and</button
      >
      <div class="button-row">
        <button class="primary" type="submit">Apply filter</button>
        <button on:click|preventDefault={handleCancel}>Cancel</button>
      </div>
    </div>
  {/if}
</form>

<!-- <div class="button-row">
    <button class="primary" type="submit">Apply Filter</button>
    <button on:click|preventDefault={handleCancel}>Cancel</button>
  </div> -->
<style lang="scss">
  @use '../styles/app';

  @include app.root {
    $max-width: 360px;
    $padding: 0.5;

    .filter-wrapper {
      max-width: $max-width;
    }

    .step {
      padding: $padding * 1rem;
    }

    .back {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      border: 0 none;
      padding: 0;
      margin-bottom: 0.5rem;
      background: transparent;
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      color: app.colors('blue-350');
      cursor: pointer;
    }

    button {
      svg {
        fill: app.colors('blue-350');
        cursor: pointer;
      }
    }

    h6 {
      @include app.text('base');
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      color: app.colors('grey-900');
      margin: 0 0 0.5rem 0;
    }

    .scroll-container {
      margin: 0 auto;
      min-height: calc((42px * 5) + (0.75rem * 6));
      max-height: calc((42px * 5) + (0.75rem * 6));
      overflow-y: scroll;
      padding: 0.5rem 0.5rem 0.5rem 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      row-gap: 0.75rem;
    }

    li {
      border: 1px solid #b1b1b1;
      border-radius: 0.25rem;
      background-color: #fff;
      color: app.colors('grey-400');
    }

    .field {
      display: block;
      padding: 0.5rem 0.75rem;
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      color: app.colors('grey-400');
      cursor: pointer;
    }

    .radio {
      margin: 0;
    }

    .offscreen {
      position: fixed;
      top: 0;
      left: -9999px;
    }

    .operators {
      margin-bottom: 1.5rem;
    }

    .operator {
      display: grid;
      row-gap: 0.25rem;
      padding: 0.125rem;
    }

    .operator-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      @include app.text('base');
      font-family: 'Lato', sans-serif;
      color: app.colors('grey-400');
    }

    .delete-filter {
      display: none;
      align-items: center;
      justify-content: center;
      border: 0 none;
      background-color: transparent;
      cursor: pointer;

      svg {
        fill: app.colors('blue-350');
      }
    }

    .filters {
      display: grid;
      row-gap: 1rem;
    }

    .filter {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      @include app.text('base');
      font-family: 'Lato', sans-serif;
      color: app.colors('grey-900');
      padding: 0.75rem 0.5rem 0.75rem 1rem;
      border: 1px solid #b1b1b1;
      border-radius: 0.25rem;
      background-color: #fff;
      transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
      width: calc(#{$max-width} - #{$padding * 2rem});

      &:hover {
        background-color: rgba(#b1b1b1, 0.1);

        .delete-filter {
          display: inline-flex;
        }
      }
    }

    .filter-desc {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .filter-prop {
      font-weight: 600;
      color: app.colors('blue-400');
    }

    .filter-keyword {
      font-weight: 600;
    }

    .and {
      display: inline-block;
      @include app.text('xs');
      font-weight: 600;
      text-transform: uppercase;
      color: app.colors('grey-900', 0.8);
      background-color: app.colors('grey-150', 0.4);
      padding: 0.25rem 0.75rem;
      margin: 1rem 0;
      border: 1px solid app.colors('grey-300');
      border-radius: 0.25rem;
      cursor: pointer;
      // transition: all 0.3s;
      transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    }

    .button-row {
      display: flex;
      gap: 0.75rem;
      // margin-top: 0.5rem;

      button {
        border: 1px solid app.colors('blue-700');
        border-radius: 0.25rem;
        padding: 0.375rem 0.75rem;
        @include app.text('sm');
        font-weight: 600;
        background-color: #fff;
        color: app.colors('blue-700');
        cursor: pointer;
      }
    }

    .button-row .primary {
      background-color: app.colors('blue-700');
      color: #fff;
    }
  }
</style>

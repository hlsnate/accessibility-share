<script type="ts">
  import RequiredMarker from './RequiredMarker.svelte'
  export let value: any
  export let name: string | undefined = undefined
  export let index: number | undefined = null
  export let label: string
  export let help: string = null
  export let options: String[] = []
  export let props: {
    type?: string
    // type?:
    //   | 'text'
    //   | 'textarea'
    //   | 'select'
    //   | 'number'
    //   | 'email'
    //   | 'tel'
    //   | 'checkbox'
    //   | 'date'
    //   | 'sum'
    pattern?: string
    required?: boolean
    min?: string | number
    max?: string | number
    minlength?: number
    maxlength?: number
    step?: string | number
  } = {}
  const required = props.required !== false // default true
  const randomId = Math.floor(Math.random() * 10000)
  const fieldId = 'field-' + randomId
  const helpId = help ? 'help-' + randomId : undefined
  function uneditable(e: Event) {
    e.preventDefault()
  }
  function tabEventsOnly(e: KeyboardEvent) {
    // allow tab keyboard navigation in/out of this field only
    if (!['Tab', 'ShiftLeft', 'ShiftRight'].includes(e.code)) {
      e.preventDefault()
    }
  }
  const fieldName = name
    ? index !== null
      ? name + '.' + index
      : name
    : undefined
</script>

{#if props?.type === 'select'}
  <label for={fieldId}>
    <RequiredMarker {required} />
    {label || ''}
  </label>
  {#if help}
    <div class="help" id={helpId}>{help}</div>
  {/if}
  <select
    bind:value
    name={fieldName}
    id={fieldId}
    aria-describedby={helpId}
    {required}
  >
    <option value="">Select</option>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
{:else if props?.type === 'checkbox'}
  <label class="checkbox">
    {#if help}
      <div class="help" id={helpId}>{help}</div>
    {/if}
    <input
      type="checkbox"
      bind:checked={value}
      name={fieldName}
      aria-describedby={helpId}
      {...props}
      {required}
    />
    <RequiredMarker {required} />
    {label || ''}
  </label>
{:else if props?.type === 'textarea'}
  <label for={fieldId}>
    <RequiredMarker {required} />
    {label || ''}
  </label>
  {#if help}
    <div class="help" id={helpId}>{help}</div>
  {/if}
  <textarea
    bind:value
    name={fieldName}
    id={fieldId}
    aria-describedby={helpId}
    {...{ ...props, type: undefined }}
    {required}
  />
{:else if props?.type === 'sum'}
  <label for={fieldId}>
    <RequiredMarker {required} />
    {label || ''}
  </label>
  {#if help}
    <div class="help" id={helpId}>{help}</div>
  {/if}
  <input
    bind:value
    id={fieldId}
    aria-describedby={helpId}
    class="sum"
    tabindex={-1}
    on:keydown={tabEventsOnly}
    on:mousedown={uneditable}
    on:paste={uneditable}
    {...{ ...props, type: 'number' }}
    {required}
  />
  <!-- on:keydown={uneditable}
  on:mousedown={uneditable}
  on:paste={uneditable} -->
{:else}
  <label for={fieldId}>
    <RequiredMarker {required} />
    {label || ''}
  </label>
  {#if help}
    <div class="help" id={helpId}>{help}</div>
  {/if}
  <input
    bind:value
    name={fieldName}
    id={fieldId}
    aria-describedby={helpId}
    {...props}
    {required}
  />
{/if}

<style lang="postcss">
  label {
    grid-column-start: 1;
    text-align: right;
    color: var(--dark-grey);
  }
  label.checkbox,
  .help + input {
    grid-column-start: 2;
  }
  label.checkbox {
    text-align: left;
  }
  .red {
    color: var(--red);
  }
  div.help {
    font-style: italic;
    color: var(--muted);
    margin-left: 0.5rem;
  }
  input,
  select,
  textarea {
    font: inherit;
    padding: 0.3rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    width: 100%;
  }
  input[type='checkbox'],
  input[type='radio'] {
    width: auto;
    margin-right: 0.8rem;
  }
  input.sum {
    border: none;
    &:active {
      border: none;
    }
  }
  .invalid {
    border-color: red;
  }
  @media (max-width: 650px) {
    label.checkbox,
    .help + input {
      /* margin-top: 1rem; */
      grid-column-start: 1;
    }
    label {
      text-align: left;
    }
    input,
    select,
    textarea {
      margin-bottom: 1.6rem;
    }
  }
</style>

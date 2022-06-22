<script type="ts">
  import type { Writable } from 'svelte/store'
  import WizardProgress from '$lib/WizardProgress.svelte'
  export let steps: any[] = []
  export let onSave: () => void
  export let onSubmit: () => void
  export let step: Writable<number>

  function prevStep() {
    $step -= 1
  }
  function nextStep() {
    $step += 1
  }
  function handleSubmit(e: Event) {
    e.preventDefault()
    if ($step === steps.length) {
      onSubmit()
    } else {
      onSave()
      nextStep()
    }
  }
</script>

<div class="note">
  <em
    >NOTE Required fields are prefixed with an asterisk (<span class="red"
      >*</span
    >)</em
  >
</div>
<WizardProgress steps={steps.length} current={$step} />
<form on:submit={handleSubmit}>
  <svelte:component this={steps[$step - 1]} />
  <div class="button-group">
    {#if $step > 1}
      <button type="button" class="prev" on:click={prevStep}>Prev</button>
    {/if}
    {#if onSave}
      <button type="button" class="save" on:click={onSave}>Save</button>
    {/if}
    {#if $step === steps.length}
      <button type="submit" class="submit">Submit</button>
    {:else}
      <button type="submit" class="next">Next</button>
    {/if}
  </div>
</form>

<style type="postcss">
  .note {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .red {
    color: var(--red);
  }
  form {
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
    gap: 1rem;
    align-items: baseline;
  }
  div.button-group {
    grid-column-start: 1;
    grid-column-end: -1;
    text-align: center;
    width: 100%;
    margin: 1rem auto;
    padding-top: 1rem;
    border-top: 0.5px solid var(--light-grey);
  }
  button.prev,
  button.next {
    background-color: orangered;
  }
  button.save {
    background-color: green;
  }
  @media (max-width: 900px) {
    form {
      grid-template-columns: 1fr 3fr;
    }
  }
  @media (max-width: 650px) {
    form {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
</style>

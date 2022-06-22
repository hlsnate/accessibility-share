<script type="ts">
  import ScreenReaderOnly from '$lib/ScreenReaderOnly.svelte'
  export let title: string = ''
  export let onRemove: () => void = undefined
</script>

<fieldset>
  {#if title}
    <legend>{title} </legend>
  {/if}
  {#if onRemove}
    <div class="button-wrapper">
      <button type="button" on:click={onRemove}>
        remove
        {#if title}
          <ScreenReaderOnly>{title}</ScreenReaderOnly>
        {/if}
      </button>
    </div>
  {/if}
  <slot />
</fieldset>

<style>
  .button-wrapper {
    text-align: right;
    grid-column-start: 2;
  }
  fieldset {
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
    width: 100%;
    gap: 1rem;
    align-items: baseline;
    grid-column-start: 1;
    grid-column-end: -1;
    border-radius: 1rem;
    border: 1px solid #aaa;
    padding: 1rem;
    margin: 0.5rem 0;
  }
  legend {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-family: var(--font-header);
    font-weight: normal;
    font-style: italic;
    font-size: 1.4rem;
    color: var(--dark-grey);
  }
  button {
    background-color: rgb(187, 2, 2);
    font-size: 0.9rem;
    margin: 0;
  }
  @media (max-width: 900px) {
    fieldset {
      grid-template-columns: 1fr 3fr;
    }
  }
  @media (max-width: 650px) {
    .button-wrapper {
      grid-column-start: 1;
    }
    fieldset {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import IconSuccess from './icons/success.svelte'
  import IconError from './icons/error.svelte'
  import IconInfo from './icons/info.svelte'
  import IconClose from './icons/close.svelte'

  const dispatch = createEventDispatcher()

  export let type: 'success' | 'info' | 'error' = 'info'
  export let dismissible = true
</script>

<article class={type} role="alert" transition:fade>
  {#if type === 'success'}
    <IconSuccess width="1.1em" />
  {:else if type === 'error'}
    <IconError width="1.1em" />
  {:else}
    <IconInfo width="1.1em" />
  {/if}

  <div class="text">
    <slot />
  </div>

  {#if dismissible}
    <button class="close" on:click={() => dispatch('dismiss')}>
      <IconClose width="0.8em" />
    </button>
  {/if}
</article>

<style lang="postcss">
  article {
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    margin: 0 auto 0.5rem auto;
    width: 20rem;
  }
  .error {
    background: red;
  }
  .success {
    background: green;
  }
  .info {
    background: orangered;
  }
  .text {
    margin-left: 1rem;
  }
  button {
    color: white;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 auto;
    line-height: 1;
    font-size: 1rem;
  }
</style>

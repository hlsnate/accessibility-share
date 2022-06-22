<script type="ts">
  export let required = true
</script>

{#if required}
  <span>*</span>
{/if}

<style lang="postcss">
  span {
    color: var(--red);
  }
</style>

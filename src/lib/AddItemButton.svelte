<script lang="ts">
  export let onClick: () => void
  $: thing = () => {
    onClick()
  }
</script>

<div>
  <button type="button" on:click={onClick}><slot /></button>
</div>

<style>
  div {
    margin: auto 1rem;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: -1;
  }
</style>

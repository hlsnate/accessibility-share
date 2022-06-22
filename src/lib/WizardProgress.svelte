<script type="ts">
  export let steps: number = 0
  export let current: number = 0
  const list = [...Array(steps).keys()].map((n) => n + 1)
</script>

<div role="img" alt={`Step ${current} of ${steps}`}>
  {#each list as item, n}
    <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
      <circle class={current === n + 1 ? 'here' : ''} cx="5" cy="5" r="5" />
    </svg>
  {/each}
</div>

<style lang="postcss">
  circle {
    fill: #ccc;
  }
  circle.here {
    fill: orangered;
  }
  div {
    display: grid;
    place-content: center;
    grid-auto-flow: column;
    gap: 10px;
  }
</style>

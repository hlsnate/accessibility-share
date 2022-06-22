<script>
  const num = 4
  import Foo from '$lib/Foo.svelte'
</script>

<p>Hello</p>
<p>anotherh paragraph</p>
<div>{num}</div>
<Foo />

<style lang="css">
  p {
    color: green;
    font-size: 3rem;
  }
</style>

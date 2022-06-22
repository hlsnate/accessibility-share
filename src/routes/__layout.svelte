<script lang="ts">
  import Notices from '$lib/Notify/Notices.svelte'
  import Nav from '$lib/Nav.svelte'
  import '../app.css'
</script>

<svelte:head>
  <title>Demo Site</title>
</svelte:head>

<Notices />
<Nav />
<main id="content">
  <slot />
</main>
<footer>I am the footer</footer>

<style lang="postcss">
  main {
    margin: 0 15%;
    line-height: 1.7;
  }
  footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--light-grey);
    text-align: center;
    font-size: 0.9rem;
    font-style: italic;
  }
  @media (max-width: 1000px) {
    main {
      margin: 0 10%;
    }
  }
  @media (max-width: 500px) {
    main {
      margin: 0 5%;
    }
  }
</style>

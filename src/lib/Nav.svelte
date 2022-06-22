<header>
  <div id="skip"><a href="#content">Skip to Main Content</a></div>
  <nav>
    <a href="/" class="logo">Demo Site</a>
  </nav>
</header>

<style lang="postcss">
  #skip a {
    display: inline-block;
    position: absolute;
    background: inherit;
    background-color: #444;
    top: 0;
    left: -10000px;
    &:focus {
      left: 0;
      padding: 5px 8px;
      margin: 10px;
    }
  }

  header {
    background-color: #444;
  }
  nav {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding: 10px 20px;
    align-items: center;
  }
  a {
    color: white;
    font-weight: 100;
    text-decoration: none;
    &:hover {
      font-weight: 100;
      text-decoration: underline;
      color: rgb(253, 157, 93);
    }
  }
  a.logo {
    font-family: var(--font-header);
    font-size: 1.4rem;
  }
  @media (max-width: 500px) {
    a {
      display: none;
    }
    a.logo {
      display: inline;
    }
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { goTo, route, routes } from "./stores/router";
  import notFound from "./views/404.svelte";

  const page = $derived({
    component: routes[$route] ?? notFound,
  });
</script>

<main>
  <page.component />
</main>

<style>
  main {
    --margin: 2rem;
    display: flex;
    flex-direction: column;
    width: calc(100dvw - var(--margin) * 2);
    align-items: center;
    justify-content: center;
    margin: var(--margin);
  }
</style>

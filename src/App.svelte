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
    display: flex;
    flex-direction: column;
    width: 100dvw;
    align-items: center;
    justify-content: center;
  }
</style>

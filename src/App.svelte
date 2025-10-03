<script lang="ts">
  import { onMount } from "svelte";
  import { goTo, route, routes } from "./stores/router";
  import notFound from "./views/404.svelte";

  const page = $derived({
    component: routes[$route] ?? notFound,
  });
</script>

<main>
  route: {$route}
  <page.component />
</main>

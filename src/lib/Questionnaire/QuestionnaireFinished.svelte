<script>
  import Link from "../common/Link.svelte";
</script>

<h2> De vragenlijst is klaar! </h2>
<div class="container">
  <Link path="">Home</Link>
  <Link path="results">check je resultaten en recommandations</Link>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
</style>

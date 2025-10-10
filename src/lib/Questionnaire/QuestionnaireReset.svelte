<script lang="ts">
  import Link from "../Link.svelte";

  type Props = {
    onclick: () => void;
  };

  const { onclick }: Props = $props();
</script>

<h2>Je hebt de vragenlijst al ingevuld, wil je hem opnieuw invullen?</h2>
<div class="container">
  <button {onclick}>ja</button><Link path="" colour="green">Nee</Link>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  button {
    background-color: var(--c-red);
    text-transform: uppercase;
  }

  button:hover {
    border-color: var(--c-foreground);
  }
</style>

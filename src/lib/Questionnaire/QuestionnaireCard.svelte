<script lang="ts">
  import type { MPHColors } from "../../types";
  import Link from "../common/Link.svelte";

  type Props = {
    group: string;
    color: MPHColors;
  };
  let { group, color }: Props = $props();
</script>

<div class="container" style="--color: var(--c-{color})">
  <h3>{group}</h3>
  <Link
    path="questionnaire"
    params={{
      questionnaire: group,
    }}
    width="100%">Kies</Link
  >
</div>

<style>
  .container {
    width: 12em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 0 0.5rem var(--color);
    padding: 1rem;
    border-radius: 1rem;
    justify-content: space-between;
  }

  h3 {
    background-color: var(--color);
    text-align: center;
    border-radius: 0.5rem;
    width: 90%;
    margin: 0;
    padding: 0.5rem;
    text-transform: uppercase;
    color: var(--c-white);
  }
</style>

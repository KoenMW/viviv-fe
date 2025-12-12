<script lang="ts">
  import type { MPHColours } from "../../types";
  import Link from "../common/Link.svelte";

  type Props = {
    group: string;
    content: string;
    colour: MPHColours;
  };
  let { group, content, colour }: Props = $props();
</script>

<div class="container" style="--colour: var(--c-{colour})">
  <h3>{group}</h3>
  <div class="content">{content}</div>
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
    box-shadow: 0 0 0.5rem var(--colour);
    padding: 1rem;
    border-radius: 1rem;
    justify-content: space-between;
  }

  h3 {
    background-color: var(--colour);
    text-align: center;
    border-radius: 0.5rem;
    width: 90%;
    margin: 0;
    padding: 0.5rem;
    text-transform: uppercase;
    color: var(--c-white);
  }

  .content {
    text-align: center;
  }
</style>

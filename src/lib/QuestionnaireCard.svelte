<script lang="ts">
  import { questionnaireParam } from "../consts";
  import type { MPHColours } from "../types";

  type Porps = {
    group: string;
    content: string;
    colour: MPHColours;
  };
  let { group, content, colour }: Porps = $props();
</script>

<div class="container" style="--colour: var(--c-{colour})">
  <h3>{group}</h3>
  <div class="content">{content}</div>
  <a href="?route=questionnaire&{questionnaireParam}={group}">Kies</a>
</div>

<style>
  .container {
    width: 12em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 0 0.5rem var(--c-foreground);
    padding: 1rem;
    border-radius: 1rem;
  }

  h3 {
    background-color: var(--colour);
    text-align: center;
    border-radius: 0.5rem;
    width: 90%;
    margin: 0;
    text-transform: uppercase;
    color: var(--c-white);
  }

  .content {
    text-align: center;
  }
</style>

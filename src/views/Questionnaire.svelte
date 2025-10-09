<script lang="ts">
  import { onMount } from "svelte";
  import type { Questionnairetype } from "../types";
  import { questionnaireParam, questionnaires } from "../consts";

  let questions: null | Questionnairetype = $state(null);

  onMount(() => {
    const searchParams = new URLSearchParams(location.search);
    questions =
      questionnaires[searchParams.get(questionnaireParam) ?? ""].questionnaire;
  });
</script>

{#if questions}
  {questions.lichaamsfuncties[0]}
{/if}

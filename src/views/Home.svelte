<script lang="ts">
  import { onMount } from "svelte";
  import { backupQuestionnaires } from "../consts";
  import QuestionnaireButton from "../lib/Questionnaire/QuestionnaireCard.svelte";
  import { questionnaireFromApi } from "../stores/questionnaire";
  import type { QuestionnairesCardType } from "../types";
  import { getQuestionnaires } from "../util/questionnaire";

  let questionnaires = $state<QuestionnairesCardType[]>(backupQuestionnaires);

  onMount(async () => {
    try {
      questionnaires = await getQuestionnaires();
    } catch (error) {
      console.error("Error fetching questionnaires from API:", error);
      questionnaireFromApi.set(false);
    }
  });
</script>

<h1>{$questionnaireFromApi ? "vragenlijsten:" : "backup vragenlijsten:"}</h1>
<section>
  {#each questionnaires as questionnaire}
    <QuestionnaireButton
      title={questionnaire.title}
      id={questionnaire.id}
      color={questionnaire.color}
    />
  {/each}
</section>

<style>
  section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw + 1rem, 2.5rem);
  }
</style>

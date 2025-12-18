<script lang="ts">
  import { onMount } from "svelte";
  import { backupQuestionnaires } from "../consts";
  import QuestionnaireButton from "../lib/Questionnaire/QuestionnaireCard.svelte";
  import { questionnaireFromApi } from "../stores/questionnaire";
  import type { QuestionnairesCardType } from "../types";
  import { getQuestionnaires } from "../util/questionnaire";

  let questionnaires = $state<QuestionnairesCardType | null>(null);

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
  {#each Object.entries(backupQuestionnaires) as [group, value]}
    <QuestionnaireButton {group} color={value.color} />
  {/each}
</section>

<style>
  section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

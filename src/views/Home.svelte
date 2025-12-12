<script lang="ts">
  import { backupQuestionnaires } from "../consts";
  import QuestionnaireButton from "../lib/Questionnaire/QuestionnaireCard.svelte";
  import { questionnaireFromApi } from "../stores/questionnaire";
</script>

<h1>{$questionnaireFromApi ? "vragenlijsten:" : "backup vragenlijsten:"}</h1>
<section>
  {#each Object.entries(backupQuestionnaires) as [group, value]}
    <QuestionnaireButton
      {group}
      colour={value.colour}
      content={value.content}
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
</style>

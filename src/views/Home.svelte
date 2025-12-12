<script lang="ts">
  import { backupQuestionnaires } from "../consts";
  import QuestionnaireButton from "../lib/QuestionnaireCard.svelte";
</script>

<h1>vragenlijsten:</h1>
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

<script lang="ts">
  import { questionnaires } from "../consts";
  import QuestionnaireButton from "../lib/QuestionnaireCard.svelte";
</script>

<h1>vragenlijsten:</h1>
<section>
  {#each Object.entries(questionnaires) as [group, value]}
    <QuestionnaireButton
      {group}
      colour={value.colour}
      content={value.content}
    />
  {/each}
</section>

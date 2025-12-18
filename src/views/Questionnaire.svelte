<script lang="ts">
  import { onMount } from "svelte";
  import {
    type MPHColors,
    type QuestionnaireState,
    type Questionnairetype,
  } from "../types";
  import { questionnaireParam, backupQuestionnaires } from "../consts";
  import QuestionnaireFinished from "../lib/Questionnaire/QuestionnaireFinished.svelte";
  import QuestionnaireQuestion from "../lib/Questionnaire/QuestionnaireQuestion.svelte";
  import QuestionnaireError from "../lib/Questionnaire/QuestionnaireError.svelte";
  import { setEmptyResults, results, saveLocal } from "../stores/results";
  import QuestionnaireReset from "../lib/Questionnaire/QuestionnaireReset.svelte";
  import { getQuestionnaireById } from "../util/questionnaire";
  import { topics } from "../stores/questionnaire";

  let questionnaire: null | Questionnairetype = $state(null);
  let topicIds: string[] = $derived(
    questionnaire ? Object.keys(questionnaire) : []
  );
  let error: string = $state("");
  let currentTopicId: string = $state("");
  let currentQuestion: number = $state(0);
  let currentState: QuestionnaireState = $state("questioning");

  const warnMessageEvent = (e: BeforeUnloadEvent) => {
    if (currentState === "reset") return;
    const confirmationMessage =
      "Als je nu weg gaat worden je resultaten niet opgeslagen";

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  };

  const reset = () => {
    currentState = "questioning";
    setEmptyResults();
  };

  const changeState = (state: QuestionnaireState) => {
    currentState = state;
  };

  $effect(() => {
    switch (currentState) {
      case "finished": {
        window.removeEventListener("beforeunload", warnMessageEvent);
        saveLocal();
        break;
      }
      case "reset": {
        reset();
        break;
      }
      default:
        break;
    }
  });

  onMount(async () => {
    const searchParams = new URLSearchParams(location.search);
    const paramResult = searchParams.get(questionnaireParam) ?? "";
    try {
      if (!Object.keys(backupQuestionnaires).includes(paramResult)) {
        questionnaire = await getQuestionnaireById(paramResult);
      } else {
        const backup = backupQuestionnaires.find((q) => q.id === paramResult);
        questionnaire = backup ? backup.questionnaire : null;
      }

      if (!questionnaire) {
        error = `Vragenlijst niet gevonden: ${paramResult}`;
        return;
      }

      topicIds = Object.keys(questionnaire);
      currentTopicId = topicIds[0];

      console.log("idx topicIds", topicIds);

      if ($results) currentState = "reset";
      else setEmptyResults();

      window.addEventListener("beforeunload", warnMessageEvent);
    } catch (_) {
      error = `Onbekende vragenlijst: ${paramResult}`;
    }
  });
</script>

<section
  style="--color: var(--c-{$topics[currentTopicId]
    ? $topics[currentTopicId].color
    : 'blue'})"
>
  {#if error}
    <QuestionnaireError {error} />
  {:else if currentState === "reset"}
    <QuestionnaireReset onclick={reset} />
  {:else if currentState === "finished"}
    <QuestionnaireFinished />
  {:else if questionnaire && currentState === "questioning"}
    <QuestionnaireQuestion
      {topicIds}
      {currentTopicId}
      questions={questionnaire}
      {currentQuestion}
      {changeState}
    />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50rem;
    align-items: center;
    text-align: center;
  }
</style>

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
  import {
    getQuestionnaireById,
    getTopicIdsFromQuestions,
  } from "../util/questionnaire";

  let questionnaire: null | Questionnairetype = $state(null);
  let topicIds: string[] = $derived(
    questionnaire ? Object.keys(questionnaire) : []
  );
  let error: string = $state("");
  let currentTopicId: string = $state("");
  let color: MPHColors = $state("blue");
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
    if (!Object.keys(backupQuestionnaires).includes(paramResult)) {
      try {
        questionnaire = await getQuestionnaireById(paramResult);
      } catch (_) {
        error = `Onbekende vragenlijst: ${paramResult}`;
        return;
      }
    }
    questionnaire = backupQuestionnaires[paramResult].questions;
    currentTopicId = "0";

    if ($results) currentState = "reset";
    else setEmptyResults();

    window.addEventListener("beforeunload", warnMessageEvent);
  });
</script>

<section style="--color: var(--c-{color})">
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

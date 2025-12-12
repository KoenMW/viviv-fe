<script lang="ts">
  import { onMount } from "svelte";
  import {
    MPHTopics,
    type MPHColours,
    type QuestionnaireState,
    type Questionnairetype,
  } from "../types";
  import {
    MPHTopicColours,
    questionnaireParam,
    backupQuestionnaires,
  } from "../consts";
  import QuestionnaireFinished from "../lib/Questionnaire/QuestionnaireFinished.svelte";
  import QuestionnaireQuestion from "../lib/Questionnaire/QuestionnaireQuestion.svelte";
  import QuestionnaireError from "../lib/Questionnaire/QuestionnaireError.svelte";
  import {
    setEmptyResults,
    results,
    saveLocal,
    saveAnswere,
  } from "../stores/results";
  import QuestionnaireReset from "../lib/Questionnaire/QuestionnaireReset.svelte";

  let questions: null | Questionnairetype = $state(null);
  let topics: MPHTopics[] = $derived(
    questions ? Object.keys(questions).map((v) => Number(v)) : []
  );
  let error: string = $state("");
  let currentTopic: MPHTopics = $state(0);
  let colour: MPHColours = $derived(MPHTopicColours[currentTopic] ?? "blue");
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

  onMount(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramResult = searchParams.get(questionnaireParam) ?? "";
    if (!Object.keys(backupQuestionnaires).includes(paramResult)) {
      error = `Onbekende vragenlijst: ${paramResult}`;
      return;
    }
    questions = backupQuestionnaires[paramResult].questionnaire;
    currentTopic = 0;

    if ($results) currentState = "reset";
    else setEmptyResults();

    window.addEventListener("beforeunload", warnMessageEvent);
  });
</script>

<section style="--colour: var(--c-{colour})">
  {#if error}
    <QuestionnaireError {error} />
  {:else if currentState === "reset"}
    <QuestionnaireReset onclick={reset} />
  {:else if currentState === "finished"}
    <QuestionnaireFinished />
  {:else if questions && currentState === "questioning"}
    <QuestionnaireQuestion
      {topics}
      {currentTopic}
      {questions}
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

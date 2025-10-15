<script lang="ts">
  import { onMount } from "svelte";
  import type { MPHColours, MPHTopics, Questionnairetype } from "../types";
  import {
    MPHTopicColours,
    questionnaireParam,
    questionnaires,
  } from "../consts";
  import QuestionnaireFinished from "../lib/Questionnaire/QuestionnaireFinished.svelte";
  import QuestionnaireQuestion from "../lib/Questionnaire/QuestionnaireQuestion.svelte";
  import QuestionnaireError from "../lib/Questionnaire/QuestionnaireError.svelte";
  import { setEmptyResults, results, saveLocal } from "../stores/results";
  import QuestionnaireReset from "../lib/Questionnaire/QuestionnaireReset.svelte";

  let questions: null | Questionnairetype = $state(null);
  let topics: MPHTopics[] = $derived(
    questions ? Object.keys(questions).map((v) => Number(v)) : []
  );
  let error: string = $state("");
  let currentTopic: MPHTopics = $state(0);
  let colour: MPHColours = $derived(MPHTopicColours[currentTopic]);
  let currentQuestion: number = $state(0);
  let currentValue: number = $state(5);
  let currentState: "questioning" | "finished" | "reset" =
    $state("questioning");

  const saveAnswere = () => {
    results.update((v) => {
      if (!v) {
        error = `kan resultaten niet opslaan\nresults: ${!!v}`;
        return null;
      }
      if (!questions) {
        error = `vragen zijn niet beschikbaar\nquestions: ${!!questions}`;
        return v;
      }
      v[currentTopic][questions[currentTopic][currentQuestion]] = currentValue;
      return v;
    });
  };

  const warnMessageEvent = (e: BeforeUnloadEvent) => {
    if (currentState === "reset") return;
    const confirmationMessage =
      "Als je nu weg gaat worden je resultaten niet opgeslagen";

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  };

  const setFinished = () => {
    currentState = "finished";
    window.removeEventListener("beforeunload", warnMessageEvent);
    saveLocal();
  };

  const nextQuestion = () => {
    if (!questions) return;
    saveAnswere();
    currentQuestion++;
    if (currentQuestion >= questions[currentTopic].length) {
      const currentIndex = topics.findIndex((v) => v === currentTopic);
      if (currentIndex >= topics.length - 1) {
        setFinished();
        return;
      }
      currentQuestion = 0;
      currentTopic = topics[currentIndex + 1];
      colour = MPHTopicColours[currentTopic];
    }
  };

  const reset = () => {
    currentState = "questioning";
    setEmptyResults();
  };

  const sliderChange = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    currentValue = Number(e.currentTarget.value);
  };

  onMount(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramResult = searchParams.get(questionnaireParam) ?? "";
    if (!Object.keys(questionnaires).includes(paramResult)) {
      error = `Onbekende vragenlijst: ${paramResult}`;
      return;
    }
    questions = questionnaires[paramResult].questionnaire;
    currentTopic = topics[0];

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
      {nextQuestion}
      {questions}
      {currentQuestion}
      oninput={sliderChange}
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

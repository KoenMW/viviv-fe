<script lang="ts">
  import { onMount } from "svelte";
  import type { MPHColours, MPHtypes, Questionnairetype } from "../types";
  import {
    MPHtypesColours,
    questionnaireParam,
    questionnaires,
  } from "../consts";
  import QuestionnaireFinished from "../lib/Questionnaire/QuestionnaireFinished.svelte";
  import QuestionnaireQuestion from "../lib/Questionnaire/QuestionnaireQuestion.svelte";
  import QuestionnaireError from "../lib/Questionnaire/QuestionnaireError.svelte";

  let questions: null | Questionnairetype = $state(null);
  let questionKeys: MPHtypes[] = $state([]);
  let colour: MPHColours = $state("blue");
  let error: string = $state("");
  let currentTopic: MPHtypes = $state("lichaamsfuncties");
  let currentQuestion: number = $state(0);
  let currentValue: number = $state(5);
  let finished: boolean = $state(false);

  const nextQuestion = () => {
    if (!questions) return;
    currentValue = 5;
    currentQuestion++;
    if (currentQuestion >= questions[currentTopic].length) {
      const currentIndex = questionKeys.findIndex((v) => v === currentTopic);
      if (currentIndex >= questionKeys.length - 1) {
        finished = true;
        return;
      }
      currentQuestion = 0;
      currentTopic = questionKeys[currentIndex + 1] as MPHtypes;
      colour = MPHtypesColours[currentTopic];
    }
  };

  onMount(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramResult = searchParams.get(questionnaireParam) ?? "";
    if (!Object.keys(questionnaires).includes(paramResult)) {
      error = `Onbekende vragenlijst: ${paramResult}`;
      return;
    }
    questions = questionnaires[paramResult].questionnaire;
    questionKeys = Object.keys(questions) as MPHtypes[];
    const initialTopic = questionKeys[0];
    colour = MPHtypesColours[initialTopic];
    currentTopic = initialTopic;
  });
</script>

<section style="--colour: var(--c-{colour})">
  {#if error}
    <QuestionnaireError {error} />
  {:else if finished}
    <QuestionnaireFinished />
  {:else if questions}
    <QuestionnaireQuestion
      {currentTopic}
      {nextQuestion}
      {questions}
      {currentQuestion}
      {currentValue}
    />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;

    margin: 2rem;
  }
</style>

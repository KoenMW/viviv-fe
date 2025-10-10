<script lang="ts">
  import { onMount } from "svelte";
  import type { MPHColours, MPHtypes, Questionnairetype } from "../types";
  import {
    MPHtypesColours,
    questionnaireParam,
    questionnaires,
  } from "../consts";

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
  {#if finished}
    <h2> De vragenlijst is klaar! </h2>
    <div>
      <a href="?route=">Home</a>
      <a href="?route=results">check je resultaten en recommandations</a>
    </div>
  {:else if questions}
    <span class="highlight">{currentTopic}</span>
    <h2>Vul in hoeveel jij het met de volgende stellingen eens bent:</h2>
    <button class="next" onclick={nextQuestion}>&gt;</button>
    <div class="question-container">
      <div class="question">{questions[currentTopic][currentQuestion]}</div>
      <input
        class="slider"
        type="range"
        name="slider"
        bind:value={currentValue}
        min="0"
        max="10"
      />
    </div>
  {:else if error}
    <h2>We kwamen een error tegen terwijl we de vragenlijst zochten</h2>
    <div>{error}</div>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }
  .question-container {
    width: 100%;
    text-align: center;
  }
  .slider {
    width: 70%;
  }

  .next {
    background-color: var(--colour);
    width: fit-content;
    align-self: flex-end;
  }
</style>

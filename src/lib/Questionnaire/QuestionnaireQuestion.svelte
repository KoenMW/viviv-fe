<script lang="ts">
  import type {
    InputEventType,
    MPHtypes,
    Questionnairetype,
  } from "../../types";
  import { calcProgress } from "../../utils";

  type Props = {
    currentTopic: MPHtypes;
    nextQuestion: () => void;
    oninput: (e: InputEventType) => void;
    questions: Questionnairetype;
    currentQuestion: number;
  };

  let {
    currentTopic,
    nextQuestion,
    oninput,
    questions,
    currentQuestion,
  }: Props = $props();

  let value: number = $state(5);

  let percentageDone: number = $derived(
    calcProgress(questions, currentTopic, currentQuestion) * 100
  );
</script>

<span class="highlight">{currentTopic}</span>
<h2>{questions[currentTopic][currentQuestion]}</h2>
<button
  class="next"
  onclick={() => {
    nextQuestion();
    value = 5;
  }}>&gt;</button
>
<div class="question-container">
  <div class="question">Ik ben het met deze stelling eens:</div>
  <input
    class="slider"
    type="range"
    name="slider"
    {oninput}
    min="0"
    max="10"
    bind:value
  />
  <div class="progress-bar" style="--percentage: {percentageDone}%"></div>
</div>

<style>
  .question-container {
    width: 100%;
    text-align: center;
  }

  .next {
    background-color: var(--colour);
    width: fit-content;
    align-self: flex-end;
  }

  .slider {
    width: 80%;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0.2rem;
    outline: none;
    cursor: pointer;
  }

  .slider::-webkit-slider-runnable-track {
    height: 0.4rem;
    background: var(--colour);
    border-radius: 0.2rem;
  }

  .slider::-moz-range-track {
    height: 0.4rem;
    background: var(--colour);
    border-radius: 0.2rem;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    background: var(--colour);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -0.4rem;
  }

  .slider::-moz-range-thumb {
    width: 1.2rem;
    height: 1.2rem;
    background: var(--colour);
    border-radius: 50%;
    cursor: pointer;
  }

  .progress-bar {
    position: relative;
    justify-self: center;
    margin: 2rem 0;
    width: 100%;
    height: 0.5rem;
    border-radius: 2rem;
  }

  .progress-bar::before,
  .progress-bar::after {
    content: "";
    left: 0;
    top: 0;
    position: absolute;
    height: 100%;
    background-color: var(--colour);
    border-radius: inherit;
  }

  .progress-bar::before {
    width: 100%;
    opacity: 30%;
  }

  .progress-bar::after {
    width: var(--percentage);
  }
</style>

<script lang="ts">
  import type { MPHtypes, Questionnairetype } from "../../types";

  type Props = {
    currentTopic: MPHtypes;
    nextQuestion: () => void;
    questions: Questionnairetype;
    currentQuestion: number;
    currentValue: number;
  };

  let {
    currentTopic,
    nextQuestion,
    questions,
    currentQuestion,
    currentValue,
  }: Props = $props();
</script>

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

<style>
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

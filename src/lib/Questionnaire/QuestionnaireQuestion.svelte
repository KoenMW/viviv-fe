<script lang="ts">
  import { defaultQuestionnaireValue, MPHTopicColours } from "../../consts";
  import { results, saveAnswere } from "../../stores/results";
  import {
    MPHTopics,
    type InputEventType,
    type MPHColours,
    type QuestionnaireState,
    type Questionnairetype,
  } from "../../types";

  type Props = {
    topics: MPHTopics[];
    currentTopic: MPHTopics;
    changeState: (state: QuestionnaireState) => void;
    questions: Questionnairetype;
    currentQuestion: number;
  };

  let { topics, currentTopic, changeState, questions, currentQuestion }: Props =
    $props();

  let colour: MPHColours = $derived(MPHTopicColours[currentTopic] ?? "blue");

  let questionString: string = $derived(
    questions[currentTopic][currentQuestion]
  );

  let value: number = $derived(
    $results && $results[currentTopic][questionString]
      ? $results[currentTopic][questionString]
      : defaultQuestionnaireValue
  );

  let percentageDone: number = $derived(
    (currentQuestion / questions[currentTopic].length) * 100
  );

  const changeQuestion = (direction: 1 | -1) => {
    if (!questions || currentQuestion + direction < 0) return;
    saveAnswere(currentTopic, questionString, value);
    currentQuestion += direction;
    if (currentQuestion >= questions[currentTopic].length) {
      const currentIndex = topics.findIndex((v) => v === currentTopic);
      if (currentIndex >= topics.length - 1) {
        changeState("finished");
        return;
      }
      currentQuestion = 0;
      currentTopic = topics[currentIndex + 1];
      colour = MPHTopicColours[currentTopic];
      console.log("Changing topic to ", currentTopic);
    }
  };

  const oninput = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    value = Number(e.currentTarget.value);
  };
</script>

<section style="--colour: var(--c-{colour})">
  <span class="highlight">{MPHTopics[currentTopic]}</span>

  <div class="question-navigation">
    <button
      class="next"
      onclick={() => {
        changeQuestion(-1);
      }}>&lt;</button
    >
    <h2>{questions[currentTopic][currentQuestion]}</h2>
    <button
      class="next"
      onclick={() => {
        changeQuestion(1);
      }}>&gt;</button
    >
  </div>
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
    <div class="bars">
      {#each topics as topic}
        <div
          class="progress-bar"
          style="--colour: var(--c-{MPHTopicColours[
            topic
          ]});--percentage: {topic === currentTopic
            ? percentageDone
            : topic > currentTopic
              ? 0
              : 100}%"
        ></div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .question-navigation {
    display: flex;
    justify-content: space-between;
  }

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

  .bars {
    display: flex;
    width: 100%;
    gap: 1rem;
  }

  .progress-bar {
    flex-grow: 1;
    position: relative;
    justify-self: center;
    margin: 2rem 0;
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

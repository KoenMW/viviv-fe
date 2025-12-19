<script lang="ts">
  import { defaultQuestionnaireValue } from "../../consts";
  import { topics } from "../../stores/questionnaire";
  import { results, saveAnswere } from "../../stores/results";
  import type {
    MPHColors,
    QuestionnaireState,
    Questionnairetype,
  } from "../../types";

  type Props = {
    topicIds: string[];
    currentTopicId: string;
    changeState: (state: QuestionnaireState) => void;
    questions: Questionnairetype;
    currentQuestion: number;
  };

  let {
    topicIds,
    currentTopicId,
    changeState,
    questions,
    currentQuestion,
  }: Props = $props();

  let questionString: string = $derived(
    questions[currentTopicId][currentQuestion]
  );

  let answerValue: number = $derived(
    $results &&
      $results[currentTopicId] &&
      $results[currentTopicId][questionString]
      ? $results[currentTopicId][questionString]
      : defaultQuestionnaireValue
  );

  let percentageDone: number = $derived(
    (currentQuestion / questions[currentTopicId].length) * 100
  );

  const changeQuestion = (direction: 1 | -1) => {
    if (!questions || currentQuestion + direction < 0) return;
    saveAnswere(currentTopicId, questionString, answerValue);
    currentQuestion += direction;
    if (currentQuestion >= questions[currentTopicId].length) {
      const currentIndex = topicIds.indexOf(currentTopicId);
      if (currentIndex === topicIds.length - 1) {
        changeState("finished");
        return;
      }
      currentQuestion = 0;
      currentTopicId = topicIds[currentIndex + 1];
    }
  };

  const oninput = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    answerValue = Number(e.currentTarget.value);
  };
</script>

<section style="--color: var(--c-{$topics[currentTopicId].color})">
  <span class="highlight">{$topics[currentTopicId].name}</span>

  <div class="question-navigation">
    <button
      class="next"
      onclick={() => {
        changeQuestion(-1);
      }}>&lt;</button
    >
    <h2>{questions[currentTopicId][currentQuestion]}</h2>
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
      bind:value={answerValue}
    />
    <div class="bars">
      {#each Object.values($topics) as topic, index}
        <div
          class="progress-bar"
          style="--color: var(--c-{topic.color});--percentage: {topic ===
          $topics[currentTopicId]
            ? percentageDone
            : index > Object.keys($topics).indexOf(currentTopicId)
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
    background-color: var(--color);
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
    background: var(--color);
    border-radius: 0.2rem;
  }

  .slider::-moz-range-track {
    height: 0.4rem;
    background: var(--color);
    border-radius: 0.2rem;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    background: var(--color);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -0.4rem;
  }

  .slider::-moz-range-thumb {
    width: 1.2rem;
    height: 1.2rem;
    background: var(--color);
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
    background-color: var(--color);
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

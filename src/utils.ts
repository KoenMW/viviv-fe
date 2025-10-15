import type { MPHtypes, Questionnairetype } from "./types";

export const calcProgress = (
  questions: Questionnairetype,
  currentTopic: MPHtypes,
  questionIndex: number
): number => {
  console.log(
    getQuestionAmount(questions, currentTopic, questionIndex) /
      getQuestionAmount(questions)
  );
  return (
    getQuestionAmount(questions, currentTopic, questionIndex) /
    getQuestionAmount(questions)
  );
};

const getQuestionAmount = (
  questions: Questionnairetype,
  breakType: MPHtypes = Object.keys(questions).slice(-1)[0] as MPHtypes,
  breakIndex: number = -1
): number => {
  let amount = 0;
  for (const k in questions) {
    for (let i = 0; i < questions[k as MPHtypes].length; i++) {
      amount++;
      if (k === breakType && breakIndex === i) return amount;
    }
  }
  return amount;
};

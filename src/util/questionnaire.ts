import { questionnaireFromApi, topics } from "../stores/questionnaire";
import type {
  MPHTopic,
  MPHTopics,
  Question,
  QuestionnairesCardType,
  Questionnairetype,
} from "../types";
import { get } from "./api";

export const getQuestionnaires = async () => {
  const response = await get<QuestionnairesCardType>(
    `${import.meta.env.VITE_QUESTIONNAIRE_API_URL}/questionnaires`
  );
  questionnaireFromApi.set(true);
  return response;
};

export const getQuestionnaireById = async (
  id: string
): Promise<Questionnairetype> => {
  const response = await get<
    QuestionnairesCardType & {
      questions: Question[];
    }
  >(`${import.meta.env.VITE_QUESTIONNAIRE_API_URL}/questionnaires/${id}`);
  const groupedQuestions: Questionnairetype = {};
  response.questions.forEach((question) => {
    if (!groupedQuestions[question.topic_id]) {
      groupedQuestions[question.topic_id] = [];
    }
    groupedQuestions[question.topic_id].push(question.content);
  });
  return groupedQuestions;
};

export const getTopics = async () => {
  const response = await get<MPHTopic[]>(
    `${import.meta.env.VITE_QUESTIONNAIRE_API_URL}/topics`
  );
  topics.set(
    response.reduce<MPHTopics>((acc, topic) => {
      acc[topic.id] = topic;
      return acc;
    }, {})
  );
};

export const getTopicIdsFromQuestions = (questions: Question[]): string[] => {
  const topicIds = new Set<string>();
  console.log("Extracting topic IDs from questions:", questions);
  questions.forEach((question) => {
    topicIds.add(question.topic_id);
  });
  return Array.from(topicIds);
};

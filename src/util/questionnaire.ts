import { questionnaireFromApi } from "../stores/questionnaire";
import type { getQuestionnairesResponse } from "../types";
import { get } from "./api";

export const getQuestionnaires = async () => {
  const response = await get<getQuestionnairesResponse>(
    `${import.meta.env.VITE_API_URL}/questionnaires`
  );
  questionnaireFromApi.set(true);
  return response;
};

export const getQuestionnaireById = async (id: string) => {
  const response = await get<getQuestionnairesResponse>(
    `${import.meta.env.VITE_API_URL}/questionnaires/${id}`
  );
  return response;
};

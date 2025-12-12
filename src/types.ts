export enum MPHTopics {
  "lichaamsfuncties",
  "mentaal welbevinden",
  "zingeving",
  "kwaliteit van leven",
  "meeddoen",
  "dagelijks functioneren",
}

export type MPHColours =
  | "red"
  | "blue"
  | "yellow"
  | "orange"
  | "green"
  | "purple";

export type QuestionnaireState = "questioning" | "finished" | "reset";

export type MPHScores = Record<MPHTopics, Record<string, number>>;

export type Questionnairetype = Record<MPHTopics, string[]>;

export type InputEventType = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type getQuestionnairesResponse = {
  id: string;
  title: string;
  color: MPHColours;
}[];

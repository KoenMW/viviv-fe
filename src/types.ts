export type MPHColors =
  | "red"
  | "blue"
  | "yellow"
  | "orange"
  | "green"
  | "purple";

export type QuestionnaireState = "questioning" | "finished" | "reset";

export type MPHScores = Record<string, Record<string, number>>;

export type Questionnairetype = Record<string, string[]>;

export type InputEventType = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type Question = {
  id: string;
  topic_id: string;
  questionnaire_id: string;
  content: string;
};

export type QuestionnairesCardType = {
  id: string;
  title: string;
  color: MPHColors;
};

export type MPHTopic = {
  id: string;
  name: string;
  color: MPHColors;
};

export type MPHTopics = Record<string, MPHTopic>;

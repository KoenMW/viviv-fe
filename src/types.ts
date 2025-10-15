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

export type MPHScores = Record<MPHTopics, Record<string, number>>;

export type Questionnairetype = Record<MPHTopics, string[]>;

export type InputEventType = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

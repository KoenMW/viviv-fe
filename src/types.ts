export type MPHtypes =
  | "lichaamsfuncties"
  | "mentaal welbevinden"
  | "zingeving"
  | "kwaliteit van leven"
  | "meedoen"
  | "dagelijks functioneren";

export type MPHColours = "red" | "blue" | "yellow" | "orange" | "green";

export type MPHScores = Record<MPHtypes, Record<string, number>>;

export type Questionnairetype = Record<MPHtypes, string[]>;

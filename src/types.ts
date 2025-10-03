export type MPHtypes =
  | "lichaamsfuncties"
  | "mentaal welbevinden"
  | "zingeving"
  | "kwaliteit van leven"
  | "meedoen"
  | "dagelijks functioneren";

export type MPHScores = Record<MPHtypes, Record<string, number>>;

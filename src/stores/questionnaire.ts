import { writable } from "svelte/store";
import type { MPHTopics, Questionnairetype } from "../types";

export const questionnaireFromApi = writable<boolean>(false);

export const questionnaire = writable<Questionnairetype | null>(null);

export const topics = writable<MPHTopics>({
  "0": {
    id: "0",
    name: "Lichaamsfuncties",
    color: "red",
  },
  "1": {
    id: "1",
    name: "Mentaal welbevinden",
    color: "blue",
  },
  "2": {
    id: "2",
    name: "Zingeving",
    color: "purple",
  },
  "3": {
    id: "3",
    name: "kwaliteit van leven",
    color: "yellow",
  },
  "4": {
    id: "4",
    name: "meedoen",
    color: "orange",
  },
  "5": {
    id: "5",
    name: "Dagelijks functioneren",
    color: "green",
  },
});

topics.subscribe((value) => {
  console.log("Topics store updated:", value);
});

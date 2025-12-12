import { get, writable } from "svelte/store";
import type { MPHScores, MPHTopics } from "../types";
import { localResultsKey } from "../consts";

export const results = writable<MPHScores | null>(null);

export const setEmptyResults = () => {
  results.set({
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });
};

export const loadLocal = () => {
  const scoresJSON = localStorage.getItem(localResultsKey);

  if (!scoresJSON) {
    console.error("no scores in localstorage");
    return;
  }

  results.set(JSON.parse(scoresJSON));
};

export const saveLocal = () => {
  const r = get(results);

  if (!r) {
    console.error("no results to save");
    return;
  }

  localStorage.setItem(localResultsKey, JSON.stringify(r));
};

export const clearLocal = () => {
  localStorage.removeItem(localResultsKey);
};

export const saveAnswere = (
  topic: MPHTopics,
  question: string,
  value: number
) => {
  results.update((v) => {
    if (!v) {
      throw new Error("no prior results to save too");
    }
    v[topic][question] = value;
    return v;
  });
};

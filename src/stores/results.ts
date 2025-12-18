import { get, writable } from "svelte/store";
import type { MPHScores } from "../types";
import { localResultsKey } from "../consts";

export const results = writable<MPHScores | null>(null);

export const setEmptyResults = () => {
  results.set({});
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
  topicId: string,
  question: string,
  value: number
) => {
  results.update((v) => {
    if (!v) {
      throw new Error("no prior results to save too");
    }
    if (!v[topicId]) {
      v[topicId] = {};
    }
    v[topicId][question] = value;
    return v;
  });
};

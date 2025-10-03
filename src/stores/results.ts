import { get, writable } from "svelte/store";
import type { MPHScores } from "../types";
import { localResultsKey } from "../consts";

export const results = writable<MPHScores | null>(null);

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

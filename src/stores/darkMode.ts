import { writable } from "svelte/store";

export const darkMode = writable<boolean>(false);

darkMode.subscribe((value) => {
  document.documentElement.classList.toggle("light", value);
});

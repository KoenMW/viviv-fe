import type { Component } from "svelte";
import Home from "../views/Home.svelte";
import { writable } from "svelte/store";
import { routeParam } from "../consts";
import Questionaire from "../views/Questionnaire.svelte";

export type Routes = Record<string, Component>;

export type Paths = "" | "questionnaire" | "results";

export const routes: Routes = {
  "": Home,
  questionnaire: Questionaire,
};

export const route = writable<string>("");

const setRouteAndParams = () => {
  const searchParams = new URLSearchParams(location.search);
  route.set(searchParams.get(routeParam) ?? "");
};

export const goTo = (route: string) => {
  const url = new URL(globalThis.location.href);
  url.searchParams.set(routeParam, route);

  history.pushState({}, "", url);
};

setRouteAndParams();

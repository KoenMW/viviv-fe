import type { Component } from "svelte";
import Home from "../views/Home.svelte";
import { writable } from "svelte/store";
import { routeParam } from "../consts";
import Questionaire from "../views/Questionnaire.svelte";
import Login from "../views/Login.svelte";
import Register from "../views/Register.svelte";

export type Routes = Record<string, Component>;

export type Paths = "" | "questionnaire" | "results" | "login" | "register";

export const routes: Routes = {
  "": Home,
  questionnaire: Questionaire,
  login: Login,
  register: Register,
};

export const route = writable<Paths>("");

const setRouteAndParams = () => {
  const searchParams = new URLSearchParams(location.search);
  route.set((searchParams.get(routeParam) as Paths) ?? "");
};

export const goTo = (destination: Paths) => {
  const url = new URL(globalThis.location.href);
  url.searchParams.set(routeParam, destination);

  history.pushState({}, "", url);
  setRouteAndParams();
};

setRouteAndParams();

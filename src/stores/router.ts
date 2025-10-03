import type { Component } from "svelte";
import Home from "../views/Home.svelte";
import { writable } from "svelte/store";
import { routeParam } from "../consts";

export type Routes = Record<string, Component>;

export const routes: Routes = {
  "": Home,
};

export const route = writable<string>("");

export const params = writable<URLSearchParams | null>(null);

const setRouteAndParams = () => {
  const searchParams = new URLSearchParams(location.search);
  params.set(searchParams);
  route.set(searchParams.get(routeParam) ?? "");
};

export const goTo = (route: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(routeParam, route);

  history.pushState({}, "", url);
};

window.addEventListener("popstate", () => {
  console.log("popstate");
});

setRouteAndParams();

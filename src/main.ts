import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { loadLocal } from "./stores/results";

loadLocal();

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;

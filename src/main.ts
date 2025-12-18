import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { loadLocal } from "./stores/results";
import { getTopics } from "./util/questionnaire";

loadLocal();

const app = mount(App, {
  target: document.getElementById("app")!,
});

getTopics();

export default app;

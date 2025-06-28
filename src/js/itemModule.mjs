import * as Utils from "./utils.mjs";

export function tempSetup() {
  const search = Utils.getParam("search");
  document.getElementById("looky").textContent = search;
}
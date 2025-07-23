import * as Utils from "./utils.mjs";

export function setup() {
  const parent = document.getElementById("compare");
  let html = '<table class="compare-table item-table"><tr><th>Name</th><th>Serving Size</th><th>Calories</th><th>Protein</th><th>Fiber</th><th>Carbs</th><th>Sugar</th><th>Sodium</th></tr>';

  const saved = Utils.getLocalStorage(Utils.savedKey);
  if (saved && saved.length >= 2) {
    console.log("length", saved.length);
    saved.forEach(item => {
      html += Utils.getItemRow(item);
    });
      
    html += '</table>';
    parent.innerHTML = html;
  }
}
import * as Utils from "./utils.mjs";
import * as OpenFoodFacts from "./openFoodFactsAPI.mjs";

export function setup() {
  const usageElement = document.getElementById("settings_usage");
  const usage = OpenFoodFacts.getApiUsage();

  if (usage && !OpenFoodFacts.isPastMinute(usage.time)) {
    usageElement.textContent = `The number of times you've used the search API within the last minute is: ${usage.used}`;
  } else {
    usageElement.textContent = "Remember, you can use the search API 100 times within one minute! That means you have 100 searches remaining. Enjoy!";
  }

  // set up storage deletion
  const saved = Utils.getLocalStorage(Utils.savedKey);
  const parent = document.getElementById("settings_delete");
  if (saved && saved.length > 0) {
    const hr = document.createElement("hr");
    parent.appendChild(hr);
    const itemDiv = document.createElement("div");
    itemDiv.textContent = "Click an item below to remove it.";
    parent.appendChild(itemDiv);

    saved.forEach(item => {
      const itemName = document.createElement("p");
      itemName.classList.add("settings-item-delete");
      itemName.textContent = item.product_name;
      itemName.onclick = function(e) {
        Utils.removeSavedItem(e.target.innerHTML);
        e.target.style.display = "none";
      };
      parent.appendChild(itemName);
    });
  }
}


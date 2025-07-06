import * as Utils from "./utils.mjs";
import * as OpenFoodFacts from "./openFoodFactsAPI.mjs";

export function tempSetup() {
  const search = Utils.getParam("search");
  document.getElementById("looky").textContent = search;
}

export async function setup() {
  const search = Utils.getParam("search");
  const cleanedSearch = Utils.cleanSearch(search);
  const productData = await OpenFoodFacts.getProductByUPC(cleanedSearch);
  // console.log("itemModule.mjs setup", productData);
  const itemElement = document.getElementById("item_display");
  Utils.renderItemData(productData, itemElement);

  document.getElementById("save_item").addEventListener("click", () => {
    const key = "food_saved";
    Utils.setLocalStorage(key, productData);
  });
}


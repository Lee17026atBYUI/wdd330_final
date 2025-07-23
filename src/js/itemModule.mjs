import * as Utils from "./utils.mjs";
import * as OpenFoodFacts from "./openFoodFactsAPI.mjs";

export async function setup() {
  const search = Utils.getParam("search");
  const cleanedSearch = Utils.cleanSearch(search);
  const productData = await OpenFoodFacts.getProductByUPC(cleanedSearch);
  const itemElement = document.getElementById("item_display");
  Utils.renderItemData(productData, itemElement);

  document.getElementById("save_item").addEventListener("click", () => {
    Utils.setLocalStorage(Utils.savedKey, productData);
    showSnack();
    // then stop from multi-clicking
    document.getElementById("save_item").outerHTML = document.getElementById("save_item").outerHTML;
  });
}

// source: https://www.w3schools.com/howto/howto_js_snackbar.asp
export function showSnack() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 

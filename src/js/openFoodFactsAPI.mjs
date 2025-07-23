import * as Utils from "./utils.mjs";
const baseURL = import.meta.env.VITE_OPEN_FOOD_FACTS_URL;
const fields = "?fields=code,allergens_from_ingredients,image_url,image_nutrition_url,image_ingredients_url,image_front_url,ingredients,nutriments,product_name,serving_size";
const apiUsageKey = "food_usage";

function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "serviceError", message: jsonResponse };
  }
}

export async function getProductByUPC(code) {
  addApiUsage();
  // for testing, grab saved data
  // const dummyResponse = await fetch('/dummyvitclean.json');
  // const dummyData = await convertToJson(dummyResponse);
  // return dummyData;


  const response = await fetch(baseURL + `product/${code}${fields}`);
  let data;
  try {
    data = await convertToJson(response);
  } catch (error) {
    console.log(error);
  }
  return data.product;
}

function addApiUsage() {
  // first check if there's anything in storage and if we're within a minute from this time
  let savedUsage = getApiUsage();
  if (savedUsage && !isPastMinute(savedUsage.time)) {
    Utils.setSingletonLocalStorage(apiUsageKey, {time: savedUsage.time, used: ++savedUsage.used});
  } else {
    // nothing in storage or we're past a minute, so add everything fresh
    const now = Date.now();
    Utils.setSingletonLocalStorage(apiUsageKey, {time: now, used: 1});
  }
}

export function getApiUsage() {
  return Utils.getLocalStorage(apiUsageKey);
}

export function isPastMinute(time) {
  const now = Date.now();
  return now - time > 60000;
}


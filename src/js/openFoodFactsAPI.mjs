const baseURL = import.meta.env.VITE_OPEN_FOOD_FACTS_URL;
const fields = "?fields=code,allergens_from_ingredients,image_url,image_nutrition_url,image_ingredients_url,image_front_url,ingredients,nutriments,product_name,serving_size";

function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "serviceError", message: jsonResponse };
  }
}

export async function getProductByUPC(code) {
  // for now, grab saved data
  // const dummyResponse = await fetch('/dummyvitclean.json');
  // const dummyData = await convertToJson(dummyResponse);
  // return dummyData;







  const response = await fetch(baseURL + `product/${code}${fields}`);
  let data;
  // console.log(response);
  try {
    data = await convertToJson(response);

  } catch (error) {
    console.log(error);
  }
  // console.log(data);
  return data.product;
}
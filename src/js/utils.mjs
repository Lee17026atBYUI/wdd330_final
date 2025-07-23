export const savedKey = "food_saved";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
	// check if we need to save what we already have in localStorage
	var currentStorage = localStorage.getItem(key);
	var newStorage;
	if (currentStorage === null) {
		// nothing in storage for this key, so just save as array of one
		newStorage = JSON.stringify([data]);
	} else {
		// we have stuff in storage for this key (as an array) so add to it
		var currentStorageArray = JSON.parse(currentStorage);
		currentStorageArray.push(data);
		newStorage = JSON.stringify(currentStorageArray);
	}
	localStorage.setItem(key, newStorage);
}

export function setSingletonLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterbegin",
  clear = true,
  callback
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn();
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
	callback(data);
  }
}

export function loadTemplate(path) {
	return async function () {
		const res = await fetch(path);
		if (res.ok) {
			const html = await res.text();
			return html;
		}
	};
}

export function loadHeaderFooter() {
	const headerTemplateFn = loadTemplate("/partials/header.html");
	const footerTemplateFn = loadTemplate("/partials/footer.html");
	const header = document.querySelector("#main-header");
	const footer = document.querySelector("#main-footer");
	renderWithTemplate(headerTemplateFn, header);
	renderWithTemplate(footerTemplateFn, footer);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cleanSearch(search) {
  let cleanedSearch = search.trim();
  return cleanedSearch;
}

export function renderItemData(item, element) {
  let html = '';
  html += `<div><img class="item-image" src="${item.image_url}" alt="main image of product"></div>`;
  html += `<div><h1>${item.product_name}</h1>`;
  html += `<h2 class="item-code">Code: <span class="geist-mono-400">${item.code}</span></h2>`;
  html += `<p>Serving Size: ${item.serving_size}</p>`;
  html += `<p>Allergens: ${item.allergens_from_ingredients}</p>`;
  html += `<p>Calories: <span class="geist-mono-400">${item.nutriments["energy-kcal_serving"]} ${item.nutriments["energy-kcal_unit"]}</span></p>`;
  html += `<table class="item-table">`;
  html += `<tr><td>Carbohydrates</td><td class="geist-mono-400">${item.nutriments.carbohydrates_serving} ${item.nutriments.carbohydrates_unit}</td></tr>`;
  html += `<tr><td>Sugars</td><td class="geist-mono-400">${item.nutriments.sugars_serving} ${item.nutriments.sugars_unit}</td></tr>`;
  html += `<tr><td>Fat</td><td class="geist-mono-400">${item.nutriments.fat_serving} ${item.nutriments.fat_unit}</td></tr>`;
  html += `<tr><td>Fiber</td><td class="geist-mono-400">${item.nutriments.fiber_serving} ${item.nutriments.fiber_unit}</td></tr>`;
  html += `<tr><td>Protein</td><td class="geist-mono-400">${item.nutriments.proteins_serving} ${item.nutriments.proteins_unit}</td></tr>`;
  html += `<tr><td>Sodium</td><td class="geist-mono-400">${item.nutriments.sodium_serving} ${item.nutriments.sodium_unit}</td></tr>`;
  html += "</table></div>";

  element.innerHTML = html;
  return;
}

export function getItemRow(item) {
  let html = "<tr class='compare-row'>";
  html += `<td>${item.product_name}</td>`;
  html += `<td class="geist-mono-400">${item.serving_size}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments["energy-kcal_serving"]} ${item.nutriments["energy-kcal_unit"]}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments.proteins_serving} ${item.nutriments.proteins_unit}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments.fiber_serving} ${item.nutriments.fiber_unit}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments.carbohydrates_serving} ${item.nutriments.carbohydrates_unit}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments.sugars_serving} ${item.nutriments.sugars_unit}</td>`;
  html += `<td class="geist-mono-400">${item.nutriments.sodium_serving} ${item.nutriments.sodium_unit}</td>`;
  html += "</tr>";
  return html;
}

export function removeSavedItem(name) {
  let saved = getLocalStorage(savedKey);
  if (saved) {
    const length = saved.length;
    for (let i = length - 1; i >= 0; i--) {
      if (saved[i].product_name == name) {
        saved.splice(i, 1);
        break;
      }
    }
    setSingletonLocalStorage(savedKey, saved);
  }

}
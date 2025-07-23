export function loadSearch() {
	document.getElementById("search_icon").addEventListener("click", search);
}

async function search() {
	const search = document.getElementById("search_input").value;
	window.location = `/item/index.html?search=${search}`;
}
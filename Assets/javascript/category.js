// Variables
const urlParameter = new URLSearchParams(window.location.search);
const productsData = JSON.parse(localStorage.getItem("products"));
let viewIcons = document.querySelectorAll(".viewIcon");
let heartIcons = document.querySelectorAll(".heartIcon");
let addToCartBtn = document.querySelectorAll(".addToCartBtn");
document.addEventListener("DOMContentLoaded", function () {
	addToCartBtn = document.querySelectorAll(".addToCartBtn");
});

const listViewproducts = document.querySelector(".listView .products");
const gridViewproducts = document.querySelector(".gridView .products");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterBtn = document.querySelector(".filterBtn");
const selectElement = document.getElementById("brand");
const searchBar = document.querySelector(".searchBar");
const searchIcon = document.querySelector(".searchIcon ");
const brandNames = [];

let sortPrice = document.getElementById("sortPrice");
sortPrice.addEventListener("change", () => {
	if (sortPrice.value === "HighPrices") {
		HighPrice();
		console.log("high");
	} else if (sortPrice.value === "LowPrices") {
		lowPrice();
		console.log("low");
	} else if (sortPrice.value === "Hasdiscount") {
		discountSort();
		console.log("Hasdiscount");
	} else if (sortPrice.value === "instock") {
		stockSort();
		console.log("instock");
	}
});

// Get Category Name
const category = urlParameter.get("category");
let data = productsData.filter((product) => product.category == category);
if (category == null) {
	data = productsData;
}
loadDivContent();

// Function

// Grid View Function
function gridView(product) {
	if (product.discount) {
		return `<div class=" col-12 col-md-4 col-lg-3">
			<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${
			product.stock
		}" data-discount="${product.discount}">
			  <div class="overflow-hidden card h-100 d-flex flex-column align-items-stretch justify-content-between">
			  <div class="position-relative productLabel">
				<span class="bg-danger px-2 discount position-absolute rounded-2 text-white"><span>- </span class="discountRate">${
					(product.discount * 100).toFixed(0) + " %"
				}</span>
			  <div class="card-img-top overflow-hidden px-4">
			  <img class="w-100" src="${product.images[0]}">
			  <div class="cardIcons position-absolute">
				<div class="heart position-relative">
				  <span class="heartIcon"><i class="fa-regular fa-heart p-2"></i></span>
				  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4 px-2 position-absolute">Add to Wishlist</span>
				</div>
				<div class="view position-relative">
				  <span class="viewIcon"><i class="fas fa-magnifying-glass p-2"></i></span>
				  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4 px-4 position-absolute">View</span>
				</div>
			  </div>
			  </div>
			</div>
			  <div class="card-body text-center px-2">
				<a href="#" class="card-title h4 fs-3 text-decoration-none ">${
					splitCardTitle(product).cardTitle
				}</a>
			  </div>
			  <div class="text-center">
				<div class="text-danger fs-3 d-flex justify-content-around align-items-center"><div class="d-inline text-decoration-line-through text-muted oldPrice"><span class=" price">${
					product.price
				}</span><span class="priceSign"> EGP</span></div><div class="d-inline"><span class="price">${
			product.price - product.price * product.discount
		}</span><span class="priceSign"> EGP</span></div></div>
				<span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
			  </div>
			  </div>
			  </div>
			</div>`;
	} else {
		return `<div class=" col-12 col-md-4 col-lg-3">
			<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${
			product.stock
		}">
			  <div class="overflow-hidden card h-100 d-flex flex-column align-items-stretch justify-content-between">
			  <div class="position-relative productLabel">
			  <div class="card-img-top overflow-hidden px-4">
				<img class="w-100" src="${product.images[0]}" alt="Card image cap">
				<div class="cardIcons position-absolute">
					<div class="heart position-relative">
						<span class="heartIcon"><i class="fa-regular fa-heart p-2"></i></span>
						<span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4 px-2 position-absolute">Add to Wishlist</span>
					</div>
					<div class="view position-relative">
						<span class="viewIcon"><i class="fas fa-magnifying-glass p-2"></i></span>
						<span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4 px-4 position-absolute">View</span>
					</div>
				</div>
			  </div>
		  </div>
				<div class="card-body text-center px-2">
				  <a href="#" class="card-title h4 fs-3 text-decoration-none ">${
						splitCardTitle(product).cardTitle
					}</a>
				</div>
				<div class="text-center">
				  <h6 class="text-danger fs-3"><span class="price">${
						product.price
					}</span><span class="priceSign"> EGP</span></h6>
				  <span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
				</div>
			  </div>
			  </div>
		  </div>`;
	}
}
// List View Function
function listView(product) {
	if (product.discount) {
		return `<div class="col-12 listView">
	<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${
			product.stock
		}" data-discount="${product.discount}">
	  <div class="overflow-hidden card flex-row h-100 d-flex">
		<div class="position-relative h-100 listImg productLabel">
		<span class="bg-danger px-2 discount position-absolute rounded-2 text-white"><span>- </span class="discountRate">${
			(product.discount * 100).toFixed(0) + " %"
		}</span>
		  <img class="card-img-top rounded-2 p-3" src="${
				product.images[0]
			}" alt="Card image cap">
			  <div class="cardIcons position-absolute">
				<div class="heart position-relative">
				  <span class="heartIcon"><i class="fa-regular fa-heart p-2"></i></span>
				  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4 px-2 position-absolute">Add to Wishlist</span>
				</div>
				<div class="view position-relative">
				  <span class="viewIcon"><i class="fas fa-magnifying-glass p-2"></i></span>
				  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4 px-4 position-absolute">View</span>
				</div>
			  </div>
		</div>
		<div class="card-body px-2">
		  <div class="h-100 d-flex flex-column justify-content-around">
		  <a href="#" class="card-title h4 fs-3 text-decoration-none">${
				splitCardTitle(product).cardTitle
			}</a>
		  <a href="#" class="card-title h4 fs-3 text-decoration-none"> Brand : ${
				product.Brand
			}</a>
		  <div class="text-danger fs-3 d-flex flex-column"><div class="d-inline text-decoration-line-through text-muted oldPrice"><span class="price">${
				product.price
			}</span><span class="priceSign"> EGP</span></div><div class="d-inline"><span class="price">${
			product.price - product.price * product.discount
		}</span><span class="priceSign"> EGP</span></div></div>
		  <span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
		  </div>
		</div>
	  </div>
	</div>
  </div>`;
	} else {
		return `<div class="col-12 listView">
		<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${
			product.stock
		}">
		  <div class="overflow-hidden card flex-row h-100 d-flex">
			<div class="position-relative h-100 listImg productLabel">
			  <img class="card-img-top rounded-2 p-3" src="${
					product.images[0]
				}" alt="Card image cap">
				  <div class="cardIcons position-absolute">
					<div class="heart position-relative">
					  <span class="heartIcon"><i class="fa-regular fa-heart p-2"></i></span>
					  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4 px-2 position-absolute">Add to Wishlist</span>
					</div>
					<div class="view position-relative">
					  <span class="viewIcon"><i class="fas fa-magnifying-glass p-2"></i></span>
					  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4 px-4 position-absolute">View</span>
					</div>
				  </div>
			</div>
			<div class="card-body px-2">
			  <div class="h-100 d-flex flex-column justify-content-around">
			  <a href="#" class="card-title h4 fs-3 text-decoration-none">${
					splitCardTitle(product).cardTitle
				}</a>
			  <a href="#" class="card-title h4 fs-3 text-decoration-none"> Brand : ${
					product.Brand
				}</a>
				<h6 class="text-danger fs-3"><span class="price">${
					product.price
				}</span><span class="priceSign"> EGP</span></h6>
				<span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
			  </div>
			</div>
		  </div>
		</div>
	  </div>`;
	}
}
// Filter by BrandFunction
function filterByBrand(divName, viewtype) {
	selectElement.addEventListener("change", function () {
		const selectedBrand = selectElement.value;
		divName.innerHTML = "";
		let loadElements = "";
		data.forEach((product) => {
			if (selectedBrand === "All") {
				loadElements += viewtype(product);
			} else if (product.Brand === selectedBrand) {
				loadElements += viewtype(product);
			}
		});
		divName.innerHTML = loadElements;
		reloadIcons();
	});
}
// Filter by Search Function
function search(divName, viewtype) {
	searchIcon.addEventListener("click", function () {
		const searchData = searchBar.value.toLowerCase();
		const filterData = data.filter((item) =>
			item.title.toLowerCase().includes(searchData)
		);
		divName.innerHTML = "";
		filterData.forEach((product) => {
			divName.innerHTML += viewtype(product);
		});
		reloadIcons();
	});
}
// Filter by Price Function
function filterByPrice(divName, viewtype) {
	filterBtn.addEventListener("click", function (event) {
		event.preventDefault();
		divName.innerHTML = "";
		data.forEach((product) => {
			if (
				product.price > minPriceInput.value &&
				product.price < maxPriceInput.value
			) {
				divName.innerHTML += viewtype(product);
			}
		});
		reloadIcons();
	});
}
// Load All Products Function
function loadProducts(divName, viewtype) {
	let elements = "";
	data.forEach((product) => {
		elements += viewtype(product);
	});
	divName.innerHTML = elements;
}
// Store Distinct Brand Name in brandNames array
for (let i = 0; i < data.length; i++) {
	const brand = data[i].Brand;
	if (!brandNames.includes(brand)) {
		brandNames.push(brand);
	}
}
// Add option to every brand name
brandNames.forEach((brandName) => {
	const option = document.createElement("option");
	option.className = brandName;
	option.value = brandName;
	const productsNumber = data.filter(
		(product) => product.Brand === brandName
	).length;
	option.textContent = brandName + "(" + productsNumber + ")";
	selectElement.appendChild(option);
});
function reloadIcons() {
	addToCartBtn = document.querySelectorAll(".addToCartBtn");
	viewIcons = document.querySelectorAll(".viewIcon");
	heartIcons = document.querySelectorAll(".heartIcon");
	viewIconsFunction(viewIcons);
	heartIconFunction(heartIcons);
	addToCart(addToCartBtn);
	SearchStock(".addToCartBtn");
	productClick(".productCard");
	productClick(".cartItem");
}
// Import From Another Js Files
import {
	heartIconFunction,
	viewIconsFunction,
	addToCart,
	splitCardTitle,
	SearchStock,
	productClick,
} from "./global.js";
// Sort by Low Price
function lowPrice() {
	data.sort((a, b) => {
		if (a.price > b.price) return 1;
		if (b.price > a.price) return -1;
	});
	loadDivContent();
	reloadIcons();
}
function HighPrice() {
	data.sort((a, b) => {
		if (a.price < b.price) return 1;
		if (b.price < a.price) return -1;
	});
	loadDivContent();
	reloadIcons();
}
function discountSort() {
	data.sort((a) => {
		if (a.discount) {
			return -1;
		} else {
			return 1;
		}
	});
	loadDivContent();
	reloadIcons();
}
function stockSort() {
	data.sort((a, b) => {
		if (a.stock > b.stock) {
			return -1; // Sort in descending order
		}
		if (a.stock < b.stock) {
			return 1;
		}
	});
	loadDivContent();
	reloadIcons();
}

// let loadElements = "";
// data.forEach((product) => {
// 	if (selectedBrand === "All") {
// 		loadElements += viewtype(product);
// 	} else if (product.Brand === selectedBrand) {
// 		loadElements += viewtype(product);
// 	}
// });
// divName.innerHTML = loadElements;
function loadDivContent() {
	// Grid View Products
	loadProducts(gridViewproducts, gridView);
	search(gridViewproducts, gridView);
	filterByPrice(gridViewproducts, gridView);
	filterByBrand(gridViewproducts, gridView);

	// List View Products
	loadProducts(listViewproducts, listView);
	search(listViewproducts, listView);
	filterByPrice(listViewproducts, listView);
	filterByBrand(listViewproducts, listView);
}

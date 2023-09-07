// Importing Products Data
import { products } from "./productsdata.js";
// Check The Products in Storage
checkStorageProducts();
// Variables

// Filter Products
let allProducts = getData();

const topProductsList = allProducts.filter((item) => item.top == "true");
const mostViewedList = allProducts.filter((item) => item.mostViewed == "true");
const motherboardList = allProducts.filter(
	(item) => item.category == "Motherboard"
);
const processorsList = allProducts.filter(
	(item) => item.category == "Processors"
);
const ramList = allProducts.filter((item) => item.category == "Ram");
const SSDList = allProducts.filter((item) => item.category == "SSD");
const graphicCardList = allProducts.filter(
	(item) => item.category == "Graphic Card"
);
const casesList = allProducts.filter((item) => item.category == "Cases");
const topCtn = document.querySelector(".topRated .owl-carousel");
const mostViewed = document.querySelector(".mostViewed .owl-carousel");
const motherboard = document.querySelector(".motherboard");
const processors = document.querySelector(".processors");
const ram = document.querySelector(".ram");
const SSD = document.querySelector(".SSD");
const graphicCard = document.querySelector(".graphicCard");
const cases = document.querySelector(".cases");

// Top Products
topProductsList.forEach((product) => {
	topCtn.innerHTML += productSlider(product);
});
// Most Viewed
mostViewedList.forEach((product) => {
	mostViewed.innerHTML += productSlider(product);
});

// Motherboard
displayProductsFromArray(motherboardList, motherboard);
// Processors
displayProductsFromArray(processorsList, processors);
// Ram
displayProductsFromArray(ramList, ram);
// SSD
displayProductsFromArray(SSDList, SSD);
// Graphic Cards
displayProductsFromArray(graphicCardList, graphicCard);
// Cases
displayProductsFromArray(casesList, cases);
// Display Products (Filtered) Function
function displayProductsFromArray(productArray, targetElement) {
	const displayedProducts = productArray.splice(0, 8);
	displayedProducts.forEach((product) => {
		targetElement.innerHTML += loadProducts(product);
	});
}
// Products For Slider Function
function productSlider(product) {
	if (product.discount) {
		return `<div class="productCard  h-100 border-4 rounded-2" data-id="${
			product.id
		}" data-stock="${product.stock}" >
		<div class="overflow-hidden card h-100 d-flex flex-column align-items-stretch justify-content-between">
			<div class="position-relative h-100 productLabel">
			<span class="bg-danger px-2 discount position-absolute rounded-2 text-white"><span>- </span class="discountRate">${
				(product.discount * 100).toFixed(0) + " %"
			}</span>
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
			<div class="card-body text-center px-2 h-100">
			  <a href="#" class="card-title h4 fs-3 text-decoration-none">${
					splitCardTitle(product).cardTitle
				}</a>
			</div>
			<div class="text-center h-100">
			<div class="text-danger fs-3 d-flex justify-content-around align-items-center"><div class="d-inline text-decoration-line-through text-muted oldPrice"><span class="price">${
				product.price
			}</span><span class="priceSign"> EGP</span></div><div class="d-inline"><span class="price">${
			product.price - product.price * product.discount
		}</span><span class="priceSign"> EGP</span></div></div>
			<span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
			</div>
		</div>
	  </div>`;
	} else {
		return `<div class="productCard  h-100 border-4 rounded-2" data-id="${
			product.id
		}" data-stock="${product.stock}">
		  <div class="overflow-hidden card h-100 d-flex flex-column align-items-stretch justify-content-between">
			  <div class="position-relative h-100 productLabel">
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
			  <div class="card-body text-center px-2 h-100">
				<a href="#" class="card-title h4 fs-3 text-decoration-none">${
					splitCardTitle(product).cardTitle
				}</a>
			  </div>
			  <div class="text-center h-100">
				<h6 class="text-danger fs-3"><span class="price">${
					product.price
				}</span><span class="priceSign"> EGP</span></h6>
				<span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
			  </div>
		  </div>
		</div>`;
	}
}
// Set Products Data Function
function setData() {
	localStorage.setItem("products", JSON.stringify(products));
}
// Get Producs Data Function
function getData() {
	return JSON.parse(localStorage.getItem("products"));
}
// Load Products Function
function loadProducts(product) {
	if (product.discount) {
		return `<div class=" col-12 col-md-4 col-lg-3">
			<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${
			product.stock
		}" data-discount="${product.discount}">
			  <div class="overflow-hidden card h-100 d-flex flex-column align-items-stretch justify-content-between">
			  <div class="position-relative h-100 productLabel">
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
			  <div class="card-body text-center px-2 h-100">
				<a href="#" class="card-title h4 fs-3 text-decoration-none ">${
					product.title
				}</a>
			  </div>
			  <div class="text-center h-100">
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
			  <div class="position-relative h-100 productLabel">
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
				<div class="card-body text-center px-2 h-100">
				  <a href="#" class="card-title h4 fs-3 text-decoration-none ">${
						splitCardTitle(product).cardTitle
					}</a>
				</div>
				<div class="text-center h-100">
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
// Check Products In Storage Function
function checkStorageProducts() {
	if (localStorage.getItem("products") === null) {
		setData();
	}
}
// Counter
const counters = document.querySelectorAll(".counter");
let countArray = [];
counters.forEach((element) => {
	countArray.push(element.textContent);
	element.textContent = 0;
});
let scroll = false;
document.addEventListener("scroll", function () {
	if (window.scrollY >= 2110 && scroll == false) {
		counters.forEach(function (element, index) {
			let number = parseInt(countArray[index]);
			let increaseNumber = parseInt((5 / 100) * number);
			element.textContent = 0;
			let counter = setInterval(function () {
				element.textContent = +element.textContent + increaseNumber;
				if (+element.textContent >= number) {
					element.textContent = number;
					clearInterval(counter);
				}
			}, 90);
		});
		scroll = true;
	}
});

// Category
const catElements = document.querySelectorAll(".see");
catElements.forEach((element) => {
	element.addEventListener("click", function () {
		const category = element.dataset.category;
		const url = `/category.html?category=${encodeURIComponent(category)}`;
		element.href = url;
	});
});
$(document).ready(function () {
	$(".hero .owl-carousel").owlCarousel({
		responsive: true,
		items: 1,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		loop: true,
	});
	$(".mHero .owl-carousel").owlCarousel({
		responsive: true,
		items: 1,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		loop: true,
	});
	$(".topRated .owl-carousel").owlCarousel({
		responsive: true,
		items: 5,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		loop: true,
		margin: 10,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 3,
			},
			1000: {
				items: 5,
			},
		},
	});
	$(".mostViewed .owl-carousel").owlCarousel({
		responsive: true,
		items: 5,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		loop: true,
		margin: 10,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 3,
			},
			1000: {
				items: 5,
			},
		},
	});
});
// Import From Another Js Files
import { splitCardTitle } from "./global.js";

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const productsData = JSON.parse(localStorage.getItem("products"));
let data = productsData.filter((product) => product.category == category);
let viewIcons = document.querySelectorAll(".viewIcon");
let heartIcons = document.querySelectorAll(".heartIcon");
let addToCartBtn = document.querySelectorAll(".addToCart");

if (category == null){
	data = productsData
}
const listViewproducts = document.querySelector(".listView .products")
const gridViewproducts = document.querySelector(".gridView .products")
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const filterBtn = document.querySelector(".filterBtn");
const selectElement = document.getElementById("brand");
const searchBar = document.querySelector(".searchBar");
const searchIcon  = document.querySelector(".searchIcon ");
const brandNames = [];

// Grid View Products
loadProducts(gridViewproducts,gridView)
search(gridViewproducts,gridView)
filterByPrice(gridViewproducts,gridView)
filterByBrand(gridViewproducts,gridView)

// List View Products
loadProducts(listViewproducts,listView)
search(listViewproducts,listView)
filterByPrice(listViewproducts,listView)
filterByBrand(listViewproducts,listView)


// Grid View Function
function gridView(product) {
	return `<div class=" col-12 col-md-4 col-lg-3">
	<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${product.stock}">
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
		  <a href="#" class="card-title h4 fs-3 text-decoration-none ">${splitCardTitle(product).cardTitle}</a>
		</div>
		<div class="text-center h-100">
		  <h6 class="text-danger fs-3"><span class="price">${product.price}</span><span class="priceSign"> EGP</span></h6>
		  <span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
		</div>
	  </div>
	  </div>
  </div>`;
}
// List View Function
function listView(product){
	return `<div class="col-12 listView">
	<div class="productCard rounded-2 h-100" data-id="${product.id}" data-stock="${product.stock}">
	  <div class="overflow-hidden card flex-row h-100 d-flex">
		<div class="position-relative h-100 listImg productLabel">
		  <img class="card-img-top rounded-2 p-3" src="${product.images[0]}" alt="Card image cap">
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
		  <a href="#" class="card-title h4 fs-3 text-decoration-none">${product.title}</a>
		  <a href="#" class="card-title h4 fs-3 text-decoration-none"> Brand : ${product.Brand}</a>
			<h6 class="text-danger fs-3"><span class="price">${product.price}</span><span class="priceSign"> EGP</span></h6>
			<span class="btnSpan"><button class="btn btn-info d-block m-auto mb-4 addToCartBtn">Add To Cart</button></span>
		  </div>
		</div>
	  </div>
	</div>
  </div>`
}
// Filter by BrandFunction
function filterByBrand(divName,viewtype){
	selectElement.addEventListener("change", function() {
		const selectedBrand = selectElement.value;
		divName.innerHTML = ""; 
		let loadElements="";
		data.forEach(product => {
		  if (selectedBrand === "All"){
			loadElements += viewtype(product);
		  }
		  else if (product.Brand === selectedBrand) {
			loadElements += viewtype(product);
		  }
		});
		divName.innerHTML = loadElements;
		reloadIcons()
	  });
}
// Filter by Search Function
function search(divName,viewtype){
	searchIcon.addEventListener("click", function(){
	const searchData = searchBar.value.toLowerCase();
	const filterData = data.filter(item => item.title.toLowerCase().includes(searchData));
	divName.innerHTML=""
	filterData.forEach(product => {
		divName.innerHTML += viewtype(product)
	});
	reloadIcons()
})
}
// Filter by Price Function
function filterByPrice(divName,viewtype){
	filterBtn.addEventListener('click', function(event) {
		event.preventDefault();
		divName.innerHTML="";
		data.forEach(product => {
			if (product.price>minPriceInput.value && product.price<maxPriceInput.value){
				divName.innerHTML += viewtype(product)
			}
		}); 
		reloadIcons()
	});
}
// Load All Products Function
function loadProducts(divName,viewtype){
	let elements = "" 
		data.forEach(product => {
		  elements += viewtype(product)
	  });
divName.innerHTML=elements;
}
// Store Distinct Brand Name in brandNames array
for (let i = 0; i < data.length; i++) {
	const brand = data[i].Brand;
	if (!brandNames.includes(brand)) {
  brandNames.push(brand);
	}
}
// Add option to every brand name
brandNames.forEach(brandName => {
const option = document.createElement("option");
option.className = brandName;
option.value = brandName;
const productsNumber = data.filter(product => product.Brand === brandName).length
option.textContent = brandName + "(" + productsNumber + ")";
selectElement.appendChild(option);
});
import {heartIconFunction,viewIconsFunction,addToCart,splitCardTitle,SearchStock} from './global.js';
function reloadIcons(){
	viewIcons = document.querySelectorAll(".viewIcon");
	heartIcons = document.querySelectorAll(".heartIcon");
	addToCartBtn = document.querySelectorAll(".addToCart");
	viewIconsFunction(viewIcons)
	heartIconFunction(heartIcons)
	addToCart(addToCartBtn)
	SearchStock(".addToCartBtn")

}

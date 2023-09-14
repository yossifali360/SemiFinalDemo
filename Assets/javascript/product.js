const productInfoCtn = document.querySelector(".productInfoCtn");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productsData = getData();
const data = productsData.find((product) => product.id == productId);
document.title = data.title;
productInfoCtn.innerHTML = returnProductData(data);
viewProductActiveImg();
function returnProductData(data) {
	let images = "";
	data.images.forEach((imageUrl) => {
		images += `<div class="p-1 rounded-2 m-1"><img class="pImage" src="${imageUrl}"></div>`;
	});
	if (data.discount) {
		return `<div class = "mainCtn">
        <div class = "overflow-hidden d-flex flex-lg-row flex-column bg-white rounded-2 w-100 p-4 ProductCtn align-items-stretch justify-content-between productCard" data-id="${
            data.id
        }" data-stock="${data.stock}" data-discount="${data.discount}">
            <div class = "left p-3 w-75 position-relative">
                <div class="h-100 d-flex flex-column justify-content-between position-relative productLabel">
				<span class="bg-danger px-2 discount position-absolute rounded-2 text-white"><span>- </span class="discountRate">${
					(data.discount * 100).toFixed(0) + " %"
				}</span>
                    <div class="imgCtn">
                        <img src = "${
							data.images[0]
						}" alt = "Product Image" class="d-block m-auto rounded-2 mainImg">
                    </div>
                    <div class="hover-container d-flex flex-wrap align-items-center justify-content-center mt-2">
                    ${images}
                    </div>
                </div>
            </div>
            <div class = "right w-50 p-3">
                <div class="h-100 d-flex flex-column justify-content-between">
                    <h2 class = "product-name d-block">${data.title}</h2>
                    <div class="text-danger fs-3 d-flex  flex-column"><div class="d-inline text-decoration-line-through text-muted"><span class=" price">${
						data.price
					}</span><span class="priceSign"> EGP</span></div><div class="d-inline"><span class="price">${
			data.price - data.price * data.discount
		}</span><span class="priceSign"> EGP</span></div></div>
                    <h3 class = "d-block text-muted fs-4">Category : ${
						data.category
					}</h3>
                    <h3 class = "d-block text-muted fs-4">Brand : ${
						data.Brand
					}</h3>
                    <div class = "product-rating mt-2">
                        <span class="ms-1"><i class = "fas fa-star"></i></span>
                        <span class="ms-1"><i class = "fas fa-star"></i></span>
                        <span class="ms-1"><i class = "fas fa-star"></i></span>
                        <span class="ms-1"><i class = "fas fa-star"></i></span>
                        <span class="ms-1"><i class = "fas fa-star"></i></span>
                    </div>
                    <div class = "mt-2 d-flex gap-4">
                        <span class="btnSpan"><button class = "btn btn-outline-primary p-2 text-capitalize addToCartBtn addToCart"><i class = "fas fa-shopping-cart p-2"></i>add to cart</button></span>
                    </div>
                </div>
        </div>
        </div>
        <hr>
        <div class="productDescription">
            <h4 class="text-center p-5">Product Description</h4>
            <img src="${data.description}" alt="" class="w-100">
        </div>
    </div>`;
	} else
		return `<div class = "mainCtn">
    <div class = "overflow-hidden d-flex flex-lg-row flex-column bg-white rounded-2 w-100 p-4 ProductCtn align-items-stretch justify-content-between productCard" data-id="${data.id}" data-stock="${data.stock}">
        <div class = "left p-3 w-75 position-relative">
            <div class="h-100 d-flex flex-column justify-content-between productLabel">
                <div class="imgCtn">
                    <img src = "${data.images[0]}" alt = "Product Image" class="d-block m-auto rounded-2 mainImg">
                </div>
                <div class="hover-container d-flex flex-wrap align-items-center justify-content-center mt-2">
                ${images}
                </div>
            </div>
        </div>
        <div class = "right w-50 p-3">
            <div class="h-100 d-flex flex-column justify-content-between">
                <h2 class = "product-name d-block">${data.title}</h2>
                <h3 class = "d-block text-muted fs-4">Price : ${data.price} EGP</h3>
                <h3 class = "d-block text-muted fs-4">Category : ${data.category}</h3>
                <h3 class = "d-block text-muted fs-4">Brand : ${data.Brand}</h3>
                <div class = "product-rating mt-2">
                    <span class="ms-1"><i class = "fas fa-star"></i></span>
                    <span class="ms-1"><i class = "fas fa-star"></i></span>
                    <span class="ms-1"><i class = "fas fa-star"></i></span>
                    <span class="ms-1"><i class = "fas fa-star"></i></span>
                    <span class="ms-1"><i class = "fas fa-star"></i></span>
                </div>
                <div class = "mt-2 d-flex gap-4">
                    <span class="btnSpan"><button class = "btn btn-outline-primary p-2 text-capitalize addToCartBtn addToCart"><i class = "fas fa-shopping-cart p-2"></i>add to cart</button></span>
                </div>
            </div>
    </div>
    </div>
    <hr>
    <div class="productDescription">
        <h4 class="text-center p-5">Product Description</h4>
        <img src="${data.description}" alt="" class="w-100">
    </div>
</div>`;
}
function getData() {
	return JSON.parse(localStorage.getItem("products"));
}
function viewProductActiveImg() {
	const productViewMainImg = document.querySelector(".mainImg");
	const productViewImages = document.querySelectorAll(".pImage");
	productViewImages.forEach((item) => {
		item.addEventListener("click", function () {
			productViewMainImg.src = item.src;
			removeActive(productViewImages);
			item.classList.add("active");
		});
	});
}
// Remove Active Class From Images
function removeActive(imgs) {
	imgs.forEach(function (item) {
		item.classList.remove("active");
	});
}
import { addToCart } from "./global.js";
const addToCartBtn = document.querySelectorAll(".addToCart");
addToCart(addToCartBtn);

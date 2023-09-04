let viewIcons = document.querySelectorAll(".viewIcon");
let heartIcons = document.querySelectorAll(".heartIcon");
const loadingIcon = document.querySelector(".loadingIcon");

viewIconsFunction(viewIcons)
heartIconFunction(heartIcons)

// View Icons function
function viewIconsFunction(viewIcons){
	viewIcons.forEach((icon) => {
		const parent = icon.closest(".productCard")
		const hiddenVeiw = parent.querySelector(".hiddenVeiw");
		productsIconsHover(icon,hiddenVeiw);
		icon.addEventListener("click", function () {
			const productId = icon.closest(".productCard").dataset.id;
			let productObject = getProductsData().find((product) => product.id == productId);
			loadingIcon.style.display = "block";
			loadShoppingCarts();
			setTimeout(() => {
				loadingIcon.style.display = "none";
				createProductOverlay(productObject)
			}, 2000);
		});
	});
}
// Heart Icons function
function heartIconFunction(heartIcons){
	heartIcons.forEach((icon) => {
		const parent = icon.closest(".productCard");
		const hiddenHeart = parent.querySelector(".hiddenHeart");
		productsIconsHover(icon,hiddenHeart);
		icon.addEventListener("click", function () {
			if (hiddenHeart.textContent == "Remove from Wishlist"){
				console.log("to remove");
			}else{
				const iconCtn = icon.closest(".cardIcons");
				const view = iconCtn.querySelector(".viewIcon");
				heartClick(icon)
				addToWishList(icon)
				view.style.display = "none";
				iconCtn.style.backgroundColor = "transparent";
				hiddenHeart.textContent="Remove from Wishlist";
				cartAndWishCount(WishlistData,WishListCount);
				loadWishlist();
				setTimeout(() => {
					heartClickDelay(icon)
					iconCtn.style.backgroundColor = "#fff";
					view.style.display = "block";
				}, 2900);
			}
		});
	});
}

// Products Icon Hover Function
function productsIconsHover(icon,hidden){
	icon.addEventListener("mouseover", function () {
		hidden.style.visibility = "visible";
	});
	icon.addEventListener("mouseout", function () {
		hidden.style.visibility = "hidden";
	});
}
// Get Products Data Function
function getProductsData() {
	return JSON.parse(localStorage.getItem("products"));
}
function cartAndWishCount(list,counter){
	if (list.length == 0){
		counter.style.display="none"
	}
	else{
		counter.style.display="block"
		counter.textContent=list.length
	}
}
// Products Details (Overlay) Function
function productDetails(product) {
    let images = "";
    product.images.forEach(imageUrl => {
        images += `<div class="p-1 rounded-2 m-1"><img class="pImage" src="${imageUrl}"></div>`;
    });
	return `<div class = "container d-flex align-items-center justify-content-center overlay h-100">
	<div class = "d-flex flex-column flex-lg-row bg-white rounded-2 w-100 p-4 ProductCtn productCard position-relative" data-id="${product.id}">
	<a id="closeProduct" class="fas fa-x closeProduct"></a>
		<div class = "left p-3 w-75 h-100">
            <div class="h-100 d-flex flex-column justify-content-between">
                <div class="h-50">
                    <img src = "${product.images[0]}" alt = "Product Image" class="w-75 h-100 d-block m-auto rounded-2 mainImg">
                </div>
                <div class="hover-container d-flex flex-wrap align-items-center justify-content-center mt-2">
                ${images}  
                </div>
            </div>
		</div>
		<div class = "right w-50 p-3 h-100">
			<div class="h-100 d-flex flex-column justify-content-between position-relative">
				<span class = "product-name d-block">${product.title}</span>
				<h3 class = "d-block text-muted fs-4"> Price: ${product.price} EGP</h3>
				<h3 class = "d-block text-muted fs-4">Category ${product.category}</h3>
				<h3 class = "d-block text-muted fs-4">Brand: ${product.Brand}</h3>
				<div class = "product-rating mt-2">
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
				</div>
				<div class = "mt-2 d-flex flex-column flex-lg-row gap-2">
					<button class = "btn btn-outline-primary p-2 text-capitalize addToCartOverlayBtn"><i class = "fas fa-shopping-cart p-2"></i>add to cart</button>
					<button class = "btn btn-outline-info p-2 text-capitalize"><i class = "fas fa-wallet p-2"></i>buy now</button>
				</div>
          </div>
		</div>
	</div>
</div>
`;
}
// Heart Click Function
function heartClick(icon){
    const iconI = icon.querySelector("i")
	iconI.style.color = "red";
	icon.style.backgroundColor = "transparent";
	icon.style.position = "absolute";
	icon.style.animation = "move 3s";
	iconI.classList.add("fs-1");
}
// Heart Click Remove Function
function heartClickDelay(icon){
	const heart = icon.closest(".heart")
	heart.style.backgroundColor="white"
    const iconI = icon.querySelector("i")
	iconI.style.color = "red";
	iconI.classList.remove("fs-1");
	iconI.classList.add("fs-5");
	icon.style.position = "relative";
}
// Add Acive Class To Images Function
function viewProductActiveImg(productOverlay) {
	const productViewMainImg = productOverlay.querySelector(".mainImg");
	const productViewImages = productOverlay.querySelectorAll(".pImage");
	productViewImages.forEach((item) => {
		item.addEventListener("click", function () {
			productViewMainImg.src = item.src;
			removeActive(productViewImages);
			item.classList.add("active");
		});
	});
}
// Remove Active Class From Images Function
function removeActive(imgs) {
	imgs.forEach(function (item) {
		item.classList.remove("active");
	});
}
/ Load Wishlist Function
function loadWishlist(){
	Wishes.innerHTML="";
	WishlistData.forEach(element => {
		Wishes.innerHTML += wishItemData(element)
	});
}
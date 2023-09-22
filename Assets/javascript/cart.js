import { WishListCount , loadWishlist ,loadShoppingCarts , getProductsData} from './global.js';
let shoppingcartData = JSON.parse(localStorage.getItem("cart"))
const cartsCtn = document.querySelector(".cartsCtn")
const totalPrice = document.querySelector(".totalPrice")

let WishlistData = JSON.parse(localStorage.getItem("Wishlist")) ?? [];

// Check Carts Length
if (shoppingcartData.length > 0 ){
    cartsCtn.innerHTML=""
}
// Display Carts
shoppingcartData.forEach(cart => {
    cartsCtn.innerHTML+= loadCarts(cart)
});
const plus = document.querySelectorAll(".fa-plus")
const minus = document.querySelectorAll(".fa-minus")
const remove = document.querySelectorAll(".fa-trash")
const heart  = document.querySelectorAll(".cartHeart")
// Plus
plus.forEach(sign => {
    sign.addEventListener("click",function(){
        const parent = sign.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = shoppingcartData.find((cart) => cart.id == cartId);
        productObject.quantity++;
        const quantity = parent.querySelector(".count")
        console.log(quantity);
        let currentQuantity = parseInt(quantity.innerHTML);
        let newQuantity = currentQuantity + 1;
        quantity.innerHTML = newQuantity;
        localStorage.setItem("cart", JSON.stringify(shoppingcartData));
        CalcTotal()
        loadShoppingCarts()
        Toast.fire({
            icon: "success",
            title: `Quantity increased ,  Current quantity is ${newQuantity}`,
        });
    })
});
// Minus
minus.forEach(sign => {
    sign.addEventListener("click",function(){
        const parent = sign.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = shoppingcartData.find((cart) => cart.id == cartId);
        const quantity = parent.querySelector(".count")
        let currentQuantity = parseInt(quantity.textContent);
        if(currentQuantity > 1){
            productObject.quantity--;
            let newQuantity = currentQuantity - 1;
            quantity.innerHTML = newQuantity;
            localStorage.setItem("cart", JSON.stringify(shoppingcartData));
            CalcTotal()
            loadShoppingCarts()
            Toast.fire({
                icon: "success",
                title: `Quantity decresed , Current quantity is ${newQuantity}`,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: `Quantity cannot be less Than 1`,
            });
        }
    })
});
// Remove
remove.forEach(icon => {
    icon.addEventListener("click",function(){
        const parent = icon.closest(".itemCtn");
        let cartId = parent.dataset.id;
        shoppingcartData = shoppingcartData.filter((cart) => cart.id != cartId);
        parent.remove();
        localStorage.setItem("cart", JSON.stringify(shoppingcartData));
        CalcTotal();
        loadShoppingCarts()
        Toast.fire({
            icon: "success",
            title: `Product Removed Successfuly`,
        });
    })
});
// Heart
heart.forEach(icon => {
    icon.addEventListener("click",function(){
        const parent = icon.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = getProductsData().find((product) => product.id == cartId);
        let searchProduct = WishlistData.find((cart) => cart.id == cartId);
        Toast.fire({
            icon: "success",
            title: `Added To Wishlist Successfuly`,
        });
        if (searchProduct == undefined) {
            WishlistData.push(productObject);
        }
        WishListCount.textContent=WishlistData.length
        localStorage.setItem("Wishlist", JSON.stringify(WishlistData));
        loadWishlist()
    })
});
// Loadcarts Function
function loadCarts(cart){
    return`<div class="itemCtn" data-id="${cart.id}">
    <div class="item d-flex align-items-center justify-content-between flex-column flex-sm-row">
        <div class="d-flex align-items-center gap-4">
            <img src="${cart.images[0]}" alt="" class="rounded-4 pr-2">
            <div class="info">
                <h6 class="text-info">${cart.title}</h6>
                <div class="brand px-1">${cart.category} , ${cart.Brand}</div>
                <i class="fa-solid fa-trash bg-primary text-white rounded-2 my-2"></i>
                <i class="fas fa-heart bg-danger text-white rounded-2 my-2 cartHeart"></i>
            </div>
        </div>
        <div class="quantityCtn d-flex align-items-center justify-content-between d-sm-block px-4">
            <div class="quantity p-2  d-flex bg-secondary-subtle rounded-2">
                <i class="fas fa-plus rounded-1 bg-primary text-white"></i>
                <span class="count px-4">${cart.quantity}</span>
                <i class="fas fa-minus rounded-1 bg-primary text-white"></i>
            </div>
            <div class="itemsPrice text-muted text-center">
                ${cart.price.toLocaleString('en-US')} EGP
            </div>
        </div>
    </div>
    <hr  class="mx-5">
</div>`
}
// Calc total Function
CalcTotal()
function CalcTotal(){
    let total = 0;
    shoppingcartData.forEach(item => {
        total += item.price * item.quantity
        totalPrice.innerHTML= total.toLocaleString('en-US');
    });
}
let checkoutBtn = document.querySelector(".checkoutBtn")
console.log(checkoutBtn);
checkoutBtn.addEventListener("click",function(){
	// Check Login State
if (!loginGetData()) {
	const path = "checkout";
	const url = `/login.html?redirect=${encodeURIComponent(path)}`;
	location.href = url;
}else{
    location.href = "/checkout.html";
}
})
// Get Login Data Function
function loginGetData() {
	return JSON.parse(localStorage.getItem("session"));
}
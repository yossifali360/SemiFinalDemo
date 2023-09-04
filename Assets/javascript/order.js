



const data = document.querySelector(".data")
const OrdersCtn = document.querySelector(".OrdersCtn")

let ordersTest=[]
getOrdersData().forEach(function(element){
    if (getSessionData().email == element.email){
        ordersTest.push(element)
    }
});
ordersTest.forEach(function(element,index) {
    OrdersCtn.innerHTML+=Order(index+1,element)
    const productCtn = OrdersCtn.querySelectorAll(".productsFromOrder")
    const carts = element.cartItems;
    carts.forEach(cart => {
        productCtn[index].innerHTML+=loadOrderProducts(cart)
    });
});
// if (getSessionData().email == element.email){
    // element.cartItems.forEach(orderItem => {
        // const test = OrdersCtn.querySelectorAll(".productsFromOrder")
        // test[index].innerHTML+=loadOrderProducts(orderItem)
    // });
// }

function getOrdersData() {
	return JSON.parse(localStorage.getItem("AllOrders"));
}
function getSessionData () {
	return JSON.parse(localStorage.getItem("session"));
}
function Order(index,element){
    return`<div class="data my-4">
    <div class="container">
      <h4>Order #${index} Details</h4>
      <div class="productsFromOrder">
      </div>
      <div class="d-flex align-items-center justify-content-between mx-4>
      <span class="text-muted">Date of order : ${element.time}</span>
      <span class="text-muted">Order Total price : ${element.totalPrice}</span>
      </div>
    </div>
</div>
<hr>`
}
function loadOrderProducts(item){
    return `<div class="card m-2">
    <div class="itemCtn" data-id="${item.id}">
        <div class="item d-flex align-items-center justify-content-between flex-column flex-sm-row">
            <div class="d-flex align-items-center gap-4 w-100">
                <img src="${item.images[0]}" alt="" class="rounded-4 pr-2">
                <div class="info">
                    <h6 class="text-info">${item.title}</h6>
                    <div class="brand px-1"> ${item.category} , ${item.Brand}</div>
                </div>
            </div>
            <div class="flex-column d-flex align-items-center justify-content-between d-sm-block px-4">
                <div class="quantity text-muted text-center">
                     x${item.quantity}
                </div>
                <div class="itemsPrice text-muted text-center">
                     ${item.price}
                </div>
                <div class="total text-muted text-center">
                   Total : ${(item.price * item.quantity).toLocaleString('en-US')}
                </div>
            </div>
        </div>
    </div>
</div>`
}
// Check Login State
if (!loginGetData()) {
	const path = "checkout";
	const url = `/login.html?redirect=${encodeURIComponent(path)}`;
	location.href = url;
}
// Global Variables
let AllOrders = JSON.parse(localStorage.getItem("AllOrders")) ?? [];
const submitBtn = document.querySelector(".submitBtn");
const cartList = document.querySelector(".cartList");
// Promo Variables
const promoDiv = document.querySelector(".promoDiv");
const promoIcon = document.querySelector(".promoIcon");
const promo = document.querySelector(".promo");
const totalPrice = document.querySelector(".totalPrice");
const discount = document.querySelector(".discount");
const redeem = document.querySelector(".redeem");
const discountRate = document.querySelector(".discountRate");
// Personal Info Variables
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const address = document.getElementById("address");
const address2 = document.getElementById("address2");
const country = document.getElementById("country");
const Governorate = document.getElementById("Governorate");
const zip = document.getElementById("zip");
var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
// Card Variables
const cardNumber = document.querySelector(".cardNumber");
const masterCardImg = document.querySelector(".masterCardImg");
const visaImg = document.querySelector(".visaImg");
const ccName = document.getElementById("ccName");
const ccNumber = document.getElementById("ccNumber");
const ccExpiration = document.getElementById("ccExpiration");
const ccCvv = document.getElementById("ccCvv");
const visaPattern = /^4[0-9]{3}/;
const mastercardPattern = /^5[1-5][0-9]{2}/;
const backCard = document.querySelector(".backCard");
const frontCard = document.querySelector(".frontCard");
const cardName = document.querySelector(".cardName");
const first4Nums = document.querySelector(".first4Nums");
const sec4Nums = document.querySelector(".sec4Nums");
const third4Nums = document.querySelector(".third4Nums");
const forth4Nums = document.querySelector(".forth4Nums");
const cardCCV = document.querySelector(".cardCCV");
const cardExpDate = document.querySelector(".cardExpDate");
const questionImg = document.querySelector(".question");


// Invoke Validate Form Function
validateForm();
// Load Cart Data From Storage
getCartData().forEach((cart) => {
	cartList.innerHTML += cartListItem(cart);
});
// Invoke Clac Total Function
CalcTotal();
// Add Cart Items To Div
function cartListItem(product) {
	return `<tr>
    <td><h6 class="productName">${splitCardTitle(product).cardTitle}</h6></td>
    <td><h6>x<span class="quantity">${product.quantity}</span></h6></td>
    <td><h6 class="text-muted"><span class="price">${
		product.price
	}</span><br> EGP</h6></td>
</tr>`;
}
// Split Card Title
function splitCardTitle(product) {
	let title = product.title.split(" ");
	let cardTitle = title.slice(0, 6).join(" ");
	if (title.length > 6) {
		cardTitle += " ..";
	}
	return { cardTitle };
}
// Get Cart Data Function
function getCartData() {
	return JSON.parse(localStorage.getItem("cart"));
}
// Add Promo Code
promoIcon.addEventListener("click", function () {
	promoIcon.style.display = "none";
	promoDiv.style.display = "block";
});
// Redeem Code Discount If Promo is Correct
redeem.addEventListener("click", function (e) {
	e.preventDefault();
	if (promo.value == "discount7") {
		let calcDiscount = parseInt(totalPrice.textContent) * 0.07;
		console.log(calcDiscount);
		discount.style.display = "table-row";
		discountRate.textContent = `7% (${parseInt(calcDiscount)})`;
		let oldPrice = parseInt(totalPrice.textContent);
		promo.value = "";
		totalPrice.textContent = (oldPrice - calcDiscount).toLocaleString(
			"en-US"
		);
		Toast.fire({
			icon: "success",
			title: `Promo code  applied`,
		});
	} else {
		Toast.fire({
			icon: "error",
			title: `promo code is invalid`,
		});
	}
});
// Putting User Name & Email & Address If Available
fName.value = loginGetData().fName;
lName.value = loginGetData().lName;
if (loginGetData().Address != "") {
	address.value = loginGetData().Address;
} else {
	address.value = "";
}
email.value = loginGetData().email;
// Validate Form Inputs
function validateForm() {
	let inputList = [fName, lName, email, address, country, Governorate, zip];
	let creditData = [ccName, ccNumber, ccExpiration, ccCvv];
	submitBtn.addEventListener("click", function (e) {
		e.preventDefault();
		if (
			// Personal Data Are Null
			fName.value == "" ||
			lName.value == "" ||
			email.value == "" ||
			address.value == "" ||
			country.value == "" ||
			Governorate.value == "" ||
			zip.value == ""
		) {
			Swal.fire(
				"Data Not Completely filled",
				"Please Fill Personal Data Completely",
				"error"
			);
			inputList.forEach((item) => {
				if (item.value == "") {
					item.style.border = "2px solid red";
				}
			});
		} else if (
			// If Card Inputs Are Null
			ccName.value == "" ||
			ccNumber.value == "" ||
			ccExpiration.value == "" ||
			ccCvv.value == ""
		) {
			Swal.fire(
				"Complete Credit card Data !",
				"Please Fill Data Completely",
				"error"
			);
			creditData.forEach((item) => {
				if (item.value == "") {
					item.style.border = "2px solid red";
				}
			});
		} else {
			// All Inputs Are Correct
			inputList.forEach((item) => {
				item.value = "";
			});
			creditData.forEach((item) => {
				item.value = "";
			});
			swal.fire({
				title: "Thanks For Purchasing From us",
				text: "Our Team Will Contact You Within 3 Days",
				icon: "success",
				showCancelButton: false,
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			}).then(function () {
				const path = "checkedout";
				const url = `/index.html?redirect=${encodeURIComponent(path)}`;
				location.href = url;
			});
			let userOrder = {
				cartItems: getCartData(),
				email: loginGetData().email,
				totalPrice: totalPrice.textContent,
				time: getDate(),
			};
			AllOrders.push(userOrder);
			localStorage.setItem("AllOrders", JSON.stringify(AllOrders));
			localStorage.removeItem("cart");
		}
	});
}
// Get Login Data Function
function loginGetData() {
	return JSON.parse(localStorage.getItem("session"));
}
// Calc Total Function
function CalcTotal() {
	let total = 0;
	getCartData().forEach((item) => {
		total += item.price * item.quantity;
		totalPrice.innerHTML = total;
	});
	if (getCartData().length == 0) {
		totalPrice.innerHTML = 0;
	}
}
// Get Date And Time Function
function getDate() {
	let currentDate = new Date();
	currentDate.setUTCHours(currentDate.getUTCHours() + 3);
	let year = currentDate.getUTCFullYear();
	let month = currentDate.getUTCMonth() + 1;
	let day = currentDate.getUTCDate();
	let hours = currentDate.getUTCHours();
	let minutes = currentDate.getUTCMinutes();
	if (hours === 0) {
		hours = 12;
	} else {
		hours = hours % 12;
	}
	let formattedDate =
		year +
		"-" +
		(month < 10 ? "0" : "") +
		month +
		"-" +
		(day < 10 ? "0" : "") +
		day;
	let formattedTime =
		(hours < 10 ? "0" : "") +
		hours +
		":" +
		(minutes < 10 ? "0" : "") +
		minutes;
	let dateAndTime = formattedDate + " " + "(" + formattedTime + ")";
	return dateAndTime;
}
// Start Animation After Load Of Page
document.addEventListener("DOMContentLoaded", function () {
	backCard.style.animation = "cardAnimationReverse 1s forwards";
	frontCard.style.animation = "cardAnimationfrontReverse 2s forwards";
});
// Card CVV
ccCvv.addEventListener("input", function () {
	backCard.style.animation = "cardAnimation 1s forwards";
	frontCard.style.animation = "cardAnimationfront 2s forwards";
	cardCCV.textContent = ccCvv.value;
});
// Card Holder Name
ccName.addEventListener("input", function () {
	reverseAnimation();
	cardName.textContent = ccName.value.toUpperCase();
});
//Card Number & Validate Card Type
ccNumber.addEventListener("input", function () {
	reverseAnimation();
	first4Nums.textContent = ccNumber.value.slice(0, 4);
	sec4Nums.textContent = ccNumber.value.slice(4, 8);
	third4Nums.textContent = ccNumber.value.slice(8, 12);
	forth4Nums.textContent = ccNumber.value.slice(12, 16);
	// Validate Card Type
	if (
		!cardNumber.value.match(mastercardPattern) &&
		!cardNumber.value.match(visaPattern)
	) {
		questionImg.style.display = "block";
		masterCardImg.style.display = "none";
		visaImg.style.display = "none";
	} else {
		if (cardNumber.value.match(visaPattern)) {
			questionImg.style.display = "none";
			masterCardImg.style.display = "none";
			visaImg.style.display = "block";
		} else if (cardNumber.value.match(mastercardPattern)) {
			questionImg.style.display = "none";
			console.log("matchMaster");
			console.log(masterCardImg);
			masterCardImg.style.display = "block";
			visaImg.style.display = "none";
		}
	}
});
// Card Expiration Date
ccExpiration.addEventListener("input", function () {
	reverseAnimation();
	if (ccExpiration.value.length == 2) {
		ccExpiration.value += "/";
	} else if (ccExpiration.value.length == 4) {
		ccExpiration.value == ccExpiration.value;
	}
	cardExpDate.textContent = ccExpiration.value;
});
// Reverse Card Animaiton
function reverseAnimation() {
	backCard.style.animation = "cardAnimationReverse 1s forwards";
	frontCard.style.animation = "cardAnimationfrontReverse 2s forwards";
}

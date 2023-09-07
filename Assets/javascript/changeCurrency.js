const currency = document.getElementById("currency");
const originalPrices = [];
document.addEventListener("DOMContentLoaded", function() {
    let productCards = document.querySelectorAll(".productCard");
    storeOrginalPrice(productCards);
    changeCurrency(currency);
});
// API
async function fetchExchangeRates() {
	// New Api For test
	// https://api.currencyapi.com/v3/latest?apikey=cur_live_dYzgfLQHA87DUaN7GENi9XWwIIm4SKzCzaT3NkGt
	const response = await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_ivEkhCs0xMvwRdzUPBHx5uZ5DokxDsbutb40zLIS");
	const data = await response.json();
	return data;
}
// Store Orginal Price Function
function storeOrginalPrice(producsArray){
	producsArray.forEach(product => {
		const priceElement = product.querySelector(".price");
		originalPrices.push((priceElement.textContent));
	});
}
// Change Currency Function
async function changeCurrency(currency){
	const exchangeRates = await fetchExchangeRates();
	productCards = document.querySelectorAll(".productCard");
	currency.addEventListener("change", function() {
		if (currency.value == "Egy") {
			productCards.forEach((product, index) => {
				if(product.dataset.discount){
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelectorAll(".priceSign");
					priceSign.forEach(sign => {
						sign.textContent = " EGP";
					});
					const originalPrice = originalPrices[index];
					let afterChange = originalPrice
					let discount = (afterChange * product.dataset.discount)
					let newPrice = (afterChange - discount);
					priceElement[0].textContent = afterChange;
					priceElement[1].textContent = newPrice;
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " EGP";
					const originalPrice = originalPrices[index];
					let newPrice = originalPrice;
					priceElement.forEach(element => {
						element.textContent = newPrice;
					});
				}
			});
		}
		if (currency.value == "dolar") {
			productCards.forEach((product, index) => {
				if(product.dataset.discount){
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelectorAll(".priceSign");
					priceSign.forEach(sign => {
						sign.textContent = " $";
					});
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					let discount = (originalPrice * product.dataset.discount)
					let newPrice = (originalPrice - discount);
					priceElement[0].textContent = originalPrice.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " $";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					priceElement.forEach(element => {
						element.textContent = originalPrice.toFixed(2);
					});
				}
			});
		}
		if (currency.value == "Euro") {
			productCards.forEach((product, index) => {
				if(product.dataset.discount){
					const priceElement = product.querySelectorAll(".price");
					console.log(priceElement);
					const priceSign = product.querySelectorAll(".priceSign");
					priceSign.forEach(sign => {
						sign.textContent = " €";
					});
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					let afterChange = (originalPrice / exchangeRates.data.EUR.value)
					let discount = (afterChange * product.dataset.discount)
					let newPrice = (afterChange - discount);
					priceElement[0].textContent = afterChange.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " €";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					let newPrice = (originalPrice / exchangeRates.data.EUR.value);
					priceElement.forEach(element => {
						element.textContent = newPrice.toFixed(2);
					});
				}
			});
		}
		if (currency.value == "CAD") {
			productCards.forEach((product, index) => {
				if(product.dataset.discount){
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelectorAll(".priceSign");
					priceSign.forEach(sign => {
						sign.textContent = " c$";
					});
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					let afterChange = (originalPrice / exchangeRates.data.CAD.value)
					let discount = (afterChange * product.dataset.discount)
					let newPrice = (afterChange - discount);
					priceElement[0].textContent = afterChange.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " c$";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.data.EGP.value
					let newPrice = originalPrice / exchangeRates.data.CAD.value;
					priceElement.forEach(element => {
						element.textContent = newPrice.toFixed(2);
					});
				}
			});
		}
	});
}


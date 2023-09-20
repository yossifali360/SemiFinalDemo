const currency = document.getElementById("currency");
const originalPrices = [];
document.addEventListener("DOMContentLoaded", function() {
    let productCards = document.querySelectorAll(".productCard");
    storeOrginalPrice(productCards);
    changeCurrency(currency);
});
// API
async function fetchExchangeRates() {
	// Mail & Pass = 2513eed2f3@emailboxa.online
	// https://billing.currencyfreaks.com/
	const response = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=4e4cbf8bdd764f7599905593d468f6c0");
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
					originalPrice = originalPrice/exchangeRates.rates.EGP
					let discount = (originalPrice * product.dataset.discount)
					let newPrice = (originalPrice - discount);
					priceElement[0].textContent = originalPrice.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " $";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.rates.EGP
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
					const priceSign = product.querySelectorAll(".priceSign");
					priceSign.forEach(sign => {
						sign.textContent = " €";
					});
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.rates.EGP
					let afterChange = (originalPrice / exchangeRates.rates.EUR)
					let discount = (afterChange * product.dataset.discount)
					let newPrice = (afterChange - discount);
					priceElement[0].textContent = afterChange.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " €";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.rates.EGP
					let newPrice = (originalPrice / exchangeRates.rates.EUR);
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
					originalPrice = originalPrice/exchangeRates.rates.EGP
					let afterChange = (originalPrice / exchangeRates.rates.CAD)
					let discount = (afterChange * product.dataset.discount)
					let newPrice = (afterChange - discount);
					priceElement[0].textContent = afterChange.toFixed(2);
					priceElement[1].textContent = newPrice.toFixed(2);
				}else{
					const priceElement = product.querySelectorAll(".price");
					const priceSign = product.querySelector(".priceSign");
					priceSign.textContent = " c$";
					let originalPrice = originalPrices[index];
					originalPrice = originalPrice/exchangeRates.rates.EGP
					let newPrice = originalPrice / exchangeRates.rates.CAD;
					priceElement.forEach(element => {
						element.textContent = newPrice.toFixed(2);
					});
				}
			});
		}
	});
}
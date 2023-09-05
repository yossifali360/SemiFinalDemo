const originalPrices = [];
document.addEventListener("DOMContentLoaded", function() {
    let productCards = document.querySelectorAll(".productCard");
    storeOrginalPrice(productCards);
    changeCurrency(currency);
});

// Store Orginal Price Function
function storeOrginalPrice(producsArray){
	producsArray.forEach(product => {
		const priceElement = product.querySelector(".price");
		originalPrices.push((priceElement.textContent));
	});
}

// Change Currency Function
function changeCurrency(currency){
	productCards = document.querySelectorAll(".productCard");
	currency.addEventListener("change", function() {
		if (currency.value == "Egy") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " EGP";
				priceElement.textContent = originalPrices[index];
			});
		}
		if (currency.value == "dolar") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " $";
				const originalPrice = originalPrices[index];
				let newPrice = (originalPrice / 30.84);
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
		if (currency.value == "Euro") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " €";
				const originalPrice = originalPrices[index];
				let newPrice = originalPrice / 33.59;
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
		if (currency.value == "CAD") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " c$";
				const originalPrice = originalPrices[index];
				let newPrice = originalPrice / 22.73;
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
	});
}


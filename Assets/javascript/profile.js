// Variables
const uploadBtn = document.getElementById("upload");
const fileUpload = document.getElementById("file-upload");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const Address = document.getElementById("Address");
const Update = document.getElementById("Update");
const imagePreviewElement = document.querySelector("#preview-selected-image");

// Load Input Data
let url = "";
fName.value = getSessionData().fName;
lName.value = getSessionData().lName;
email.value = getSessionData().email;
Address.value = getSessionData().Address;

// Load and Upload Image
fileUpload.addEventListener("change", function () {
	const fr = new FileReader();
	fr.readAsDataURL(fileUpload.files[0]);
	fr.addEventListener("load", function () {
		url = fr.result;
		imagePreviewElement.src = url;
		imagePreviewElement.style.display = "block";
		uploadBtn.textContent = "Change Image";
		Update.addEventListener("click", function (e) {
			e.preventDefault();
			let userData = signUpData().find(
				(user) => user.email.toLowerCase() === email.value.toLowerCase()
			);
			userData.imageSrc = url;
			let filterSignUpData = signUpData().filter(
				(user) => user.email !== email.value
			);
			let newSignUpData = [...filterSignUpData, userData];
			localStorage.setItem("signUpData", JSON.stringify(newSignUpData));
			let session = {
				fName: fName.value,
				lName: lName.value,
				email: email.value,
				Address: Address.value,
				imageSrc: url,
				Role: getSessionData().Role,
			};
			localStorage.setItem("session", JSON.stringify(session));
			Toast.fire({
				icon: "success",
				title: `Data Updated Successfuly`,
			});
			checkLogin();
			CheckUserImage();
		});
	});
});

updateData();

// Update Data Function
function updateData() {
	Update.addEventListener("click", function () {
		let userData = signUpData().find(
			(user) => user.email.toLowerCase() === email.value.toLowerCase()
		);
		let filterSignUpData = signUpData().filter(
			(user) => user.email !== email.value
		);
		let newSignUpData = [...filterSignUpData, userData];
		localStorage.setItem("signUpData", JSON.stringify(newSignUpData));
		let session = {
			fName: fName.value,
			lName: lName.value,
			email: email.value,
			Address: Address.value,
			imageSrc: getSessionData().imageSrc,
			Role: getSessionData().Role,
		};
		localStorage.setItem("session", JSON.stringify(session));
		Toast.fire({
			icon: "success",
			title: `Data Updated Successfuly`,
		});
		checkLogin();
		CheckUserImage();
	});
}
// Set User Image
if (getSessionData().imageSrc !== "") {
	imagePreviewElement.src = getSessionData().imageSrc;
	imagePreviewElement.style.display = "block";
	uploadBtn.textContent = "Change Image";
}
//  Get Sign Up Data Function
function signUpData() {
	return JSON.parse(localStorage.getItem("signUpData"));
}
//  Get Session Data Function
function getSessionData() {
	return JSON.parse(localStorage.getItem("session"));
}
// Import From Another Js Files
import { checkLogin, CheckUserImage } from "./global.js";

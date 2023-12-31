import { users } from "./Accounts.js";
const signUp = document.querySelector(".signUp");
const login = document.querySelector(".container .login");
const slide = document.querySelector(".slide");
const slideH3 = document.querySelector(".slide h3");
const slidep = document.querySelector(".slide p");
const slidesignUpBtn = document.getElementById("slidesignUpBtn");
const slideLoginBtn = document.getElementById("slideLoginBtn");
const signUpEmail = document.querySelector(".signUp .email input");
const signUpBtn = document.getElementById("signUpBtn");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const loginEmail = document.getElementById("loginEmail");
const loginBtn = document.getElementById("loginBtn");
const signUpArray = JSON.parse(localStorage.getItem("signUpData")) ?? users;
// signUp Pass1
const signUpPass1Eye = document.querySelector(".pass1 .fa-eye");
const signUpPass1EyeSlach = document.querySelector(".pass1 .fa-eye-slash");
const signUpPass = document.getElementById("signUpPass");
showAndHidePass(signUpPass1Eye, signUpPass1EyeSlach, signUpPass);
// signUp Pass2
const signUpPass2Eye = document.querySelector(".pass2 .fa-eye");
const signUpPass2EyeSlach = document.querySelector(".pass2 .fa-eye-slash");
const signUpPass2 = document.getElementById("signUpPass2");
showAndHidePass(signUpPass2Eye, signUpPass2EyeSlach, signUpPass2);
// Login Pass
const loginEye = document.querySelector(".login .fa-eye");
const loginEyesSlash = document.querySelector(".login .fa-eye-slash");
const loginPass = document.getElementById("pass");
showAndHidePass(loginEye, loginEyesSlash, loginPass);
// Function To Show And Hide Pass
function showAndHidePass(eye, eyeSlach, pass) {
	eye.addEventListener("click", function () {
		eye.style.display = "none";
		eyeSlach.style.display = "block";
		pass.type = "text";
	});
	eyeSlach.addEventListener("click", function () {
		eyeSlach.style.display = "none";
		eye.style.display = "block";
		pass.type = "password";
	});
}
// Click on signup Button
slidesignUpBtn.addEventListener("click", function () {
	resetLoginInputs();
	slide.style.left = "50%";
	slidesignUpBtn.style.display = "none";
	slideLoginBtn.style.display = "block";
	slide.style.animation = "load 2s";
	setTimeout(function () {
		(slide.style.animationName = ""),
			(signUp.style.opacity = "1"),
			(login.style.opacity = "0");
	}, 2000);
	slideH3.textContent = "Already a member ?";
	slidep.textContent = "We are happy to see you again !";
});
// Click on Login Button
slideLoginBtn.addEventListener("click", function () {
	resetSignupInputs();
	loginBtnClick();
});
function loginBtnClick() {
	slide.style.left = "0";
	slideLoginBtn.style.display = "none";
	slidesignUpBtn.style.display = "block";
	slideH3.textContent = "Not a member ?";
	slidep.textContent = "You can sign up and be one of our family";
	slide.style.animation = "load 2s";
	setTimeout(function () {
		(slide.style.animationName = ""),
			(signUp.style.opacity = "0"),
			(login.style.opacity = "1");
	}, 2000);
}
// Call Function to Return Border Color To Black
changeInputBorder(signUpPass);
changeInputBorder(signUpPass2);
changeInputBorder(signUpEmail);
changeInputBorder(fName);
changeInputBorder(lName);
// Call Function To Validate Form when click signup
formValidate(signUpEmail, signUpPass, signUpPass2, fName, lName);
// Function to return border color to black
function changeInputBorder(item) {
	item.addEventListener("input", function () {
		item.style.border = "black 2px solid";
	});
}
// Function To validate form
function formValidate(mail__Input, signUpPass, signUpPass2, fName, lName) {
	signUpBtn.addEventListener("click", function () {
		let mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
		if (
			signUpPass.value == "" ||
			signUpPass2.value == "" ||
			mail__Input.value == "" ||
			fName.value == "" ||
			lName.value == ""
		) {
			Swal.fire(
				"Data Not Completely filled",
				"Please Fill Data Completely",
				"error"
			);
			let inputList = [
				mail__Input,
				signUpPass,
				signUpPass2,
				fName,
				lName,
			];
			inputList.forEach((item) => {
				if (item.value == "") {
					item.style.border = "2px solid red";
				}
			});
		} else if (
			signUpPass.value != signUpPass2.value &&
			!mail__Input.value.match(mailformat)
		) {
			Swal.fire(
				"Password don't match & Email not Valid",
				"Please Make Sure That Password and Confirm Password matches & Type email in a correct way",
				"error"
			);
			mail__Input.style.border = "red 2px solid";
			signUpPass.style.border = "2px solid red";
			signUpPass2.style.border = "2px solid red";
		} else if (!mail__Input.value.match(mailformat)) {
			mail__Input.style.border = "red 2px solid";
			Swal.fire(
				"Email not vaild!",
				"Please Type email in a correct way",
				"error"
			);
		} else if (mail__Input.value.match(mailformat)) {
			if (
				signUpArray.find(
					(user) =>
						user.email.toLowerCase() ==
						mail__Input.value.toLowerCase()
				)
			) {
				Toast.fire({
					icon: "error",
					title: "Email Already Used !, <br>  Please sign in",
				});
			} else {
				if (signUpPass.value != signUpPass2.value) {
					signUpPass.style.border = "2px solid red";
					signUpPass2.style.border = "2px solid red";
					Swal.fire(
						"Password don't match",
						"Please Make Sure That Password and Confirm Password matches",
						"error"
					);
				} else {
					if (signUpPass.value == signUpPass2.value) {
						if (signUpPass.value.length >= 6) {
							var signUpData = "";
							var signUpData = {
								fName: fName.value,
								lName: lName.value,
								email: signUpEmail.value,
								pass: signUpPass.value,
								imageSrc: "",
								Address: "",
								Status: "Active",
								Role: "Member",
							};
							signUpArray.push(signUpData);
							signUpSetData(signUpArray);
							resetSignupInputs();
							Toast.fire({
								icon: "success",
								title: "Account Created, <br>  Now you can sign in",
							});
							if (window.innerWidth <= 992) {
								signUp.style.opacity = "0";
								setTimeout(function () {
									signUp.style.display = "none";
									login.style.display = "flex";
									login.style.opacity = "1";
								}, 2000);
							} else {
								loginBtnClick();
							}
						} else {
							Toast.fire({
								icon: "error",
								title: "Choose A Storng Password ! <br> (must be greater than 6 inputs)",
							});
							signUpPass.style.border = "2px solid red";
							signUpPass2.style.border = "2px solid red";
						}
					}
				}
			}
		}
	});
}

function resetLoginInputs() {
	loginEmail.value = "";
	loginPass.value = "";
}
function resetSignupInputs() {
	fName.value = "";
	lName.value = "";
	signUpEmail.value = "";
	signUpPass.value = "";
	signUpPass2.value = "";
}
// Responsive Design
const newMember = document.querySelector(".newMember a");
const oldMember = document.querySelector(".oldMember a");
newMember.addEventListener("click", function () {
	resetLoginInputs();
	login.style.opacity = "0";
	setTimeout(function () {
		login.classList.remove = "d-flex";
		login.classList.add = "d-flex";
		login.style.display = "none";
		signUp.style.setProperty("display", "block", "important");
	}, 1000);
	setTimeout(function () {
		signUp.style.opacity = "1";
	}, 1000);
});
oldMember.addEventListener("click", function () {
	resetSignupInputs();
	signUp.style.opacity = "0";
	setTimeout(function () {
		signUp.style.setProperty("display", "none", "important");
		login.style.setProperty("display", "flex", "important");
	}, 1000);
	setTimeout(function () {
		login.style.opacity = "1";
	}, 1000);
});
// Store sign up and login data
function signUpSetData(signUpData) {
	localStorage.setItem("signUpData", JSON.stringify(signUpData));
}
function loginGetData() {
	return JSON.parse(localStorage.getItem("signUpData"));
}

loginBtn.addEventListener("click", function () {
	let userEmail = loginEmail.value;
	let userPass = pass.value;
	let loginObject = "";
	loginValidate();
	function loginValidate() {
		if (
			loginGetData().find(
				(data) => data.email.toLowerCase() == userEmail.toLowerCase()
			)
		) {
			loginObject = loginGetData().find(
				(data) => data.email.toLowerCase() == userEmail.toLowerCase()
			);
			if (loginObject.Status == "Active") {
				validatePass();
			} else {
				Toast.fire({
					icon: "error",
					title: 'Your Account is Suspended !  <a href="contactus.html">Contact us</a>',
				});
			}
		} else {
			Toast.fire({
				icon: "error",
				title: "Wrong Mail",
			});
		}
		function validatePass() {
			if (loginObject.pass == userPass) {
				if (loginObject.Role == "Member") {
					localStorage.setItem(
						"session",
						JSON.stringify(loginObject)
					);
					const urlParameter = new URLSearchParams(
						window.location.search
					);
					const redirect = urlParameter.get("redirect");
					if (redirect == "checkout") {
						location.href = "checkout.html";
					} else {
						location.href = "index.html";
					}
				} else {
					location.href = "dash.html";
					localStorage.setItem(
						"session",
						JSON.stringify(loginObject)
					);
				}
			} else {
				Toast.fire({
					icon: "error",
					title: "Wrong Password",
				});
			}
		}
	}
});

document.getElementById("liveToastBtn").addEventListener("click", function () {
	var liveToast = new bootstrap.Toast(document.getElementById("liveToast"));
	liveToast.show();
	setTimeout(function () {
		liveToast.hide();
	}, 7000);
});
const urlParameter = new URLSearchParams(window.location.search);
const redirect = urlParameter.get("redirect");
if (redirect == "checkout") {
	document.addEventListener("DOMContentLoaded", function () {
		const liveToastBtn = document.getElementById("liveToastBtn");
		liveToastBtn.click();
		const orderHistory = document.querySelector(".orderHistory");
		orderHistory.style.border = "red 1px solid";
	});
}

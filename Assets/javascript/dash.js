let productCount = document.querySelector(".productCount");
let usersCount = document.querySelector(".usersCount");
let signUpData = JSON.parse(localStorage.getItem("signUpData"));
const productsTable = document.querySelector(".productsTable");
const usersTable = document.querySelector(".usersTable");
let data = JSON.parse(localStorage.getItem("products"));
const members = document.querySelector(".members");
const AddProductDiv = document.querySelector(".AddProductDiv")
const addNewProductBtn = document.querySelector(".addNewProductBtn");
let linkInputCount = document.querySelectorAll(".link");
let membersList = [];
let newProductData = []
const admins = document.querySelector(".admins");
let adminsList = [];
let images = [];

// Display Products
displayProducts()

// User Count
usersCount.textContent = signUpData.length;

// Display Accounts
signUpData.forEach(user => {
    if (user.Role != "Admin"){
        membersList.push(user)
    }
    else{
        adminsList.push(user)
    }
});

// Display Admin Data
adminsList.forEach(admin => {
    usersTable.innerHTML += displayAdminData(admin)
});

// Display Members Data
membersList.forEach(member => {
    usersTable.innerHTML += displayUsersData(member);
});

// Account Status
const updateBtn = document.querySelectorAll(".updateUserBtn")
updateBtn.forEach(btn => {
    btn.addEventListener("click",function(){
        const parent = btn.closest("tr");
        const select = parent.querySelector("select")
        let userMail = parent.dataset.mail;
        let searchUser = signUpData.find((user) => user.email == userMail);
        searchUser.Status = select.value;
        var filterUsersData = signUpData.filter(user => user.email !== userMail);
        var newSignUpData = [...filterUsersData,searchUser]
        localStorage.setItem("signUpData", JSON.stringify(newSignUpData));
        Toast.fire({
            icon: 'success',
            title: 'Account status updated'
          })
    })
});

// Change Display of Add product Div
addNewProductBtn.addEventListener("click",function(){
    AddProductDiv.style.display="block";
    addNewProductBtn.style.display="none";
})

// links variables
const moreLink = document.getElementById("moreLink");
const links = document.querySelector(".links");
const removeLink = document.getElementById("removeLink");
let linkCount = document.querySelectorAll(".link");

// Add Link
moreLink.addEventListener("click",function(){
    if(linkCount.length<2){
        createDiv()
        linkCount = document.querySelectorAll(".link");
        removeLink.style.visibility=("visible")
    }else{
        createDiv()
        linkCount = document.querySelectorAll(".link");
        moreLink.style.display="none"
    }
})

// Remvove Link
removeLink.addEventListener("click", function(){
    let lastLink = linkCount[linkCount.length - 1];
    moreLink.style.display="inline-block"
    lastLink.remove();
    linkCount.length-=1;
    selectLinks();
    if (linkCount.length==1){
    removeLink.style.visibility=("hidden");
    }
}); 

// Add Products
let idCounter = (data[data.length-1].id)+1;
const newProductName = document.getElementById("productNameInput");
const newProductPrice = document.getElementById("productPriceInput");
const newProductStock = document.getElementById("productStockInput");
const newProductCategory = document.getElementById("productCategoryInput");
const newProductBrand = document.getElementById("productBrandInput");
const newProductDesc = document.getElementById("productDescInput");
const newProductAdd = document.getElementById("addBtn");
let inputs = [newProductName,newProductPrice,newProductStock,newProductCategory,newProductBrand,newProductDesc]

newProductAdd.addEventListener("click",function(){
    let linkValue = document.querySelectorAll(".link input");
    let productImages = [];
    for (let i = 0; i < linkValue.length; i++) {
        newProductData.images.push(linkValue[i].value);
    }
    newProductDataFunction(idCounter,productImages);
    data.push(newProductData)
    displayProducts()
    setProductsData();
    idCounter = (data[data.length-1].id)+1;
})

// Delete Products
const deleteProduct = document.querySelectorAll(".deleteProduct")

deleteProduct.forEach(deletebtn => {
    deletebtn.addEventListener("click",function(){
        const parent = deletebtn.closest("tr");
        let productId = parent.dataset.id;
        parent.remove()
        data = data.filter(item => item.id != productId);
        setProductsData();
        productCount.textContent=data.length;
    })
});

// Edit Products
const editProduct = document.querySelectorAll(".editProduct")
const updateProductBtn = document.getElementById("updateProductBtn")

editProduct.forEach(item => {
    item.addEventListener("click",function(){
        AddProductDiv.style.display="block"
        const parent = item.closest("tr")
        const productId = parent.dataset.id;
        let productObject = data.find((product) => product.id == productId);
        linkInputCount = document.querySelectorAll(".link")
        linkInputCount.forEach(link => {
            link.remove()
        });
        removeInputsValue()
        updateProductBtn.style.display="inline-block"
        window.scrollTo({top: 192 , behavior: "smooth"});
        editBtnProductData(productObject);
        newProductAdd.style.display="none";
        let test = productObject.images;
        test.forEach(function() {
            createDiv()
        });
        linkInputCount = document.querySelectorAll(".link input")
        linkInputCount.forEach(function(link,index) {
            link.value=productObject.images[index]
            linkInputCount.length
        });
        addNewProductBtn.style.display="none";
        updateProduct(productId);
    })
});

// Orders
const ordersData = document.querySelector(".ordersData");
const ordersCount = document.querySelector(".ordersCount");
ordersCount.textContent=getOrdersData().length;
getOrdersData().forEach(function(element,index){
    ordersData.innerHTML+=Order(index+1,element)
        element.cartItems.forEach(orderItem => {
            const test = ordersData.querySelectorAll(".productsFromOrder")
            test[index].innerHTML+=loadOrderProducts(orderItem)
        });
});

// Delete Account
const deleteUserBtn = document.querySelectorAll(".deleteUserBtn")
console.log(deleteUserBtn);
deleteUserBtn.forEach(deletebtn => {
    deletebtn.addEventListener("click",function(){
        const parent = deletebtn.closest("tr");
        let userEmail = parent.dataset.mail;
        parent.remove()
        signUpData = signUpData.filter(item => item.email != userEmail);
        setSignupData();
        usersCount.textContent = signUpData.length;
        members.textContent=membersList.length;
    })
});

// Functions

    // Update Product Data Function
    function updateProduct(productId){
        updateProductBtn.addEventListener("click",function(){
            imgUrl();
            newProductData = {
                id: productId,
                title: newProductName.value,
                price: newProductPrice.value,
                stock: newProductStock.value,
                category: newProductCategory.value,
                Brand: newProductBrand.value,
                description: newProductDesc.value,
                images: images
            };
            removeInputsValue()
            deleteLinkParent()
            data = data.filter(product => product.id != productId);
            data = [...data,newProductData]
            setProductsData();
            newProductAdd.style.display="inline-block";
            updateProductBtn.style.display="none";
            AddProductDiv.style.display="none";
            addNewProductBtn .style.display="block";
            
        })
    }
    // Delete Link Parent Function
    function deleteLinkParent(){
        let linkInputCountParent = document.querySelectorAll(".link")
        linkInputCountParent.forEach(link => {
            link.remove()
        });
    }
    // Remove inputs value Function
    function removeInputsValue(){
        inputs.forEach(input => {
            input.value=""
        });
    }
    // display members and admins count
    members.textContent=membersList.length;
    admins.textContent=adminsList.length;
    // Display Admin Data Function
    function displayAdminData(admin){
        return`
        <tr data-mail="${admin.email}" class="bg-danger">
        <td class="bg-danger text-dark">${admin.fName + " " + admin.lName}</td>
        <td class="bg-danger text-dark">${admin.email}</td>
        <td class="bg-danger">
            <select name="Status" class="form-select bg-danger">
                <option value="" disabled selected hidden>Active</option>
            </select>
        </td>
        <td class="bg-danger"><button class="btn btn-danger updateUserBtn disabled">Update</button></td>
        <td class="bg-danger"><button class="btn btn-danger deleteUserBtn" disabled>Delete</button></td>
    </tr>`
    }
    // Display Users Data Function
    function displayUsersData(user){
        return`
        <tr data-mail="${user.email}">
        <td class="text-dark">${user.fName + " " + user.lName}</td>
        <td class="text-dark">${user.email}</td>
        <td>
            <select name="Status" class="form-select">
                <option value="" disabled selected hidden>${user.Status}</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
            </select>
        </td>
        <td><button class="btn btn-danger updateUserBtn">Update</button></td>
        <td><button class="btn btn-danger deleteUserBtn">Delete</button></td>
    </tr>`
    }
    // Display Products Data Function
    function displayProducts(){
        productCount.textContent=data.length;
    let productsData="";
    data.forEach(product => {
        productsData+=loadProductData(product)
    });
    productsTable.innerHTML= productsData;
    }
    // load Products Data Function
    function loadProductData(product){
        return`
        <tr class data-id="${product.id}">
            <td class="productTitle">${product.title}</td>
            <td class="p-0"><button class="btn btn-success w-100 h-100 editProduct">Edit</button></td>
            <td class="p-0"><button class="btn btn-danger w-100 h-100 deleteProduct">Delete</button></td>
        </tr>`
    }
    // load Parent Orders Data Function
    function Order(index,element){
        return`<div class="data my-4">
        <div class="container">
        <h4>Order #${index} Details</h4>
        <div class="productsFromOrder">
        </div>
        <div class="d-flex align-items-center flex-column flex-md-row justify-content-between mx-4>
        <span class="text-Dark">Order by : ${element.email}</span>
        <span class="text-muted">Date of order : ${element.time}</span>
        <span class="text-muted">Order Total price : ${element.totalPrice}</span>
        </div>
        </div>
    </div>
    <hr>`
    }
    // Get Orders Data Function
    function getOrdersData() {
        return JSON.parse(localStorage.getItem("AllOrders"));
    }
    // Get Orders Data Function
    function loadOrderProducts(item){
        return `<div class="card m-2">
        <div class="itemCtn p-4" data-id="${item.id}">
            <div class="item d-flex align-items-center justify-content-between flex-column flex-sm-row">
                <div class="d-flex align-items-center gap-4 w-100 flex-column flex-sm-row">
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
    // Get Session Data Function
    function getSessionData () {
        return JSON.parse(localStorage.getItem("session"));
    }
    // Set Product Data Function
    function setProductsData(){
        localStorage.setItem("products", JSON.stringify(data));
    }
    // Set SignUp Data Function
    function setSignupData(){
        localStorage.setItem("signUpData", JSON.stringify(signUpData));
    }
    // New Product Data Function
    function newProductDataFunction(imgs,idVar){
        newProductData = {
        id: idVar,
        title: newProductName.value,
        price: newProductPrice.value,
        stock: newProductStock.value,
        category: newProductCategory.value,
        Brand: newProductBrand.value,
        description: newProductDesc.value,
        images: imgs
    };
    }
    // Edit Btn Product Data Function
    function editBtnProductData(productObject){
        newProductName.value= productObject.title;
        newProductPrice.value= productObject.price;
        newProductStock.value= productObject.stock;
        newProductCategory.value= productObject.category;
        newProductBrand.value= productObject.Brand;
        newProductDesc.value= productObject.description;
    }
    // Add Link Function
    function createDiv(){
        const newLink = document.createElement("div");
        newLink.classList.add("input","link")
        newLink.innerHTML = createLink();
        links.appendChild(newLink);
    }
    // Create Link Function
    function createLink(){
            return `<label for="link">Insert Image Link:</label>
            <input type="text" placeholder="Put Link Here" class="form-control mb-3" />
            `;
    }
    // Count Links Function
    function selectLinks(){
        return linkCount = document.querySelectorAll(".link")
    }
    // Img Url Function
    function imgUrl() {
        images = [];
        linkInputCount.forEach(function(link) {
            images.push(link.value);
        });
        console.log(images);
    }
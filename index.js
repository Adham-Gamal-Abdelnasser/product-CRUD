let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let messageInput = document.getElementById("messageInput");
let productContainer = [];
let addBtn = document.getElementById("addBtn")
if (localStorage.getItem("store") != null) {
  productContainer = JSON.parse(localStorage.getItem("store"));
  displayProducts();
}
function addProduct() {
  let productObject = {
    label: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    message: messageInput.value,
  };
  productContainer.push(productObject);
  saveToLocalStorage();
  displayProducts();
  clearInputs();
}
function displayProducts() {
  let cartoona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    cartoona += `<div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card h-100 bg-dark bg-opacity-75 text-white text-capitalize">
      <div class="card-body">
        <h5 class="card-title">${productContainer[i].label}</h5>
        <p class="lead fs-6">${productContainer[i].category}</p>
        <p class="card-text">${productContainer[i].message}</p>
        <button onclick="deleteOne(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> DELETE</button>
        <p class="card-subtitle text-success text-end ">${productContainer[i].price} <span class="fa-solid fa-cart-shopping"></span></p>
      </div>
    </div>
</div>`;
    document.getElementById("productsView").innerHTML = cartoona;
  }
}
function deleteOne(index) {
  productContainer.splice(index, 1);
  saveToLocalStorage();
  displayProducts();
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  messageInput.value = "";
}
function search(searchInput) {
  let box = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].label
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    ) {
      box += `<div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card h-100 text-white text-capitalize bg-dark bg-opacity-75">
        <div class="card-body">
          <h5 class="card-title">${productContainer[i].label.replace(
            searchInput,
            `<span class="text-danger">${searchInput}</span>`
          )}</h5>
          <p class="lead fs-6">${productContainer[i].category}</p>
          <p class="card-text">${productContainer[i].message}</p>
          <button onclick="deleteOne(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> DELETE</button>
          <p class="card-subtitle text-success text-end ">${
            productContainer[i].price
          } <span class="fa-solid fa-cart-shopping"></span></p>
        </div>
      </div>
  </div>`;
      document.getElementById("productsView").innerHTML = box;
    }
  }
}
function saveToLocalStorage() {
  localStorage.setItem("store", JSON.stringify(productContainer));
}

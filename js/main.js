let products = [];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data
        uploadProducts(products);
    })

const productContainer = document.querySelector("#product-container")
const buttonCategory = document.querySelectorAll(".category-button")
const mainTitle = document.querySelector("#main-title")
let addButton = document.querySelectorAll(".add-product")
const number = document.querySelector("#number")

function uploadProducts(selectedProducts) {

    productContainer.innerHTML = "";
    
    selectedProducts.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
               <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-product" id="${product.id}">Add to cart</button>
               </div>
        `;

        productContainer.append(div);
    });

    updateAddButton();

}



buttonCategory.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonCategory.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "all"){
            const categoryProduct = products.find(product => product.category.id === e.currentTarget.id);
            mainTitle.innerText = categoryProduct.category.nam;
            const buttonProducts = products.filter(product => product.category.id === e.currentTarget.id);

            uploadProducts(buttonProducts);
        }else {
            mainTitle.innerText = "All products";
            uploadProducts(products);
        }
    })
})

function updateAddButton() {
    addButton = document.querySelectorAll(".add-product");

    addButton.forEach(button => {
        button.addEventListener("click", addToCart);
    })
}
let productInCart;

let productInCartLS = localStorage.getItem("product-In-Cart");

if(productInCartLS) {
    productInCart = JSON.parse(productInCartLS)
    updateNumber();
} else {
    productInCart = []
}


function addToCart(e) {
    Toastify({
        text: "Product added",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #16C47F,rgb(133, 208, 171))",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    const idButton = e.currentTarget.id;
    const addedProducts = products.find(product => product.id === idButton);

    if(productInCart.some(product => product.id === idButton)){
        const index = productInCart.findIndex(product => product.id === idButton)
        productInCart[index].quantity++;
        
    }else {
        addedProducts.quantity = 1;
        productInCart.push(addedProducts);
    }
    updateNumber();

    localStorage.setItem("product-In-Cart",JSON.stringify(productInCart));
}

function updateNumber() {
    let incrementedNumber = productInCart.reduce((acc, product) => acc + product.quantity,0);
    number.innerText = incrementedNumber;
    
}

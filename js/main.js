const products = [
    {
        id: "oakley-01",
        title : "Oakley T-shirt",
        image: "./img/Oakley/Oakley-one.jpg",
        category: {
            nam: "Oakley",
            id: "Oakley"
        },
        price: 95000
    },
    {
        id: "oakley-02",
        title : "Oakley T-shirt",
        image: "./img/Oakley/Oakley-two.jpg",
        category: {
            nam: "Oakley",
            id: "Oakley"
        },
        price: 90000
    },
    {
        id: "oakley-03",
        title : "Oakley T-shirt",
        image: "./img/Oakley/Oakley-three.jpg",
        category: {
            nam: "Oakley",
            id: "Oakley"
        },
        price: 95000
    },
    {
        id: "oakley-04",
        title : "Oakley T-shirt",
        image: "./img/Oakley/Oakley-four.jpg",
        category: {
            nam: "Oakley",
            id: "Oakley"
        },
        price: 95000
    },
    {
        id: "quiksilver-01",
        title : "Quiksilver T-shirt",
        image: "./img/Quiksilver/Quiksilver-one.jpg",
        category: {
            nam: "Quiksilver",
            id: "Quiksilver"
        },
        price: 90000
    },
    {
        id: "quiksilver-02",
        title : "Quiksilver T-shirt",
        image: "./img/Quiksilver/Quiksilver-two.jpg",
        category: {
            nam: "Quiksilver",
            id: "Quiksilver"
        },
        price: 90000
    },
    {
        id: "quiksilver-03",
        title : "Quiksilver T-shirt",
        image: "./img/Quiksilver/Quiksilver-three.jpg",
        category: {
            nam: "Quiksilver",
            id: "Quiksilver"
        },
        price: 90000
    },
    {
        id: "alpinestars-01",
        title : "AlpineStars T-shirt",
        image: "./img/AlpineStars/AlpineStars-one.jpg",
        category: {
            nam: "AlpineStars",
            id: "AlpineStars"
        },
        price: 85000
    },
    {
        id: "alpinestars-02",
        title : "AlpineStars T-shirt",
        image: "./img/AlpineStars/AlpineStars-two.jpg",
        category: {
            nam: "AlpineStars",
            id: "AlpineStars"
        },
        price: 90000
    },
]

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

uploadProducts(products);

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

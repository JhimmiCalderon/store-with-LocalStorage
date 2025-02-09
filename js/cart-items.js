let productInCart = JSON.parse(localStorage.getItem("product-In-Cart"));


const emptyCart = document.querySelector("#empty-cart");
const cartProducts = document.querySelector("#cart-products");
const cartActions = document.querySelector("#cart-actions")
const purchaseCart = document.querySelector("#purchase-cart");
let deleteButton = document.querySelectorAll(".cart-product-delete")
const emptyButton = document.querySelector("#cart-empty-cart")
const  total = document.querySelector("#total")
const purchaseButton = document.querySelector("#cart-actions-buy")

function loadProducts() {

    if(productInCart && productInCart.length > 0) {

        emptyCart.classList.add("disabled");
        cartProducts.classList.remove("disabled");
        cartActions.classList.remove("disabled");
        purchaseCart.classList.add("disabled");
    
        cartProducts.innerHTML = "";
    
        productInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("cart-product")
            div.innerHTML = `
            
            <img class="cart-product-image" src="${product.image}" alt="${product.title}">
              <div class="cart-product-title">
                  <small>Title</small>
                  <h3>${product.title}</h3>
              </div>
              <div class="cart-product-quantity">
                  <small>Quantity</small>
                  <p>${product.quantity}</p>
              </div>
              <div class="cart-product-price">
                  <small>Price</small>
                  <p>$${product.price }</p>
              </div>
              <div class="cart-product-subtotal">
                  <small>Subtotal</small>
                  <p>$${product.price * product.quantity}</p>
              </div>
              <button id="${product.id}" class="cart-product-delete"><i class="bi bi-trash-fill"></i></button>
            `;
    
            cartProducts.append(div);
        })
        
    
    } else {
    
        emptyCart.classList.remove("disabled");
        cartProducts.classList.add("disabled");
        cartActions.classList.add("disabled");
        purchaseCart.classList.add("disabled");
    
    }
    updateAddButtonDelete();
    updateTotal();
    
}

loadProducts();

function updateAddButtonDelete() {
    deleteButton = document.querySelectorAll(".cart-product-delete");

    deleteButton.forEach(button => {
        button.addEventListener("click", deleteToCart);
    })
}

function deleteToCart(e) {
    Toastify({
        text: "Product Delete",
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
    let idButton = e.currentTarget.id;    
    const index = productInCart.findIndex(product => product.id === idButton)
    productInCart.splice(index,1)
    loadProducts();

    localStorage.setItem("product-In-Cart",JSON.stringify(productInCart))
}

emptyButton.addEventListener("click",emptyToCart);

function emptyToCart() {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to empty your cart? This action can't be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, empty the cart!"
      }).then((result) => {
        if (result.isConfirmed) {
            productInCart.length = 0
            localStorage.setItem("product-In-Cart",JSON.stringify(productInCart));
            loadProducts();
          Swal.fire({
            title: "Cart emptied!",
            text: "Your cart has been cleared.",
            icon: "success"
            
          });
        }
      });
      
   
}

function updateTotal() {
    const totalcalculate = productInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0)
    total.innerText = `$${totalcalculate}`
}

purchaseButton.addEventListener("click",purchaseCartButton);

function purchaseCartButton() {
    productInCart.length = 0
    localStorage.setItem("product-In-Cart",JSON.stringify(productInCart));
    
    emptyCart.classList.add("disabled");
    cartProducts.classList.add("disabled");
    cartActions.classList.add("disabled");
    purchaseCart.classList.remove("disabled");
}
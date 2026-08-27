/* =========================================
   CART DATA
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem(
            "parisaCart"
        )
    ) || [];



/* =========================================
   ELEMENTS
========================================= */

const cartItems =
    document.getElementById(
        "cart-items"
    );


const cartTotal =
    document.getElementById(
        "cart-total"
    );


const emptyCart =
    document.getElementById(
        "empty-cart"
    );


const cartSummary =
    document.getElementById(
        "cart-summary"
    );


const checkoutButton =
    document.getElementById(
        "checkout-button"
    );



/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(price);

}



/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "parisaCart",
        JSON.stringify(cart)
    );

}



/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(index) {

    cart.splice(
        index,
        1
    );


    saveCart();


    renderCart();

}



/* =========================================
   SHOW CART
========================================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (
        cart.length === 0
    ) {

        emptyCart.style.display =
            "block";


        cartSummary.style.display =
            "none";


        return;
    }


    emptyCart.style.display =
        "none";


    cartSummary.style.display =
        "block";


    let total = 0;


    cart.forEach(
        (item, index) => {


            total +=
                Number(
                    item.price
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "cart-item";


            row.innerHTML = `

                <img
                    class="cart-item-image"
                    src="image/${item.file}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Original artwork by Parisa
                    </p>

                </div>


                <div class="cart-item-price">

                    ${formatPrice(item.price)}

                </div>


                <button
                    class="remove-button"
                    data-index="${index}"
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(
                row
            );

        }
    );


    cartTotal.textContent =
        formatPrice(total);

}



/* =========================================
   REMOVE CLICK
========================================= */

cartItems.addEventListener(
    "click",
    event => {


        const button =
            event.target.closest(
                ".remove-button"
            );


        if (!button) {
            return;
        }


        removeItem(
            Number(
                button.dataset.index
            )
        );

    }
);



/* =========================================
   CHECKOUT
========================================= */

checkoutButton.addEventListener(
    "click",
    () => {


        if (
            cart.length === 0
        ) {

            alert(
                "Your cart is empty."
            );


            return;
        }


        alert(
            "The shopping cart is working. Secure payment will be connected next."
        );

    }
);



/* =========================================
   START
========================================= */

renderCart();
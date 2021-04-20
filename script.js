// alert("hey");

const cartIconEl = document.querySelector(".cart-icon");
const cartEl = document.querySelector(".cart");

cartIconEl.addEventListener("click", toggleMenu);

function toggleMenu(e) {
  cartEl.classList.toggle("show");
}
/* window.addEventListener("resize", reportWindowSize);
function reportWindowSize() {
  // Create a media condition that targets viewports at least 768px wide
  const mediaQuery500 = window.matchMedia("(min-width: 500px)");

  // Check if the media query is true
  if (mediaQuery500.matches) {
    // Then trigger an alert
    // alert("Media Query Matched!");
    cartEl.classList.remove("show");
  }
}
 */

const CART = {
  KEY: "lacjkey",
  contents: [],
  init() {
    let _contents = localStorage.getItem(CART.key);
    if (_contents) {
      //turn it into JS objects
      CART.contents = JSON.stringify(CART.contents);
    } else {
      //dummy JS test data
      CART.contents = [
        { id: 1, title: "Apple", qty: 5, itemPrice: 0.85 },
        { id: 2, title: "Banana", qty: 3, itemPrice: 0.35 },
        { id: 3, title: "Cherry", qty: 8, itemPrice: 0.05 },
      ];
      CART.updateDOM();
    }
  },
  updateDOM() {
    console.log(CART.contents);
    // alert("");
  },
};

CART.init();

const fetch_url = "https://s2021-8556.restdb.io/rest/t9products";

fetch(fetch_url, {
  method: "GET",
  headers: {
    "x-apikey": "6034ed655ad3610fb5bb655d",
  },
})
  .then((res) => res.json())
  .then((response) => {
    // console.log(response);
    showproducts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showproducts(data) {
  // console.table(data);
  data.forEach((product) => {
    showproduct(product);
  });
}

function showproduct(data) {
  //one at a time
  // console.log(data);

  const tempProd = document.querySelector("#product-template").content;
  const clone = tempProd.cloneNode(true);

  const h2El = clone.querySelector("h2");
  h2El.textContent = data.name;

  const imgEl = clone.querySelector("img");
  imgEl.alt = data.name;
  imgEl.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Antidrroga_shoes.jpg/128px-Antidrroga_shoes.jpg";

  const priceEl = clone.querySelector("p span");
  priceEl.textContent = data.price;

  const btnEl = clone.querySelector("button");
  btnEl.dataset.id = data._id;

  btnEl.addEventListener("click", function () {
    addToCart(data._id);
  });

  function addToCart(id) {
    alert(id);
  }

  const productsEl = document.querySelector(".products");
  productsEl.appendChild(clone);
}

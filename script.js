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
    let _contents = localStorage.getItem(CART.KEY);
    console.log(_contents);
    //console.log(_contents.length);
    if (_contents) {
      //turn it into JS objects
      CART.contents = JSON.parse(_contents);
    } else {
      //dummy JS test data
      //here we'd handle an empty cart??
      CART.contents = [
        { id: 1, title: "Apple", qty: 2, price: 0.85 },
        { id: 2, title: "Banana", qty: 1, price: 0.35 },
        { id: 3, title: "Cherry", qty: 1, price: 0.05 },
      ];
    }
    CART.sync();
    document.querySelector("#clearcart").addEventListener("click", function () {
      localStorage.clear(); //this will clear all localStorage
      CART.init();
    });
    // this.updateDOM();
    // CART.updateDOM();
  },
  sync() {
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    // alert("hey");
    CART.updateDOM();
  },
  updateDOM() {
    console.log(CART.contents);
    const cartContentEl = document.querySelector(".cart-content");
    cartContentEl.innerHTML = "";
    CART.contents.forEach((element) => {
      const tempItem = document.querySelector("#cart-item-template").content;
      const itemcopy = tempItem.cloneNode(true);

      // const title = element.title.toLowerCase();
      const title = element.title;

      const labelEl = itemcopy.querySelector("label");
      labelEl.textContent = element.title;
      labelEl.setAttribute("for", title);

      const inputEl = itemcopy.querySelector("input");
      inputEl.id += element.id;
      inputEl.name = title;
      inputEl.value = element.qty;
      inputEl.addEventListener("change", function () {
        const itemQty = inputEl.value;
        let obj = {
          id: element.id,
          title: element.name,
          price: element.price,
          qty: itemQty,
        };

        // console.log(obj);

        CART.updateCartLS(obj);
      });

      cartContentEl.appendChild(itemcopy);
    });
  },
  addToCartLS(dataobj) {
    console.log(dataobj);
    //.id, .title, .itemprice
    //alert(id);
    const found = CART.contents.findIndex(
      (element) => element.id == dataobj.id
    );
    //if it's not htere
    if (found == -1) {
      // CART.contens
      // found.qty += 1;
      dataobj.qty = 1;
      // console.log(found);
      alert("hit's not there");
      CART.contents.push(dataobj);
    } else {
      alert(found);
      const qtyEl = document.querySelector("#id-" + dataobj.id);
      dataobj.qty = parseInt(qtyEl.value) + 1;
      CART.contents[found].qty = dataobj.qty;
    }
    console.log(CART.contents);
    CART.sync();
  },
  updateCartLS(dataobj) {
    // alert("update");
    const found = CART.contents.findIndex(
      (element) => element.id == dataobj.id
    );
    const qtyEl = document.querySelector("#id-" + dataobj.id);
    dataobj.qty = parseInt(qtyEl.value);
    CART.contents[found].qty = dataobj.qty;
    //remove if 0
    if (dataobj.qty == 0) {
      CART.contents.splice(found, 1);
      // CART.contents = CART.contents.join();
    }
    CART.sync();
  },
};

CART.init();

const fetch_url = "https://s2021-8556.restdb.io/rest/t9products?max=20";

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
    let obj = {
      id: data._id,
      title: data.name,
      price: data.price,
      qty: 1,
    };

    // console.log(obj);

    CART.addToCartLS(obj);
  });

  const productsEl = document.querySelector(".products");
  productsEl.appendChild(clone);
}

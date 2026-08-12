let cart = [];

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  document.getElementById("cart").classList.add("active");
}


function updateCart() {

  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <h4>${item.name}</h4>

      <p>₹${item.price} / sq.ft</p>

      <div class="quantity">

        <button onclick="changeQuantity(${index}, -1)">−</button>

        <span>${item.quantity}</span>

        <button onclick="changeQuantity(${index}, 1)">+</button>

      </div>

      <p>
        Subtotal: ₹${item.price * item.quantity}
      </p>

      <button class="remove" onclick="removeItem(${index})">
        Remove
      </button>
    `;

    cartItems.appendChild(div);
  });

  cartCount.innerText = count;
  cartTotal.innerText = total;
}


function changeQuantity(index, change) {

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


function removeItem(index) {

  cart.splice(index, 1);

  updateCart();
}


function toggleCart() {

  document.getElementById("cart").classList.toggle("active");

}


function orderNow() {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello Palak Marble!%0A%0AI want to order:%0A";

  let total = 0;

  cart.forEach(item => {

    const subtotal = item.price * item.quantity;

    total += subtotal;

    message +=
      `${item.name} - ${item.quantity} sq.ft - ₹${subtotal}%0A`;
  });

  message += `%0ATotal: ₹${total}`;

  /*
    Replace 919999999999 with your
    WhatsApp business number.
  */

  const phoneNumber = "919999999999";

  window.open(
    `https://wa.me/${phoneNumber}?text=${message}`,
    "_blank"
  );
}


updateCart();

function renderCart() {
  const data = readData();
  const cart = data.cart || [];
  const wrap = document.getElementById("cart-list");

  if (cart.length === 0) {
    wrap.innerHTML = "<p>🛒 Giỏ hàng đang trống</p>";
    document.getElementById("cart-total").textContent = formatVND(0);
    return;
  }

  let total = 0;

  wrap.innerHTML = cart.map((item, i) => {
    total += item.qty * item.price;

      return `
        <div class="cart-item">
          <img src="${item.img}">
          <div class="cart-info">
            <div class="cart-name">${item.name}</div>
            <div class="cart-price">${formatVND(item.price)}</div>

            <div class="cart-actions">
              <button onclick="changeQty(${i}, -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${i}, 1)">+</button>
              <button class="remove" onclick="removeItem(${i})">🗑</button>
            </div>
          </div>
        </div>
      `;

  }).join("");

  document.getElementById("cart-total").textContent = formatVND(total);
}

/* ================= TĂNG GIẢM ================= */
function changeQty(index, delta) {
  const data = readData();
  data.cart[index].qty += delta;

  if (data.cart[index].qty <= 0) {
    data.cart.splice(index, 1);
  }

  saveData(data);
  renderCart();
}

/* ================= XOÁ ================= */
function removeItem(index) {
  const data = readData();
  data.cart.splice(index, 1);
  saveData(data);
  renderCart();
}

/* ================= THANH TOÁN ================= */
function checkout() {
  const data = readData();

  if (!data.cart || data.cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  alert("✅ Thanh toán thành công!");
  data.cart = [];
  saveData(data);
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);

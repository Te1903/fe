/* ============= CART SESSION ============= */

function getCart() {
  return JSON.parse(sessionStorage.getItem('qr_cart') || '[]');
}

function setCart(c) {
  sessionStorage.setItem('qr_cart', JSON.stringify(c));
  updateBottomCart();
}

function clearCart() {
  sessionStorage.removeItem('qr_cart');
  updateBottomCart();
}

function updateBottomCart() {
  const bar = document.getElementById("bottom-cart");
  if (!bar) return;

  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  if (count === 0) {
    bar.style.display = "none";
  } else {
    document.getElementById("bottom-count").textContent = count;
    document.getElementById("bottom-total").textContent = formatVND(total);
    bar.style.display = "flex";
  }
}

function openCart() {
  const cart = getCart();
  if (cart.length === 0) return alert("Giỏ hàng trống!");

  let html = `<h2>Giỏ hàng</h2>`;
  cart.forEach(it => {
    html += `<div>${it.name} x${it.qty} — ${formatVND(it.qty * it.price)}</div>`;
  });

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  html += `
    <hr>
    <strong>Tổng: ${formatVND(total)}</strong><br><br>
    <button onclick="window.opener.placeOrder(); window.close();">Gửi order</button>
    <button onclick="window.opener.clearCart(); window.close();" style="margin-left:10px">Xóa giỏ</button>
  `;

  const w = window.open('', '_blank', 'width=420,height=680');
  w.document.write(`<body style="font-family:Inter;padding:16px;">${html}</body>`);
}
    
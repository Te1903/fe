/* APP KEY */
const APP_KEY = 'qr_order_demo_v1';

/* DEMO DATA */
function initDemoData() {
  if (localStorage.getItem(APP_KEY)) return;

  const demo = {
    menu: [
      { id: 101, name: "Cà phê sữa đá", price: 25000, category: "cafe", img: IMG_CAFE_SUADA, desc:"", status:"ok" },
      { id: 102, name: "Trà đào cam sả", price: 32000, category: "tra", img: IMG_TRA_DAO, desc:"", status:"ok" },
      { id: 103, name: "Mỳ cay hải sản", price: 45000, category: "monno", img: IMG_MY_CAY, desc:"", status:"ok" }
    ]
  };

  localStorage.setItem(APP_KEY, JSON.stringify(demo));
}

function readData(){ 
  return JSON.parse(localStorage.getItem(APP_KEY)); 
}

function formatVND(n){
  return n.toLocaleString("vi-VN") + " ₫";
}
/* =========================================================
   DB (READ/WRITE)
========================================================= */
function readData() {
  return JSON.parse(localStorage.getItem(APP_KEY));
}

function writeData(d) {
  localStorage.setItem(APP_KEY, JSON.stringify(d));
}

/* =========================================================
   FORMAT MONEY
========================================================= */
function formatVND(n) {
  return n.toLocaleString("vi-VN") + " ₫";
}

/* =========================================================
   CART (sessionStorage)
========================================================= */
function getCart() {
  return JSON.parse(sessionStorage.getItem("qr_cart") || "[]");
}

function setCart(cart) {
  sessionStorage.setItem("qr_cart", JSON.stringify(cart));
  updateBottomCart();
}

function clearCart() {
  sessionStorage.removeItem("qr_cart");
  updateBottomCart();
}

/* =========================================================
   BOTTOM CART BAR
========================================================= */
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

/* =========================================================
   OPEN CART POPUP
========================================================= */
function openCart() {
  const cart = getCart();
  if (cart.length === 0) return alert("Giỏ hàng trống!");

  let html = `<h2>Giỏ hàng</h2>`;

  cart.forEach(item => {
    html += `<div>${item.name} x${item.qty} — ${formatVND(item.qty * item.price)}</div>`;
  });

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  html += `
      <hr>
      <strong>Tổng: ${formatVND(total)}</strong><br><br>
      <button onclick="window.close()">Đóng</button>
  `;

  const w = window.open("", "_blank", "width=420,height=600");
  w.document.write(`<body style="font-family:Inter;padding:20px">${html}</body>`);
}

/* =========================================================
   AUTO INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initDemoData();
  updateBottomCart();
});


// ==========================
// KHỞI TẠO DỮ LIỆU DEMO
// ==========================
function initDemoStaff() {
    if (localStorage.getItem(STAFF_KEY)) return;

    const demo = {
        staff: [
            { id: 101, name: "Nguyễn Văn A", username: "nvA", password: "123456", role: "admin", status: "active" },
            { id: 102, name: "Trần Thị B", username: "nvB", password: "123456", role: "staff", status: "active" },
            { id: 103, name: "Phạm Văn C", username: "nvC", password: "123456", role: "staff", status: "inactive" }
        ]
    };

    localStorage.setItem(STAFF_KEY, JSON.stringify(demo));
}
